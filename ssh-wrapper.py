#!/usr/bin/env python3
"""SSH wrapper using paramiko that can be used as GIT_SSH_COMMAND"""
import paramiko
import sys
import os

def main():
    # Get the SSH command arguments
    # git calls: ssh -o StrictHostKeyChecking=no user@host command
    args = sys.argv[1:]
    
    # Parse arguments
    host = None
    port = 22
    command = None
    i = 0
    while i < len(args):
        if args[i] == '-p' and i+1 < len(args):
            port = int(args[i+1])
            i += 2
        elif args[i] == '-o':
            i += 2  # skip option and value
        elif args[i] == '-o':
            i += 2
        elif not args[i].startswith('-'):
            if host is None:
                host = args[i]
            else:
                command = args[i]
            i += 1
        else:
            i += 1
    
    if not host or not command:
        print("Usage: ssh-wrapper.py [options] user@host command", file=sys.stderr)
        sys.exit(1)
    
    # Parse user@host
    if '@' in host:
        username, hostname = host.split('@', 1)
    else:
        username = 'git'
        hostname = host
    
    # Try to find SSH key
    key_paths = [
        os.path.expanduser('~/.ssh/id_ed25519'),
        os.path.expanduser('~/.ssh/id_rsa'),
        os.path.expanduser('~/.ssh/id_ecdsa'),
    ]
    
    pkey = None
    for key_path in key_paths:
        if os.path.exists(key_path):
            try:
                if 'ed25519' in key_path:
                    pkey = paramiko.Ed25519Key.from_private_key_file(key_path)
                elif 'ecdsa' in key_path:
                    pkey = paramiko.ECDSAKey.from_private_key_file(key_path)
                else:
                    pkey = paramiko.RSAKey.from_private_key_file(key_path)
                break
            except Exception:
                continue
    
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        client.connect(hostname, port=port, username=username, pkey=pkey, timeout=30)
        stdin, stdout, stderr = client.exec_command(command)
        
        # Stream output
        import select
        import socket
        
        channel = stdout.channel
        channel.setblocking(0)
        
        while True:
            r, w, e = select.select([channel], [], [], 1.0)
            if channel.recv_ready():
                data = channel.recv(4096)
                if data:
                    sys.stdout.buffer.write(data)
                    sys.stdout.buffer.flush()
            if channel.recv_stderr_ready():
                data = channel.recv_stderr(4096)
                if data:
                    sys.stderr.buffer.write(data)
                    sys.stderr.buffer.flush()
            if channel.exit_status_ready():
                # Read remaining data
                while channel.recv_ready():
                    data = channel.recv(4096)
                    if data:
                        sys.stdout.buffer.write(data)
                        sys.stdout.buffer.flush()
                while channel.recv_stderr_ready():
                    data = channel.recv_stderr(4096)
                    if data:
                        sys.stderr.buffer.write(data)
                        sys.stderr.buffer.flush()
                break
        
        exit_status = channel.recv_exit_status()
        client.close()
        sys.exit(exit_status)
    except Exception as e:
        print(f"SSH Error: {e}", file=sys.stderr)
        client.close()
        sys.exit(1)

if __name__ == '__main__':
    main()

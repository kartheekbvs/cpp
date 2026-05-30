'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  BookOpen, Brain, Code2, AlertTriangle, Trophy, CheckCircle2,
  ChevronRight, ChevronLeft, Menu, X, Terminal, Cpu, Zap,
  BookMarked, GraduationCap, Search, ArrowRight, RotateCcw,
  Lightbulb, Eye, Play, Copy, Check, ChevronDown, Star,
  MessageSquare, Command, Sparkles, Layers, Loader2, ExternalLink,
  Square, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, Columns2
} from 'lucide-react';
import { phases, getTopic, getNextTopic, getPrevTopic, type Topic } from '@/lib/curriculum';
import { useLearningStore } from '@/lib/learning-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressUI } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ============================================
// HYDRATION SAFE HOOK
// ============================================
function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return hydrated;
}

// ============================================
// SIDEBAR COMPONENT
// ============================================
function Sidebar() {
  const { currentTopicId, setCurrentTopic, setSidebarOpen, completedTopics, isCompleted } = useLearningStore();
  const [expandedPhase, setExpandedPhase] = useState<string>(phases[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhases = useMemo(() => {
    if (!searchTerm) return phases;
    return phases.map(p => ({
      ...p,
      topics: p.topics.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.includes(searchTerm)
      )
    })).filter(p => p.topics.length > 0);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/20">
            C++
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">C++ Mastery</h1>
            <p className="text-xs text-slate-400">Zero → LeetCode Ready</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400">Overall Progress</span>
          <span className="text-emerald-400 font-semibold">{useLearningStore.getState().getProgress()}%</span>
        </div>
        <ProgressUI value={useLearningStore.getState().getProgress()} className="h-1.5 bg-slate-700" />
        <p className="text-xs text-slate-500 mt-1">{completedTopics.length} of 91 topics completed</p>
      </div>

      {/* Phases & Topics */}
      <ScrollArea className="flex-1 px-2 py-2">
        {filteredPhases.map((phase) => (
          <div key={phase.id} className="mb-1">
            <button
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? '' : phase.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/60 transition-colors"
            >
              <span className="text-base">{phase.icon}</span>
              <span className="flex-1 text-left truncate">{phase.title}</span>
              <span className="text-xs text-slate-500">{phase.topics.filter(t => isCompleted(t.id)).length}/{phase.topics.length}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedPhase === phase.id ? 'rotate-180' : ''}`} />
            </button>
            <div
              className="overflow-hidden transition-all duration-200 ease-in-out"
              style={{
                maxHeight: expandedPhase === phase.id ? '2000px' : '0px',
                opacity: expandedPhase === phase.id ? 1 : 0,
              }}
            >
              {phase.topics.map((topic) => {
                const isActive = currentTopicId === topic.id;
                const done = isCompleted(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => { setCurrentTopic(topic.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-2.5 pl-10 pr-3 py-1.5 text-sm rounded-lg transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 font-medium'
                        : done
                        ? 'text-slate-300 hover:bg-slate-800/40'
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{topic.id} — {topic.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

// ============================================
// SECTION TAB COMPONENT
// ============================================
const SECTION_TABS = [
  { id: 'story', label: 'Story', icon: Lightbulb, color: 'text-amber-400' },
  { id: 'memory', label: 'Memory', icon: Brain, color: 'text-violet-400' },
  { id: 'steps', label: 'Step-by-Step', icon: Play, color: 'text-emerald-400' },
  { id: 'code', label: 'Code', icon: Code2, color: 'text-sky-400' },
  { id: 'syntax', label: 'Syntax Card', icon: BookMarked, color: 'text-pink-400' },
  { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle, color: 'text-red-400' },
  { id: 'leetcode', label: 'LeetCode', icon: Trophy, color: 'text-orange-400' },
  { id: 'checkpoint', label: 'Checkpoint', icon: CheckCircle2, color: 'text-teal-400' },
];

// ============================================
// CODE BLOCK COMPONENT
// ============================================
function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-600/50 bg-slate-950 shadow-xl">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-600/50">
          <span className="text-xs font-medium text-slate-300">{title}</span>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-300 hover:text-white" onClick={handleCopy}>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="ml-1 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
      )}
      <pre ref={codeRef} className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-200 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

// ============================================
// ASCII ART DISPLAY COMPONENT
// ============================================
function AsciiDiagram({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-violet-500/30 bg-slate-900/80 p-5 overflow-x-auto shadow-lg shadow-violet-500/10">
      <pre className="text-xs sm:text-sm leading-relaxed font-mono text-violet-200 whitespace-pre">{content}</pre>
    </div>
  );
}

// ============================================
// C++ COMPILER — Godbolt API Integration
// ============================================
interface CompilerResult {
  stdout: string;
  stderr: string;
  code: number;
  execTime: number;
  didExecute: boolean;
  timedOut: boolean;
}

function CppCompiler({ initialCode, compact = false }: { initialCode: string; compact?: boolean }) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState<CompilerResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'errors'>('output');
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [mobileView, setMobileView] = useState<'editor' | 'output'>('editor');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const compilerRef = useRef<HTMLDivElement>(null);

  // Strip ANSI escape codes from compiler output
  const stripAnsi = (str: string) => str.replace(/\x1b\[[0-9;]*[a-zA-Z]|\x1b\[[0-9;]*m/g, '');

  // Sync code when initialCode changes (topic switch)
  useEffect(() => {
    setCode(initialCode);
    setOutput(null);
  }, [initialCode]);

  // Handle Tab key in textarea for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const compileAndRun = useCallback(async () => {
    setIsCompiling(true);
    setOutput(null);
    try {
      const response = await fetch('https://godbolt.org/api/compiler/g132/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          source: code,
          options: {
            userArguments: '-std=c++17 -O2',
            compilerOptions: { executorRequest: true },
            filters: { execute: true },
            tools: [], libraries: [],
          },
          lang: 'c++',
          allowStoreCodeDebug: true,
          ...(stdin.trim() ? { executeParameters: { args: [], stdin: stdin } } : {}),
        }),
      });
      if (!response.ok) throw new Error(`API returned ${response.status}: ${response.statusText}`);
      const data = await response.json();
      const stdoutText = (data.stdout || []).map((line: { text: string }) => line.text).join('\n');
      const stderrText = (data.stderr || []).map((line: { text: string }) => stripAnsi(line.text)).join('\n');
      const buildStderr = data.buildResult?.stderr?.map((line: { text: string }) => stripAnsi(line.text)).join('\n') || '';
      const result: CompilerResult = {
        stdout: stdoutText,
        stderr: buildStderr + (buildStderr && stderrText ? '\n' : '') + stderrText,
        code: data.code ?? -1, execTime: data.execTime ?? 0,
        didExecute: data.didExecute ?? false, timedOut: data.timedOut ?? false,
      };
      setOutput(result);
      setActiveTab(result.stderr ? 'errors' : 'output');
    } catch (err: any) {
      setOutput({
        stdout: '',
        stderr: `Compilation failed: ${err.message || 'Unknown error'}.\n\nPlease check your internet connection.`,
        code: -1, execTime: 0, didExecute: false, timedOut: false,
      });
      setActiveTab('errors');
    } finally { setIsCompiling(false); }
  }, [code, stdin]);

  const hasErrors = output && output.stderr && output.stderr.trim().length > 0;
  const hasOutput = output && output.stdout && output.stdout.trim().length > 0;

  // Output panel content (shared between all layouts)
  const outputPanel = (
    <div className="flex flex-col h-full min-h-0">
      {/* Output Tabs */}
      <div className="flex items-center shrink-0 border-b border-slate-700/30 bg-slate-900/40">
        <button
          onClick={() => setActiveTab('output')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTab === 'output'
              ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3 h-3" />
          Output
          {hasOutput && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>
        <button
          onClick={() => setActiveTab('errors')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTab === 'errors'
              ? 'text-red-400 border-b-2 border-red-400 bg-red-500/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3 h-3" />
          Errors
          {hasErrors && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
        </button>
        <div className="ml-auto pr-2 flex items-center gap-2">
          {output && output.didExecute && output.code === 0 && !hasErrors && (
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> OK
            </span>
          )}
          {output && output.didExecute && output.code !== 0 && (
            <span className="text-xs font-medium text-red-400 flex items-center gap-1">
              <X className="w-3 h-3" /> Exit: {output.code}
            </span>
          )}
          {output && output.execTime > 0 && (
            <span className="text-xs text-slate-500">{output.execTime}ms</span>
          )}
        </div>
      </div>
      {/* Output Content */}
      <div className="flex-1 p-3 bg-slate-950 overflow-y-auto min-h-0">
        {output ? (
          <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
            {activeTab === 'output' ? (
              hasOutput ? (
                <span className="text-emerald-300">{output.stdout}</span>
              ) : !hasErrors ? (
                <span className="text-slate-500 italic">No output.</span>
              ) : (
                <span className="text-slate-500 italic">No output — check Errors tab.</span>
              )
            ) : (
              hasErrors ? (
                <span className="text-red-300">{output.stderr}</span>
              ) : (
                <span className="text-emerald-400 italic">No errors! Compiled successfully.</span>
              )
            )}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
            <Terminal className="w-8 h-8" />
            <span className="text-sm">Click Run to see output</span>
          </div>
        )}
      </div>
    </div>
  );

  // Stdin section
  const stdinSection = showStdin && (
    <div className="px-3 py-2 border-t border-slate-700/30 bg-slate-950/50">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
        Stdin
      </label>
      <textarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        spellCheck={false}
        placeholder="Program input..."
        className="w-full h-14 p-2 bg-slate-900 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 resize-none"
      />
    </div>
  );

  // Mobile bottom bar (editor/output toggle + run button)
  const mobileBottomBar = (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 border-t border-slate-700/30 md:hidden">
      <Button
        variant="ghost"
        size="sm"
        className={`flex-1 gap-1.5 ${mobileView === 'editor' ? 'text-sky-300 bg-sky-500/10' : 'text-slate-400'}`}
        onClick={() => setMobileView('editor')}
      >
        <Code2 className="w-3.5 h-3.5" /> Editor
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`flex-1 gap-1.5 ${mobileView === 'output' ? 'text-emerald-300 bg-emerald-500/10' : 'text-slate-400'}`}
        onClick={() => setMobileView('output')}
      >
        <Terminal className="w-3.5 h-3.5" /> Output
        {hasOutput && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        {hasErrors && <span className="w-1.5 h-1.5 rounded-full bg-red-400 ml-0.5" />}
      </Button>
      <Button
        size="sm"
        className={`text-white font-semibold gap-1.5 ${isCompiling ? 'bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
        onClick={compileAndRun}
        disabled={isCompiling}
      >
        {isCompiling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
        Run
      </Button>
    </div>
  );

  // Compact mode for Mistakes section (vertical, no split)
  if (compact) {
    return (
      <div className="rounded-xl border-2 border-sky-500/30 bg-gradient-to-br from-slate-950 to-slate-900 shadow-xl shadow-sky-500/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 border-b border-sky-500/30">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Compiler</span>
            <span className="text-xs text-slate-500 hidden sm:inline">gcc 13.2 • C++17</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-white"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
        {/* Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className={`w-full p-3 bg-slate-950 text-slate-200 font-mono text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-inset placeholder:text-slate-600 ${
            isFullscreen ? 'min-h-[50vh]' : 'min-h-[160px] max-h-[300px]'
          }`}
          placeholder="Type your C++ code here..."
        />
        {/* Controls */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/60 border-t border-slate-700/30 flex-wrap">
          <Button size="sm" className={`text-white font-semibold gap-1.5 ${isCompiling ? 'bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}`} onClick={compileAndRun} disabled={isCompiling}>
            {isCompiling ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Wait</> : <><Play className="w-3.5 h-3.5" /> Run</>}
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-1" onClick={() => setShowStdin(!showStdin)}>
            <Terminal className="w-3 h-3" /> Stdin
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-1" onClick={() => { setCode(initialCode); setOutput(null); }} title="Reset">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <a href="https://cpp.sh/" target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-sky-300 rounded hover:bg-slate-800/60">
            <ExternalLink className="w-3 h-3" /> cpp.sh
          </a>
        </div>
        {stdinSection}
        {/* Output */}
        {output && (
          <div className={`border-t border-slate-700/30 overflow-y-auto ${isFullscreen ? 'max-h-[40vh]' : 'max-h-[200px]'}`}>
            {outputPanel}
          </div>
        )}
      </div>
    );
  }

  // Full compiler for Code/LeetCode sections — responsive with mobile-first design
  return (
    <div ref={compilerRef} className={`rounded-xl border-2 border-sky-500/30 bg-gradient-to-br from-slate-950 to-slate-900 shadow-xl shadow-sky-500/5 overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-2 z-[100] rounded-xl' : ''}`}>
      {/* Compiler Header + Controls */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 border-b border-sky-500/30 flex-wrap">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-sky-300 uppercase tracking-wider hidden sm:inline">C++ Compiler</span>
          <span className="text-xs font-bold text-sky-300 uppercase tracking-wider sm:hidden">Compiler</span>
          <span className="text-xs text-slate-500 hidden sm:inline">gcc 13.2 • C++17</span>
        </div>
        {/* Desktop controls — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 px-2 text-slate-400 hover:text-white gap-1 ${showStdin ? 'text-sky-300' : ''}`}
            onClick={() => setShowStdin(!showStdin)}
          >
            <Terminal className="w-3 h-3" /> Stdin
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-400 hover:text-white gap-1"
            onClick={() => { setCode(initialCode); setOutput(null); }}
            title="Reset code to original"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-400 hover:text-white gap-1"
            onClick={() => { navigator.clipboard.writeText(code); }}
            title="Copy code"
          >
            <Copy className="w-3 h-3" /> Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-400 hover:text-white"
            onClick={() => setIsHorizontal(!isHorizontal)}
            title={isHorizontal ? 'Stack vertically' : 'Side by side'}
          >
            <Columns2 className="w-3.5 h-3.5" />
          </Button>
          <a
            href="https://godbolt.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-7 w-7 inline-flex items-center justify-center text-slate-400 hover:text-white rounded-md hover:bg-slate-700/50 transition-colors"
            title="Open Compiler Explorer"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button
            size="sm"
            className={`text-white font-semibold gap-1.5 ml-1 ${isCompiling ? 'bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            onClick={compileAndRun}
            disabled={isCompiling}
          >
            {isCompiling ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...</>
            ) : (
              <><Play className="w-3.5 h-3.5" /> Run</>
            )}
          </Button>
        </div>
        {/* Mobile controls — visible only on small screens */}
        <div className="flex md:hidden items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 px-2 text-slate-400 hover:text-white gap-1 ${showStdin ? 'text-sky-300' : ''}`}
            onClick={() => setShowStdin(!showStdin)}
          >
            <Terminal className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-400 hover:text-white gap-1"
            onClick={() => { setCode(initialCode); setOutput(null); }}
            title="Reset"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-400 hover:text-white"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* === Mobile Layout: Editor/Output tabs with bottom bar === */}
      <div className="flex-1 flex flex-col min-h-0 md:hidden">
        {/* Mobile Editor View */}
        {mobileView === 'editor' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 w-full p-3 bg-slate-950 text-slate-200 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-inset placeholder:text-slate-600 min-h-0"
              placeholder="Type your C++ code here..."
            />
            {stdinSection}
          </div>
        )}
        {/* Mobile Output View */}
        {mobileView === 'output' && (
          <div className="flex-1 min-h-0 overflow-hidden">
            {outputPanel}
          </div>
        )}
      </div>
      {mobileBottomBar}

      {/* === Desktop Layout: Split Pane === */}
      <div className={`hidden md:flex ${isHorizontal ? 'flex-row' : 'flex-col'} flex-1 min-h-0`}>
        {/* Left: Code Editor */}
        <div className={`flex flex-col min-h-0 ${isHorizontal ? 'w-1/2 border-r border-slate-700/30' : 'border-b border-slate-700/30'}`}>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 w-full p-3 bg-slate-950 text-slate-200 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-inset placeholder:text-slate-600 min-h-0"
            placeholder="Type your C++ code here..."
          />
          {stdinSection}
        </div>

        {/* Right: Output */}
        <div className={`flex flex-col min-h-0 ${isHorizontal ? 'w-1/2' : ''}`}>
          {outputPanel}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTENT SECTION WRAPPER — CSS animation, always visible
// ============================================
function ContentSection({ children, sectionKey }: { children: React.ReactNode; sectionKey: string }) {
  return (
    <div
      key={sectionKey}
      className="space-y-5 animate-fade-in"
    >
      {children}
    </div>
  );
}

// ============================================
// STORY SECTION
// ============================================
function StorySection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="story">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Real Life Story</h2>
          <p className="text-sm text-slate-400">Understand it like a 12-year-old</p>
        </div>
      </div>
      <div className="prose prose-invert max-w-none">
        {topic.story.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-slate-200 leading-relaxed text-[15px] mb-4">
            {paragraph.split('**').map((segment, j) =>
              j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{segment}</strong> : segment
            )}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {topic.subtopics.map((st, i) => (
          <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-200 border border-slate-600">
            {st}
          </Badge>
        ))}
      </div>
    </ContentSection>
  );
}

// ============================================
// MEMORY VISUALIZATION SECTION
// ============================================
function MemorySection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="memory">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Memory Visualization</h2>
          <p className="text-sm text-slate-400">See exactly what happens inside RAM</p>
        </div>
      </div>
      <AsciiDiagram content={topic.memoryViz} />
    </ContentSection>
  );
}

// ============================================
// STEP-BY-STEP SECTION
// ============================================
function StepsSection({ topic }: { topic: Topic }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ContentSection sectionKey="steps">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Play className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Step-by-Step Execution</h2>
          <p className="text-sm text-slate-400">Walk through code line by line</p>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex gap-2 flex-wrap">
        {topic.stepByStep.map((_, i) => (
          <Button
            key={i}
            variant={activeStep === i ? 'default' : 'ghost'}
            size="sm"
            className={activeStep === i ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
            onClick={() => setActiveStep(i)}
          >
            Line {i + 1}
          </Button>
        ))}
      </div>

      {/* Current Step Detail */}
      <Card className="bg-slate-900/80 border-slate-600/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono text-emerald-300 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {topic.stepByStep[activeStep].line}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">What it does</span>
            <p className="text-sm text-slate-200 mt-1">{topic.stepByStep[activeStep].explanation}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Memory Change</span>
            <p className="text-sm text-violet-300 mt-1">{topic.stepByStep[activeStep].memoryChange}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Output</span>
            <p className="text-sm text-amber-300 mt-1 font-mono">{topic.stepByStep[activeStep].output}</p>
          </div>
        </CardContent>
      </Card>

      {/* Play All Button */}
      <Button
        variant="outline"
        size="sm"
        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
        onClick={() => {
          let step = 0;
          const interval = setInterval(() => {
            setActiveStep(step);
            step++;
            if (step >= topic.stepByStep.length) clearInterval(interval);
          }, 1500);
        }}
      >
        <Play className="w-4 h-4 mr-2" /> Auto-play all steps
      </Button>
    </ContentSection>
  );
}

// ============================================
// CODE SECTION
// ============================================
function CodeSection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="code">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Complete Working Code</h2>
          <p className="text-sm text-slate-400">Edit &amp; run the code live — side by side!</p>
        </div>
      </div>
      {/* Split IDE: Code + Compiler integrated */}
      <div className="min-h-[420px] md:min-h-[500px]">
        <CppCompiler initialCode={topic.code} />
      </div>
    </ContentSection>
  );
}

// ============================================
// SYNTAX CARD SECTION
// ============================================
function SyntaxSection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="syntax">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
          <BookMarked className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Syntax Quick-Card</h2>
          <p className="text-sm text-slate-400">Bookmark this for reference</p>
        </div>
      </div>
      <div className="rounded-xl border-2 border-pink-500/40 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-xl shadow-pink-500/10">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-pink-500/30">
          <BookMarked className="w-5 h-5 text-pink-400" />
          <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider">{topic.syntaxCard.title}</h3>
        </div>
        <pre className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-4 rounded-lg border border-slate-700/50">{topic.syntaxCard.content}</pre>
      </div>
    </ContentSection>
  );
}

// ============================================
// MISTAKES SECTION
// ============================================
function MistakesSection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="mistakes">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Top Mistakes Beginners Make</h2>
          <p className="text-sm text-slate-400">Avoid these common traps!</p>
        </div>
      </div>
      {topic.mistakes.map((mistake, i) => (
        <Card key={i} className="bg-slate-900/80 border-red-500/30 overflow-hidden">
          <div className="bg-red-500/10 px-5 py-3 border-b border-red-500/30 flex items-center gap-2">
            <X className="w-5 h-5 text-red-400" />
            <span className="text-sm font-bold text-red-300">WRONG — Mistake #{i + 1}</span>
          </div>
          <CardContent className="pt-4 space-y-3">
            <CodeBlock code={mistake.wrong} title="Wrong Code" />
            <p className="text-sm text-slate-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              {mistake.explanation}
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-300">CORRECT</span>
            </div>
            <CodeBlock code={mistake.correct} title="Correct Code" />
            {/* Run Correct Code */}
            <div className="mt-2">
              <CppCompiler initialCode={mistake.correct} compact />
            </div>
          </CardContent>
        </Card>
      ))}
    </ContentSection>
  );
}

// ============================================
// LEETCODE SECTION
// ============================================
function LeetcodeSection({ topic }: { topic: Topic }) {
  return (
    <ContentSection sectionKey="leetcode">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">LeetCode Connection</h2>
          <p className="text-sm text-slate-400">Apply this concept to real problems</p>
        </div>
      </div>

      {/* Problem */}
      <Card className="bg-slate-900/80 border-orange-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-400" />
            <CardTitle className="text-base text-orange-300">Problem</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{topic.leetcode.problem}</pre>
        </CardContent>
      </Card>

      {/* Approach */}
      <Card className="bg-slate-900/80 border-sky-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-sky-400" />
            <CardTitle className="text-base text-sky-300">Approach</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-200 leading-relaxed">{topic.leetcode.approach}</p>
        </CardContent>
      </Card>

      {/* Dry Run */}
      <Card className="bg-slate-900/80 border-emerald-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-base text-emerald-300">Dry Run</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <AsciiDiagram content={topic.leetcode.dryRun} />
        </CardContent>
      </Card>

      {/* Solution Code — Integrated Compiler */}
      <CppCompiler initialCode={topic.leetcode.code} />

      {/* Complexity */}
      <Card className="bg-slate-900/80 border-violet-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-400" />
            <CardTitle className="text-base text-violet-300">Complexity Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="text-sm text-slate-200 whitespace-pre-wrap">{topic.leetcode.complexity}</pre>
        </CardContent>
      </Card>
    </ContentSection>
  );
}

// ============================================
// CHECKPOINT SECTION
// ============================================
function CheckpointSection({ topic }: { topic: Topic }) {
  const { checkpointAnswers, setCheckpointAnswer, isCheckpointCorrect, markCompleted } = useLearningStore();
  const answered = topic.id in checkpointAnswers;
  const selectedAnswer = checkpointAnswers[topic.id];
  const isCorrect = answered && isCheckpointCorrect(topic.id, topic.checkpoint.answer);

  return (
    <ContentSection sectionKey="checkpoint">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Checkpoint Question</h2>
          <p className="text-sm text-slate-400">Test your understanding before moving on</p>
        </div>
      </div>

      <Card className="bg-slate-900/80 border-teal-500/30">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-5">{topic.checkpoint.question}</h3>
          <div className="space-y-3">
            {topic.checkpoint.options.map((option, i) => {
              let optionClass = 'border-slate-600/50 hover:border-slate-500 hover:bg-slate-800/60';
              if (answered) {
                if (i === topic.checkpoint.answer) {
                  optionClass = 'border-emerald-500/50 bg-emerald-500/10';
                } else if (i === selectedAnswer && !isCorrect) {
                  optionClass = 'border-red-500/50 bg-red-500/10';
                } else {
                  optionClass = 'border-slate-700/30 opacity-50';
                }
              } else if (selectedAnswer === i) {
                optionClass = 'border-teal-500/50 bg-teal-500/10';
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!answered) {
                      setCheckpointAnswer(topic.id, i);
                      if (i === topic.checkpoint.answer) {
                        markCompleted(topic.id);
                      }
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      answered && i === topic.checkpoint.answer
                        ? 'bg-emerald-500 text-white'
                        : answered && i === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {answered && i === topic.checkpoint.answer ? '\u2713' : answered && i === selectedAnswer && !isCorrect ? '\u2717' : String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-slate-200">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`mt-5 p-4 rounded-xl border-2 animate-fade-in ${
              isCorrect
                ? 'border-emerald-500/30 bg-emerald-500/10'
                : 'border-red-500/30 bg-red-500/10'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-emerald-400">Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-400" />
                    <span className="font-bold text-red-400">Not quite — let me re-explain!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-slate-200">
                {isCorrect
                  ? "You've understood this concept! The correct answer highlights the key idea. You're ready to move on to the next topic."
                  : `The correct answer is: ${topic.checkpoint.options[topic.checkpoint.answer]}. Don't worry — go back and re-read the story and memory sections. Try to understand WHY this answer is correct before moving on.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </ContentSection>
  );
}

// ============================================
// COMMAND INPUT COMPONENT
// ============================================
function CommandInput() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const { setCurrentTopic } = useLearningStore();

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (trimmed.startsWith('Next topic')) {
      const nextId = getNextTopic(useLearningStore.getState().currentTopicId);
      if (nextId) {
        setCurrentTopic(nextId);
        setResponse(`Moving to next topic: ${nextId}`);
      } else {
        setResponse('You have reached the end of the curriculum!');
      }
    } else if (trimmed.startsWith('Syntax for ')) {
      setResponse('Syntax card activated! Switch to the Syntax Card tab to see the reference.');
    } else if (trimmed.startsWith('Visualize ')) {
      setResponse('Memory visualization activated! Switch to the Memory tab to see the diagram.');
    } else {
      setResponse('Command not recognized. Try: "Next topic", "Syntax for [topic]", or "Visualize [concept]"');
    }
    setInput('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Command className="w-3.5 h-3.5" />
        <span>Special Commands: "Next topic", "Syntax for [topic]", "Visualize [concept]"</span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          placeholder="Type a command..."
          className="flex-1 px-3 py-2 bg-slate-900/80 border border-slate-700/50 rounded-lg text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => handleCommand(input)}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      {response && (
        <p className="text-xs text-emerald-400">{response}</p>
      )}
    </div>
  );
}

// ============================================
// MAIN LESSON VIEWER
// ============================================
function LessonViewer() {
  const { currentTopicId, activeSection, setActiveSection, setCurrentTopic } = useLearningStore();
  const topic = getTopic(currentTopicId);
  const nextId = getNextTopic(currentTopicId);
  const prevId = getPrevTopic(currentTopicId);

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="bg-slate-900/80 border-slate-700/50 max-w-md">
          <CardContent className="pt-6 text-center">
            <GraduationCap className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to C++ Mastery!</h2>
            <p className="text-slate-400 mb-6">Select a topic from the sidebar to begin your journey from zero to LeetCode ready.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setCurrentTopic('1.1')}>
              Start with Topic 1.1 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPhase = phases.find(p => p.id === topic.phaseId);

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Topic Header */}
      <div className="shrink-0 px-6 py-4 border-b border-slate-700/50 bg-slate-900/60">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary" className={`bg-gradient-to-r ${currentPhase?.color || 'from-slate-500 to-slate-600'} text-white text-xs`}>
            {currentPhase?.icon} {currentPhase?.title}
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
            Topic {topic.id}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 flex-wrap">
          {topic.subtopics.map((st, i) => (
            <span key={i} className="flex items-center gap-1">
              {st}
              {i < topic.subtopics.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="shrink-0 px-6 py-2 border-b border-slate-700/50 bg-slate-900/40 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {SECTION_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? tab.color : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-6 py-6 max-w-5xl">
          {activeSection === 'story' && <StorySection key="story" topic={topic} />}
          {activeSection === 'memory' && <MemorySection key="memory" topic={topic} />}
          {activeSection === 'steps' && <StepsSection key="steps" topic={topic} />}
          {activeSection === 'code' && <CodeSection key="code" topic={topic} />}
          {activeSection === 'syntax' && <SyntaxSection key="syntax" topic={topic} />}
          {activeSection === 'mistakes' && <MistakesSection key="mistakes" topic={topic} />}
          {activeSection === 'leetcode' && <LeetcodeSection key="leetcode" topic={topic} />}
          {activeSection === 'checkpoint' && <CheckpointSection key="checkpoint" topic={topic} />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="shrink-0 px-6 py-3 border-t border-slate-700/50 bg-slate-900/60">
        <CommandInput />
        <div className="flex items-center justify-between mt-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            disabled={!prevId}
            onClick={() => prevId && setCurrentTopic(prevId)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!nextId}
            onClick={() => nextId && setCurrentTopic(nextId)}
          >
            Next Topic <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  const { sidebarOpen, toggleSidebar, currentTopicId, completedTopics, getProgress } = useLearningStore();
  const topic = getTopic(currentTopicId);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-200"
          onClick={() => useLearningStore.getState().setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — collapsible on ALL screens */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full lg:w-0 lg:overflow-hidden'}
      `}>
        <Sidebar />
      </aside>

      {/* Collapsed sidebar rail — always visible thin strip on desktop to re-open */}
      {!sidebarOpen && (
        <div
          className="hidden lg:flex flex-col items-center py-4 w-10 bg-slate-900/80 border-r border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors shrink-0"
          onClick={toggleSidebar}
        >
          <PanelLeftOpen className="w-4 h-4 text-slate-400 hover:text-emerald-400 transition-colors" />
          <div className="mt-3 flex flex-col gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500/60" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center gap-3 px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/50">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={toggleSidebar} title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-slate-300">
              {topic ? `${topic.id} — ${topic.title}` : 'C++ Mastery'}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-xs text-slate-500">{completedTopics.length} completed</div>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all" style={{ width: `${getProgress()}%` }} />
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-400">
                    <Star className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bookmark Topic</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        {/* Lesson Viewer */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <LessonViewer />
        </div>
      </main>
    </div>
  );
}

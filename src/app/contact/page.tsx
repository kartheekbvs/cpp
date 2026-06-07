'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              C++
            </div>
            <span className="font-bold text-lg">C++ Mastery</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-emerald-400 font-medium">Contact</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="space-y-8 text-slate-300 leading-relaxed text-[16px]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Get in Touch</h2>
            <p>
              We value feedback from our community of learners. Whether you found a bug in a code example, have a suggestion for improving the curriculum, want to report a technical issue with the compiler, or simply want to share your learning journey with us, we would love to hear from you. Your input helps us make C++ Mastery better for everyone, and we take every message seriously.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How to Reach Us</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">GitHub</h3>
                <p className="mb-3">
                  The fastest way to reach us is through our GitHub repository. You can open an issue for bugs, feature requests, or content corrections. This is also the best channel if you want to contribute code or content improvements directly.
                </p>
                <a
                  href="https://github.com/kartheekbvs/cpp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  github.com/kartheekbvs/cpp
                </a>
              </div>

              <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Email</h3>
                <p className="mb-3">
                  For private inquiries, partnership opportunities, or matters that should not be discussed in a public GitHub issue, you can reach us via email. We aim to respond within 48 hours during business days.
                </p>
                <a
                  href="mailto:kartheekbvs@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  kartheekbvs@gmail.com
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What to Include in Your Message</h2>
            <p>
              To help us address your inquiry as quickly as possible, please include the following information when contacting us: a clear description of the issue or suggestion, the specific topic or page where you encountered the problem (including the topic ID if applicable), the browser and device you are using, any error messages you received, and steps to reproduce the issue if it is a bug. The more detail you provide, the faster we can investigate and resolve the matter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contributing to the Project</h2>
            <p>
              C++ Mastery is an open-source project, and we welcome contributions from the community. If you would like to help improve the platform, here are some ways you can contribute: fix errors in existing code examples or explanations, add new C++ topics or practice problems, improve the user interface or mobile experience, translate content into other languages, or help answer questions from other learners in GitHub Discussions. Visit our GitHub repository for contribution guidelines and open issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Response Times</h2>
            <p>
              We strive to respond to all inquiries as promptly as possible. GitHub issues are typically triaged within 24 to 48 hours. Email inquiries are answered within 48 hours on business days. Feature requests and content suggestions are evaluated on a monthly basis and prioritized based on community impact. Urgent security-related matters are addressed with the highest priority. We appreciate your patience and understanding as we work to support our growing community of learners.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} C++ Mastery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

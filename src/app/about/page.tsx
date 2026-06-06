'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className="text-emerald-400 font-medium">About</Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          About C++ Mastery
        </h1>

        <div className="space-y-8 text-slate-300 leading-relaxed text-[16px]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
            <p>
              C++ Mastery is a free, interactive learning platform designed to take absolute beginners from zero programming experience to confidently solving LeetCode problems. We believe that learning C++ should be visual, hands-on, and structured in a way that builds real understanding, not just memorization. Every concept is taught through real-life analogies, memory visualizations, step-by-step code walkthroughs, and live compilable examples so that learners never have to guess what happens inside their computer when code runs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What Makes Us Different</h2>
            <p>
              Unlike traditional tutorials that dump code on you and expect you to understand it, C++ Mastery teaches through multiple learning modes simultaneously. Each of the 91 topics across 8 progressive phases includes a real-life story explanation, a memory visualization showing exactly what happens in RAM, a step-by-step execution trace, a live compiler where you can edit and run the code yourself, a syntax quick-card for reference, common mistakes to avoid, and a LeetCode-style problem to apply what you learned. This multi-modal approach ensures that whether you are a visual learner, a hands-on tinkerer, or someone who needs to see the big picture first, you will find a learning path that works for you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">The Curriculum</h2>
            <p>
              The curriculum is divided into 8 carefully sequenced phases. Phase 1 starts with the absolute basics: variables, data types, and input/output. Phase 2 covers control flow with conditionals and loops. Phase 3 introduces functions and scope. Phase 4 dives into arrays and strings. Phase 5 explores pointers and references. Phase 6 teaches object-oriented programming. Phase 7 covers the Standard Template Library. Phase 8 brings everything together with advanced data structures, algorithms, and competitive programming techniques. Each phase builds directly on the previous one, ensuring no gaps in your understanding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Built for Everyone</h2>
            <p>
              Whether you are a college student preparing for placements, a self-taught developer looking to strengthen your fundamentals, or a competitive programmer aiming to level up, C++ Mastery is built for you. The platform is completely free and open source, hosted on GitHub Pages for maximum accessibility. There are no accounts to create, no paywalls to bypass, and no advertisements interrupting your learning. The integrated compiler runs real C++ code using GCC 13.2 with C++17 support, so you get authentic compilation results just like you would on your own machine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Open Source</h2>
            <p>
              C++ Mastery is an open-source project hosted on GitHub. We welcome contributions from the community, whether that means fixing a bug in a code example, adding new topics, improving explanations, or enhancing the platform features. If you find an error or have a suggestion, feel free to open an issue or submit a pull request. Together, we can make C++ education more accessible and effective for everyone.
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

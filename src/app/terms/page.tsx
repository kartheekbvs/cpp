'use client';

import Link from 'next/link';

export default function TermsPage() {
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
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-emerald-400 font-medium">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-slate-500 mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-[16px]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using C++ Mastery (the "Site"), available at course.twss.shop, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Site. These Terms apply to all visitors, users, and others who access or use the Site. We reserve the right to modify these Terms at any time, and your continued use of the Site after any changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              C++ Mastery is a free, educational web platform that provides interactive C++ programming tutorials and learning resources. The Site includes a structured curriculum of C++ topics, code examples with explanations, memory visualizations, step-by-step execution traces, syntax reference cards, common mistake warnings, LeetCode-style practice problems, and an integrated C++ compiler powered by the Godbolt Compiler Explorer API. The Site is provided "as is" and "as available" without any warranties of any kind, either express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Use of the Compiler</h2>
            <p>
              The integrated C++ compiler allows you to write, edit, and execute C++ code directly in your browser. Code you submit for compilation is sent to the Godbolt Compiler Explorer API (godbolt.org) for processing. You are solely responsible for the code you submit. You agree not to submit code that is malicious, harmful, or intended to disrupt the compiler service or any other system. This includes but is not limited to code designed to consume excessive resources, execute denial-of-service attacks, or exploit vulnerabilities. We reserve the right to restrict or block access to the compiler feature for users who violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>
              The content, design, and layout of C++ Mastery, including but not limited to text, graphics, code examples, curriculum structure, and visual design elements, are the intellectual property of C++ Mastery and its contributors. The Site's source code is available under an open-source license on GitHub. You may use the educational content for personal learning purposes. You may not reproduce, distribute, modify, or create derivative works from the Site's content for commercial purposes without explicit written permission. Code examples provided in the tutorials are intended as educational material and may be used freely in your own projects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. User Conduct</h2>
            <p>
              When using C++ Mastery, you agree to use the Site only for lawful educational purposes. You agree not to attempt to gain unauthorized access to any portion of the Site or any systems connected to the Site, not to use the compiler service for any illegal, harmful, or disruptive purposes, not to interfere with or disrupt the Site's functionality or the experience of other users, not to attempt to reverse-engineer, decompile, or disassemble any part of the Site, and not to use automated tools to scrape or harvest data from the Site in a manner that places excessive load on our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>
              C++ Mastery is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the Site's reliability, accuracy, availability, or fitness for any particular purpose. We do not guarantee that the Site will be uninterrupted, timely, secure, or error-free. The code examples and explanations are provided for educational purposes only and may contain errors or inaccuracies. You should always verify code behavior through your own testing before using it in production environments. The compiler results are provided by a third-party service (Godbolt) and we cannot guarantee their accuracy or availability at all times.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, C++ Mastery and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of profits, or business interruption, arising out of or related to your use of or inability to use the Site. This includes damages resulting from errors in code examples, compiler unavailability, inaccurate educational content, or any other aspect of the Site. Your use of the Site and its content is at your sole risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Third-Party Services</h2>
            <p>
              The Site integrates with the Godbolt Compiler Explorer API for code compilation and execution. This third-party service is operated independently and is subject to its own terms of service and privacy policy. We are not responsible for the availability, accuracy, or practices of the Godbolt service. The Site is hosted on GitHub Pages, which is operated by GitHub, Inc. and subject to GitHub's terms of service. Your use of these third-party services through our Site is governed by their respective terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on this page, and the "Last updated" date will be revised accordingly. We encourage you to review these Terms periodically to stay informed of any changes. Your continued use of the Site after any modifications constitutes your acceptance of the revised Terms. If you do not agree with the updated Terms, you should discontinue your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please visit our <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">Contact page</Link> or open an issue on our <a href="https://github.com/kartheekbvs/cpp" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">GitHub repository</a>. We are happy to clarify any aspect of these Terms and welcome your feedback on how we can improve transparency and user experience.
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

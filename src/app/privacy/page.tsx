'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
            <Link href="/privacy" className="text-emerald-400 font-medium">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-[16px]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy describes how C++ Mastery ("we," "our," or "us") collects, uses, and protects information when you visit our website at course.twss.shop/cpp (the "Site"). We are committed to safeguarding your privacy and ensuring transparency about our data practices. By accessing or using the Site, you agree to the practices described in this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              C++ Mastery is designed to be a minimal-data learning platform. We collect very limited information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Learning Progress Data:</strong> Your topic completion status and current progress are stored exclusively in your browser's local storage (localStorage). This data never leaves your device and is not transmitted to our servers or any third party.</li>
              <li><strong className="text-white">Code Submitted to Compiler:</strong> When you use the integrated C++ compiler, your code is sent to the Godbolt Compiler Explorer API (godbolt.org) for compilation and execution. This transmission occurs over HTTPS. We do not store, log, or have access to the code you submit for compilation.</li>
              <li><strong className="text-white">Automatically Collected Data:</strong> Like most websites, we may collect standard analytics data such as page views, browser type, device type, and referral source through third-party analytics services. This data is aggregated and anonymized, meaning it cannot be used to identify you personally.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              The limited data associated with our platform is used solely for the following purposes: maintaining your learning progress across sessions (stored locally on your device), compiling and executing C++ code through the Godbolt API when you request it, improving the quality and usability of the platform through aggregated analytics, and ensuring the security and stability of the Site. We do not sell, rent, trade, or share any personal information with third parties for marketing or commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies and Local Storage</h2>
            <p>
              C++ Mastery uses browser local storage (localStorage) to persist your learning progress, including which topics you have marked as completed and your current position in the curriculum. This data is stored entirely on your device and is never sent to our servers. We do not use tracking cookies. If third-party analytics or advertising services are used on the Site in the future, they may place their own cookies in your browser. You can control cookie settings through your browser preferences at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-3">
              Our Site integrates with the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Godbolt Compiler Explorer (godbolt.org):</strong> Used for compiling and executing C++ code. When you click "Run" in the compiler, your code is sent to the Godbolt API over HTTPS. Please refer to the Godbolt Privacy Policy for details on how they handle submitted code.</li>
              <li><strong className="text-white">GitHub Pages:</strong> Our Site is hosted on GitHub Pages. GitHub may collect server logs and analytics data as described in GitHub's Privacy Statement.</li>
            </ul>
            <p className="mt-3">
              We are not responsible for the privacy practices of these third-party services. We encourage you to review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              We take reasonable measures to protect the security of the Site and any data processed through it. All communications with the Godbolt API occur over encrypted HTTPS connections. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. Your learning progress data stored in localStorage is under your control and can be cleared at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>
              C++ Mastery is an educational platform that is suitable for learners of all ages, including children under 13. We do not knowingly collect personal information from children. Since we do not require account registration or collect personally identifiable information, our platform is inherently child-friendly. If you are a parent or guardian and believe your child has somehow provided personal information to us, please contact us and we will take steps to remove such information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights regarding your data: the right to access data we hold about you, the right to request deletion of your data, the right to object to or restrict data processing, and the right to data portability. Since we store minimal data and learning progress is kept locally on your device, you can exercise most of these rights by simply clearing your browser's local storage. For any other data-related requests, please contact us using the information provided on our Contact page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of the Site after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please visit our <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">Contact page</Link> to get in touch with us. We will do our best to respond to your inquiry promptly and address any concerns you may have.
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

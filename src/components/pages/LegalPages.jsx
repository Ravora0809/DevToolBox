import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';

export function PrivacyPage({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-300 text-sm leading-relaxed">
      {onNavigate && (
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      )}

      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Overview and Core Architecture</h2>
          <p>
            DevToolBox provides browser-based utilities for software developers, including formatters, encoders, generators, and validators. Our utilities are implemented to execute client-side using standard Web APIs, meaning text transformations and conversions are processed directly inside your browser session.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Data Processing and Inputs</h2>
          <p>
            When you paste or type code, JSON, regular expressions, or text into DevToolBox tools, that content is processed in your local browser memory to compute the requested output. We do not operate backend database clusters to harvest, profile, or retain your transformed payloads.
          </p>
          <p>
            However, we urge caution: as with any online application, users should avoid pasting production secrets, unencrypted private keys, or highly classified corporate credentials into web applications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Local Storage</h2>
          <p>
            DevToolBox uses your browser's standard <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded text-xs">localStorage</code> to save lightweight client-side preferences, specifically your starred favorite tools. This data never leaves your device and can be cleared at any time through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Hosting Infrastructure and Standard Web Logs</h2>
          <p>
            Like all web properties, requests to load static assets (HTML, JavaScript, CSS, and fonts) are handled by CDN and cloud hosting networks. Standard web server access logs—which typically record request timestamps, HTTP status codes, referring URLs, user-agent headers, and IP addresses—are automatically processed by hosting providers for technical diagnostics, DDoS prevention, and service availability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. External Links and Third-Party Services</h2>
          <p>
            DevToolBox may reference external developer resources, documentation sites, or open-source repositories. We are not responsible for the privacy practices, content, or technical operations of third-party websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">6. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect enhancements to our toolset or legal standards. Changes will be posted to this page with an updated revision date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">7. Contact</h2>
          <p>
            For privacy inquiries or technical questions regarding data handling, please reach out via our{' '}
            {onNavigate ? (
              <button onClick={() => onNavigate('contact')} className="text-indigo-400 hover:underline">
                Contact Page
              </button>
            ) : (
              <a href="#contact" className="text-indigo-400 hover:underline">Contact Page</a>
            )}.
          </p>
        </section>
      </div>
    </div>
  );
}

export function TermsPage({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-300 text-sm leading-relaxed">
      {onNavigate && (
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      )}

      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevToolBox, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Permitted Use</h2>
          <p>
            DevToolBox is provided for developers, students, and technology professionals. You may use our utilities for personal, educational, and commercial development workflows, subject to these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Prohibited Activities</h2>
          <p>
            You agree not to misuse DevToolBox. Prohibited conduct includes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
            <li>Attempting to disrupt, overload, or degrade the availability of our infrastructure.</li>
            <li>Using automated scripts to scrape or overload tools without reasonable rate limiting.</li>
            <li>Attempting to introduce malicious scripts, payloads, or exploits.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Intellectual Property</h2>
          <p>
            All custom site design, branding, editorial guides, and interface code of DevToolBox are the intellectual property of the DevToolBox team. The data, code, or strings you process with the tools remain your exclusive property.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Disclaimer of Warranties</h2>
          <p>
            DevToolBox is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. We do not warrant that results will be error-free or that the website will always remain uninterrupted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, DevToolBox and its contributors will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>
      </div>
    </div>
  );
}

export function DisclaimerPage({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-300 text-sm leading-relaxed">
      {onNavigate && (
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      )}

      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Disclaimer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Website & Tool Disclaimer
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Informational and Utility Purpose Only</h2>
          <p>
            The tools, formatters, validators, calculations, and articles provided on DevToolBox are for general informational, educational, and workflow assistance purposes only. They do not constitute professional security auditing, cryptographic certification, or legal advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. No Guarantee of Accuracy</h2>
          <p>
            While we strive to ensure our tools (such as JSON validators, regex matchers, Base64 transformers, and timestamp converters) adhere strictly to established RFCs and language specifications, differences in runtime engines or browser implementations may occasionally lead to discrepancies. You should independently test and verify outputs before deploying code, configurations, or schemas to production environments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Security and Sensitive Data</h2>
          <p>
            Although our utilities operate in your browser runtime, we strongly advise against processing highly sensitive credentials, unmasked production passwords, or confidential customer records in any web-based developer tool. You assume full responsibility for any data you enter.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Third-Party References and Trade Names</h2>
          <p>
            All product names, trademarks, and registered trademarks mentioned on DevToolBox (including React, Vite, JSON, TypeScript, and others) are property of their respective owners. Their mention does not imply endorsement, affiliation, or sponsorship.
          </p>
        </section>
      </div>
    </div>
  );
}

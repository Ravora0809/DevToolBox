import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
        <ShieldCheck className="w-5 h-5" />
        <span>Privacy Policy</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Zero-Data Retention Policy</h1>
      <p>
        At DevToolBox, user privacy and code security are fundamental architectural guarantees.
      </p>

      <h3 className="text-base font-bold text-white pt-2">1. Browser-Local Execution</h3>
      <p>
        All utilities provided by DevToolBox (including JSON Formatter, Regex Tester, Base64 Converter, and UUID Generator) execute entirely within the client-side JavaScript sandbox of your browser.
      </p>

      <h3 className="text-base font-bold text-white pt-2">2. No Telemetry or Keylogging</h3>
      <p>
        We do not capture, record, or transmit any inputs, outputs, passwords, tokens, or files processed through the tools.
      </p>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
        <FileText className="w-5 h-5" />
        <span>Terms of Service</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Terms of Usage</h1>
      <p>
        DevToolBox is provided free of charge for software developers, engineers, and students worldwide.
      </p>

      <h3 className="text-base font-bold text-white pt-2">1. Permitted Use</h3>
      <p>
        You are free to use all tools for personal, academic, and commercial software engineering projects.
      </p>

      <h3 className="text-base font-bold text-white pt-2">2. Warranty Disclaimer</h3>
      <p>
        Tools are provided on an "as-is" basis without warranties of any kind. While cryptographic routines utilize standard Web Crypto specifications, users should independently verify critical production schemas.
      </p>
    </div>
  );
}

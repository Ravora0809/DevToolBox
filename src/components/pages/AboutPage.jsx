import React from 'react';
import { ShieldCheck, Zap, Lock, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Intro */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Developer Utilities Built With Privacy First
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          DevToolBox was created to solve a fundamental issue with common online developer tools: most formatters and regex testers send sensitive development payloads, production tokens, and database dumps to untrusted servers for processing.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Zero Cloud Storage</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every transformation, validation, conversion, and encryption routine happens strictly in your browser runtime memory. Nothing is logged, cached, or transferred over WebSocket or HTTP endpoints.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Sub-Millisecond Speed</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            By avoiding network round-trips and backend latency, large datasets (up to 50MB) parse instantly using optimized V8 and JavaScript engine routines.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          Tech Stack & Standards
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Framework</span>
            <span className="font-semibold text-slate-200">React 19 & JSX</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Bundler</span>
            <span className="font-semibold text-slate-200">Vite 6</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Styling</span>
            <span className="font-semibold text-slate-200">Tailwind CSS 4</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Cryptography</span>
            <span className="font-semibold text-slate-200">Web Crypto API</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Cpu, Zap, Shield, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Intro Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>About DevToolBoox</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practical Developer Utilities Built for Daily Engineering Workflows
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
          DevToolBoox is an open suite of browser-based utilities engineered to help software developers format payloads, validate schemas, test regular expressions, and convert data without sluggish workflows or intrusive advertisements.
        </p>
      </div>

      {/* Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Browser-Local Processing</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Data transformations—including JSON formatting, regex matching, base64 encoding, and timestamp conversions—execute in your browser's local JavaScript runtime. Your input values are evaluated in local memory to generate results without relying on a remote API server.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Zero Network Roundtrip Latency</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Because conversions execute directly within modern V8 and SpiderMonkey engines, your formatting and calculations occur instantaneously. There are no queue times or network delays, enabling rapid iteration.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Standard Web Cryptography</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our password and identifier generators leverage the native browser <code className="text-amber-300 font-mono">crypto.getRandomValues()</code> and <code className="text-amber-300 font-mono">crypto.randomUUID()</code> implementations for cryptographically strong pseudorandom generation.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-100">Accessible & Keyboard-First</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designed for engineers who value velocity: jump between utilities instantly using the <kbd className="px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-200 rounded border border-slate-700 font-mono">⌘K</kbd> command palette, copy outputs with a single click, and navigate cleanly with full keyboard focus support.
          </p>
        </div>
      </div>

      {/* Tech Architecture Stack */}
      <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          Technical Stack & Standards
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
            <span className="font-semibold text-slate-200">Tailwind CSS</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Icons</span>
            <span className="font-semibold text-slate-200">Lucide React</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      {onNavigate && (
        <div className="p-6 bg-gradient-to-r from-indigo-950/50 to-slate-900 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Ready to streamline your workflow?</h3>
            <p className="text-xs text-slate-400">Explore all 11 developer utilities available in our directory.</p>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

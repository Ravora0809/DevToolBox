import React, { useState } from 'react';
import { Sparkles, X, ExternalLink } from 'lucide-react';

export default function AdBanner({ slot = "header" }) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  if (slot === "sidebar") {
    return (
      <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900/90 p-4 text-xs relative overflow-hidden">
        <div className="flex items-center justify-between text-indigo-400 font-semibold mb-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            DevToolBox Pro
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 border border-slate-700 px-1 rounded">Sponsor</span>
        </div>
        <p className="text-slate-300 mb-3 text-[11px] leading-relaxed">
          100% offline & client-side tools. No telemetry, no logs, zero data leaves your machine.
        </p>
        <button 
          onClick={() => setClosed(true)}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-200"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-indigo-950/40 border-y border-indigo-500/20 px-4 py-2 text-xs flex items-center justify-between text-slate-300">
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Privacy First</span>
        <span className="hidden sm:inline text-slate-400">All computations run directly in your browser with WebAssembly & Web Crypto.</span>
        <span className="sm:hidden text-slate-300">Fast, local, and private developer tools.</span>
      </div>
      <button 
        onClick={() => setClosed(true)}
        className="text-slate-400 hover:text-slate-200 p-1"
        aria-label="Close message"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

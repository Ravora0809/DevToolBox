import React from 'react';
import { Code2, ShieldCheck, Heart, Terminal, ArrowUpRight } from 'lucide-react';
import { TOOLS } from '../../data/tools';

export default function Footer({ onNavigate }) {
  const popularTools = TOOLS.filter(t => t.featured).slice(0, 6);

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#080c14] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-indigo-500/40 bg-slate-900 flex items-center justify-center p-0.5">
                <img 
                  src="/logo.jpg" 
                  alt="DevToolBoox Logo" 
                  className="w-full h-full object-cover rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-slate-100 text-sm">
                <span className="text-indigo-400">Dev</span>Tool<span className="text-sky-400">Boox</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Browser-Based Execution</span>
            </div>
          </div>

          {/* Col 2: Popular Tools */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Popular Utilities</h4>
            <ul className="space-y-2">
              {popularTools.map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => onNavigate(`tool-${t.id}`)}
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{t.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-indigo-400 transition-colors">
                  Tools Directory (All 11+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-indigo-400 transition-colors">
                  Developer Articles & Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors">
                  About & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-400 transition-colors">
                  Request New Developer Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Privacy */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Legal & Security</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-indigo-400 transition-colors">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-400 transition-colors">
                  Contact & Feedback
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} DevToolBoox. All rights reserved. Built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered for developer productivity
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

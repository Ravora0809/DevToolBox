import React, { useState } from 'react';
import {
  Code2,
  Search,
  Command,
  Star,
  Sparkles,
  BookOpen,
  Info,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Github
} from 'lucide-react';
import { TOOLS } from '../../data/tools';
import IconHelper from '../common/IconHelper';

export default function Navbar({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
  favorites = [],
  onToggleFavorite
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center group-hover:bg-[#0b0f19]/70 transition-colors">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                DevToolBox
                <span className="text-[10px] px-1.5 py-0.2 font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                  v2.0
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:inline">Developer Utilities Suite</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'home' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('tools')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'tools' || currentRoute.startsWith('tool-') ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              All Tools
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'blog' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'about' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'contact' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Right: Quick Search & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl text-xs transition-all shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search tools...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 font-mono">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Quick Favorites Pill */}
          {favoriteTools.length > 0 && (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-medium transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Starred ({favoriteTools.length})</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {toolsDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#111827] border border-slate-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Quick Favorites
                  </div>
                  {favoriteTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        onNavigate(`tool-${tool.id}`);
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2 py-2 text-left rounded-lg text-xs text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <IconHelper name={tool.icon} className="w-4 h-4 text-indigo-400" />
                      <span className="truncate">{tool.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0f19] px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('tools'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            All Developer Tools
          </button>
          <button
            onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Developer Articles & Guides
          </button>
          <button
            onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            About & Architecture
          </button>
          <button
            onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Request a Tool / Feedback
          </button>
        </div>
      )}
    </header>
  );
}

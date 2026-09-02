import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import IconHelper from './IconHelper';

export default function CommandPalette({ isOpen, onClose, onSelectTool }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredTools = TOOLS.filter(tool => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredTools.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredTools.length) % (filteredTools.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        onSelectTool(filteredTools[selectedIndex].id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#111827] border border-slate-700/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a tool name, category, or keyword (e.g. json, regex, uuid)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 text-xs px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No developer tools found matching <span className="text-indigo-400 font-mono">"{query}"</span>
            </div>
          ) : (
            filteredTools.map((tool, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-600/20 border border-indigo-500/30' : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                      <IconHelper name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-100 text-sm truncate">{tool.name}</span>
                        {tool.badge && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{tool.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-3 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 capitalize hidden sm:inline">{tool.category}</span>
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px] text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px] text-slate-300">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px] text-slate-300">Enter</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px] text-slate-300">ESC</kbd>
              Close
            </span>
          </div>
          <span className="text-slate-400">{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
}

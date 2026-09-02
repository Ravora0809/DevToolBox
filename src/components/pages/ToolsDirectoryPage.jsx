import React, { useState } from 'react';
import { Search, Layers, Star, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../../data/tools';
import IconHelper from '../common/IconHelper';

export default function ToolsDirectoryPage({ onNavigate, favorites = [], onToggleFavorite }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = TOOLS.filter(t => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || (
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Developer Tools Directory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse our full collection of {TOOLS.length} privacy-first web utilities
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search all utilities..."
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <IconHelper name={cat.icon} className="w-3.5 h-3.5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Grid of tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(tool => {
          const isFav = favorites.includes(tool.id);
          return (
            <div
              key={tool.id}
              onClick={() => onNavigate(`tool-${tool.id}`)}
              className="bg-[#111827]/70 hover:bg-[#151e32] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <IconHelper name={tool.icon} className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {tool.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {tool.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(tool.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {tool.description}
                </p>

                {/* Features list */}
                {tool.features && (
                  <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
                    {tool.features.slice(0, 2).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="capitalize font-mono text-[11px]">{tool.category}</span>
                <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium text-[11px]">
                  Launch Tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

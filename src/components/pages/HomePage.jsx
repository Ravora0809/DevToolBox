import React, { useState } from 'react';
import {
  Search,
  Command,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Star,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { TOOLS, CATEGORIES } from '../../data/tools';
import { BLOG_POSTS } from '../../data/blogs';
import IconHelper from '../common/IconHelper';

export default function HomePage({ onNavigate, onOpenCommandPalette, favorites = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = TOOLS.filter(t => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
    return matchesCat && matchesSearch;
  });

  const featuredTools = TOOLS.filter(t => t.featured);

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-6 pb-2 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Fast, Offline-Capable Developer Suite</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Every Developer Tool <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
            Zero Latency. Zero Tracking.
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          High-performance formatters, generators, converters, and regex debuggers engineered for speed. All computations run 100% locally in your browser.
        </p>

        {/* Big Search Bar with Cmd+K Trigger */}
        <div className="max-w-xl mx-auto relative">
          <div 
            onClick={onOpenCommandPalette}
            className="flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-2xl cursor-pointer shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200">
              <Search className="w-5 h-5 text-indigo-400" />
              <span className="text-sm">Search any tool (JSON, Regex, Base64, UUID...)</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </div>

        {/* Quick Pill Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400">Trending:</span>
          {['json-formatter', 'regex-tester', 'uuid-generator', 'password-generator', 'tsx-to-jsx'].map(id => {
            const tool = TOOLS.find(t => t.id === id);
            if (!tool) return null;
            return (
              <button
                key={id}
                onClick={() => onNavigate(`tool-${id}`)}
                className="px-2.5 py-1 bg-slate-900/80 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <IconHelper name={tool.icon} className="w-3 h-3 text-indigo-400" />
                <span>{tool.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Tabs & Interactive Tool Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Explore Developer Utilities
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Filter by functional category or search instantly</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter tools..."
                className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <IconHelper name={cat.icon} className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => {
            const isFav = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate(`tool-${tool.id}`)}
                className="group relative bg-[#111827]/70 hover:bg-[#151e32] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner">
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
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {tool.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize font-mono text-[11px] text-slate-400">{tool.category}</span>
                  <span className="flex items-center gap-1 text-indigo-400 group-hover:translate-x-0.5 transition-transform font-medium text-[11px]">
                    Open Tool <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Privacy & Engine Architecture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Engineered for Speed, Privacy, and Reliability
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modern developer workflows shouldn't require sending proprietary payloads, API keys, or database dumps to unverified servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">100% Client-Side Sandbox</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All JSON formatting, UUID generation, hashing, and regex matching run locally in your browser thread. No data is ever transmitted to a backend.
              </p>
            </div>

            <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Instantaneous Latency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero network roundtrips means sub-millisecond execution even on large multi-megabyte payloads.
              </p>
            </div>

            <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Web Crypto Standard</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Random passwords and UUIDs leverage hardware-accelerated cryptographically secure pseudo-random number generators (CSPRNG).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Technical Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Developer Guides & Articles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Deep-dives into data formats, regex optimization, and encoding standards</p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog')}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all hover:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-200 text-sm hover:text-indigo-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>{post.date}</span>
                <span className="text-indigo-400 font-medium">Read guide →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { ChevronRight, Star, Share2, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import IconHelper from '../common/IconHelper';

// Tool Components mapping
import JsonFormatter from '../tools/JsonFormatter';
import JsonValidator from '../tools/JsonValidator';
import RegexTester from '../tools/RegexTester';
import Base64Tool from '../tools/Base64Tool';
import UrlEncoderDecoder from '../tools/UrlEncoderDecoder';
import UuidGenerator from '../tools/UuidGenerator';
import PasswordGenerator from '../tools/PasswordGenerator';
import TimestampConverter from '../tools/TimestampConverter';
import WordCounter from '../tools/WordCounter';
import HtmlFormatter from '../tools/HtmlFormatter';
import TsxToJsxConverter from '../tools/TsxToJsxConverter';

const COMPONENT_MAP = {
  'json-formatter': JsonFormatter,
  'json-validator': JsonValidator,
  'regex-tester': RegexTester,
  'base64-tool': Base64Tool,
  'url-encoder': UrlEncoderDecoder,
  'uuid-generator': UuidGenerator,
  'password-generator': PasswordGenerator,
  'timestamp-converter': TimestampConverter,
  'word-counter': WordCounter,
  'html-formatter': HtmlFormatter,
  'tsx-to-jsx': TsxToJsxConverter
};

export default function ToolDetailPage({ toolId, onNavigate, favorites = [], onToggleFavorite }) {
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS[0];
  const ToolComponent = COMPONENT_MAP[tool.id] || JsonFormatter;
  const isFav = favorites.includes(tool.id);

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} — DevToolBox`,
        text: tool.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tool link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-200">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button onClick={() => onNavigate('tools')} className="hover:text-slate-200 capitalize">{tool.category}</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-indigo-400 font-medium truncate">{tool.name}</span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <IconHelper name={tool.icon} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {tool.name}
                {tool.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {tool.badge}
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{tool.tagline}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isFav 
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFav ? 'Starred' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-colors"
            title="Share tool"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Tool Main Body */}
      <div className="bg-[#111827]/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <ToolComponent />
      </div>

      {/* Tool Documentation & Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="md:col-span-2 space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-200">About {tool.name}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tool.description}
          </p>

          <div className="pt-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Key Features</h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {tool.features?.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy guarantee badge & Related tools */}
        <div className="space-y-4">
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Local Data Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
            </p>
          </div>

          {relatedTools.length > 0 && (
            <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-3">
              <div className="text-xs font-semibold text-slate-300">Related Tools</div>
              <div className="space-y-2">
                {relatedTools.map(r => (
                  <div
                    key={r.id}
                    onClick={() => onNavigate(`tool-${r.id}`)}
                    className="p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-indigo-500/30 cursor-pointer flex items-center gap-2.5 transition-colors"
                  >
                    <IconHelper name={r.icon} className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 truncate">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

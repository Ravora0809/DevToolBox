import React, { useState, useMemo } from 'react';
import { Play, Copy, Check, Info, Sparkles, BookOpen } from 'lucide-react';

const COMMON_PATTERNS = [
  { name: 'Email Address', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL / Web Link', pattern: 'https?:\\/\\/[\\w\\-\\.]+(\\:[0-9]+)?(\\/[^\\s]*)?', flags: 'g' },
  { name: 'IPv4 Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'UUID v4', pattern: '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}', flags: 'gi' },
  { name: 'Hex Color Code', pattern: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b', flags: 'g' },
  { name: 'HTML Tags', pattern: '<(\\/?[a-zA-Z0-9]+)(\\s+[^>]*)?>', flags: 'g' }
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testText, setTestText] = useState(`Hello team, please send inquiries to support@devtoolbox.internal or reach engineering directly at alex.smith@company.org before 5:00 PM.
You can also reach out to info@opensource.io for community queries.`);
  const [copied, setCopied] = useState(false);

  const activeFlagsString = Object.entries(flags)
    .filter(([_, active]) => active)
    .map(([flag]) => flag)
    .join('');

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern) return { matches: [], error: null, highlightedHtml: testText };
    try {
      const regex = new RegExp(pattern, activeFlagsString);
      const allMatches = [];
      let m;

      if (flags.g) {
        let lastIdx = -1;
        while ((m = regex.exec(testText)) !== null) {
          if (m.index === lastIdx) break; // Infinite loop safety
          lastIdx = m.index;
          allMatches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1)
          });
          if (allMatches.length > 500) break; // Cap max matches
        }
      } else {
        m = regex.exec(testText);
        if (m) {
          allMatches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1)
          });
        }
      }

      // Build highlight
      let highlighted = '';
      let cursor = 0;
      allMatches.forEach((matchItem, i) => {
        highlighted += escapeHtml(testText.slice(cursor, matchItem.index));
        highlighted += `<mark class="bg-indigo-500/40 text-indigo-100 px-1 rounded border border-indigo-400/50 font-semibold" title="Match #${i + 1}">${escapeHtml(matchItem.match)}</mark>`;
        cursor = matchItem.index + matchItem.match.length;
      });
      highlighted += escapeHtml(testText.slice(cursor));

      return { matches: allMatches, error: null, highlightedHtml: highlighted };
    } catch (err) {
      return { matches: [], error: err.message, highlightedHtml: testText };
    }
  }, [pattern, activeFlagsString, testText, flags.g]);

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const toggleFlag = (f) => {
    setFlags(prev => ({ ...prev, [f]: !prev[f] }));
  };

  return (
    <div className="space-y-4">
      {/* Pattern Input Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus-within:border-indigo-500">
            <span className="text-indigo-400 font-mono font-bold text-base mr-1.5">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regular expression pattern..."
              className="w-full bg-transparent font-mono text-sm focus:outline-none text-slate-100 placeholder-slate-600"
              spellCheck={false}
            />
            <span className="text-indigo-400 font-mono font-bold text-base ml-1.5">/{activeFlagsString}</span>
          </div>

          {/* Flags Toggles */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl shrink-0">
            {['g', 'i', 'm', 's'].map(flag => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-lg transition-colors ${
                  flags[flag] 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title={`Toggle flag: ${flag}`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          {COMMON_PATTERNS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPattern(p.pattern);
                setFlags({
                  g: p.flags.includes('g'),
                  i: p.flags.includes('i'),
                  m: p.flags.includes('m'),
                  s: p.flags.includes('s')
                });
              }}
              className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-950/60 hover:text-indigo-300 text-slate-300 border border-slate-700/60 text-[11px] transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">
          Regex Syntax Error: {error}
        </div>
      )}

      {/* Test String and Match View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Test Input */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Test Text Target</span>
            <span>{testText.length} characters</span>
          </div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter test string to evaluate..."
            className="w-full h-72 p-3.5 bg-transparent font-mono text-xs text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Live Match Highlights */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300">Live Match Highlight</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
          </div>
          <div 
            className="w-full h-72 p-3.5 bg-slate-950/30 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>

      {/* Captured Groups Table */}
      {matches.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300">
            Matched Items List ({matches.length})
          </div>
          <div className="max-h-56 overflow-y-auto divide-y divide-slate-800/60 font-mono text-xs">
            {matches.map((item, i) => (
              <div key={i} className="p-2.5 hover:bg-slate-800/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-indigo-400 font-bold w-6">#{i + 1}</span>
                  <span className="text-slate-100 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{item.match}</span>
                </div>
                <span className="text-slate-400 text-[11px]">Index: {item.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

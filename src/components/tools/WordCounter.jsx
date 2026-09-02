import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, FileText, Clock, Type } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState(`DevToolBox is a fast, offline-first suite of developer utilities designed to make daily engineering workflows seamless and private.

No telemetry, no tracking, and no cloud uploads — everything is calculated directly on your device.`);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: '0 sec',
        speakingTime: '0 sec',
        keywords: []
      };
    }

    const wordsArray = raw.match(/\b[a-zA-Z0-9_-]+\b/g) || [];
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s+/g, '').length;
    const sentences = (raw.match(/[^.!?]+[.!?]+/g) || []).length || 1;
    const paragraphs = raw.split(/\n+/).filter(p => p.trim().length > 0).length;

    // Reading time: avg 200 words per minute
    const readingMins = words / 200;
    const readingTime = readingMins < 1 ? `${Math.ceil(readingMins * 60)} sec` : `${Math.ceil(readingMins)} min`;

    // Speaking time: avg 130 words per minute
    const speakingMins = words / 130;
    const speakingTime = speakingMins < 1 ? `${Math.ceil(speakingMins * 60)} sec` : `${Math.ceil(speakingMins)} min`;

    // Keyword density
    const frequency = {};
    wordsArray.forEach(w => {
      const lower = w.toLowerCase();
      if (lower.length > 2) {
        frequency[lower] = (frequency[lower] || 0) + 1;
      }
    });

    const keywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / words) * 100).toFixed(1)
      }));

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      keywords
    };
  }, [text]);

  const transformCase = (type) => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Total Words</span>
          <span className="text-2xl font-mono font-bold text-indigo-400">{stats.words}</span>
        </div>

        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Characters</span>
          <span className="text-2xl font-mono font-bold text-slate-100">{stats.charsWithSpaces}</span>
          <span className="text-[10px] text-slate-500 block">({stats.charsWithoutSpaces} no spaces)</span>
        </div>

        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Sentences</span>
          <span className="text-2xl font-mono font-bold text-slate-100">{stats.sentences}</span>
          <span className="text-[10px] text-slate-500 block">({stats.paragraphs} paragraphs)</span>
        </div>

        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Reading Time</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">{stats.readingTime}</span>
          <span className="text-[10px] text-slate-500 block">Speaking: {stats.speakingTime}</span>
        </div>
      </div>

      {/* Case Transformer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 mr-1">Transforms:</span>
          <button onClick={() => transformCase('upper')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono">
            UPPERCASE
          </button>
          <button onClick={() => transformCase('lower')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono">
            lowercase
          </button>
          <button onClick={() => transformCase('title')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono">
            Title Case
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button onClick={() => setText('')} className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type content here for live word, character, and readability analysis..."
          className="w-full h-72 p-4 bg-transparent text-sm text-slate-100 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
        />
      </div>

      {/* Top Keywords Density */}
      {stats.keywords.length > 0 && (
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-xs font-semibold text-slate-300 mb-3">Top Keyword Frequencies</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {stats.keywords.map((kw, i) => (
              <div key={i} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <span className="font-mono text-slate-200 truncate">{kw.word}</span>
                <span className="font-mono text-indigo-400 ml-2">{kw.count}x ({kw.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

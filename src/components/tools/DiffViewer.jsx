import React, { useState, useMemo } from 'react';
import { diffLines, diffWords, diffChars } from 'diff';
import { GitCompare, Copy, Check, Trash2, ArrowLeftRight, FileCode, CheckCircle2, Split, AlignJustify } from 'lucide-react';

export default function DiffViewer() {
  const [originalText, setOriginalText] = useState(
`// Version 1.0.0
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`
  );

  const [modifiedText, setModifiedText] = useState(
`// Version 2.0.0
function calculateTotal(items, taxRate = 0.08) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * taxRate;
  return Number((subtotal + tax).toFixed(2));
}`
  );

  const [diffMode, setDiffMode] = useState('lines'); // 'lines', 'words', 'chars'
  const [viewType, setViewType] = useState('unified'); // 'unified', 'split'
  const [copied, setCopied] = useState(false);

  // Compute diff
  const diffResult = useMemo(() => {
    try {
      if (diffMode === 'words') {
        return diffWords(originalText, modifiedText);
      } else if (diffMode === 'chars') {
        return diffChars(originalText, modifiedText);
      } else {
        return diffLines(originalText, modifiedText);
      }
    } catch {
      return [];
    }
  }, [originalText, modifiedText, diffMode]);

  // Diff stats
  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    diffResult.forEach(part => {
      const count = part.count || (part.value.match(/\n/g)?.length || 1);
      if (part.added) added += count;
      else if (part.removed) removed += count;
      else unchanged += count;
    });
    return { added, removed, unchanged };
  }, [diffResult]);

  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const handleCopyUnified = () => {
    let patch = '';
    diffResult.forEach(part => {
      const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
      const lines = part.value.split('\n');
      lines.forEach((line, idx) => {
        if (idx === lines.length - 1 && !line) return;
        patch += `${prefix}${line}\n`;
      });
    });
    navigator.clipboard.writeText(patch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Diff Granularity */}
          <div className="inline-flex p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            {['lines', 'words', 'chars'].map((m) => (
              <button
                key={m}
                onClick={() => setDiffMode(m)}
                className={`px-3 py-1 font-semibold rounded capitalize transition-colors ${
                  diffMode === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleSwap}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition-colors"
            title="Swap Original and Modified"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Swap</span>
          </button>
        </div>

        {/* Diff statistics summary */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-bold">+{stats.added}</span>
            <span className="text-rose-400 font-bold">-{stats.removed}</span>
            <span className="text-slate-400">{stats.unchanged} unchanged</span>
          </div>

          <button
            onClick={handleCopyUnified}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Patch' : 'Copy Patch'}</span>
          </button>
        </div>
      </div>

      {/* Input Fields (Original vs Modified) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-rose-400 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5" />
              Original (Before)
            </span>
            <button
              onClick={() => setOriginalText('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear original text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows={8}
            placeholder="Paste original code or text here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-rose-500 resize-y"
          />
        </div>

        {/* Modified */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5" />
              Modified (After)
            </span>
            <button
              onClick={() => setModifiedText('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear modified text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            rows={8}
            placeholder="Paste modified code or text here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500 resize-y"
          />
        </div>
      </div>

      {/* Visual Diff Output */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-indigo-400" />
          <span>Unified Diff Result & Visual Comparison ({diffMode})</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
          {diffResult.length === 0 ? (
            <div className="text-slate-500 italic">No differences found between original and modified inputs.</div>
          ) : (
            diffResult.map((part, index) => {
              const bg = part.added
                ? 'bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-1 py-0.5'
                : part.removed
                ? 'bg-rose-950/40 text-rose-300 line-through opacity-80 border-l-2 border-rose-500 px-1 py-0.5'
                : 'text-slate-300';
              return (
                <span key={index} className={`whitespace-pre-wrap ${bg}`}>
                  {part.value}
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

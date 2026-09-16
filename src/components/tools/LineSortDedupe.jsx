import React, { useState, useMemo } from 'react';
import { ListFilter, Copy, Check, Trash2, Download, RefreshCw, ArrowDownAZ, ArrowUpAZ, Shuffle, ListOrdered } from 'lucide-react';

const SAMPLE_LINES =
`banana
apple
orange
apple
banana
grape
apple
Pineapple
mango
10 items
2 items
1 item`;

export default function LineSortDedupe() {
  const [inputText, setInputText] = useState(SAMPLE_LINES);
  const [sortOrder, setSortOrder] = useState('az'); // 'none', 'az', 'za', 'natural', 'length-asc', 'length-desc', 'shuffle', 'reverse'
  const [dedupeMode, setDedupeMode] = useState('unique-all'); // 'none', 'unique-all', 'only-duplicates', 'only-singles'
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [linePrefix, setLinePrefix] = useState('');
  const [lineSuffix, setLineSuffix] = useState('');
  const [addNumbers, setAddNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  // Core processing
  const { resultText, stats } = useMemo(() => {
    if (!inputText) {
      return { resultText: '', stats: { original: 0, output: 0, removed: 0 } };
    }

    let lines = inputText.split(/\r?\n/);
    const originalCount = lines.length;

    if (trimLines) {
      lines = lines.map(l => l.trim());
    }

    if (removeEmpty) {
      lines = lines.filter(l => l.length > 0);
    }

    // Deduplication logic
    if (dedupeMode !== 'none') {
      const counts = new Map();
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        counts.set(key, (counts.get(key) || 0) + 1);
      });

      if (dedupeMode === 'unique-all') {
        const seen = new Set();
        lines = lines.filter(line => {
          const key = caseSensitive ? line : line.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } else if (dedupeMode === 'only-duplicates') {
        const seen = new Set();
        lines = lines.filter(line => {
          const key = caseSensitive ? line : line.toLowerCase();
          if (counts.get(key) > 1 && !seen.has(key)) {
            seen.add(key);
            return true;
          }
          return false;
        });
      } else if (dedupeMode === 'only-singles') {
        lines = lines.filter(line => {
          const key = caseSensitive ? line : line.toLowerCase();
          return counts.get(key) === 1;
        });
      }
    }

    // Sorting logic
    if (sortOrder === 'az') {
      lines.sort((a, b) => caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase()));
    } else if (sortOrder === 'za') {
      lines.sort((a, b) => caseSensitive ? b.localeCompare(a) : b.toLowerCase().localeCompare(a.toLowerCase()));
    } else if (sortOrder === 'natural') {
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    } else if (sortOrder === 'length-asc') {
      lines.sort((a, b) => a.length - b.length || a.localeCompare(b));
    } else if (sortOrder === 'length-desc') {
      lines.sort((a, b) => b.length - a.length || a.localeCompare(b));
    } else if (sortOrder === 'reverse') {
      lines.reverse();
    } else if (sortOrder === 'shuffle') {
      lines = [...lines].sort(() => Math.random() - 0.5);
    }

    // Post processing (prefix, suffix, line numbers)
    lines = lines.map((l, idx) => {
      const num = addNumbers ? `${idx + 1}. ` : '';
      return `${num}${linePrefix}${l}${lineSuffix}`;
    });

    const outputCount = lines.length;
    const removedCount = Math.max(0, originalCount - outputCount);

    return {
      resultText: lines.join('\n'),
      stats: { original: originalCount, output: outputCount, removed: removedCount }
    };
  }, [
    inputText,
    sortOrder,
    dedupeMode,
    caseSensitive,
    trimLines,
    removeEmpty,
    linePrefix,
    lineSuffix,
    addNumbers
  ]);

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sorted-deduped.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-200"
            >
              <option value="none">None (Keep original)</option>
              <option value="az">A → Z Alphabetical</option>
              <option value="za">Z → A Reverse</option>
              <option value="natural">Natural (1, 2, 10)</option>
              <option value="length-asc">Length (Shortest first)</option>
              <option value="length-desc">Length (Longest first)</option>
              <option value="reverse">Invert order</option>
              <option value="shuffle">Random Shuffle</option>
            </select>
          </div>

          {/* Deduplication */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Deduplicate:</span>
            <select
              value={dedupeMode}
              onChange={(e) => setDedupeMode(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-200"
            >
              <option value="unique-all">Remove Duplicates (Keep 1)</option>
              <option value="only-duplicates">Only Duplicate Lines</option>
              <option value="only-singles">Only Unique Lines (Count = 1)</option>
              <option value="none">Keep All Duplicates</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-slate-300">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Case Sensitive</span>
          </label>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-400">{stats.original} in</span>
            <span className="text-indigo-400 font-bold">{stats.output} out</span>
            {stats.removed > 0 && <span className="text-rose-400">(-{stats.removed})</span>}
          </div>

          <button
            onClick={handleCopy}
            disabled={!resultText}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Formatting options bar */}
      <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded border-slate-700 bg-slate-950 text-indigo-500"
          />
          <span>Trim Whitespace</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded border-slate-700 bg-slate-950 text-indigo-500"
          />
          <span>Remove Empty Lines</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={addNumbers}
            onChange={(e) => setAddNumbers(e.target.checked)}
            className="rounded border-slate-700 bg-slate-950 text-indigo-500"
          />
          <span>Number Lines (1., 2.)</span>
        </label>

        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-slate-400">Prefix:</span>
          <input
            type="text"
            value={linePrefix}
            onChange={(e) => setLinePrefix(e.target.value)}
            placeholder='e.g. "- "'
            className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-white"
          />
          <span className="text-slate-400 ml-2">Suffix:</span>
          <input
            type="text"
            value={lineSuffix}
            onChange={(e) => setLineSuffix(e.target.value)}
            placeholder='e.g. ","'
            className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-white"
          />
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300">Raw Input Lines</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputText(SAMPLE_LINES)}
                className="text-indigo-400 hover:text-indigo-300 text-xs"
              >
                Sample
              </button>
              <button
                onClick={() => setInputText('')}
                className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={12}
            placeholder="Paste multiple lines of text or items here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-emerald-400">Sorted & Deduped Output</span>
            <button
              onClick={handleDownload}
              disabled={!resultText}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            readOnly
            value={resultText}
            rows={12}
            placeholder="Processed lines will appear here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-300 font-mono focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}

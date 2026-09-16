import React, { useState, useMemo } from 'react';
import { Clipboard, Copy, Check, Trash2, Download, ArrowRight, RefreshCw, Wand2, FileText, CheckCircle2 } from 'lucide-react';

export default function ClipboardFormatter() {
  const [inputText, setInputText] = useState(
    '   “DevToolBoox” is a fast, free suite of developer utilities.\n\n   It has   multiple    spaces,   smart quotes, and trailing gaps.   \n\n\n   <p>HTML tags</p> and **markdown** bold syntax!   '
  );
  const [copied, setCopied] = useState(false);

  // Formatting toggles
  const [stripTrailing, setStripTrailing] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [normalizeSpaces, setNormalizeSpaces] = useState(true);
  const [fixSmartQuotes, setFixSmartQuotes] = useState(true);
  const [stripHtml, setStripHtml] = useState(false);
  const [stripMarkdown, setStripMarkdown] = useState(false);
  const [joinLines, setJoinLines] = useState(false);
  const [joinSeparator, setJoinSeparator] = useState(' ');

  const formattedText = useMemo(() => {
    if (!inputText) return '';
    let res = inputText;

    // 1. Smart quotes replacement
    if (fixSmartQuotes) {
      res = res
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
        .replace(/[\u2013\u2014]/g, '-');
    }

    // 2. Strip HTML tags
    if (stripHtml) {
      res = res.replace(/<[^>]*>/g, '');
    }

    // 3. Strip Markdown basic formatting
    if (stripMarkdown) {
      res = res
        .replace(/#{1,6}\s?/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`{1,3}([^`]+)`{1,3}/g, '$1');
    }

    // 4. Line by line processing
    let lines = res.split(/\r?\n/);

    if (stripTrailing) {
      lines = lines.map(l => l.trimEnd());
    }

    if (normalizeSpaces) {
      lines = lines.map(l => l.replace(/[ \t]+/g, ' '));
    }

    if (removeEmptyLines) {
      lines = lines.filter(l => l.trim().length > 0);
    }

    if (joinLines) {
      return lines.join(joinSeparator);
    }

    return lines.join('\n');
  }, [
    inputText,
    stripTrailing,
    removeEmptyLines,
    normalizeSpaces,
    fixSmartQuotes,
    stripHtml,
    stripMarkdown,
    joinLines,
    joinSeparator
  ]);

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        setInputText(text);
      } else {
        alert('Clipboard access not supported or denied by browser. Please paste with Ctrl+V / Cmd+V.');
      }
    } catch {
      alert('Unable to read clipboard. Please paste manually into the text box.');
    }
  };

  const handleCopy = () => {
    if (!formattedText) return;
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clipboard-formatted.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePasteClipboard}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Clipboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Paste from Clipboard</span>
          </button>

          <button
            onClick={() => {
              setStripTrailing(true);
              setRemoveEmptyLines(true);
              setNormalizeSpaces(true);
              setFixSmartQuotes(true);
              setStripHtml(false);
              setStripMarkdown(false);
              setJoinLines(false);
            }}
            className="px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Rules</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!formattedText}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Formatted!' : 'Copy Formatted'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!formattedText}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            title="Download formatted text"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rules Checkboxes Grid */}
      <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Formatting Rules</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stripTrailing}
              onChange={(e) => setStripTrailing(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Trim Trailing Spaces</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Remove Empty Lines</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={normalizeSpaces}
              onChange={(e) => setNormalizeSpaces(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Collapse Multiple Spaces</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={fixSmartQuotes}
              onChange={(e) => setFixSmartQuotes(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Straighten Smart Quotes (“”)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Strip HTML Tags</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stripMarkdown}
              onChange={(e) => setStripMarkdown(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Strip Markdown Syntax</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={joinLines}
              onChange={(e) => setJoinLines(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Join into Single Line</span>
          </label>

          {joinLines && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Join With:</span>
              <input
                type="text"
                value={joinSeparator}
                onChange={(e) => setJoinSeparator(e.target.value)}
                className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Editor Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Raw Text Box */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Raw Clipboard Input
            </span>
            <div className="flex items-center gap-2 text-slate-400">
              <span>{inputText.length} chars · {inputText.split(/\r?\n/).length} lines</span>
              <button
                onClick={() => setInputText('')}
                className="p-1 hover:text-rose-400 transition-colors"
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
            placeholder="Paste unformatted clipboard text here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Cleaned Output Box */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Cleaned & Formatted Output
            </span>
            <div className="text-slate-400">
              <span>{formattedText.length} chars · {formattedText.split(/\r?\n/).length} lines</span>
            </div>
          </div>
          <textarea
            readOnly
            value={formattedText}
            rows={12}
            placeholder="Formatted text will appear here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-emerald-300 font-mono focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}

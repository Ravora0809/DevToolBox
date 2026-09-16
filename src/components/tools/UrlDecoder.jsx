import React, { useState, useMemo } from 'react';
import { Link, Copy, Check, Trash2, Download, RefreshCw, Layers, ExternalLink, FileText } from 'lucide-react';

const SAMPLE_URL = 'https%3A%2F%2Fapi.example.com%2Fsearch%3Fquery%3Ddeveloper%2Btools%26category%3Dconverters%26source%3Dweb%26tag%3Dreact%2520framework';

export default function UrlDecoder() {
  const [input, setInput] = useState(SAMPLE_URL);
  const [replacePlusWithSpace, setReplacePlusWithSpace] = useState(true);
  const [recursiveLevels, setRecursiveLevels] = useState(1);
  const [copied, setCopied] = useState(false);

  // Decode logic
  const decodedResult = useMemo(() => {
    if (!input.trim()) return '';
    let current = input;

    for (let i = 0; i < recursiveLevels; i++) {
      try {
        let step = current;
        if (replacePlusWithSpace) {
          step = step.replace(/\+/g, ' ');
        }
        step = decodeURIComponent(step);
        current = step;
      } catch {
        try {
          current = decodeURI(current);
        } catch {
          return 'Error: Malformed URL encoding in input string.';
        }
      }
    }
    return current;
  }, [input, replacePlusWithSpace, recursiveLevels]);

  // Query parameter extraction if it looks like a URL
  const queryParams = useMemo(() => {
    if (!decodedResult || decodedResult.startsWith('Error:')) return [];
    try {
      // If it contains '?' extract params
      const qIndex = decodedResult.indexOf('?');
      if (qIndex === -1) return [];
      const queryString = decodedResult.slice(qIndex + 1).split('#')[0];
      const params = new URLSearchParams(queryString);
      const list = [];
      params.forEach((value, key) => {
        list.push({ key, value });
      });
      return list;
    } catch {
      return [];
    }
  }, [decodedResult]);

  const handleCopy = () => {
    if (!decodedResult) return;
    navigator.clipboard.writeText(decodedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([decodedResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'decoded-url.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={replacePlusWithSpace}
              onChange={(e) => setReplacePlusWithSpace(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-500"
            />
            <span>Decode '+' as space</span>
          </label>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Decode Passes:</span>
            <select
              value={recursiveLevels}
              onChange={(e) => setRecursiveLevels(parseInt(e.target.value, 10))}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200"
            >
              <option value={1}>1x Standard</option>
              <option value={2}>2x Double Encoded</option>
              <option value={3}>3x Triple Encoded</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInput(SAMPLE_URL)}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
          >
            Load Sample
          </button>
        </div>
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-indigo-400" />
              Encoded URL or Query String
            </span>
            <button
              onClick={() => setInput('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Paste URL-encoded string or query parameter here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-emerald-400">Decoded Clean Output</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!decodedResult}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!decodedResult}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Download decoded text"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={decodedResult}
            rows={8}
            placeholder="Decoded output will appear here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-300 font-mono focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Query Parameters Table */}
      {queryParams.length > 0 && (
        <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>Extracted URL Parameters ({queryParams.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">Parameter Name</th>
                  <th className="py-2 px-3">Decoded Value</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {queryParams.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-indigo-400 font-semibold">{p.key}</td>
                    <td className="py-2 px-3 text-white break-all">{p.value}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => navigator.clipboard.writeText(p.value)}
                        className="text-slate-400 hover:text-white p-1"
                        title="Copy parameter value"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

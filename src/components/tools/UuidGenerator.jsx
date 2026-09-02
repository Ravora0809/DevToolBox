import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, KeyRound, Download, Layers } from 'lucide-react';

export default function UuidGenerator() {
  const [version, setVersion] = useState('v4');
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  const [quotes, setQuotes] = useState(false);
  const [uuids, setUuids] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateSingleUuid = () => {
    let id = '';
    if (crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hyphens) id = id.replace(/-/g, '');
    if (uppercase) id = id.toUpperCase();
    if (braces) id = `{${id}}`;
    if (quotes) id = `"${id}"`;
    return id;
  };

  const generateUuids = () => {
    const list = [];
    for (let i = 0; i < quantity; i++) {
      list.push(generateSingleUuid());
    }
    setUuids(list);
  };

  useEffect(() => {
    generateUuids();
  }, [quantity, uppercase, hyphens, braces, quotes]);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Settings Toolbar */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Count:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-indigo-400 px-2.5 py-1 rounded-lg text-xs font-mono focus:outline-none"
              >
                <option value={1}>1 UUID</option>
                <option value={5}>5 UUIDs</option>
                <option value={10}>10 UUIDs</option>
                <option value={25}>25 UUIDs</option>
                <option value={50}>50 UUIDs</option>
                <option value={100}>100 UUIDs</option>
              </select>
            </div>

            <button
              onClick={generateUuids}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New
            </button>
          </div>

          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'All Copied!' : 'Copy All'}</span>
          </button>
        </div>

        {/* Formatting Options */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800 text-xs text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Uppercase</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Include Hyphens</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={braces}
              onChange={(e) => setBraces(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Wrap in Braces {}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={quotes}
              onChange={(e) => setQuotes(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Wrap in Quotes ""</span>
          </label>
        </div>
      </div>

      {/* Generated UUIDs Output List */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
          <span>Generated UUID v4 List</span>
          <span>{uuids.length} generated</span>
        </div>
        <div className="p-3 max-h-96 overflow-y-auto space-y-2">
          {uuids.map((id, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-lg group"
            >
              <span className="font-mono text-xs text-slate-200 select-all">{id}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(id);
                }}
                className="p-1 text-slate-400 hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy this UUID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Copy, Check, ArrowLeftRight, Trash2, Link2 } from 'lucide-react';

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('https://example.com/search?q=developer tools&filter=json format&page=1#overview');
  const [output, setOutput] = useState('');
  const [componentMode, setComponentMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const processUrl = () => {
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        const res = componentMode ? encodeURIComponent(input) : encodeURI(input);
        setOutput(res);
      } else {
        const res = componentMode ? decodeURIComponent(input) : decodeURI(input);
        setOutput(res);
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex items-center">
            <button
              onClick={() => { setMode('encode'); setOutput(''); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Encode URL
            </button>
            <button
              onClick={() => { setMode('decode'); setOutput(''); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Decode URL
            </button>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-300 ml-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={componentMode}
              onChange={(e) => setComponentMode(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Full Component Mode (encodeURIComponent)</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={processUrl}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Process
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); }}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Input String</span>
            <span>{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste URL here..."
            className="w-full h-72 p-3.5 bg-transparent font-mono text-xs text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-300 font-medium">Output</span>
            <button
              onClick={() => {
                if (!output) return;
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              disabled={!output}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Processed output will appear here..."
            className="w-full h-72 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

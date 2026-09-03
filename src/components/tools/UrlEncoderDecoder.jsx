import React, { useState, useEffect } from 'react';
import { Copy, Check, ArrowLeftRight, Trash2, Sparkles } from 'lucide-react';

const SAMPLE_URL = 'https://api.example.com/v1/search?query=developer tools&category=web dev&sort=desc#results';

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState(SAMPLE_URL);
  const [output, setOutput] = useState('');
  const [componentMode, setComponentMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const processUrl = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setError(null);
      if (mode === 'encode') {
        const res = componentMode ? encodeURIComponent(input) : encodeURI(input);
        setOutput(res);
      } else {
        const res = componentMode ? decodeURIComponent(input) : decodeURI(input);
        setOutput(res);
      }
    } catch (err) {
      setError(err.message || 'Invalid URI sequence');
      setOutput('');
    }
  };

  useEffect(() => {
    processUrl();
  }, [mode, componentMode]);

  const loadExample = () => {
    if (mode === 'encode') {
      setInput(SAMPLE_URL);
    } else {
      setInput('https%3A%2F%2Fapi.example.com%2Fv1%2Fsearch%3Fquery%3Ddeveloper%20tools%26category%3Dweb%20dev%26sort%3Ddesc%23results');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex items-center">
            <button
              type="button"
              onClick={() => setMode('encode')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Encode URL
            </button>
            <button
              type="button"
              onClick={() => setMode('decode')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Decode URL
            </button>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={componentMode}
              onChange={(e) => setComponentMode(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Full Component Mode (encodeURIComponent)</span>
          </label>

          <button
            type="button"
            onClick={loadExample}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Example
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={processUrl}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Process
          </button>
          <button
            type="button"
            onClick={() => { setInput(''); setOutput(''); setError(null); }}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Clear all"
            aria-label="Clear inputs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-300">
          <strong>Processing Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between items-center">
            <label htmlFor="url-input-string" className="font-medium text-slate-300">Input URL / String</label>
            <span>{input.length} chars</span>
          </div>
          <textarea
            id="url-input-string"
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
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded flex items-center gap-1 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            aria-label="URL Output"
            placeholder="Processed output will appear here..."
            className="w-full h-72 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

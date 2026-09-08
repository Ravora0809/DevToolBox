import React, { useState } from 'react';
import { Copy, Check, Trash2, Download, Upload, RefreshCw, FileCode, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState(`{
  "name": "DevToolBoox",
  "version": "2.0.0",
  "features": [
    "JSON Formatter",
    "Regex Tester",
    "Base64 Converter",
    "Password Generator"
  ],
  "author": {
    "organization": "Developer Tools",
    "verified": true,
    "stars": 4200
  }
}`);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const formatJson = (spacing = indent) => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      setStats(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spacing === 'tab' ? '\t' : Number(spacing));
      setOutput(formatted);
      
      const originalBytes = new Blob([input]).size;
      const formattedBytes = new Blob([formatted]).size;
      setStats({
        keysCount: Object.keys(parsed).length,
        originalBytes,
        formattedBytes,
        savings: originalBytes > formattedBytes ? `${Math.round(((originalBytes - formattedBytes) / originalBytes) * 100)}% smaller` : null
      });
    } catch (err) {
      setError(err.message);
      setOutput('');
      setStats(null);
    }
  };

  const minifyJson = () => {
    setError(null);
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      const originalBytes = new Blob([input]).size;
      const minifiedBytes = new Blob([minified]).size;
      setStats({
        originalBytes,
        formattedBytes: minifiedBytes,
        savings: `${Math.round(((originalBytes - minifiedBytes) / originalBytes) * 100)}% smaller`
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target?.result || '');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {/* Control Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => formatJson(indent)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Format JSON
          </button>

          <button
            onClick={minifyJson}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            Minify (1 Line)
          </button>

          <button
            onClick={() => {
              setInput(`{
  "name": "DevToolBoox",
  "version": "2.0.0",
  "features": [
    "JSON Formatter",
    "Regex Tester",
    "Base64 Converter",
    "Password Generator"
  ],
  "author": {
    "organization": "DevToolBoox Team",
    "verified": true,
    "stars": 4200
  }
}`);
              setError(null);
            }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Example
          </button>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-xs">
            <label htmlFor="json-spacing-select" className="text-slate-400">Spacing:</label>
            <select
              id="json-spacing-select"
              value={indent}
              onChange={(e) => {
                const val = e.target.value;
                setIndent(val);
                formatJson(val);
              }}
              className="bg-transparent text-indigo-400 focus:outline-none cursor-pointer font-mono"
            >
              <option value="2" className="bg-slate-900 text-slate-200">2 Spaces</option>
              <option value="4" className="bg-slate-900 text-slate-200">4 Spaces</option>
              <option value="tab" className="bg-slate-900 text-slate-200">Tabs</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer border border-slate-700 transition-colors">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Upload .json</span>
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => { setInput(''); setOutput(''); setError(null); setStats(null); }}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error / Success Toast Banner */}
      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center gap-2.5 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Pane */}
        <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Raw Input JSON</span>
            <span className="font-mono text-[11px]">{input.length} characters</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted JSON here..."
            className="w-full h-96 p-3.5 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300">Formatted Result</span>
              {stats?.savings && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {stats.savings}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={!output}
                className="p-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded transition-colors"
                title="Download JSON"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here automatically..."
            className="w-full h-96 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed select-all"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

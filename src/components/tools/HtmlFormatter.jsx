import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Trash2, Code2, Eye, Sparkles, AlertCircle } from 'lucide-react';

const HTML_EXAMPLE = `<div class="card-container">
  <header class="header">
    <h1>DevToolBoox Formatter</h1>
    <p>Clean HTML code formatting in your browser</p>
  </header>
  <main>
    <section>
      <h2>Supported Utilities</h2>
      <ul>
        <li>JSON Formatter</li>
        <li>Regex Tester</li>
        <li>Base64 Encoder</li>
      </ul>
    </section>
  </main>
</div>`;

export default function HtmlFormatter() {
  const [input, setInput] = useState(HTML_EXAMPLE);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState('code'); // code | live
  const [error, setError] = useState(null);

  const formatHtml = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      let formatted = '';
      let indent = 0;
      const tab = '  ';

      // Clean multiple whitespaces between tags
      const clean = input.replace(/>\s*</g, '><').trim();
      const tokens = clean.split(/(<[^>]+>)/g).filter(Boolean);

      tokens.forEach(token => {
        if (token.startsWith('</')) {
          indent = Math.max(0, indent - 1);
          formatted += '\n' + tab.repeat(indent) + token;
        } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<?')) {
          const isVoid = /<(\s*(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr))\b/i.test(token);
          formatted += '\n' + tab.repeat(indent) + token;
          if (!isVoid) {
            indent += 1;
          }
        } else if (token.startsWith('<') && (token.endsWith('/>') || token.startsWith('<!'))) {
          formatted += '\n' + tab.repeat(indent) + token;
        } else {
          const text = token.trim();
          if (text) {
            formatted += '\n' + tab.repeat(indent) + text;
          }
        }
      });

      setOutput(formatted.trim());
    } catch (err) {
      setError(`Failed to format HTML: ${err.message}`);
    }
  };

  const minifyHtml = () => {
    setError(null);
    if (!input.trim()) return;
    try {
      const minified = input
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
      setOutput(minified);
    } catch (err) {
      setError(`Minification error: ${err.message}`);
    }
  };

  const handleCopy = () => {
    const textToCopy = output || input;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleLoadExample = () => {
    setInput(HTML_EXAMPLE);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatHtml}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Format HTML
          </button>
          <button
            onClick={minifyHtml}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            Minify HTML
          </button>

          <button
            onClick={handleLoadExample}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Example
          </button>

          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex items-center ml-1">
            <button
              onClick={() => setPreviewTab('code')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${previewTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Code View
            </button>
            <button
              onClick={() => setPreviewTab('live')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${previewTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Isolated Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!output && !input}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset and clear all"
            aria-label="Reset editor"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
            <label htmlFor="html-input" className="cursor-pointer">Raw HTML Markup</label>
            <span className="font-mono text-[11px]">{input.length} characters</span>
          </div>
          <textarea
            id="html-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw HTML markup here..."
            className="w-full h-80 p-3.5 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between items-center">
            <span>{previewTab === 'code' ? 'Formatted Output' : 'Sandboxed IFrame Preview'}</span>
            {previewTab === 'live' && (
              <span className="text-[10px] text-amber-400 font-mono">sandboxed</span>
            )}
          </div>
          {previewTab === 'code' ? (
            <textarea
              value={output}
              readOnly
              placeholder="Click 'Format HTML' to generate beautified markup..."
              className="w-full h-80 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed select-all"
              spellCheck={false}
            />
          ) : (
            <div className="w-full h-80 bg-white rounded-b-xl overflow-hidden">
              <iframe
                title="Sandboxed HTML Preview"
                srcDoc={output || input}
                sandbox=""
                className="w-full h-full border-0 bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

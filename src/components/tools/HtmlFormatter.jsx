import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Trash2, Code2, Eye } from 'lucide-react';

export default function HtmlFormatter() {
  const [input, setInput] = useState(`<div class="container"><header><h1>Welcome to DevToolBox</h1><p>Free developer utilities</p></header><main><section><h2>Feature List</h2><ul><li>JSON Formatter</li><li>Regex Tester</li></ul></section></main></div>`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState('code'); // code | live

  const formatHtml = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    let formatted = '';
    let indent = 0;
    const tab = '  ';

    // Basic HTML beautification algorithm
    const clean = input.replace(/>\s*</g, '><').trim();
    const tokens = clean.split(/(<[^>]+>)/g).filter(Boolean);

    tokens.forEach(token => {
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += '\n' + tab.repeat(indent) + token;
      } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<?')) {
        // Check if self-closing or void tag (img, input, br, hr, meta, link)
        const isVoid = /<(\s*(?:img|input|br|hr|meta|link|area|base|col|embed|param|source|track|wbr))\b/i.test(token);
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
  };

  const minifyHtml = () => {
    if (!input.trim()) return;
    const minified = input
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={formatHtml}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
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

          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex items-center ml-2">
            <button
              onClick={() => setPreviewTab('code')}
              className={`px-2.5 py-1 text-xs rounded ${previewTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Code Output
            </button>
            <button
              onClick={() => setPreviewTab('live')}
              className={`px-2.5 py-1 text-xs rounded ${previewTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Live Render
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!output) return;
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!output}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button onClick={() => { setInput(''); setOutput(''); }} className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
            Raw HTML Markup
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw HTML here..."
            className="w-full h-72 p-3.5 bg-transparent font-mono text-xs text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
            {previewTab === 'code' ? 'Formatted Output' : 'Live Browser Preview'}
          </div>
          {previewTab === 'code' ? (
            <textarea
              value={output}
              readOnly
              placeholder="Formatted HTML will appear here..."
              className="w-full h-72 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          ) : (
            <div className="w-full h-72 p-4 bg-white text-slate-900 overflow-y-auto rounded-b-xl">
              <div dangerouslySetInnerHTML={{ __html: output || input }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, Download, Upload, Shield, RefreshCw, FileText, Binary } from 'lucide-react';

export default function Base64Encoder() {
  const [input, setInput] = useState('DevToolBoox makes fast, secure, browser-native developer tools.');
  const [urlSafe, setUrlSafe] = useState(false);
  const [stripPadding, setStripPadding] = useState(false);
  const [lineWrap, setLineWrap] = useState('none'); // 'none', '64', '76'
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  const encodedResult = useMemo(() => {
    if (!input) return '';
    try {
      // Robust UTF-8 encoding support
      const utf8Bytes = new TextEncoder().encode(input);
      let binary = '';
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      let b64 = btoa(binary);

      if (urlSafe) {
        b64 = b64.replace(/\+/g, '-').replace(/\//g, '_');
      }

      if (stripPadding) {
        b64 = b64.replace(/=+$/, '');
      }

      if (lineWrap === '64') {
        b64 = b64.match(/.{1,64}/g)?.join('\n') || b64;
      } else if (lineWrap === '76') {
        b64 = b64.match(/.{1,76}/g)?.join('\n') || b64;
      }

      return b64;
    } catch {
      return 'Error: Failed to encode input into Base64.';
    }
  }, [input, urlSafe, stripPadding, lineWrap]);

  const inputBytes = useMemo(() => {
    try {
      return new TextEncoder().encode(input).length;
    } catch {
      return input.length;
    }
  }, [input]);

  const outputBytes = encodedResult.length;
  const ratio = inputBytes > 0 ? ((outputBytes / inputBytes) * 100).toFixed(1) : 0;

  const handleCopy = () => {
    if (!encodedResult) return;
    navigator.clipboard.writeText(encodedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([encodedResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? `${fileName}.base64.txt` : 'encoded.base64.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result;
      if (typeof content === 'string') {
        setInput(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-0 focus:ring-offset-0"
            />
            <span>URL-Safe (- and _)</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stripPadding}
              onChange={(e) => setStripPadding(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-0 focus:ring-offset-0"
            />
            <span>Strip Padding (=)</span>
          </label>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Line Wrap:</span>
            <select
              value={lineWrap}
              onChange={(e) => setLineWrap(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200"
            >
              <option value="none">None (Single line)</option>
              <option value="64">64 chars (PEM / RFC 2045)</option>
              <option value="76">76 chars (MIME / RFC 2045)</option>
            </select>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2">
          <label className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-medium">Input Size</div>
          <div className="text-base font-bold text-white mt-0.5">{inputBytes} bytes</div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-medium">Base64 Size</div>
          <div className="text-base font-bold text-indigo-400 mt-0.5">{outputBytes} bytes</div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-medium">Size Expansion</div>
          <div className="text-base font-bold text-amber-400 mt-0.5">{ratio}%</div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-medium">Charset Mode</div>
          <div className="text-base font-bold text-emerald-400 mt-0.5">UTF-8</div>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Raw Text to Encode
            </span>
            <button
              onClick={() => { setInput(''); setFileName(''); }}
              className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste plain text here..."
            rows={12}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-indigo-400" />
              Base64 Encoded Output
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!encodedResult}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!encodedResult}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
                title="Download encoded text"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={encodedResult}
            rows={12}
            placeholder="Base64 output will appear here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-indigo-300 font-mono focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}

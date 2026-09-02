import React, { useState } from 'react';
import { Copy, Check, Upload, Trash2, ArrowLeftRight, FileText, Image as ImageIcon } from 'lucide-react';

export default function Base64Tool() {
  const [mode, setMode] = useState('encode'); // encode | decode
  const [input, setInput] = useState('Hello, DevToolBox! Modern developer tools suite.');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [urlSafe, setUrlSafe] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const processText = () => {
    setError(null);
    setImagePreview(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        const finalVal = urlSafe ? encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : encoded;
        setOutput(finalVal);
      } else {
        let clean = input.trim();
        if (urlSafe || clean.includes('-') || clean.includes('_')) {
          clean = clean.replace(/-/g, '+').replace(/_/g, '/');
          while (clean.length % 4) clean += '=';
        }
        // Check if it's an image base64
        if (clean.startsWith('data:image/')) {
          setImagePreview(clean);
        }
        const decoded = decodeURIComponent(escape(atob(clean.replace(/^data:image\/[a-z]+;base64,/, ''))));
        setOutput(decoded);
      }
    } catch (err) {
      setError(`Failed to ${mode}: Invalid string encoding or characters.`);
      setOutput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        if (mode === 'encode') {
          setInput(`File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
          setOutput(result);
          if (file.type.startsWith('image/')) {
            setImagePreview(result);
          }
        } else {
          setInput(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex items-center">
            <button
              onClick={() => { setMode('encode'); setOutput(''); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Encode (Text → Base64)
            </button>
            <button
              onClick={() => { setMode('decode'); setOutput(''); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Decode (Base64 → Text)
            </button>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-300 ml-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>URL-Safe Base64</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={processText}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {mode === 'encode' ? 'Encode to Base64' : 'Decode Base64'}
          </button>

          <label className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer border border-slate-700 transition-colors">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Upload File</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => { setInput(''); setOutput(''); setError(null); setImagePreview(null); }}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Input / Output Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>{mode === 'encode' ? 'Plaintext / Raw Input' : 'Base64 Input'}</span>
            <span>{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Type or paste plaintext to encode...' : 'Paste Base64 string to decode...'}
            className="w-full h-72 p-3.5 bg-transparent font-mono text-xs text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-300 font-medium">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Plaintext'}
            </span>
            <button
              onClick={handleCopy}
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
            placeholder="Result will appear here..."
            className="w-full h-72 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {imagePreview && (
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <ImageIcon className="w-4 h-4 text-indigo-400" />
            <span>Image Preview from Base64 Data URI</span>
          </div>
          <div className="max-w-xs max-h-64 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-2">
            <img src={imagePreview} alt="Base64 preview" className="w-full h-auto object-contain rounded" />
          </div>
        </div>
      )}
    </div>
  );
}

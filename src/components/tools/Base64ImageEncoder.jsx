import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, Download, Trash2, Eye, FileCode, CheckCircle2 } from 'lucide-react';

export default function Base64ImageEncoder() {
  const [dataUri, setDataUri] = useState('');
  const [imageMeta, setImageMeta] = useState(null);
  const [outputType, setOutputType] = useState('data-uri'); // 'data-uri', 'raw', 'html', 'css', 'markdown'
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP, GIF, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const uri = e.target?.result;
      setDataUri(uri);

      // Extract image dimensions
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          name: file.name,
          type: file.type,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          b64Size: uri.length
        });
      };
      img.src = uri;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file);
        break;
      }
    }
  };

  const loadSampleImage = () => {
    // 64x64 SVG icon sample
    const svgSample = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%236366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
    setDataUri(svgSample);
    setImageMeta({
      name: 'code-sample.svg',
      type: 'image/svg+xml',
      size: 280,
      width: 64,
      height: 64,
      b64Size: svgSample.length
    });
  };

  const rawBase64 = dataUri.includes(',') ? dataUri.split(',')[1] : dataUri;

  const formattedOutput = () => {
    if (!dataUri) return '';
    switch (outputType) {
      case 'data-uri':
        return dataUri;
      case 'raw':
        return rawBase64;
      case 'html':
        return `<img src="${dataUri}" alt="${imageMeta?.name || 'Embedded Image'}" width="${imageMeta?.width || ''}" height="${imageMeta?.height || ''}" />`;
      case 'css':
        return `background-image: url("${dataUri}");`;
      case 'markdown':
        return `![${imageMeta?.name || 'Image'}](${dataUri})`;
      default:
        return dataUri;
    }
  };

  const handleCopy = () => {
    const text = formattedOutput();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = formattedOutput();
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${imageMeta?.name || 'image'}.base64.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6" onPaste={handlePaste}>
      {/* Upload & Dropzone Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Drag and drop your image here, or <span className="text-indigo-400 underline">browse files</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, SVG, WebP, GIF, ICO. You can also paste directly from your clipboard (Ctrl+V / Cmd+V).
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); loadSampleImage(); }}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
          >
            Load Sample SVG Icon
          </button>
        </div>
      </div>

      {dataUri && (
        <>
          {/* Metadata & Preview Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Image Preview thumbnail */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center min-h-[120px]">
              <img
                src={dataUri}
                alt="Preview"
                className="max-h-24 max-w-full object-contain rounded-lg border border-slate-700/50"
              />
              <span className="text-[11px] text-slate-400 mt-2 font-mono truncate max-w-full">{imageMeta?.name}</span>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Resolution</div>
              <div className="text-lg font-bold text-white mt-1">
                {imageMeta?.width} × {imageMeta?.height} <span className="text-xs font-normal text-slate-400">px</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{imageMeta?.type}</div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Original File Size</div>
              <div className="text-lg font-bold text-white mt-1">{formatBytes(imageMeta?.size)}</div>
              <div className="text-xs text-slate-500 mt-0.5">{imageMeta?.size?.toLocaleString()} bytes</div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Base64 Size (+33%)</div>
              <div className="text-lg font-bold text-indigo-400 mt-1">{formatBytes(imageMeta?.b64Size)}</div>
              <div className="text-xs text-slate-500 mt-0.5">{imageMeta?.b64Size?.toLocaleString()} characters</div>
            </div>
          </div>

          {/* Format Selector and Output View */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              {/* Output type tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {[
                  { id: 'data-uri', label: 'Data URI' },
                  { id: 'raw', label: 'Raw Base64' },
                  { id: 'html', label: 'HTML <img>' },
                  { id: 'css', label: 'CSS Background' },
                  { id: 'markdown', label: 'Markdown' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setOutputType(t.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      outputType === t.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Download as text file"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setDataUri(''); setImageMeta(null); }}
                  className="p-1.5 bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                  title="Clear image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={formattedOutput()}
              rows={8}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-300 font-mono focus:outline-none resize-y"
            />
          </div>
        </>
      )}
    </div>
  );
}

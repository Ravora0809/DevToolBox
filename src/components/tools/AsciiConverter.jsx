import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, ArrowLeftRight, Download, RefreshCw, Table, FileText, Info } from 'lucide-react';

export default function AsciiConverter() {
  const [mode, setMode] = useState('text-to-ascii'); // 'text-to-ascii' | 'ascii-to-text'
  const [format, setFormat] = useState('decimal'); // 'decimal', 'binary', 'hex', 'octal', 'html'
  const [delimiter, setDelimiter] = useState('space'); // 'space', 'comma', 'none', 'colon'
  const [inputText, setInputText] = useState('Hello DevToolBoox!');
  const [copied, setCopied] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  const getDelimiterChar = () => {
    switch (delimiter) {
      case 'space': return ' ';
      case 'comma': return ', ';
      case 'colon': return ':';
      case 'none': return '';
      default: return ' ';
    }
  };

  const outputResult = useMemo(() => {
    if (!inputText) return '';
    const delim = getDelimiterChar();

    if (mode === 'text-to-ascii') {
      const chars = Array.from(inputText);
      const converted = chars.map(c => {
        const code = c.charCodeAt(0);
        switch (format) {
          case 'decimal':
            return code.toString(10);
          case 'binary':
            return code.toString(2).padStart(8, '0');
          case 'hex':
            return code.toString(16).toUpperCase().padStart(2, '0');
          case 'octal':
            return code.toString(8).padStart(3, '0');
          case 'html':
            return `&#${code};`;
          default:
            return code.toString(10);
        }
      });
      return format === 'html' && delimiter === 'none' ? converted.join('') : converted.join(delim);
    } else {
      // ASCII to Text
      try {
        let tokens = [];
        if (format === 'html') {
          const matches = inputText.match(/&#(\d+);|&#x([0-9a-fA-F]+);/g);
          if (matches) {
            return matches.map(m => {
              if (m.startsWith('&#x')) {
                return String.fromCharCode(parseInt(m.replace(/&#x|;/g, ''), 16));
              }
              return String.fromCharCode(parseInt(m.replace(/&#|;/g, ''), 10));
            }).join('');
          }
        }

        if (delimiter === 'none') {
          if (format === 'binary') {
            tokens = inputText.match(/.{1,8}/g) || [];
          } else if (format === 'hex') {
            tokens = inputText.match(/.{1,2}/g) || [];
          } else {
            tokens = inputText.trim().split(/\s+/);
          }
        } else if (delimiter === 'comma') {
          tokens = inputText.split(',').map(s => s.trim()).filter(Boolean);
        } else if (delimiter === 'colon') {
          tokens = inputText.split(':').map(s => s.trim()).filter(Boolean);
        } else {
          tokens = inputText.trim().split(/\s+/);
        }

        const radix = format === 'binary' ? 2 : format === 'hex' ? 16 : format === 'octal' ? 8 : 10;
        return tokens.map(token => {
          const num = parseInt(token, radix);
          return isNaN(num) ? '' : String.fromCharCode(num);
        }).join('');
      } catch {
        return 'Error: Invalid ASCII sequence for selected format.';
      }
    }
  }, [inputText, mode, format, delimiter]);

  // Per-character breakdown for Text-to-ASCII
  const characterBreakdown = useMemo(() => {
    if (mode !== 'text-to-ascii' || !inputText) return [];
    return Array.from(inputText.slice(0, 32)).map((c, i) => ({
      index: i,
      char: c === ' ' ? '␣ (space)' : c === '\n' ? '↵ (newline)' : c,
      code: c.charCodeAt(0),
      hex: c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'),
      bin: c.charCodeAt(0).toString(2).padStart(8, '0'),
      oct: c.charCodeAt(0).toString(8).padStart(3, '0')
    }));
  }, [inputText, mode]);

  // Full 0-127 ASCII Reference Table
  const asciiTable = useMemo(() => {
    const rows = [];
    const controlDescriptions = {
      0: 'NUL (Null)', 1: 'SOH (Start of Header)', 2: 'STX (Start of Text)', 3: 'ETX (End of Text)',
      4: 'EOT (End of Trans)', 5: 'ENQ (Enquiry)', 6: 'ACK (Acknowledge)', 7: 'BEL (Bell)',
      8: 'BS (Backspace)', 9: 'HT (Horiz Tab)', 10: 'LF (Line Feed)', 11: 'VT (Vert Tab)',
      12: 'FF (Form Feed)', 13: 'CR (Carriage Return)', 27: 'ESC (Escape)', 32: 'Space', 127: 'DEL (Delete)'
    };

    for (let i = 0; i <= 127; i++) {
      const char = i <= 32 || i === 127 ? (controlDescriptions[i] || 'Control Char') : String.fromCharCode(i);
      rows.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, '0'),
        bin: i.toString(2).padStart(8, '0'),
        oct: i.toString(8).padStart(3, '0'),
        html: `&#${i};`,
        char
      });
    }

    if (!tableSearch) return rows;
    const q = tableSearch.toLowerCase();
    return rows.filter(r => 
      r.dec.toString().includes(q) || 
      r.hex.toLowerCase().includes(q) || 
      r.char.toLowerCase().includes(q) || 
      r.bin.includes(q)
    );
  }, [tableSearch]);

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-${mode}-${format}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSwap = () => {
    if (outputResult && !outputResult.startsWith('Error:')) {
      setInputText(outputResult);
      setMode(prev => prev === 'text-to-ascii' ? 'ascii-to-text' : 'text-to-ascii');
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switch */}
          <div className="inline-flex p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('text-to-ascii')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'text-to-ascii' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Text to ASCII
            </button>
            <button
              onClick={() => setMode('ascii-to-text')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === 'ascii-to-text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ASCII to Text
            </button>
          </div>

          <button
            onClick={handleSwap}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition-colors"
            title="Swap input and output"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Swap</span>
          </button>

          {/* Format Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-800">
            <span>Format:</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="decimal">Decimal (65 66 67)</option>
              <option value="binary">Binary (01000001)</option>
              <option value="hex">Hexadecimal (41 42 43)</option>
              <option value="octal">Octal (101 102 103)</option>
              <option value="html">HTML Entity (&#65;)</option>
            </select>
          </div>

          {/* Delimiter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-800">
            <span>Delimiter:</span>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="space">Space</option>
              <option value="comma">Comma (,)</option>
              <option value="colon">Colon (:)</option>
              <option value="none">None (compact)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors ${
              showTable ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>ASCII Table</span>
          </button>
        </div>
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Card */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              {mode === 'text-to-ascii' ? 'Input Plain Text' : `Input ASCII (${format.toUpperCase()})`}
            </span>
            <div className="flex items-center gap-2 text-slate-400">
              <span>{inputText.length} chars</span>
              <button
                onClick={() => setInputText('')}
                className="p-1 hover:text-rose-400 transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'text-to-ascii' ? 'Type or paste text to convert to ASCII...' : 'Paste ASCII numbers or codes (e.g. 72 101 108 108 111)...'}
            rows={10}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
          <div className="flex items-center gap-2 mt-2 pt-2 text-xs text-slate-400">
            <span>Presets:</span>
            <button
              onClick={() => setInputText('Hello World!')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
            >
              "Hello World!"
            </button>
            <button
              onClick={() => setInputText('The quick brown fox jumps over the lazy dog')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded truncate max-w-[150px]"
            >
              Pangram
            </button>
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300">
              {mode === 'text-to-ascii' ? `Converted ASCII (${format.toUpperCase()})` : 'Converted Text'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!outputResult}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!outputResult}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
                title="Download output"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={outputResult}
            rows={10}
            placeholder="Converted output will appear here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-indigo-300 font-mono focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Character Breakdown inspector when in text-to-ascii mode */}
      {mode === 'text-to-ascii' && characterBreakdown.length > 0 && (
        <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Character-by-Character ASCII Inspector (First {characterBreakdown.length} characters)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-1.5 px-2">Char</th>
                  <th className="py-1.5 px-2">Decimal</th>
                  <th className="py-1.5 px-2">Hexadecimal</th>
                  <th className="py-1.5 px-2">Binary</th>
                  <th className="py-1.5 px-2">Octal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {characterBreakdown.map((row) => (
                  <tr key={row.index} className="hover:bg-slate-800/40">
                    <td className="py-1 px-2 text-white font-bold">{row.char}</td>
                    <td className="py-1 px-2 text-indigo-300">{row.code}</td>
                    <td className="py-1 px-2 text-amber-300">0x{row.hex}</td>
                    <td className="py-1 px-2 text-emerald-300">{row.bin}</td>
                    <td className="py-1 px-2 text-cyan-300">{row.oct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full 0-127 ASCII Reference Table Modal/Drawer */}
      {showTable && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-700 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Standard ASCII Table (0 - 127)</h3>
            </div>
            <input
              type="text"
              placeholder="Search dec, hex, char..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200"
            />
          </div>
          <div className="max-h-64 overflow-y-auto border border-slate-800 rounded-lg">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-slate-950 sticky top-0 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-2">Dec</th>
                  <th className="p-2">Hex</th>
                  <th className="p-2">Oct</th>
                  <th className="p-2">Binary</th>
                  <th className="p-2">HTML</th>
                  <th className="p-2">Char</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {asciiTable.map(r => (
                  <tr key={r.dec} className="hover:bg-slate-800/40">
                    <td className="p-2 text-indigo-400">{r.dec}</td>
                    <td className="p-2 text-amber-300">{r.hex}</td>
                    <td className="p-2 text-cyan-300">{r.oct}</td>
                    <td className="p-2 text-emerald-300">{r.bin}</td>
                    <td className="p-2 text-slate-400">{r.html}</td>
                    <td className="p-2 text-white font-semibold">{r.char}</td>
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

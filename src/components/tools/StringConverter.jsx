import React, { useState, useMemo } from 'react';
import { Type, Copy, Check, Trash2, ArrowLeftRight, Sparkles, RefreshCw, FileText } from 'lucide-react';

const SAMPLE_TEXT = 'hello world from devToolBoox developer tools';

export default function StringConverter() {
  const [input, setInput] = useState(SAMPLE_TEXT);
  const [copiedKey, setCopiedKey] = useState('');

  // Tokenize input words safely
  const words = useMemo(() => {
    if (!input.trim()) return [];
    return input
      .trim()
      .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
      .replace(/[-_./\\]+/g, ' ') // split snake, kebab, dot, path
      .split(/\s+/)
      .filter(Boolean);
  }, [input]);

  const conversions = useMemo(() => {
    if (!input) {
      return [];
    }

    const lowerWords = words.map(w => w.toLowerCase());

    const camelCase = lowerWords
      .map((w, idx) => (idx === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join('');

    const pascalCase = lowerWords
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');

    const snakeCase = lowerWords.join('_');
    const constantCase = lowerWords.map(w => w.toUpperCase()).join('_');
    const kebabCase = lowerWords.join('-');
    const dotCase = lowerWords.join('.');
    const pathCase = lowerWords.join('/');

    const titleCase = lowerWords
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const sentenceCase = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    const alternatingCase = input
      .split('')
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join('');

    const reversed = input.split('').reverse().join('');

    // Rot13
    const rot13 = input.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });

    // Hex representation
    const hex = Array.from(new TextEncoder().encode(input))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(' ');

    return [
      { key: 'camelCase', label: 'camelCase', value: camelCase },
      { key: 'pascalCase', label: 'PascalCase', value: pascalCase },
      { key: 'snakeCase', label: 'snake_case', value: snakeCase },
      { key: 'constantCase', label: 'CONSTANT_CASE', value: constantCase },
      { key: 'kebabCase', label: 'kebab-case', value: kebabCase },
      { key: 'titleCase', label: 'Title Case', value: titleCase },
      { key: 'sentenceCase', label: 'Sentence case', value: sentenceCase },
      { key: 'dotCase', label: 'dot.case', value: dotCase },
      { key: 'pathCase', label: 'path/case', value: pathCase },
      { key: 'upperCase', label: 'UPPERCASE', value: input.toUpperCase() },
      { key: 'lowerCase', label: 'lowercase', value: input.toLowerCase() },
      { key: 'alternatingCase', label: 'aLtErNaTiNg cAsE', value: alternatingCase },
      { key: 'reversed', label: 'Reversed String', value: reversed },
      { key: 'rot13', label: 'ROT13 Cipher', value: rot13 },
      { key: 'hex', label: 'Hexadecimal Sequence', value: hex }
    ];
  }, [input, words]);

  const copyValue = (key, val) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Input Box */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-indigo-400" />
            Input String
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInput(SAMPLE_TEXT)}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Load Sample
            </button>
            <button
              onClick={() => setInput('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Type or paste any string to convert across all formats..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{words.length} words · {input.length} characters</span>
          <span className="text-slate-500">Click any card to copy result</span>
        </div>
      </div>

      {/* Output Formats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {conversions.map((item) => (
          <div
            key={item.key}
            onClick={() => copyValue(item.key, item.value)}
            className="bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-400 group-hover:text-slate-200 uppercase tracking-wider text-[10px]">
                {item.label}
              </span>
              <button
                type="button"
                className="p-1 text-slate-500 group-hover:text-indigo-400 transition-colors"
                title={`Copy ${item.label}`}
              >
                {copiedKey === item.key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="text-sm font-bold font-mono text-indigo-300 group-hover:text-white transition-colors truncate">
              {item.value || <span className="text-slate-600 italic">Empty</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, Key } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      chars = chars.replace(/[0O1lI|`'"~]/g, '');
    }

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  // Entropy & strength score
  const getStrength = () => {
    if (!password) return { label: 'Empty', color: 'text-slate-500', width: '0%', bg: 'bg-slate-700' };
    let poolSize = 0;
    if (uppercase) poolSize += 26;
    if (lowercase) poolSize += 26;
    if (numbers) poolSize += 10;
    if (symbols) poolSize += 30;
    const entropy = Math.round(length * Math.log2(poolSize || 1));

    if (entropy < 40) return { label: 'Weak', color: 'text-rose-400', width: '25%', bg: 'bg-rose-500', entropy };
    if (entropy < 60) return { label: 'Fair', color: 'text-amber-400', width: '50%', bg: 'bg-amber-500', entropy };
    if (entropy < 80) return { label: 'Strong', color: 'text-blue-400', width: '75%', bg: 'bg-blue-500', entropy };
    return { label: 'Very Strong', color: 'text-emerald-400', width: '100%', bg: 'bg-emerald-500', entropy };
  };

  const strength = getStrength();

  return (
    <div className="space-y-4">
      {/* Password Display Box */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="font-mono text-base text-slate-100 break-all select-all tracking-wider font-semibold">
            {password || 'Select character sets below'}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (!password) return;
                navigator.clipboard.writeText(password);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={generatePassword}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              title="Generate new password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Estimated Security:</span>
            <span className={`font-semibold ${strength.color}`}>
              {strength.label} {strength.entropy ? `(~${strength.entropy} bits entropy)` : ''}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className={`h-full ${strength.bg} transition-all duration-300`} style={{ width: strength.width }} />
          </div>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 text-xs">
        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span>Password Length:</span>
            <span className="font-mono text-sm text-indigo-400 font-bold">{length} characters</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Checkbox Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-slate-300">
          <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg cursor-pointer border border-slate-800/60 hover:border-slate-700">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Include Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg cursor-pointer border border-slate-800/60 hover:border-slate-700">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Include Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg cursor-pointer border border-slate-800/60 hover:border-slate-700">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg cursor-pointer border border-slate-800/60 hover:border-slate-700">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Include Symbols (!@#$%)</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg cursor-pointer border border-slate-800/60 hover:border-slate-700 sm:col-span-2">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Exclude Ambiguous Characters (0, O, 1, l, I, |)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Copy, Check, Wrench, Trash2, Sparkles, AlertCircle } from 'lucide-react';

const VALID_EXAMPLE = `{
  "projectName": "DevToolBoox",
  "version": "2.0.0",
  "clientSide": true,
  "config": {
    "theme": "dark",
    "supportedFormats": ["JSON", "HTML", "Base64", "Regex"]
  }
}`;

const INVALID_EXAMPLE = `{
  // Invalid comment in standard JSON
  'singleQuotes': 'disallowed in RFC 8259',
  "trailingComma": true,
}`;

export default function JsonValidator() {
  const [input, setInput] = useState(VALID_EXAMPLE);
  const [validationResult, setValidationResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [fixNotification, setFixNotification] = useState(null);

  const validateJson = () => {
    setFixNotification(null);
    if (!input.trim()) {
      setValidationResult(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setValidationResult({
        valid: true,
        message: 'JSON is strictly valid RFC 8259 format.',
        type: Array.isArray(parsed) ? 'Array' : typeof parsed,
        itemCount: Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length
      });
    } catch (err) {
      // Extract line and column if possible
      let errorLine = null;
      let errorCol = null;
      const match = err.message.match(/position (\d+)/i);
      if (match && match[1]) {
        const pos = parseInt(match[1], 10);
        const upToError = input.slice(0, pos);
        const lines = upToError.split('\n');
        errorLine = lines.length;
        errorCol = lines[lines.length - 1].length + 1;
      }

      setValidationResult({
        valid: false,
        message: err.message,
        line: errorLine,
        column: errorCol
      });
    }
  };

  const attemptFix = () => {
    setFixNotification(null);
    try {
      // Remove JS line comments and block comments
      let fixed = input.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      // Replace single quotes with double quotes
      fixed = fixed.replace(/'/g, '"');
      // Remove trailing commas before closing braces/brackets
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      
      JSON.parse(fixed);
      setInput(fixed);
      setValidationResult({
        valid: true,
        message: 'Successfully repaired single-quotes and trailing commas!',
        type: 'Object',
        itemCount: 1
      });
      setFixNotification({ success: true, text: 'Syntax auto-repaired successfully.' });
    } catch (err) {
      setFixNotification({
        success: false,
        text: `Unable to fully auto-repair: ${err.message}. Please inspect the line indicated.`
      });
    }
  };

  const handleReset = () => {
    setInput('');
    setValidationResult(null);
    setFixNotification(null);
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={validateJson}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Validate Syntax
          </button>
          
          <button
            onClick={attemptFix}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            Auto-Fix Commas/Quotes
          </button>

          <button
            onClick={() => { setInput(VALID_EXAMPLE); setValidationResult(null); setFixNotification(null); }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Valid Sample
          </button>

          <button
            onClick={() => { setInput(INVALID_EXAMPLE); setValidationResult(null); setFixNotification(null); }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Broken Sample
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!input}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset and clear editor"
            aria-label="Clear JSON"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {fixNotification && (
        <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
          fixNotification.success
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{fixNotification.text}</span>
        </div>
      )}

      {/* Validation Status Indicator */}
      {validationResult && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          validationResult.valid 
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
        }`}>
          {validationResult.valid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-semibold text-sm">
              {validationResult.valid ? 'Valid JSON Document' : 'Syntax Error Detected'}
            </h4>
            <p className="text-xs font-mono mt-1 opacity-90">{validationResult.message}</p>
            {validationResult.line && (
              <p className="text-xs text-rose-400 mt-1 font-semibold">
                Error around Line {validationResult.line}, Column {validationResult.column}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Code Editor */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
        <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
          <label htmlFor="json-validator-input" className="cursor-pointer">JSON Source Text</label>
          <span className="font-mono text-[11px]">{input.split('\n').length} lines • {input.length} chars</span>
        </div>
        <textarea
          id="json-validator-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setValidationResult(null); setFixNotification(null); }}
          placeholder="Paste JSON string here to validate against RFC 8259 syntax..."
          className="w-full h-80 p-4 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

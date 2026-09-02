import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Copy, Check, Wrench } from 'lucide-react';

export default function JsonValidator() {
  const [input, setInput] = useState(`{
  "project": "DevToolBox",
  "valid": true,
  "metrics": {
    "speed": "instant",
    "privacy": 100
  }
}`);
  const [validationResult, setValidationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const validateJson = () => {
    if (!input.trim()) {
      setValidationResult(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setValidationResult({
        valid: true,
        message: 'JSON is strictly valid RFC 8259 format!',
        type: typeof parsed,
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
    try {
      // Replace single quotes with double quotes
      let fixed = input.replace(/'/g, '"');
      // Remove trailing commas before closing braces/brackets
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      JSON.parse(fixed);
      setInput(fixed);
      validateJson();
    } catch (err) {
      alert("Could not automatically repair all syntax errors. Please inspect the line indicated.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={validateJson}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Validate JSON Syntax
          </button>
          
          <button
            onClick={attemptFix}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            Quick Fix Common Errors
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

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
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
          <span>JSON Source Text</span>
          <span>{input.split('\n').length} lines</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setValidationResult(null); }}
          placeholder="Paste JSON string to validate..."
          className="w-full h-80 p-4 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

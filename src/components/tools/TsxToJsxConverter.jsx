import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2, ArrowLeftRight, Sparkles, RotateCcw } from 'lucide-react';

const SAMPLE_TSX = `import React, { useState } from 'react';

interface UserCardProps {
  name: string;
  role: 'admin' | 'developer' | 'designer';
  age?: number;
  onUpdate: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ name, role, age, onUpdate }: UserCardProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(true);

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onUpdate('user-123');
  };

  return (
    <div className="card">
      <h3>{name}</h3>
      <span>{role}</span>
    </div>
  );
};`;

export default function TsxToJsxConverter() {
  const [input, setInput] = useState(SAMPLE_TSX);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const stripTypes = (sourceCode = input) => {
    if (!sourceCode.trim()) {
      setOutput('');
      return;
    }

    let code = sourceCode;

    // Remove interface and type declarations
    code = code.replace(/export\s+interface\s+\w+(\s*<[^>]*>)?\s*\{[\s\S]*?\}\n?/g, '');
    code = code.replace(/interface\s+\w+(\s*<[^>]*>)?\s*\{[\s\S]*?\}\n?/g, '');
    code = code.replace(/export\s+type\s+\w+(\s*<[^>]*>)?\s*=[\s\S]*?;\n?/g, '');
    code = code.replace(/type\s+\w+(\s*<[^>]*>)?\s*=[\s\S]*?;\n?/g, '');

    // Remove React.FC<Props>
    code = code.replace(/:\s*React\.FC<[^>]+>/g, '');
    code = code.replace(/:\s*FC<[^>]+>/g, '');

    // Remove return type annotations on arrow functions and regular functions
    code = code.replace(/\):\s*[A-Z][a-zA-Z0-9.<>[\]|\s&]*\s*=>/g, ') =>');
    code = code.replace(/\):\s*void\s*=>/g, ') =>');
    code = code.replace(/\):\s*boolean\s*=>/g, ') =>');
    code = code.replace(/\):\s*string\s*=>/g, ') =>');
    code = code.replace(/\):\s*number\s*=>/g, ') =>');

    // Remove useState<Type>
    code = code.replace(/useState<[^>]+>/g, 'useState');
    code = code.replace(/useRef<[^>]+>/g, 'useRef');

    // Remove inline parameter type annotations e.g., (e: React.MouseEvent<...>) or (name: string, age?: number)
    code = code.replace(/:\s*(?:React\.)?[A-Za-z0-9_]+(?:<[^>]+>)?(?=[,\)])/g, '');
    code = code.replace(/:\s*(?:string|number|boolean|any|unknown|void|object|Function)\b/g, '');
    code = code.replace(/\?\s*:/g, ':');

    // Remove trailing blank lines
    code = code.replace(/\n\s*\n\s*\n/g, '\n\n').trim();

    setOutput(code);
  };

  useEffect(() => {
    stripTypes(input);
  }, []);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput(SAMPLE_TSX);
    stripTypes(SAMPLE_TSX);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => stripTypes()}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Convert TSX to JSX
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Reset Example
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSX'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setInput(''); setOutput(''); }}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Clear all"
            aria-label="Clear all inputs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
            <label htmlFor="tsx-input-code" className="font-medium text-slate-300">Input TypeScript / TSX Code</label>
          </div>
          <textarea
            id="tsx-input-code"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              stripTypes(e.target.value);
            }}
            placeholder="Paste TypeScript TSX code here..."
            className="w-full h-80 p-3.5 bg-transparent font-mono text-xs text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Standard React JSX Output</span>
          </div>
          <textarea
            value={output}
            readOnly
            aria-label="Clean JSX Output"
            placeholder="Clean JSX code will appear here..."
            className="w-full h-80 p-3.5 bg-slate-950/30 font-mono text-xs text-emerald-400 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

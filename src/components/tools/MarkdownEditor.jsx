import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Link,
  Quote,
  Table,
  Copy,
  Check,
  Download,
  Trash2,
  Eye,
  Columns,
  Sparkles,
  FileText
} from 'lucide-react';

const SAMPLE_MARKDOWN = `# DevToolBoox Markdown Editor

Welcome to the **live markdown editor**! Write markdown on the left and see rich instant preview on the right.

## Features at a glance
- **Fast & Responsive**: Real-time rendering as you type
- **Export Ready**: Download as \`.md\` or copy clean formatted HTML
- **Standard Syntax**: Tables, code blocks, task lists, and quotes

### Sample Code Block
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to DevToolBoox.\`;
}
console.log(greet("Developer"));
\`\`\`

### Data Table
| Tool Name | Category | Status |
| :--- | :--- | :--- |
| ASCII Converter | Converters | Ready |
| QR Code Generator | Generators | Ready |
| Markdown Editor | Text & Web | Active |

> Craftsmanship means executing with clean typography and zero unsolicited clutter.
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'editor', 'preview'
  const [copied, setCopied] = useState(false);

  // Quick toolbar insertion helper
  const insertText = (before, after = '') => {
    const textarea = document.getElementById('markdown-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);
    const replacement = `${before}${selected || 'text'}${after}`;

    const updated = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4));
    }, 10);
  };

  const words = useMemo(() => {
    const trimmed = markdown.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [markdown]);

  const readTime = Math.max(1, Math.ceil(words / 200));

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
        {/* Formatting buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertText('**', '**')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Bold (**text**)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('*', '*')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Italic (*text*)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('# ')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Heading 1 (# )"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('## ')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Heading 2 (## )"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-slate-800 mx-1" />
          <button
            onClick={() => insertText('- ')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Bullet List (- )"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('1. ')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Numbered List (1. )"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('> ')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Quote (> )"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('`', '`')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Inline Code (`code`)"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('[', '](url)')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Link [text](url)"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertText('\n| Column 1 | Column 2 |\n| :--- | :--- |\n| Data 1 | Data 2 |\n')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Table"
          >
            <Table className="w-4 h-4" />
          </button>
        </div>

        {/* View mode & actions */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 font-semibold rounded flex items-center gap-1 transition-colors ${
                viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`px-2.5 py-1 font-semibold rounded flex items-center gap-1 transition-colors ${
                viewMode === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 font-semibold rounded flex items-center gap-1 transition-colors ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadMd}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            title="Download .md file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Grid */}
      <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor Pane */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col min-h-[460px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Markdown Source</span>
              <span>{words} words · {markdown.length} chars</span>
            </div>
            <textarea
              id="markdown-textarea"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-none min-h-[420px]"
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col min-h-[460px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Live Preview
              </span>
              <span>~{readTime} min read</span>
            </div>
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-5 overflow-y-auto min-h-[420px] prose prose-invert prose-indigo max-w-none text-slate-200">
              <div className="markdown-body">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

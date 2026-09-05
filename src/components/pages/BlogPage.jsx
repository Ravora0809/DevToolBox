import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Wrench,
  UserCheck
} from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import { TOOLS } from '../../data/tools';
import IconHelper from '../common/IconHelper';

function CopyCodeButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded flex items-center gap-1 transition-colors border border-slate-700"
      title="Copy code"
      aria-label="Copy code to clipboard"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export default function BlogPage({ onNavigate, initialSlug }) {
  const [selectedPost, setSelectedPost] = useState(() => {
    if (initialSlug) {
      return BLOG_POSTS.find(p => p.slug === initialSlug || p.id === initialSlug) || null;
    }
    return null;
  });
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (initialSlug) {
      const match = BLOG_POSTS.find(p => p.slug === initialSlug || p.id === initialSlug);
      if (match) {
        setSelectedPost(match);
      }
    }
  }, [initialSlug]);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    if (onNavigate) {
      onNavigate(`blog-${post.slug}`);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    if (onNavigate) {
      onNavigate('blog');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard && selectedPost) {
      const url = `${window.location.origin}/#blog-${selectedPost.slug}`;
      navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Single Article View
  if (selectedPost) {
    const relatedTools = (selectedPost.relatedToolIds || [])
      .map(id => TOOLS.find(t => t.id === id))
      .filter(Boolean);

    const otherArticles = BLOG_POSTS.filter(p => p.id !== selectedPost.id).slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation bar */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </button>

          <button
            onClick={handleShare}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-800 transition-colors"
            title="Share article link"
          >
            {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{shareCopied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>

        {/* Article Meta Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {selectedPost.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedPost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {selectedPost.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedPost.author || 'DevToolBox Team'}
              </div>
              <div className="text-[11px] text-slate-400">
                {selectedPost.authorRole || 'Engineering Architecture & Tooling'}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 font-medium leading-relaxed border-l-2 border-indigo-500 pl-4 italic bg-slate-950/40 py-2 rounded-r-lg">
            {selectedPost.summary}
          </p>
        </div>

        {/* Rendered Markdown Body */}
        <article className="border-t border-slate-800 pt-6">
          <div className="markdown-body space-y-5 text-slate-300 text-sm leading-relaxed">
            <Markdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3 pb-2 border-b border-slate-800/80">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold text-slate-100 tracking-tight mt-6 mb-2">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mt-4 mb-2 font-mono">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed text-slate-300 mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 my-4 text-slate-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1.5 pl-2 my-4 text-slate-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indigo-500 bg-slate-900/40 p-4 rounded-r-xl my-4 text-slate-300 italic">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 border border-slate-800 rounded-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-900/90 text-slate-200 border-b border-slate-800 font-semibold">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-slate-900/30 transition-colors">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="p-3 font-semibold text-slate-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-3 font-mono text-xs">
                    {children}
                  </td>
                ),
                hr: () => (
                  <hr className="border-slate-800 my-8" />
                ),
                a: ({ href, children }) => {
                  const isInternal = href && (href.startsWith('/#') || href.startsWith('#'));
                  if (isInternal && onNavigate) {
                    const route = href.replace(/^\/?#/, '');
                    return (
                      <button
                        onClick={() => onNavigate(route)}
                        className="text-indigo-400 hover:text-indigo-300 underline font-medium inline text-left cursor-pointer"
                      >
                        {children}
                      </button>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 underline font-medium inline-flex items-center gap-1"
                    >
                      <span>{children}</span>
                      <ExternalLink className="w-3 h-3 inline opacity-70" />
                    </a>
                  );
                },
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');

                  if (!inline && (match || codeString.includes('\n'))) {
                    return (
                      <div className="relative group my-5 rounded-xl border border-slate-800 bg-[#080c14] overflow-hidden">
                        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                          <span className="uppercase tracking-wider font-semibold text-indigo-300">
                            {match ? match[1] : 'code'}
                          </span>
                          <CopyCodeButton text={codeString} />
                        </div>
                        <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400/90 leading-relaxed selection:bg-indigo-500/30">
                          <code>{codeString}</code>
                        </pre>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 font-medium"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
              }}
            >
              {selectedPost.content}
            </Markdown>
          </div>
        </article>

        {/* Associated Interactive Tools */}
        {relatedTools.length > 0 && (
          <div className="border-t border-slate-800 pt-8 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-400" />
              <span>Related DevToolBox Utilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTools.map(t => (
                <div
                  key={t.id}
                  onClick={() => onNavigate && onNavigate(`tool-${t.id}`)}
                  className="p-3.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-indigo-400">
                      <IconHelper name={t.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">
                        {t.tagline}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Recommended Articles */}
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>More Articles & Guides</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.map(post => (
              <div
                key={post.id}
                onClick={() => handleSelectPost(post)}
                className="p-4 bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/40 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider mb-1.5">
                    {post.category}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{post.readTime}</span>
                  <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">Read →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Articles Directory List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="max-w-3xl space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Developer Articles & Guides
        </h1>
        <p className="text-slate-400 text-sm">
          Practical technical deep-dives into JSON data interchange, safe regular expressions, Base64 serialization, Unix time handling, and TypeScript compilers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map(post => (
          <div
            key={post.id}
            onClick={() => handleSelectPost(post)}
            className="bg-[#111827]/70 hover:bg-[#151e32] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all group shadow-sm hover:shadow-indigo-500/5"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>

              <h2 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] font-mono">{post.date}</span>
              <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Guide <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

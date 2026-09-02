import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ChevronRight, ArrowLeft, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';

export default function BlogPage({ onNavigate }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
              {selectedPost.category}
            </span>
            <span>{selectedPost.date}</span>
            <span>•</span>
            <span>{selectedPost.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {selectedPost.title}
          </h1>

          <p className="text-sm text-slate-400 font-medium leading-relaxed border-l-2 border-indigo-500 pl-4 italic">
            {selectedPost.summary}
          </p>
        </div>

        <div className="prose prose-invert prose-indigo max-w-none pt-6 border-t border-slate-800 text-slate-300 text-sm leading-relaxed space-y-4">
          {selectedPost.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-lg font-bold text-white pt-4">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('#### ')) {
              return <h4 key={idx} className="text-base font-semibold text-indigo-300 pt-2">{paragraph.replace('#### ', '')}</h4>;
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ');
              return (
                <ul key={idx} className="list-disc list-inside space-y-1 pl-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ')) {
              const items = paragraph.split(/\n\d+\.\s+/);
              return (
                <ol key={idx} className="list-decimal list-inside space-y-1 pl-2">
                  {items.filter(Boolean).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="max-w-3xl space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Developer Articles & Guides
        </h1>
        <p className="text-slate-400 text-sm">
          Technical deep-dives into modern web development, algorithms, data encoding, and productivity tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-[#111827]/70 hover:bg-[#151e32] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
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
              <span>{post.date}</span>
              <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

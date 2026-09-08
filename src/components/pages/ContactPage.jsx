import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, HelpCircle, ArrowLeft } from 'lucide-react';

export default function ContactPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'tool_request',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {onNavigate && (
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      )}

      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Contact & Tool Feedback
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Have an idea for a new developer utility, found a bug in a formatter, or have general feedback? Get in touch with our team below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Contact info & tips */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Mail className="w-4 h-4" />
              <span>Direct Inquiries</span>
            </div>
            <p className="text-slate-400">
              You can also reach out directly to the DevToolBoox team for engineering or tooling suggestions:
            </p>
            <a
              href="mailto:contact@devtoolboox.io"
              className="text-indigo-300 hover:underline font-mono text-[11px] block break-all pt-1"
            >
              contact@devtoolboox.io
            </a>
          </div>

          <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <HelpCircle className="w-4 h-4" />
              <span>Response Time</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We review tool requests and community bug reports regularly. Submissions with reproducible test cases or RFC references are given highest priority.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Feedback Received</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>! Your message has been logged for review.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', type: 'tool_request', message: '' });
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors inline-block"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-slate-300 font-medium block">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Chen"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs focus-visible:ring-1 focus-visible:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-slate-300 font-medium block">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs focus-visible:ring-1 focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-type" className="text-slate-300 font-medium block">
                  Inquiry Topic
                </label>
                <select
                  id="contact-type"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-xs focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer"
                >
                  <option value="tool_request">Request a New Developer Tool</option>
                  <option value="bug_report">Report a Bug / Inaccuracy</option>
                  <option value="feature_improvement">Suggest an Improvement</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-slate-300 font-medium block">
                  Message Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the tool, feature, or edge-case you are dealing with (include sample inputs or expected outputs if applicable)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs resize-none focus-visible:ring-1 focus-visible:ring-indigo-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-indigo-600/20 focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

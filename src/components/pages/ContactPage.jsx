import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Sparkles, Bug } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'tool_request',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Request a Tool or Send Feedback
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Need a specific encoder, converter, or formatting feature? Let us know and we'll build it.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-center space-y-3 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Thank you for your feedback!</h3>
          <p className="text-xs text-slate-400">
            We review community tool suggestions weekly.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', type: 'tool_request', message: '' }); }}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg mt-2 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Developer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Inquiry Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
            >
              <option value="tool_request">Request New Developer Utility</option>
              <option value="bug_report">Report Bug or Formatting Issue</option>
              <option value="feature_improvement">Improve Existing Tool</option>
              <option value="general">General Inquiries & Sponsorship</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Message & Specifications</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe the tool you need or the issue you encountered..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Request</span>
          </button>
        </form>
      )}
    </div>
  );
}

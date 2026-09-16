import React, { useState, useMemo } from 'react';
import { Link, Globe, Copy, Check, Trash2, Plus, ExternalLink, RefreshCw, Layers } from 'lucide-react';

const SAMPLE_URL = 'https://developer:secretPass@api.devtoolboox.dev:8443/v1/tools/search?category=converters&sort=popular&limit=25&active=true#section-results';

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState(SAMPLE_URL);
  const [copiedField, setCopiedField] = useState('');

  // Editable parameters state
  const [parsed, setParsed] = useState(() => parseUrlSafe(SAMPLE_URL));

  function parseUrlSafe(input) {
    try {
      const u = new URL(input);
      const paramsList = [];
      u.searchParams.forEach((val, key) => {
        paramsList.push({ id: Math.random().toString(36).substr(2, 9), key, val });
      });

      const pathSegments = u.pathname.split('/').filter(Boolean);

      return {
        valid: true,
        protocol: u.protocol,
        origin: u.origin,
        host: u.host,
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? '443 (default)' : u.protocol === 'http:' ? '80 (default)' : ''),
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        username: u.username,
        password: u.password,
        params: paramsList,
        pathSegments
      };
    } catch {
      return { valid: false, error: 'Invalid URL format. Please provide a valid URL including scheme (e.g. https://...)' };
    }
  }

  const handleUrlInputChange = (val) => {
    setUrlInput(val);
    setParsed(parseUrlSafe(val));
  };

  const copyText = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Input URL Card */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-400" />
            Enter Full URL to Parse
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUrlInputChange(SAMPLE_URL)}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Load Sample URL
            </button>
            <button
              onClick={() => handleUrlInputChange('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <input
          type="text"
          value={urlInput}
          onChange={(e) => handleUrlInputChange(e.target.value)}
          placeholder="https://example.com/path?key=value#hash"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
        />

        {!parsed.valid && urlInput.trim() && (
          <div className="text-xs text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-lg p-2.5">
            {parsed.error}
          </div>
        )}
      </div>

      {parsed.valid && (
        <>
          {/* Core Components Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: 'protocol', label: 'Protocol', val: parsed.protocol },
              { key: 'hostname', label: 'Hostname', val: parsed.hostname },
              { key: 'port', label: 'Port', val: parsed.port },
              { key: 'origin', label: 'Origin', val: parsed.origin },
              { key: 'pathname', label: 'Pathname', val: parsed.pathname },
              { key: 'hash', label: 'Hash / Anchor', val: parsed.hash || '(none)' },
              { key: 'username', label: 'Username', val: parsed.username || '(none)' },
              { key: 'password', label: 'Password', val: parsed.password || '(none)' }
            ].map((item) => (
              <div
                key={item.key}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between group hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">{item.label}</span>
                  <button
                    onClick={() => copyText(item.key, item.val)}
                    className="p-1 hover:text-white text-slate-500 transition-colors"
                    title={`Copy ${item.label}`}
                  >
                    {copiedField === item.key ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="text-sm font-bold font-mono text-indigo-300 truncate">
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          {/* Path Segments Visualizer */}
          {parsed.pathSegments.length > 0 && (
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Path Segments
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  /
                </span>
                {parsed.pathSegments.map((seg, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-500/30">
                      {seg}
                    </span>
                    {idx < parsed.pathSegments.length - 1 && (
                      <span className="text-slate-600">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Query Parameters Table */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Query Parameters ({parsed.params.length})
              </span>
              <button
                onClick={() => copyText('search', parsed.search)}
                disabled={!parsed.search}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 rounded text-xs flex items-center gap-1"
              >
                {copiedField === 'search' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Query String</span>
              </button>
            </div>

            {parsed.params.length === 0 ? (
              <div className="text-xs text-slate-500 italic py-2">
                No query parameters found in this URL.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">Key</th>
                      <th className="py-2 px-3">Value</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {parsed.params.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 text-indigo-400 font-bold">{p.key}</td>
                        <td className="py-2 px-3 text-emerald-300 break-all">{p.val}</td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => copyText(p.id, p.val)}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                            title="Copy value"
                          >
                            {copiedField === p.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

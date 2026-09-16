import React, { useState, useMemo } from 'react';
import { KeyRound, Copy, Check, Trash2, ShieldCheck, ShieldAlert, Clock, FileCode, CheckCircle2 } from 'lucide-react';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIERldmVsb3BlciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyMDAwMDAwMDAwLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFsaWNlQGRldnRvb2xib294LmRldiJ9.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JwtViewer() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [copiedSection, setCopiedSection] = useState('');

  // Decode helper
  const decodeBase64Url = (str) => {
    try {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch {
      return null;
    }
  };

  const parsed = useMemo(() => {
    if (!token.trim()) {
      return { valid: false, error: 'Please enter a JWT token above.' };
    }

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid JWT format: A valid JWT must contain exactly 3 dot-separated parts (Header.Payload.Signature).' };
    }

    const [headerB64, payloadB64, signatureB64] = parts;
    const headerStr = decodeBase64Url(headerB64);
    const payloadStr = decodeBase64Url(payloadB64);

    if (!headerStr || !payloadStr) {
      return { valid: false, error: 'Unable to decode Base64Url string in Header or Payload.' };
    }

    try {
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);

      // Analyze expiration & time claims
      const now = Math.floor(Date.now() / 1000);
      let expStatus = null;
      if (payload.exp) {
        const isExpired = now > payload.exp;
        const diffSeconds = Math.abs(payload.exp - now);
        const diffHours = Math.floor(diffSeconds / 3600);
        const diffDays = Math.floor(diffHours / 24);
        expStatus = {
          isExpired,
          date: new Date(payload.exp * 1000).toUTCString(),
          summary: isExpired
            ? `Expired ${diffDays > 0 ? `${diffDays} days ago` : `${diffHours} hours ago`}`
            : `Valid for another ${diffDays > 0 ? `${diffDays} days` : `${diffHours} hours`}`
        };
      }

      let iatDate = payload.iat ? new Date(payload.iat * 1000).toUTCString() : null;
      let nbfDate = payload.nbf ? new Date(payload.nbf * 1000).toUTCString() : null;

      return {
        valid: true,
        header,
        payload,
        signature: signatureB64,
        parts: { headerB64, payloadB64, signatureB64 },
        expStatus,
        iatDate,
        nbfDate
      };
    } catch {
      return { valid: false, error: 'Decoded header or payload is not valid JSON.' };
    }
  }, [token]);

  const copyToClipboard = (section, text) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Input JWT Area */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            Encoded JWT Token
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setToken(SAMPLE_JWT)}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              Load Sample Token
            </button>
            <button
              onClick={() => setToken('')}
              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear token"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste JWT (header.payload.signature) here..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 resize-y"
        />

        {/* Color Coded Legend */}
        {parsed.valid && (
          <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
            <span className="text-slate-400 text-[11px]">Parts breakdown:</span>
            <span className="text-rose-400 font-mono font-semibold">● Header</span>
            <span className="text-indigo-400 font-mono font-semibold">● Payload</span>
            <span className="text-cyan-400 font-mono font-semibold">● Signature</span>
          </div>
        )}
      </div>

      {/* Expiration Status Pill */}
      {parsed.valid && parsed.expStatus && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl border ${
            parsed.expStatus.isExpired
              ? 'bg-rose-950/30 border-rose-800 text-rose-300'
              : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-medium">
            {parsed.expStatus.isExpired ? (
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <div>
              <div className="font-bold">{parsed.expStatus.summary}</div>
              <div className="text-[11px] opacity-80 mt-0.5">Expires at: {parsed.expStatus.date}</div>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-current">
            exp: {parsed.payload.exp}
          </span>
        </div>
      )}

      {/* Error View */}
      {!parsed.valid && (
        <div className="bg-rose-950/30 border border-rose-900 rounded-xl p-4 text-xs text-rose-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{parsed.error}</span>
        </div>
      )}

      {/* Decoded Views Grid */}
      {parsed.valid && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Header Card */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                HEADER: ALGORITHM & TOKEN TYPE
              </span>
              <button
                onClick={() => copyToClipboard('header', parsed.header)}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
              >
                {copiedSection === 'header' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'header' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-rose-300 font-mono overflow-x-auto">
              {JSON.stringify(parsed.header, null, 2)}
            </pre>
          </div>

          {/* Payload Claims Card */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                PAYLOAD: DATA / CLAIMS
              </span>
              <button
                onClick={() => copyToClipboard('payload', parsed.payload)}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
              >
                {copiedSection === 'payload' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'payload' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-300 font-mono overflow-x-auto">
              {JSON.stringify(parsed.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Signature Section */}
      {parsed.valid && (
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="font-bold text-cyan-400 uppercase tracking-wider">
              VERIFY SIGNATURE
            </span>
            <button
              onClick={() => copyToClipboard('sig', parsed.signature)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
            >
              {copiedSection === 'sig' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSection === 'sig' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-cyan-300 font-mono break-all">
            {parsed.signature}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Signature is calculated using the algorithm specified in the header ({parsed.header?.alg || 'HS256'}).
          </div>
        </div>
      )}
    </div>
  );
}

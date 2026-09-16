import React, { useState, useEffect, useMemo } from 'react';
import { Hash, Copy, Check, Upload, Trash2, ShieldCheck, Key, RefreshCw, FileText } from 'lucide-react';

// Lightweight pure JS MD5 implementation for client-side hashing
function md5(string) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY) {
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }
  function F(x, y, z) { return (x & y) | ((~x) & z); }
  function G(x, y, z) { return (x & z) | (y & (~z)); }
  function H(x, y, z) { return (x ^ y ^ z); }
  function I(x, y, z) { return (y ^ (x | (~z))); }

  function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str) {
    const lWordCount = (str.length + 8) >> 6;
    const lNumberOfWords = (lWordCount + 1) * 16;
    const lWordArray = new Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < str.length) {
      const lWordCountIdx = (lByteCount) >> 2;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCountIdx] = (lWordArray[lWordCountIdx] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    const lWordCountIdx = (lByteCount) >> 2;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCountIdx] = lWordArray[lWordCountIdx] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = str.length << 3;
    lWordArray[lNumberOfWords - 1] = str.length >>> 29;
    return lWordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValueTemp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
    }
    return wordToHexValue;
  }

  const x = convertToWordArray(string);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = FF(a, b, c, d, x[k], 7, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], 12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], 17, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], 22, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], 7, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], 12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], 17, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], 22, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], 7, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], 12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], 17, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], 22, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], 7, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], 12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], 17, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], 22, 0x49b40821);

    a = GG(a, b, c, d, x[k + 1], 5, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], 9, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], 14, 0x265e5a51);
    b = GG(b, c, d, a, x[k], 20, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], 5, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], 9, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], 14, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], 20, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], 5, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], 9, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], 14, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], 20, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], 5, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], 9, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], 14, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], 20, 0x8d2a4c8a);

    a = HH(a, b, c, d, x[k + 5], 4, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], 11, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], 16, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], 23, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], 4, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], 11, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], 16, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], 23, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], 4, 0x289b7ec6);
    d = HH(d, a, b, c, x[k], 11, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], 16, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], 23, 0x4881d05);
    a = HH(a, b, c, d, x[k + 9], 4, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], 11, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], 16, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], 23, 0xc4ac5665);

    a = II(a, b, c, d, x[k], 6, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], 10, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], 15, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], 21, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], 6, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], 10, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], 15, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], 21, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], 6, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], 10, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], 15, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], 21, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], 6, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], 10, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], 15, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], 21, 0xeb86d391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

export default function HashGenerator() {
  const [inputText, setInputText] = useState('DevToolBoox secure hash generation');
  const [uppercase, setUppercase] = useState(false);
  const [hmacKey, setHmacKey] = useState('');
  const [useHmac, setUseHmac] = useState(false);
  const [copiedAlgo, setCopiedAlgo] = useState('');

  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha384: '',
    sha512: ''
  });

  useEffect(() => {
    let cancelled = false;

    async function calculateHashes() {
      if (!inputText) {
        setHashes({ md5: '', sha1: '', sha256: '', sha384: '', sha512: '' });
        return;
      }

      const md5Result = md5(inputText);

      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      async function hashBuffer(algorithm) {
        try {
          if (useHmac && hmacKey) {
            const keyData = encoder.encode(hmacKey);
            const cryptoKey = await crypto.subtle.importKey(
              'raw',
              keyData,
              { name: 'HMAC', hash: { name: algorithm } },
              false,
              ['sign']
            );
            const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
            return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
          } else {
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
          }
        } catch {
          return 'Unsupported in current environment';
        }
      }

      const [sha1, sha256, sha384, sha512] = await Promise.all([
        hashBuffer('SHA-1'),
        hashBuffer('SHA-256'),
        hashBuffer('SHA-384'),
        hashBuffer('SHA-512')
      ]);

      if (!cancelled) {
        setHashes({
          md5: md5Result,
          sha1,
          sha256,
          sha384,
          sha512
        });
      }
    }

    calculateHashes();

    return () => { cancelled = true; };
  }, [inputText, useHmac, hmacKey]);

  const copyHash = (algo, val) => {
    const text = uppercase ? val.toUpperCase() : val.toLowerCase();
    navigator.clipboard.writeText(text);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo(''), 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result;
      if (typeof content === 'string') {
        setInputText(content);
      }
    };
    reader.readAsText(file);
  };

  const HASH_LIST = [
    { id: 'md5', name: 'MD5', bits: 128, security: 'Legacy / Checksums' },
    { id: 'sha1', name: 'SHA-1', bits: 160, security: 'Git / Legacy' },
    { id: 'sha256', name: 'SHA-256', bits: 256, security: 'Standard & Recommended' },
    { id: 'sha384', name: 'SHA-384', bits: 384, security: 'High Security' },
    { id: 'sha512', name: 'SHA-512', bits: 512, security: 'Maximum Security' }
  ];

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-indigo-500"
            />
            <span>Uppercase Hex (A-F)</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useHmac}
              onChange={(e) => setUseHmac(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-indigo-500"
            />
            <span>HMAC Mode (Keyed Hash)</span>
          </label>
        </div>

        <label className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File Checksum</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* HMAC Secret Key Field */}
      {useHmac && (
        <div className="bg-slate-900/50 border border-indigo-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 whitespace-nowrap">
            <Key className="w-4 h-4" />
            <span>HMAC Secret Key:</span>
          </div>
          <input
            type="text"
            value={hmacKey}
            onChange={(e) => setHmacKey(e.target.value)}
            placeholder="Enter secret key for HMAC calculation..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* Input Text Box */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Input Text to Hash
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>{inputText.length} characters</span>
            <button
              onClick={() => setInputText('')}
              className="p-1 hover:text-rose-400 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          placeholder="Type or paste any text to hash..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      {/* Generated Hashes List */}
      <div className="space-y-3">
        {HASH_LIST.map((h) => {
          const raw = hashes[h.id] || '';
          const displayVal = uppercase ? raw.toUpperCase() : raw.toLowerCase();
          return (
            <div
              key={h.id}
              className="bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-colors group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wide">{h.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {h.bits} bits
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    {h.security}
                  </span>
                </div>
                <button
                  onClick={() => copyHash(h.id, raw)}
                  disabled={!raw}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedAlgo === h.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAlgo === h.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 font-mono text-xs text-indigo-300 break-all select-all">
                {displayVal || <span className="text-slate-600 italic">Enter input above to calculate hash...</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

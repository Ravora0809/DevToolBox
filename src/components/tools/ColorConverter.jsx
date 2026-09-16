import React, { useState, useMemo } from 'react';
import { Copy, Check, Palette, Sparkles, RefreshCw, Eye, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366F1');
  const [alpha, setAlpha] = useState(1);
  const [copiedFormat, setCopiedFormat] = useState('');

  // Helper conversions
  const rgb = useMemo(() => {
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    if (isNaN(num) || cleanHex.length !== 6) {
      return { r: 99, g: 102, b: 241 };
    }
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }, [hex]);

  const hsl = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, [rgb]);

  const hsv = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }, [rgb]);

  const cmyk = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((1 - r - k) / (1 - k)) * 100),
      m: Math.round(((1 - g - k) / (1 - k)) * 100),
      y: Math.round(((1 - b - k) / (1 - k)) * 100),
      k: Math.round(k * 100)
    };
  }, [rgb]);

  // Relative luminance for WCAG contrast
  const luminance = useMemo(() => {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }, [rgb]);

  const contrastWhite = useMemo(() => {
    const lumWhite = 1.0;
    const ratio = (lumWhite + 0.05) / (luminance + 0.05);
    return Number(ratio.toFixed(2));
  }, [luminance]);

  const contrastBlack = useMemo(() => {
    const lumBlack = 0.0;
    const ratio = (luminance + 0.05) / (lumBlack + 0.05);
    return Number(ratio.toFixed(2));
  }, [luminance]);

  // Shades & tints
  const shades = useMemo(() => {
    const list = [];
    for (let factor = 0.8; factor >= 0.2; factor -= 0.2) {
      const r = Math.round(rgb.r * factor);
      const g = Math.round(rgb.g * factor);
      const b = Math.round(rgb.b * factor);
      const h = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      list.push(`#${h}`);
    }
    return list;
  }, [rgb]);

  const tints = useMemo(() => {
    const list = [];
    for (let factor = 0.2; factor <= 0.8; factor += 0.2) {
      const r = Math.round(rgb.r + (255 - rgb.r) * factor);
      const g = Math.round(rgb.g + (255 - rgb.g) * factor);
      const b = Math.round(rgb.b + (255 - rgb.b) * factor);
      const h = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      list.push(`#${h}`);
    }
    return list;
  }, [rgb]);

  const copyString = (format, str) => {
    navigator.clipboard.writeText(str);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(''), 1500);
  };

  const FORMATS = [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'HSLA', value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})` },
    { label: 'HSV', value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
    { label: 'CSS Variable', value: `--color: ${hex};` }
  ];

  return (
    <div className="space-y-6">
      {/* Visual Color Picker Header Card */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Large Color Preview Block */}
        <div className="relative group">
          <div
            style={{ backgroundColor: hex }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-slate-800 shadow-2xl transition-all flex items-center justify-center cursor-pointer"
          >
            <input
              type="color"
              value={hex.length === 7 ? hex : '#6366F1'}
              onChange={(e) => setHex(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Click to pick
          </span>
        </div>

        {/* Inputs */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              HEX Color Code
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#6366f1"
                className="w-full sm:w-64 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xl font-mono font-bold text-white focus:outline-none focus:border-indigo-500"
              />
              <input
                type="color"
                value={hex.length === 7 ? hex : '#6366F1'}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Alpha Opacity: {alpha}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full sm:w-64 accent-indigo-500"
            />
          </div>
        </div>

        {/* WCAG Contrast Ratio Quick Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 w-full md:w-64 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>WCAG 2.1 Contrast</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">On White (#FFF):</span>
              <span className="font-bold font-mono text-white flex items-center gap-1">
                {contrastWhite}:1
                {contrastWhite >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">On Black (#000):</span>
              <span className="font-bold font-mono text-white flex items-center gap-1">
                {contrastBlack}:1
                {contrastBlack >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
              {contrastWhite >= 7 || contrastBlack >= 7 ? 'Passes AAA Level' : contrastWhite >= 4.5 || contrastBlack >= 4.5 ? 'Passes AA Level' : 'Low Contrast'}
            </div>
          </div>
        </div>
      </div>

      {/* Formats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FORMATS.map((f) => (
          <div
            key={f.label}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col justify-between group hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase">{f.label}</span>
              <button
                onClick={() => copyString(f.label, f.value)}
                className="p-1 hover:text-white text-slate-500 transition-colors"
                title={`Copy ${f.label}`}
              >
                {copiedFormat === f.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-sm font-bold font-mono text-indigo-300 mt-1 truncate">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      {/* Shades and Tints Palette */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-4">
        <div>
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Color Tints (Lighter)
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {tints.map((c) => (
              <button
                key={c}
                onClick={() => setHex(c)}
                style={{ backgroundColor: c }}
                className="h-10 rounded-lg border border-slate-700/50 hover:scale-105 transition-transform relative group"
                title={c}
              >
                <span className="text-[9px] font-mono text-black font-bold opacity-0 group-hover:opacity-100 bg-white/80 px-1 rounded">
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Color Shades (Darker)
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {shades.map((c) => (
              <button
                key={c}
                onClick={() => setHex(c)}
                style={{ backgroundColor: c }}
                className="h-10 rounded-lg border border-slate-700/50 hover:scale-105 transition-transform relative group"
                title={c}
              >
                <span className="text-[9px] font-mono text-white font-bold opacity-0 group-hover:opacity-100 bg-black/80 px-1 rounded">
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

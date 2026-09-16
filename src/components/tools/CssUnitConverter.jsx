import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Sliders, Eye, Sparkles, Scale } from 'lucide-react';

export default function CssUnitConverter() {
  const [basePx, setBasePx] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [viewportHeight, setViewportHeight] = useState(1080);
  const [activeUnit, setActiveUnit] = useState('px');
  const [inputValue, setInputValue] = useState(24);
  const [copiedUnit, setCopiedUnit] = useState('');

  // Normalize active input into px as single source of truth
  const currentPx = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 0;

    switch (activeUnit) {
      case 'px':
        return val;
      case 'rem':
      case 'em':
        return val * basePx;
      case '%':
        return (val / 100) * basePx;
      case 'vw':
        return (val / 100) * viewportWidth;
      case 'vh':
        return (val / 100) * viewportHeight;
      case 'pt':
        return val * (96 / 72); // 1pt = 1/72 inch, 1in = 96px
      case 'cm':
        return val * (96 / 2.54);
      case 'in':
        return val * 96;
      default:
        return val;
    }
  }, [inputValue, activeUnit, basePx, viewportWidth, viewportHeight]);

  // Derived values for all units
  const units = useMemo(() => {
    const px = currentPx;
    return {
      px: Number(px.toFixed(2)),
      rem: Number((px / basePx).toFixed(4)),
      em: Number((px / basePx).toFixed(4)),
      '%': Number(((px / basePx) * 100).toFixed(2)),
      vw: Number(((px / viewportWidth) * 100).toFixed(3)),
      vh: Number(((px / viewportHeight) * 100).toFixed(3)),
      pt: Number((px * (72 / 96)).toFixed(2)),
      cm: Number((px * (2.54 / 96)).toFixed(3)),
      in: Number((px / 96).toFixed(4))
    };
  }, [currentPx, basePx, viewportWidth, viewportHeight]);

  const handleUnitChange = (unit, val) => {
    setActiveUnit(unit);
    setInputValue(val);
  };

  const copyValue = (unit, val) => {
    navigator.clipboard.writeText(`${val}${unit}`);
    setCopiedUnit(unit);
    setTimeout(() => setCopiedUnit(''), 1500);
  };

  const PRESETS = [
    { label: '8px (0.5rem)', px: 8 },
    { label: '12px (0.75rem)', px: 12 },
    { label: '16px (1rem)', px: 16 },
    { label: '20px (1.25rem)', px: 20 },
    { label: '24px (1.5rem)', px: 24 },
    { label: '32px (2rem)', px: 32 },
    { label: '48px (3rem)', px: 48 },
    { label: '64px (4rem)', px: 64 }
  ];

  return (
    <div className="space-y-6">
      {/* Settings Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Base Font Size:</span>
            <div className="flex items-center">
              <input
                type="number"
                min="8"
                max="64"
                value={basePx}
                onChange={(e) => setBasePx(Math.max(1, parseFloat(e.target.value) || 16))}
                className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 text-xs font-mono"
              />
              <span className="ml-1 text-slate-500 font-mono">px</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Viewport Width:</span>
            <div className="flex items-center">
              <input
                type="number"
                min="320"
                max="3840"
                value={viewportWidth}
                onChange={(e) => setViewportWidth(Math.max(1, parseFloat(e.target.value) || 1920))}
                className="w-20 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 text-xs font-mono"
              />
              <span className="ml-1 text-slate-500 font-mono">px</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Viewport Height:</span>
            <div className="flex items-center">
              <input
                type="number"
                min="320"
                max="2160"
                value={viewportHeight}
                onChange={(e) => setViewportHeight(Math.max(1, parseFloat(e.target.value) || 1080))}
                className="w-20 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 text-xs font-mono"
              />
              <span className="ml-1 text-slate-500 font-mono">px</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setBasePx(16); setViewportWidth(1920); setViewportHeight(1080); }}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Main Conversion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Selected Input */}
        <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Primary Converter</span>
            <span className="text-indigo-400 font-mono">{currentPx}px equivalent</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-2xl font-bold font-mono text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter value..."
            />
            <select
              value={activeUnit}
              onChange={(e) => setActiveUnit(e.target.value)}
              className="w-full sm:w-36 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-indigo-400 focus:outline-none focus:border-indigo-500"
            >
              <option value="px">px (Pixels)</option>
              <option value="rem">rem (Root Em)</option>
              <option value="em">em (Relative)</option>
              <option value="%">% (Percent)</option>
              <option value="vw">vw (Viewport W)</option>
              <option value="vh">vh (Viewport H)</option>
              <option value="pt">pt (Points)</option>
              <option value="cm">cm (Centimeters)</option>
              <option value="in">in (Inches)</option>
            </select>
          </div>

          {/* Quick Presets */}
          <div className="pt-2">
            <div className="text-xs text-slate-400 mb-2 font-medium">Common Spacing & Typography Presets:</div>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.px}
                  onClick={() => handleUnitChange('px', p.px)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    currentPx === p.px ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Visual Preview Box */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 flex flex-col items-center justify-between">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider w-full flex items-center justify-between">
            <span>Visual Scale Preview</span>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>

          <div className="w-full flex-1 flex items-center justify-center p-4 min-h-[140px]">
            <div
              style={{
                width: `${Math.min(Math.max(currentPx, 8), 240)}px`,
                height: `${Math.min(Math.max(currentPx, 8), 120)}px`
              }}
              className="bg-indigo-600/30 border-2 border-indigo-500 rounded-lg flex items-center justify-center text-xs font-mono text-indigo-300 transition-all shadow-lg shadow-indigo-500/10"
            >
              <span className="truncate px-1">{Math.round(currentPx)}px</span>
            </div>
          </div>

          <div className="w-full text-center text-[11px] text-slate-500 font-mono">
            Preview capped at 240px wide for display
          </div>
        </div>
      </div>

      {/* Units Matrix Grid */}
      <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Simultaneous Conversion Matrix
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(units).map(([unit, val]) => (
            <div
              key={unit}
              className="bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/50 rounded-xl p-3 flex flex-col justify-between group transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">{unit}</span>
                <button
                  onClick={() => copyValue(unit, val)}
                  className="p-1 hover:text-white text-slate-500 transition-colors"
                  title={`Copy ${val}${unit}`}
                >
                  {copiedUnit === unit ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="text-lg font-bold font-mono text-white mt-1 group-hover:text-indigo-300 transition-colors truncate">
                {val}
                <span className="text-xs text-slate-500 ml-1 font-normal">{unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

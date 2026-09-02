import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Copy, Check, Calendar, ArrowDownUp } from 'lucide-react';

export default function TimestampConverter() {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));
  const [convertedDate, setConvertedDate] = useState(null);
  const [convertedEpoch, setConvertedEpoch] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  // Live timer for current epoch
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert input epoch to human dates
  useEffect(() => {
    if (!inputEpoch.trim() || isNaN(Number(inputEpoch))) {
      setConvertedDate(null);
      return;
    }
    const num = Number(inputEpoch);
    // Determine if seconds or milliseconds (standard is 10 digits for seconds, 13 for ms)
    const ms = inputEpoch.length > 11 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      setConvertedDate(null);
      return;
    }

    setConvertedDate({
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      relative: getRelativeTimeString(d),
      timestampMs: ms
    });
  }, [inputEpoch]);

  // Convert human date to epoch
  useEffect(() => {
    if (!dateInput) return;
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) {
      setConvertedEpoch({
        seconds: Math.floor(d.getTime() / 1000),
        milliseconds: d.getTime()
      });
    }
  }, [dateInput]);

  function getRelativeTimeString(date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, 'second');
    const diffMinutes = Math.round(diffSeconds / 60);
    if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute');
    const diffHours = Math.round(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
    const diffDays = Math.round(diffHours / 24);
    return rtf.format(diffDays, 'day');
  }

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Current Timestamp Banner */}
      <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Current Live Unix Epoch:</div>
            <div className="text-xl font-mono font-bold text-indigo-300 select-all">
              {currentEpoch}
            </div>
          </div>
        </div>
        <button
          onClick={() => setInputEpoch(String(currentEpoch))}
          className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-lg text-xs font-semibold transition-colors"
        >
          Use Current Time
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Epoch to Human Date */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Epoch Timestamp → Human Date</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Enter Unix Epoch (seconds or ms):</label>
            <input
              type="text"
              value={inputEpoch}
              onChange={(e) => setInputEpoch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 1772620000"
            />
          </div>

          {convertedDate && (
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">UTC (GMT)</span>
                  <span className="font-mono text-slate-200">{convertedDate.utc}</span>
                </div>
                <button onClick={() => copyVal(convertedDate.utc, 'utc')} className="p-1 hover:text-indigo-400 text-slate-400">
                  {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Local Timezone</span>
                  <span className="font-mono text-slate-200">{convertedDate.local}</span>
                </div>
                <button onClick={() => copyVal(convertedDate.local, 'local')} className="p-1 hover:text-indigo-400 text-slate-400">
                  {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">ISO 8601 Format</span>
                  <span className="font-mono text-slate-200">{convertedDate.iso}</span>
                </div>
                <button onClick={() => copyVal(convertedDate.iso, 'iso')} className="p-1 hover:text-indigo-400 text-slate-400">
                  {copiedKey === 'iso' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Relative Time</span>
                  <span className="font-mono text-emerald-400">{convertedDate.relative}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Human Date to Epoch */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            <ArrowDownUp className="w-4 h-4 text-indigo-400" />
            <span>Human Date → Epoch Timestamp</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Pick Date and Time:</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {convertedEpoch && (
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Epoch Seconds (10 digits)</span>
                  <span className="font-mono text-base text-indigo-400 font-bold">{convertedEpoch.seconds}</span>
                </div>
                <button onClick={() => copyVal(String(convertedEpoch.seconds), 's')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1">
                  {copiedKey === 's' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Epoch Milliseconds (13 digits)</span>
                  <span className="font-mono text-base text-indigo-400 font-bold">{convertedEpoch.milliseconds}</span>
                </div>
                <button onClick={() => copyVal(String(convertedEpoch.milliseconds), 'ms')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1">
                  {copiedKey === 'ms' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

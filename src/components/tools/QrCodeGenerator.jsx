import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, RefreshCw, Sliders, Wifi, Globe, Mail, Phone, User, FileText } from 'lucide-react';

export default function QrCodeGenerator() {
  const [contentType, setContentType] = useState('url'); // 'url', 'text', 'wifi', 'email', 'phone'
  const [textValue, setTextValue] = useState('https://github.com/bhupanimounika/devtoolboox');
  
  // WiFi states
  const [wifiSsid, setWifiSsid] = useState('MyOffice_5G');
  const [wifiPassword, setWifiPassword] = useState('SecretPass123!');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Email states
  const [emailTo, setEmailTo] = useState('hello@devtoolboox.dev');
  const [emailSubject, setEmailSubject] = useState('Inquiry');
  const [emailBody, setEmailBody] = useState('Hello DevToolBoox team,');

  // Phone state
  const [phoneNum, setPhoneNum] = useState('+1-555-0199');

  // Design customizations
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState('M'); // 'L', 'M', 'Q', 'H'
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute final payload string based on contentType
  const qrContent = () => {
    switch (contentType) {
      case 'url':
      case 'text':
        return textValue;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNum}`;
      default:
        return textValue;
    }
  };

  useEffect(() => {
    const payload = qrContent();
    if (!payload.trim()) {
      setQrDataUrl('');
      return;
    }

    QRCode.toDataURL(payload, {
      width: size,
      margin,
      errorCorrectionLevel: errorLevel,
      color: {
        dark: fgColor,
        light: bgColor
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => {
        console.error('QR generation error:', err);
      });
  }, [
    contentType,
    textValue,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    emailTo,
    emailSubject,
    emailBody,
    phoneNum,
    fgColor,
    bgColor,
    errorLevel,
    size,
    margin
  ]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${contentType}.png`;
    a.click();
  };

  const handleCopyDataUrl = () => {
    if (!qrDataUrl) return;
    navigator.clipboard.writeText(qrDataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-slate-800">
        {[
          { id: 'url', label: 'Website URL', icon: Globe },
          { id: 'text', label: 'Plain Text', icon: FileText },
          { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
          { id: 'email', label: 'Email Draft', icon: Mail },
          { id: 'phone', label: 'Phone Number', icon: Phone }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setContentType(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                contentType === t.id
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Configuration */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Enter Content
            </h3>

            {/* URL / Text */}
            {(contentType === 'url' || contentType === 'text') && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {contentType === 'url' ? 'Target Web URL' : 'Plain Text Message'}
                </label>
                <textarea
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  rows={4}
                  placeholder={contentType === 'url' ? 'https://example.com' : 'Enter text here...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 resize-y"
                />
              </div>
            )}

            {/* WiFi */}
            {contentType === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Network Name (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Password</label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Security Type</label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-indigo-500"
                    />
                    <span>Hidden Network</span>
                  </label>
                </div>
              </div>
            )}

            {/* Email */}
            {contentType === 'email' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Pre-filled Message Body</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            {contentType === 'phone' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
            )}
          </div>

          {/* Design Controls */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Styling & Error Correction
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Foreground Color */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">QR Code Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-slate-300">{fgColor}</span>
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-slate-300">{bgColor}</span>
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">Error Correction</label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                >
                  <option value="L">L (7% Recovery)</option>
                  <option value="M">M (15% Recovery)</option>
                  <option value="Q">Q (25% Recovery)</option>
                  <option value="H">H (30% Recovery)</option>
                </select>
              </div>

              {/* Quiet Zone Margin */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">Margin Quiet Zone</label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                >
                  <option value={0}>0 (No margin)</option>
                  <option value={1}>1 block</option>
                  <option value={2}>2 blocks (Standard)</option>
                  <option value={4}>4 blocks (Safe)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview & Export */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-indigo-400" />
              Live QR Preview
            </span>
            <span className="text-[11px] font-mono text-slate-500">{size}×{size} px</span>
          </div>

          <div className="my-6 p-4 rounded-2xl bg-white/5 border border-slate-700/60 shadow-xl flex items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="rounded-lg max-w-[240px] max-h-[240px] object-contain shadow"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-500">
                Generating QR...
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <button
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG Image</span>
            </button>

            <button
              onClick={handleCopyDataUrl}
              disabled={!qrDataUrl}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Data URI!' : 'Copy Data URI'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

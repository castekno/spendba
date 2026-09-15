import React, { useState, useEffect } from 'react';
import { X, Server, CheckCircle2, Copy, Check, ExternalLink, RefreshCw, Globe, Shield } from 'lucide-react';
import { getCustomGatewayUrl, setCustomGatewayUrl } from '../services/tenderGateway';

interface GatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGatewaySaved: () => void;
  currentSource: string;
}

export const GatewayModal: React.FC<GatewayModalProps> = ({
  isOpen,
  onClose,
  onGatewaySaved,
  currentSource,
}) => {
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setGatewayUrl(getCustomGatewayUrl());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setCustomGatewayUrl(gatewayUrl.trim());
    onGatewaySaved();
    onClose();
  };

  const handleTestConnection = async () => {
    if (!gatewayUrl.trim()) {
      setTestResult({ success: false, message: 'Masukkan URL Gateway terlebih dahulu' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const cleanUrl = gatewayUrl.trim().replace(/\/+$/, '');
      const testUrl = cleanUrl.includes('?') ? `${cleanUrl}&_t=${Date.now()}` : `${cleanUrl}?_t=${Date.now()}`;
      
      const res = await fetch(testUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const count = Array.isArray(json) ? json.length : (json.data?.length || 0);

      setTestResult({
        success: true,
        message: `Koneksi berhasil! Terhubung ke SPEND PTBA (${count} paket lelang aktif terdeteksi).`,
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Gagal terhubung: ${err.message || 'Periksa kembali URL atau pastikan worker aktif'}.`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const sampleWorkerCode = `export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }
    const target = 'https://spend.bukitasam.co.id/api-spend-vendor/api/v1/VendorProcurement/open-lelang';
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });
    const text = await res.text();
    return new Response(text, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleWorkerCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="gateway-settings-modal"
        className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Jembatan Gateway (CORS Bridge)
              </h2>
              <p className="text-xs text-slate-400">
                Memastikan data lelang SPEND PTBA selalu 100% <i>live</i> saat di-publish
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm max-h-[75vh] overflow-y-auto">
          {/* Status Saat Ini */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-400 font-medium">Jalur Data Aktif:</span>
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {currentSource || 'Otomatis'}
              </p>
            </div>
            <div className="text-right text-xs text-slate-400">
              Mode: <span className="text-slate-200 font-mono">Multi-Tier Failover</span>
            </div>
          </div>

          {/* Form Input Custom Gateway */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              URL Custom Cloudflare Worker / CORS Gateway (Opsional):
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://ptba-gateway.nama-anda.workers.dev"
                value={gatewayUrl}
                onChange={(e) => setGatewayUrl(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !gatewayUrl.trim()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors border border-slate-600 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                {isTesting ? 'Tes...' : 'Uji URL'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Kosongkan jika ingin menggunakan sistem otomatis internal aplikasi.
            </p>
          </div>

          {/* Alert Hasil Uji Koneksi */}
          {testResult && (
            <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
              testResult.success 
                ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-600/40 text-rose-300'
            }`}>
              <div className="mt-0.5 shrink-0">
                {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
              </div>
              <p>{testResult.message}</p>
            </div>
          )}

          {/* Cara Deploy Cloudflare Worker Gratis (Ringkas) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Cara Pasang Worker Sendiri (100% Gratis - 2 Menit):
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Tersalin!' : 'Salin Skrip'}</span>
              </button>
            </div>

            <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Buka <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">dash.cloudflare.com</a> lalu pilih menu <b>Workers & Pages</b>.</li>
              <li>Klik <b>Create Worker</b> &gt; <b>Deploy</b>.</li>
              <li>Klik <b>Edit Code</b>, tempelkan skrip di atas, lalu <b>Save and Deploy</b>.</li>
              <li>Salin URL Worker Anda lalu tempelkan pada kolom di atas.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={() => {
              setCustomGatewayUrl('');
              setGatewayUrl('');
              onGatewaySaved();
              onClose();
            }}
            className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Reset ke Otomatis
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 text-xs text-slate-900 font-bold bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Simpan Gateway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Copy, Check, Smartphone, User, Heart, Compass, Crosshair, Ban } from 'lucide-react';
import type { Setup } from '@/lib/supabase';

interface SetupCardProps {
  setup: Setup;
  onLike: () => void;
}

const gyroIcons: Record<string, typeof Compass> = {
  'Always On': Compass,
  'Scope On': Crosshair,
  'Off': Ban,
};

const gyroColors: Record<string, string> = {
  'Always On': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Scope On': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Off': 'text-gray-400 bg-gray-500/10 border-gray-500/20',
};

export function SetupCard({ setup, onLike }: SetupCardProps) {
  const [copied, setCopied] = useState(false);
  const GyroIcon = gyroIcons[setup.gyro_mode] ?? Compass;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(setup.sensitivity_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:border-amber-500/20 hover:from-white/[0.06] hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-gray-300" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">{setup.device_name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <User className="w-3 h-3" />
              <span className="truncate">{setup.author_name}</span>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${gyroColors[setup.gyro_mode]}`}>
          <GyroIcon className="w-3 h-3" />
          {setup.gyro_mode}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1.5">Sensitivity Code</p>
        <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-sm text-amber-300/90 tracking-wide break-all">
          {setup.sensitivity_code}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleCopy}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-500 text-black'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:shadow-lg hover:shadow-amber-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" strokeWidth={2.5} />
              Copy Code
            </>
          )}
        </button>
        <button
          onClick={onLike}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-gray-400 transition-all hover:border-rose-500/30 hover:text-rose-400 active:scale-95"
        >
          <Heart className="w-4 h-4" />
          <span className="tabular-nums text-xs font-semibold">{setup.likes}</span>
        </button>
      </div>
    </div>
  );
}

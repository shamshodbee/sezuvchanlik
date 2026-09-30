import { Smartphone, Swords, User } from 'lucide-react';
import type { Setup } from '@/lib/supabase';

interface TdmTacticProps {
  setup: Setup;
}

export function TdmTactic({ setup }: TdmTacticProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:border-sky-500/20 hover:from-white/[0.06] hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
          <Swords className="w-5 h-5 text-sky-400" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-sm truncate">{setup.author_name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Smartphone className="w-3 h-3" />
            <span className="truncate">{setup.device_name}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{setup.tdm_tip}</p>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
        <User className="w-3 h-3" />
        <span>Sensitivity: {setup.gyro_mode}</span>
      </div>
    </div>
  );
}

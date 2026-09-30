import { Crosshair, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-20 px-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full" />
        <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Crosshair className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-300">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-600">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-sm font-bold text-black transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-100"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

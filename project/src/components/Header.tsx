import { Crosshair, Plus } from 'lucide-react';

interface HeaderProps {
  onShareClick: () => void;
}

export function Header({ onShareClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0b0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-lg" />
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Crosshair className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">
                SENS<span className="text-amber-500">HUB</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                PUBG Mobile Sensitivity & Tactics
              </p>
            </div>
          </div>

          <button
            onClick={onShareClick}
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3.5 sm:px-4 py-2 text-sm font-bold text-black transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-100"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" strokeWidth={2.5} />
            <span className="hidden sm:inline">Share Your Setup</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}

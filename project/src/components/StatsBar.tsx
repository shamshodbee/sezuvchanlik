import { Crosshair, Compass, Users } from 'lucide-react';

interface StatsBarProps {
  stats: {
    total: number;
    fullGyro: number;
    players: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { icon: Crosshair, label: 'Setups', value: stats.total, color: 'text-amber-500' },
    { icon: Compass, label: 'Full Gyro', value: stats.fullGyro, color: 'text-emerald-500' },
    { icon: Users, label: 'Players', value: stats.players, color: 'text-sky-500' },
  ];

  return (
    <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div
          key={label}
          className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent px-3 py-4 sm:px-5 sm:py-5 transition-all hover:border-white/10"
        >
          <div className="absolute -right-4 -top-4 opacity-5 transition-transform group-hover:scale-110">
            <Icon className="w-20 h-20" strokeWidth={1} />
          </div>
          <div className="relative">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color} mb-2`} strokeWidth={2} />
            <div className="text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight">
              {value}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

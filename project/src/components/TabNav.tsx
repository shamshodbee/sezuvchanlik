import { Crosshair, Swords } from 'lucide-react';

interface TabNavProps {
  active: 'setups' | 'tdm';
  onChange: (tab: 'setups' | 'tdm') => void;
}

export function TabNav({ active, onChange }: TabNavProps) {
  const tabs = [
    { id: 'setups' as const, label: 'Sensitivity Codes', icon: Crosshair },
    { id: 'tdm' as const, label: 'TDM Tactics', icon: Swords },
  ];

  return (
    <div className="flex gap-2 border-b border-white/5">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
            active === id ? 'text-amber-500' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Icon className="w-4 h-4" strokeWidth={2} />
          {label}
          {active === id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}

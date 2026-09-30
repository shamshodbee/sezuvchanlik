import { useState, useEffect, useMemo } from 'react';
import { supabase, type Setup, type GyroMode } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { StatsBar } from '@/components/StatsBar';
import { SearchBar } from '@/components/SearchBar';
import { TabNav } from '@/components/TabNav';
import { SetupCard } from '@/components/SetupCard';
import { TdmTactic } from '@/components/TdmTactic';
import { EmptyState } from '@/components/EmptyState';
import { ShareModal } from '@/components/ShareModal';

type Tab = 'setups' | 'tdm';

export default function App() {
  const [setups, setSetups] = useState<Setup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('setups');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSetups();
    const channel = supabase
      .channel('setups-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'setups' }, () => loadSetups())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadSetups() {
    setLoading(true);
    const { data, error } = await supabase
      .from('setups')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setSetups(data as Setup[]);
    setLoading(false);
  }

  const filteredSetups = useMemo(() => {
    if (!searchQuery.trim()) return setups;
    const q = searchQuery.toLowerCase();
    return setups.filter(s =>
      s.device_name.toLowerCase().includes(q) ||
      s.author_name.toLowerCase().includes(q) ||
      s.gyro_mode.toLowerCase().includes(q)
    );
  }, [setups, searchQuery]);

  const tdmTactics = useMemo(() => setups.filter(s => s.tdm_tip), [setups]);

  const stats = useMemo(() => ({
    total: setups.length,
    fullGyro: setups.filter(s => s.gyro_mode === 'Always On').length,
    players: new Set(setups.map(s => s.author_name)).size,
  }), [setups]);

  async function handleLike(id: string) {
    const setup = setups.find(s => s.id === id);
    if (!setup) return;
    await supabase.from('setups').update({ likes: setup.likes + 1 }).eq('id', id);
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-gray-100">
      <Header onShareClick={() => setModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <StatsBar stats={stats} />

        <div className="mt-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mt-6">
          <TabNav active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="mt-8">
          {activeTab === 'setups' ? (
            loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              </div>
            ) : filteredSetups.length === 0 ? (
              <EmptyState
                title="No setups shared yet"
                message="Be the first to share!"
                actionLabel="Share Your Setup"
                onAction={() => setModalOpen(true)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSetups.map(setup => (
                  <SetupCard key={setup.id} setup={setup} onLike={() => handleLike(setup.id)} />
                ))}
              </div>
            )
          ) : (
            loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              </div>
            ) : tdmTactics.length === 0 ? (
              <EmptyState
                title="No TDM tactics shared yet"
                message="Share your setup and include a tip to see it here."
                actionLabel="Share Your Setup"
                onAction={() => setModalOpen(true)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tdmTactics.map(setup => (
                  <TdmTactic key={setup.id} setup={setup} />
                ))}
              </div>
            )
          )}
        </div>
      </main>

      <ShareModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={loadSetups}
      />
    </div>
  );
}

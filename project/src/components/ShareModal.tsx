import { useState, useEffect } from 'react';
import { X, Smartphone, Hash, Compass, User, Swords, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, type GyroMode } from '@/lib/supabase';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

const gyroModes: GyroMode[] = ['Always On', 'Scope On', 'Off'];

export function ShareModal({ open, onClose, onSubmitted }: ShareModalProps) {
  const [deviceName, setDeviceName] = useState('');
  const [sensitivityCode, setSensitivityCode] = useState('');
  const [gyroMode, setGyroMode] = useState<GyroMode>('Always On');
  const [authorName, setAuthorName] = useState('');
  const [tdmTip, setTdmTip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  function resetForm() {
    setDeviceName('');
    setSensitivityCode('');
    setGyroMode('Always On');
    setAuthorName('');
    setTdmTip('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: Record<string, string> = {
      device_name: deviceName.trim(),
      sensitivity_code: sensitivityCode.trim(),
      gyro_mode: gyroMode,
      author_name: authorName.trim(),
    };
    if (tdmTip.trim()) payload.tdm_tip = tdmTip.trim();

    const { error: insertError } = await supabase.from('setups').insert(payload);

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => {
      setSuccess(false);
      resetForm();
      onClose();
      onSubmitted();
    }, 1500);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#12131a] shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/5 bg-[#12131a] px-5 py-4 z-10">
          <div>
            <h2 className="text-lg font-bold">Share Your Setup</h2>
            <p className="text-xs text-gray-500 mt-0.5">Help the community improve their game</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/5 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold">Setup Shared!</h3>
            <p className="mt-1 text-sm text-gray-500">Your setup is now live for everyone to discover.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <Field label="Device Name" icon={Smartphone} required>
              <input
                type="text"
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
                placeholder="e.g. iPhone 15 Pro, POCO X3, PC Emulator"
                required
                className="form-input"
              />
            </Field>

            <Field label="Sensitivity Code" icon={Hash} required>
              <input
                type="text"
                value={sensitivityCode}
                onChange={e => setSensitivityCode(e.target.value)}
                placeholder="Paste your in-game sensitivity code"
                required
                className="form-input font-mono"
              />
            </Field>

            <Field label="Gyroscope Preference" icon={Compass} required>
              <div className="grid grid-cols-3 gap-2">
                {gyroModes.map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setGyroMode(mode)}
                    className={`rounded-lg border py-2.5 text-xs font-semibold transition-all ${
                      gyroMode === mode
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                        : 'border-white/10 bg-white/[0.02] text-gray-500 hover:border-white/20 hover:text-gray-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Your Name" icon={User} required>
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="Gamer tag or name"
                required
                className="form-input"
              />
            </Field>

            <Field label="TDM Tip (Optional)" icon={Swords}>
              <textarea
                value={tdmTip}
                onChange={e => setTdmTip(e.target.value)}
                placeholder="Share a short TDM tactic or loadout tip..."
                rows={3}
                className="form-input resize-none"
              />
            </Field>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-white/10 py-3 text-sm font-semibold text-gray-400 transition-colors hover:bg-white/5 hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-bold text-black transition-all hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  'Publish Setup'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon: typeof Smartphone;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
        <Icon className="w-3.5 h-3.5" />
        {label}
        {required && <span className="text-amber-500">*</span>}
      </label>
      {children}
    </div>
  );
}

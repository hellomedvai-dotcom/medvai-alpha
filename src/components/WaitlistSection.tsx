import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface WaitlistSectionProps {
  theme: ThemeMode;
}

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error('VITE_GOOGLE_SHEETS_SCRIPT_URL is not configured');
      }

      const payload = {
        submissionType: 'Priority Access',
        email: email,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit priority access: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[800px] h-[500px] rounded-full blur-[160px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-200/40'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[900px] mx-auto text-center space-y-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
          08 · Limited Alpha Launch
        </div>

        {/* Heading */}
        <div className="space-y-4 max-w-[720px] mx-auto">
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Get early access before public launch.
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Reserve early invite access to follow our development journey, receive product updates, and test MEDVAI before public release.
          </p>
        </div>

        {/* Form or Success State */}
        <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 sm:p-12 max-w-[640px] mx-auto">
          {submitted ? (
            <div className="space-y-4 py-4 animate-in fade-in zoom-in duration-500">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`font-heading font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                You are on the priority waitlist!
              </h3>
              <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                We have sent a verification link to <span className="font-semibold text-emerald-600 dark:text-emerald-400">{email}</span>. You'll receive your early invitation batch code shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-[#8A92A3]' : 'text-slate-400'
                  }`} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email address..."
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm outline-none transition-all ${
                      isDark 
                        ? 'bg-black/60 border-white/15 text-white placeholder:text-[#8A92A3] focus:border-white focus:ring-1 focus:ring-white' 
                        : 'bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:ring-1 focus:ring-slate-800'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                    isDark 
                      ? 'bg-white text-black hover:bg-slate-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Join Priority Waitlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className={`flex flex-wrap items-center justify-center gap-6 text-xs pt-2 ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Private by Design & Consent First
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Zero Spam · Unsubscribe Anytime
                </span>
              </div>
            </form>
          )}
        </SpatialGlassCard>

      </div>
    </section>
  );
};

import React from 'react';
import { HeartHandshake, Shield, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface FounderSectionProps {
  theme: ThemeMode;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="founder-story" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Ambient Light */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[700px] h-[400px] rounded-full blur-[140px] ${
          isDark ? 'bg-blue-900/10' : 'bg-blue-100/40'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1080px] mx-auto space-y-12">
        
        {/* Section Badge */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            06 · Origin & Mission
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Why we built MEDVAI.
          </h2>
        </div>

        {/* Story Glass Container */}
        <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 sm:p-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Founder Quote & Vision */}
            <div className="md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <HeartHandshake className="w-4 h-4" />
                <span>Founder's Letter</span>
              </div>

              <blockquote className={`font-heading font-medium text-lg sm:text-xl leading-relaxed italic ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                "Healthcare should become understandable. AI should reduce fear, not amplify it. Technology should create clarity, and people deserve confidence before entering a clinic.
                <br /><br />
                We created MEDVAI to bridge the gap between people and their health — giving everyone an organized memory, clear understanding, and confidence when speaking with doctors."
              </blockquote>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <p className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>The MEDVAI Team & Clinical Advisory</p>
                  <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>Engineers, Physicians & Privacy Advocates</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clinical Intelligence</span>
                </div>
              </div>
            </div>

            {/* Right: Core Values Card */}
            <div className={`md:col-span-4 p-6 rounded-2xl border space-y-4 ${
              isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Shield className="w-4 h-4" />
                <span>Core Guiding Principles</span>
              </div>

              <ul className={`text-xs space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Empathy First:</strong> Technology built to reduce anxiety, never induce panic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Physician Partner:</strong> Augmenting doctor-patient communication without diagnosing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Absolute Privacy:</strong> Zero advertising, zero data monetization.</span>
                </li>
              </ul>
            </div>

          </div>
        </SpatialGlassCard>

      </div>
    </section>
  );
};

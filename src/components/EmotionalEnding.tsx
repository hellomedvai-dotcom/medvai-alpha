import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface EmotionalEndingProps {
  theme: ThemeMode;
}

export const EmotionalEnding: React.FC<EmotionalEndingProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[800px] h-[400px] rounded-full blur-[140px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-200/50'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto text-center">
        <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 sm:p-14 space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className={`font-heading font-bold text-2xl sm:text-4xl md:text-5xl leading-[1.2] tracking-tight max-w-[820px] mx-auto ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            "You deserve to understand your body before fear begins."
          </h2>

          <p className={`text-base sm:text-xl leading-relaxed max-w-[760px] mx-auto font-normal ${
            isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
          }`}>
            MEDVAI exists to replace <span className="text-emerald-400 font-semibold">confusion with clarity</span>, <span className="text-emerald-400 font-semibold">panic with confidence</span>, and <span className="text-emerald-400 font-semibold">forgotten health histories with lifelong understanding</span>.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>ONE CONTINUOUS HEALTH JOURNEY · MEDVAI</span>
          </div>
        </SpatialGlassCard>
      </div>
    </section>
  );
};

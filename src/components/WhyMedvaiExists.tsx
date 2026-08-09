import React from 'react';
import { Stethoscope, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface WhyMedvaiExistsProps {
  theme: ThemeMode;
}

export const WhyMedvaiExists: React.FC<WhyMedvaiExistsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="vision" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      <div id="why-medvai" className="scroll-mt-28" />
      <div className="w-full max-w-[1280px] mx-auto space-y-16">
        
        {/* Main Headline */}
        <div className="max-w-[840px] mx-auto text-center space-y-6">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            02 · Our Philosophy
          </div>
          
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Healthcare should feel understandable, not overwhelming.
          </h2>

          <p className={`text-base sm:text-xl font-normal leading-relaxed max-w-[760px] mx-auto ${
            isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
          }`}>
            When people notice health changes, they often struggle to explain when it started, what changed, how long it lasted, or what previous reports showed. MEDVAI was created to solve this communication gap — making every health conversation clearer, earlier, and more organized.
          </p>
        </div>

        {/* Prominent Core Pledge Box */}
        <SpatialGlassCard isDark={isDark} floatIndex={1} className="max-w-[840px] mx-auto p-8 sm:p-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-500 dark:text-emerald-400 mx-auto">
            <Stethoscope className="w-6 h-6" />
          </div>

          <h3 className={`font-heading font-bold text-xl sm:text-2xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            MEDVAI does NOT replace doctors.
            <br className="hidden sm:block" />
            <span className="text-emerald-500 dark:text-emerald-400"> MEDVAI helps people prepare before they meet one.</span>
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-[660px] mx-auto ${
            isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
          }`}>
            By synthesizing scattered records into organized timelines and translating clinical terminology into plain language, MEDVAI enables more meaningful, focused conversations with healthcare providers.
          </p>
        </SpatialGlassCard>

        {/* Storytelling Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-[1180px] mx-auto">
          
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Organize Health Memory
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Consolidates lifetime labs, consultations, and body metrics into one secure, searchable personal timeline.
            </p>
          </SpatialGlassCard>

          <SpatialGlassCard isDark={isDark} floatIndex={2} className="p-8 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Demystify Medical Language
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Replaces anxiety-inducing web searches with calm, grounded explanations tailored to your specific context.
            </p>
          </SpatialGlassCard>

          <SpatialGlassCard isDark={isDark} floatIndex={3} className="p-8 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Bridge Patient & Physician
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Generates concise 30-second clinical summaries so doctors can spend consultation time discussing care instead of history.
            </p>
          </SpatialGlassCard>

        </div>

      </div>
    </section>
  );
};

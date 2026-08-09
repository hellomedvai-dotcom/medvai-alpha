import React from 'react';
import { HelpCircle, Clock, AlertCircle, FileSearch, HeartHandshake } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface ProblemSectionProps {
  theme: ThemeMode;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="the-problem" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Subtle Volumetric Wash */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[700px] h-[400px] rounded-full blur-[140px] transition-opacity duration-1000 ${
          isDark ? 'bg-white/[0.02]' : 'bg-slate-200/40'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-20">
        
        {/* Header Block */}
        <div className="max-w-[760px] mx-auto text-center space-y-6">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            01 · The Human Challenge
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Understand your body earlier, not after it becomes serious.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
          }`}>
            Most people ignore small symptoms or turn to random internet searches that create panic. When they finally meet a doctor, they struggle to recall when changes started, what happened, and what medications they took.
          </p>
        </div>

        {/* The 4-Stage Patient Journey Friction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Stage 1 */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8A92A3]">STAGE 01</span>
                <HelpCircle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Cryptic Terminology
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Lab PDFs arrive filled with complex abbreviations and reference ranges without plain-language explanations.
              </p>
            </div>
            <div className={`mt-6 pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Outcome: Unnecessary late-night panic
            </div>
          </SpatialGlassCard>

          {/* Stage 2 */}
          <SpatialGlassCard isDark={isDark} floatIndex={2} className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8A92A3]">STAGE 02</span>
                <FileSearch className="w-5 h-5 text-rose-500 dark:text-red-400" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Random Search Traps
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Searching general search engines surfaces extreme worst-case scenarios, amplifying stress instead of providing context.
              </p>
            </div>
            <div className={`mt-6 pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Outcome: High anxiety without clarity
            </div>
          </SpatialGlassCard>

          {/* Stage 3 */}
          <SpatialGlassCard isDark={isDark} floatIndex={3} className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8A92A3]">STAGE 03</span>
                <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Rushed Consultations
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Appointments are short. Patients often freeze or forget crucial questions under time pressure.
              </p>
            </div>
            <div className={`mt-6 pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Outcome: Key concerns left unsaid
            </div>
          </SpatialGlassCard>

          {/* Stage 4 */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8A92A3]">STAGE 04</span>
                <AlertCircle className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Fragmented History
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Doctors spend valuable minutes searching disparate portals to reconstruct history instead of discussing treatment.
              </p>
            </div>
            <div className={`mt-6 pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Outcome: Lost clinical time
            </div>
          </SpatialGlassCard>

        </div>

      </div>
    </section>
  );
};

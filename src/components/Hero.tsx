import React, { useState } from 'react';
import { Activity, Mic, FileText, Clock, Stethoscope, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface HeroProps {
  theme: ThemeMode;
  onOpenWaitlist: () => void;
  onSeeVision: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onOpenWaitlist, onSeeVision }) => {
  const isDark = theme === 'dark';
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Volumetric Glow & Faint Particle Field */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] rounded-full blur-[120px] transition-opacity duration-1000 ${
            isDark ? 'bg-white/[0.035]' : 'bg-slate-300/30'
          }`}
        />
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 blur-[90px] transition-opacity duration-1000 ${
            isDark ? 'bg-white/[0.015]' : 'bg-slate-200/40'
          }`}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center text-center">
        {/* Release Pill Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-8 transition-all duration-300 ${
            isDark
              ? 'dark-glass-pill text-[#BFC5D2] border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
              : 'light-glass-pill text-slate-700 border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MEDVAI AI HEALTH OPERATING SYSTEM · LAUNCH RESERVATIONS OPEN</span>
        </div>

        {/* Main Display Headline */}
        <div className="max-w-[840px] mx-auto">
          <h1
            className={`font-heading font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.08] tracking-tight mb-6 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            An AI Health Operating System for Your Lifelong Journey.
          </h1>

          {/* Subheadline - max 760px text container as requested */}
          <p
            className={`max-w-[760px] mx-auto text-base sm:text-xl font-normal leading-relaxed mb-10 transition-colors duration-300 ${
              isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
            }`}
          >
            MEDVAI helps you understand your body earlier, organize your complete health journey, reduce unnecessary panic, and prepare better conversations with doctors — giving you clear understanding, never a diagnosis.
          </p>

          {/* Headline Action Buttons - Only 2 as strictly specified */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={onOpenWaitlist}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 group ${
                isDark
                  ? 'bg-white text-black hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_8px_25px_rgba(0,0,0,0.18)]'
              }`}
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onSeeVision}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border ${
                isDark
                  ? 'border-white/15 text-white hover:bg-white/5 hover:border-white/30'
                  : 'border-black/15 text-slate-800 hover:bg-slate-100 hover:border-black/30'
              }`}
            >
              <span>See Vision</span>
            </button>
          </div>
        </div>

        {/* Floating AI Health Workspace Visualization */}
        <div className="relative w-full max-w-[1180px] min-h-[520px] sm:min-h-[580px] my-4 rounded-3xl p-4 sm:p-8 flex items-center justify-center">
          
          {/* Subtle SVG Connecting Lines in Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-current text-white/40 overflow-visible" strokeWidth="1" strokeDasharray="4 4">
            <line x1="20%" y1="30%" x2="50%" y2="50%" />
            <line x1="80%" y1="25%" x2="50%" y2="50%" />
            <line x1="25%" y1="75%" x2="50%" y2="50%" />
            <line x1="75%" y1="75%" x2="50%" y2="50%" />
          </svg>

          {/* Grid Layout for Floating Glass Cards */}
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            
            {/* Card 1: Body Map (Left Top, md:col-span-4) */}
            <SpatialGlassCard
              isDark={isDark}
              floatIndex={1}
              className="md:col-span-4 p-6 text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                  Vitals Live
                </span>
              </div>
              <h3 className={`font-heading font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Interactive Body Map
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Mark symptom locations, track intensity over time, and notice subtle patterns early.
              </p>
              
              {/* Mini Interactive Body Graph Preview */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-black/40 border-white/10 text-[#BFC5D2]' : 'bg-slate-50 border-black/5 text-slate-700'
              }`}>
                <div>
                  <p className="font-mono text-[10px] text-[#8A92A3]">RESTING HEART</p>
                  <p className="font-semibold text-sm">68 BPM</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] text-[#8A92A3]">BLOOD OXYGEN</p>
                  <p className="font-semibold text-sm text-emerald-400">99% SpO2</p>
                </div>
              </div>
            </SpatialGlassCard>

            {/* Card 2: Voice AI (Center Main, md:col-span-4) */}
            <SpatialGlassCard
              isDark={isDark}
              floatIndex={2}
              className="md:col-span-4 p-6 text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${
                    isDark ? 'bg-white/5 border-white/15 text-white/80' : 'bg-slate-100 border-black/10 text-slate-700'
                  }`}>
                    Speech AI
                  </span>
                </div>
                <h3 className={`font-heading font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Voice Health Assistant
                </h3>
                <p className={`text-xs mb-4 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                  Describe symptoms naturally in your native language as MEDVAI organizes them clearly.
                </p>
              </div>

              {/* Animated Waveform Simulation */}
              <div className={`p-3.5 rounded-xl border flex flex-col gap-2 ${
                isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-black/5'
              }`}>
                <div className="flex items-center justify-center gap-1 h-6">
                  <span className="w-1 h-3 bg-slate-800 dark:bg-white/70 rounded-full animate-pulse" />
                  <span className="w-1 h-5 bg-slate-900 dark:bg-white rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-slate-700 dark:bg-white/50 rounded-full animate-pulse delay-150" />
                  <span className="w-1 h-6 bg-slate-900 dark:bg-white rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-slate-800 dark:bg-white/80 rounded-full animate-pulse delay-100" />
                  <span className="w-1 h-2 bg-slate-600 dark:bg-white/40 rounded-full animate-pulse" />
                </div>
                <p className={`text-[11px] italic text-center ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  "Tell me what's bothering you..."
                </p>
              </div>
            </SpatialGlassCard>

            {/* Card 3: Medical Reports (Right Top, md:col-span-4) */}
            <SpatialGlassCard
              isDark={isDark}
              floatIndex={3}
              className="md:col-span-4 p-6 text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full border border-blue-400/20">
                  Lab Translator
                </span>
              </div>
              <h3 className={`font-heading font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Medical Reports
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Translates dense lab PDFs and radiology reports into clear plain language.
              </p>

              {/* Sample Lab Result Snippet */}
              <div className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                isDark ? 'bg-black/40 border-white/10 text-[#BFC5D2]' : 'bg-slate-50 border-black/5 text-slate-700'
              }`}>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8A92A3]">
                  <span>LAB RESULT ANALYSIS</span>
                  <span className="text-emerald-500 font-semibold">NORMAL</span>
                </div>
                <p className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>TSH: 2.1 mIU/L</p>
                <p className="text-[11px] text-[#8A92A3]">Thyroid regulatory hormone functioning optimal.</p>
              </div>
            </SpatialGlassCard>

            {/* Card 4: Health Memory (Bottom Left, md:col-span-6) */}
            <SpatialGlassCard
              isDark={isDark}
              floatIndex={2}
              className="md:col-span-6 p-6 text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${
                  isDark ? 'bg-white/5 border-white/15 text-white/80' : 'bg-slate-100 border-black/10 text-slate-700'
                }`}>
                  Lifelong Connected Memory
                </span>
              </div>
              <h3 className={`font-heading font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Your Health Story
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Every report, every symptom, every recovery, and every milestone — connected forever.
              </p>

              {/* Timeline Chips */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-3 py-1 rounded-lg border font-mono text-[11px] ${
                  isDark ? 'bg-white/5 border-white/10 text-[#BFC5D2]' : 'bg-slate-100 border-black/5 text-slate-700'
                }`}>
                  • Penicillin Allergy
                </span>
                <span className={`px-3 py-1 rounded-lg border font-mono text-[11px] ${
                  isDark ? 'bg-white/5 border-white/10 text-[#BFC5D2]' : 'bg-slate-100 border-black/5 text-slate-700'
                }`}>
                  • 2024 Metabolic Panel
                </span>
                <span className={`px-3 py-1 rounded-lg border font-mono text-[11px] ${
                  isDark ? 'bg-white/5 border-white/10 text-[#BFC5D2]' : 'bg-slate-100 border-black/5 text-slate-700'
                }`}>
                  • Tdap Booster
                </span>
              </div>
            </SpatialGlassCard>

            {/* Card 5: Doctor Brief (Bottom Right, md:col-span-6) */}
            <SpatialGlassCard
              isDark={isDark}
              floatIndex={1}
              className="md:col-span-6 p-6 text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded-full border border-purple-400/20">
                  Appointment Prep
                </span>
              </div>
              <h3 className={`font-heading font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                60-Second Doctor Brief
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Condenses weeks of symptom logs into a clean, 1-page clinical summary for your doctor visit.
              </p>

              {/* Brief Checklist Preview */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 text-xs ${
                isDark ? 'bg-black/40 border-white/10 text-[#BFC5D2]' : 'bg-slate-50 border-black/5 text-slate-700'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Primary complaint: Afternoon fatigue (14 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] text-[#8A92A3]">2 targeted questions prepared for physician</span>
                </div>
              </div>
            </SpatialGlassCard>

          </div>
        </div>

      </div>
    </section>
  );
};

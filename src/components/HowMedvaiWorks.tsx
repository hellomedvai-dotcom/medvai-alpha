import React, { useState } from 'react';
import { 
  Activity, Mic, FileText, Brain, HelpCircle, ArrowRight, ShieldCheck, 
  Stethoscope, Clock, CheckCircle2, AlertCircle, FileCheck, Calendar, Sparkles, HeartPulse
} from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface HowMedvaiWorksProps {
  theme: ThemeMode;
}

type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';

interface StepInfo {
  id: StepKey;
  num: string;
  title: string;
  tagline: string;
  icon: React.FC<{ className?: string }>;
}

const STEPS: StepInfo[] = [
  {
    id: 'step1',
    num: '01',
    title: 'Understand',
    tagline: 'Body Map, Voice & Reports',
    icon: Activity
  },
  {
    id: 'step2',
    num: '02',
    title: 'Explain',
    tagline: 'Plain-Language Translation',
    icon: Brain
  },
  {
    id: 'step3',
    num: '03',
    title: 'Guide',
    tagline: 'Evidence-Grounded Actions',
    icon: ShieldCheck
  },
  {
    id: 'step4',
    num: '04',
    title: 'Prepare',
    tagline: '30s Doctor Brief',
    icon: Stethoscope
  },
  {
    id: 'step5',
    num: '05',
    title: 'Remember',
    tagline: 'Lifelong Health Story',
    icon: Clock
  }
];

export const HowMedvaiWorks: React.FC<HowMedvaiWorksProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState<StepKey>('step1');

  // Step 1 Interactive Body Node simulation
  const [tappedBodyArea, setTappedBodyArea] = useState<string>('Chest & Upper Back');
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  // Step 2 Plain Language Filter state
  const [activeExplainTab, setActiveExplainTab] = useState<'translate' | 'compare' | 'reassure'>('translate');

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      {/* Volumetric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[1000px] h-[600px] rounded-full blur-[180px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-100/60'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-[840px] mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-emerald-400 border border-emerald-500/20 bg-emerald-500/10' : 'text-emerald-700 border border-emerald-500/30 bg-emerald-50'
          }`}>
            02.5 · Continuous Health Journey
          </div>
          
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            How MEDVAI Works
          </h2>

          <p className={`text-base sm:text-xl font-normal leading-relaxed max-w-[760px] mx-auto ${
            isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
          }`}>
            One conversation. One understanding. One lifelong health journey.
          </p>

          <p className={`text-xs sm:text-sm font-mono max-w-[680px] mx-auto pt-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Something feels different → MEDVAI understands → MEDVAI explains → MEDVAI guides → MEDVAI prepares doctor visit → MEDVAI remembers forever.
          </p>
        </div>

        {/* CONNECTED TIMELINE PROGRESS BAR (Desktop & Mobile) */}
        <div className="relative max-w-[1100px] mx-auto">
          {/* Subtle connecting line */}
          <div className={`hidden md:block absolute top-1/2 left-[5%] right-[5%] -translate-y-1/2 h-[2px] z-0 ${
            isDark ? 'bg-white/10' : 'bg-slate-200'
          }`} />

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {STEPS.map((step) => {
              const isActive = activeStep === step.id;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? isDark
                        ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-[1.03] z-10'
                        : 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.03] z-10'
                      : isDark
                      ? 'dark-glass border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5'
                      : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? isDark ? 'bg-black/10 text-black' : 'bg-white/20 text-white'
                        : isDark ? 'bg-white/10 text-white/80' : 'bg-slate-100 text-slate-600'
                    }`}>
                      STEP {step.num}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? (isDark ? 'text-black' : 'text-white') : 'text-emerald-500'}`} />
                  </div>

                  <div>
                    <h3 className={`font-heading font-bold text-base sm:text-lg mb-0.5 ${
                      isActive 
                        ? (isDark ? 'text-black' : 'text-white')
                        : (isDark ? 'text-white' : 'text-slate-900')
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[11px] leading-tight ${
                      isActive
                        ? (isDark ? 'text-slate-700' : 'text-slate-300')
                        : (isDark ? 'text-[#8A92A3]' : 'text-slate-500')
                    }`}>
                      {step.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP DISPLAY PANELS */}
        <div className="max-w-[1100px] mx-auto">
          
          {/* ================= STEP 01: UNDERSTAND ================= */}
          {activeStep === 'step1' && (
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10 dark:border-white/10 border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      STEP 01 · UNDERSTAND
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Your Journey Starts Here
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Multimodal Context Gathering
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  The AI asks intelligent follow-up questions across body location, voice conversations, medical reports, and lifestyle history until it fully understands the context.
                </p>
              </div>

              {/* Interactive Multi-Channel Input Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Channel A: Interactive Body Map */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50/90 border-slate-200'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <Activity className="w-4 h-4" /> 1A · Body Map Signal
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">TAP AREA</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Tap body region to pinpoint sensation and intensity over time.
                    </p>
                  </div>

                  {/* Body Map Nodes Selector */}
                  <div className="grid grid-cols-2 gap-2">
                    {['Chest & Upper Back', 'Right Abdomen', 'Head & Temple', 'Neck & Thyroid'].map((area) => (
                      <button
                        key={area}
                        onClick={() => setTappedBodyArea(area)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                          tappedBodyArea === area
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold'
                            : isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        • {area}
                      </button>
                    ))}
                  </div>

                  {/* Simulation output */}
                  <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                    isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                      <span>LOCATION PINPOINTED</span>
                      <span>TEMPORAL TREND</span>
                    </div>
                    <p className="font-semibold text-xs">{tappedBodyArea}</p>
                    <p className="text-[11px] text-slate-400">Noticed 3 days ago, worst after meals (Severity 3/10).</p>
                  </div>
                </div>

                {/* Channel B: Voice AI Conversation */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50/90 border-slate-200'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5 font-semibold">
                        <Mic className="w-4 h-4" /> 1B · Voice Conversation
                      </span>
                      <button
                        onClick={() => setIsVoiceActive(!isVoiceActive)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      >
                        {isVoiceActive ? 'PAUSE VOICE' : 'SIMULATE VOICE'}
                      </button>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Speak naturally in your native language. No medical jargon needed.
                    </p>
                  </div>

                  {/* Voice waveform simulation */}
                  <div className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-3 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1 h-8">
                      <span className={`w-1 rounded-full bg-blue-400 ${isVoiceActive ? 'h-6 animate-pulse' : 'h-3'}`} />
                      <span className={`w-1 rounded-full bg-blue-500 ${isVoiceActive ? 'h-8 animate-pulse delay-75' : 'h-5'}`} />
                      <span className={`w-1 rounded-full bg-blue-300 ${isVoiceActive ? 'h-4 animate-pulse delay-150' : 'h-2'}`} />
                      <span className={`w-1 rounded-full bg-blue-400 ${isVoiceActive ? 'h-7 animate-pulse' : 'h-4'}`} />
                      <span className={`w-1 rounded-full bg-blue-500 ${isVoiceActive ? 'h-5 animate-pulse delay-100' : 'h-3'}`} />
                    </div>

                    <p className={`text-xs italic text-center ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      "Tell me what's bothering you."
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p className="font-mono text-emerald-400 font-semibold">AUTOMATIC STRUCTURED OUTPUT:</p>
                    <p>• AI asks follow-up: "Does the tightness spread to your back when lying down?"</p>
                  </div>
                </div>

                {/* Channel C: Medical Report & History Synthesizer */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50/90 border-slate-200'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5 font-semibold">
                        <FileText className="w-4 h-4" /> 1C · Report & History
                      </span>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        PDF / LABS
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Upload pathology reports, blood panels, or historical discharge notes.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>PARSED DOCUMENT</span>
                      <span className="text-emerald-400">3 BIOMARKERS FOUND</span>
                    </div>
                    <p className="font-semibold text-xs">Comprehensive Metabolic Panel (2026)</p>
                    <p className="text-[11px] text-slate-400">Cross-referenced with 2024 baseline lab records.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400">
                    ✓ Complete Context Synthesized (Body + Voice + Labs + History)
                  </div>
                </div>

              </div>
            </SpatialGlassCard>
          )}

          {/* ================= STEP 02: EXPLAIN ================= */}
          {activeStep === 'step2' && (
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10 dark:border-white/10 border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      STEP 02 · EXPLAIN
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      ✨ The Magic Moment
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Plain-Language Medical Translation
                  </h3>
                </div>
                <div className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  MEDVAI translates complex medical information into language anyone can understand. Everything is calm, reassuring, and evidence-grounded. <strong className="text-emerald-400">The goal is understanding. Never fear.</strong>
                </div>
              </div>

              {/* Interactive Explain Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveExplainTab('translate')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeExplainTab === 'translate'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  1. What Symptoms Represent & Connect
                </button>
                <button
                  onClick={() => setActiveExplainTab('compare')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeExplainTab === 'compare'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  2. What Changed vs Previous Reports
                </button>
                <button
                  onClick={() => setActiveExplainTab('reassure')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeExplainTab === 'reassure'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  3. What Deserves Attention vs Probably Safe
                </button>
              </div>

              {/* Tab Details Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* Clinical Original terminology */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-red-500/[0.04] border-red-500/20 text-slate-300' : 'bg-red-50/60 border-red-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                      TYPICAL CONFUSING LAB / WEB SEARCH
                    </span>
                    <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                      HIGH ANXIETY
                    </span>
                  </div>

                  {activeExplainTab === 'translate' && (
                    <p className="text-xs sm:text-sm font-mono leading-relaxed">
                      "Erythrocyte sedimentation rate 38 mm/hr. Mild retrosternal discomfort postprandial with dyspnea on exertion. Differential considerations: gastroesophageal reflux vs early pericardial reaction."
                    </p>
                  )}

                  {activeExplainTab === 'compare' && (
                    <p className="text-xs sm:text-sm font-mono leading-relaxed">
                      "Serum Ferritin: 18 ng/mL (Reference 30-400). Hemoglobin 12.1 g/dL. Microcytic indices noted. Shift observed from 2024 baseline (42 ng/mL)."
                    </p>
                  )}

                  {activeExplainTab === 'reassure' && (
                    <p className="text-xs sm:text-sm font-mono leading-relaxed">
                      "Transient sinus tachycardia 102 bpm during nocturnal monitoring episode. Isolated PVCs detected. No ST segment deviation."
                    </p>
                  )}

                  <div className="text-[11px] text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Raw web searches lead to panic and unverified worst-case assumptions.</span>
                  </div>
                </div>

                {/* MEDVAI Plain Language Explanation */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-emerald-500/[0.05] border-emerald-500/30 text-white' : 'bg-emerald-50/80 border-emerald-300 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> MEDVAI PLAIN-LANGUAGE EXPLANATION
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      CALM & EVIDENCE-BASED
                    </span>
                  </div>

                  {activeExplainTab === 'translate' && (
                    <ul className="text-xs sm:text-sm space-y-2.5 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>What it represents:</strong> Mild chest tightness after eating is commonly related to acid reflux or digestive pressure.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>How symptoms connect:</strong> Your inflammation markers (ESR 38) are slightly elevated, which can occur during simple temporary body stress or mild tissue irritation.</span>
                      </li>
                    </ul>
                  )}

                  {activeExplainTab === 'compare' && (
                    <ul className="text-xs sm:text-sm space-y-2.5 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Trend Comparison:</strong> Your iron storage levels (Ferritin 18) dropped compared to your 2024 baseline (42). This explains your recent afternoon fatigue.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Context:</strong> Your overall blood count is stable, meaning your body is adapting smoothly while iron reserves are lower.</span>
                      </li>
                    </ul>
                  )}

                  {activeExplainTab === 'reassure' && (
                    <ul className="text-xs sm:text-sm space-y-2.5 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>What deserves attention:</strong> Mentioning the brief heart rate rise during your next routine checkup.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>What is likely NOT dangerous:</strong> Isolated extra heartbeats (PVCs) without dizziness or pain are extremely common and frequently triggered by temporary fatigue or caffeine.</span>
                      </li>
                    </ul>
                  )}

                  <div className="p-3 rounded-xl bg-black/30 dark:bg-black/50 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono">
                    ✦ MEDVAI focuses on clarity, context, and peace of mind. Never panic.
                  </div>
                </div>

              </div>
            </SpatialGlassCard>
          )}

          {/* ================= STEP 03: GUIDE ================= */}
          {activeStep === 'step3' && (
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10 dark:border-white/10 border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      STEP 03 · GUIDE
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Clear Next Steps
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Personalized Guidance Engine
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  Based on your complete context, MEDVAI recommends appropriate next steps. <strong className="text-amber-400">The emphasis is guidance — never diagnosis.</strong>
                </p>
              </div>

              {/* 5 Guidance Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className={`font-heading font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    1. Monitor Symptoms
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Log symptom frequency over the next 7 days using the automated daily check-in prompt.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <h4 className={`font-heading font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    2. Lifestyle Adjustments
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Elevate head during sleep and avoid heavy meals 2 hours before bed to reduce reflux pressure.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="p-2 w-fit rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h4 className={`font-heading font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    3. Questions for Your Doctor
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    "Should we recheck serum ferritin levels in 6 weeks?" automatically saved to your Doctor Brief.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <h4 className={`font-heading font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    4. When to Schedule Care
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    If discomfort persists past 14 days or disrupts sleep, consider booking a non-urgent primary consultation.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 sm:col-span-2 lg:col-span-2 ${
                  isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="p-2 w-fit rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h4 className={`font-heading font-semibold text-sm text-red-400`}>
                    5. Emergency Safety Signs (Always Active)
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    If you experience sudden severe chest pain radiating to the jaw/left arm, sudden shortness of breath, or fainting, seek immediate emergency medical care. MEDVAI actively highlights critical red flags.
                  </p>
                </div>

              </div>
            </SpatialGlassCard>
          )}

          {/* ================= STEP 04: PREPARE ================= */}
          {activeStep === 'step4' && (
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10 dark:border-white/10 border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      STEP 04 · PREPARE
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Clinical Doctor Brief
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    30-Second Doctor Brief Generation
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  Everything collected earlier automatically becomes a concise, structured physician summary. Doctors save 10+ minutes during consultations.
                </p>
              </div>

              {/* Realistic Animated Preview of Doctor Brief Document */}
              <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 font-sans text-xs sm:text-sm max-w-[860px] mx-auto shadow-2xl ${
                isDark ? 'bg-slate-950 border-purple-500/30 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}>
                {/* Brief Header */}
                <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        MEDVAI CLINICAL PRE-VISIT SUMMARY
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">PATIENT PREPARATION BRIEF · GENERATED AUGUST 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    READY FOR PHYSICIAN
                  </span>
                </div>

                {/* Brief Body Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  
                  {/* Left Column: Timeline & Symptoms */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">1. PRIMARY CONCERN & TIMELINE</span>
                      <p className="font-medium text-slate-900 dark:text-white mt-1">
                        Postprandial substernal tightness (14 days duration)
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Onset: Aug 2026. Aggravated post-dinner, self-limiting within 20 mins.
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">2. BODY LOCATIONS & INTENSITY</span>
                      <p className="text-slate-300 dark:text-slate-300 mt-1">
                        • Upper epigastric / mid-chest (Severity 3/10)
                        <br />
                        • No radiation to left arm or jaw. No shortness of breath.
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">3. CURRENT MEDICATIONS & ALLERGIES</span>
                      <p className="text-slate-300 dark:text-slate-300 mt-1">
                        • Multivitamin (daily), Antacid as needed.
                        <br />
                        • Allergy: Penicillin (Hives noted 2021).
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Labs & Patient Questions */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">4. RECENT LAB BIOMARKERS & TRENDS</span>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 mt-1">
                        <div className="flex justify-between font-mono text-[11px]">
                          <span>Ferritin: 18 ng/mL</span>
                          <span className="text-amber-400">↓ vs 42 (2024)</span>
                        </div>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span>TSH: 2.1 mIU/L</span>
                          <span className="text-emerald-400">NORMAL</span>
                        </div>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span>Lipid Panel: LDL 105</span>
                          <span className="text-emerald-400">STABLE</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">5. PREPARED PATIENT QUESTIONS</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1 text-[11px]">
                        <li>Is a short trial of H2 blocker appropriate for heartburn?</li>
                        <li>Should we recheck serum ferritin in 6-8 weeks?</li>
                      </ul>
                    </div>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>✓ 30-Second Glanceable Format</span>
                  <span>Printable / PDF Shareable</span>
                </div>
              </div>
            </SpatialGlassCard>
          )}

          {/* ================= STEP 05: REMEMBER ================= */}
          {activeStep === 'step5' && (
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10 dark:border-white/10 border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      STEP 05 · REMEMBER
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      MEDVAI Long-Term Advantage
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Your Health Story — Connected Forever
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  Every report, every symptom, every recovery, and every milestone stay connected over years. <strong className="text-emerald-400">MEDVAI never forgets your journey.</strong>
                </p>
              </div>

              {/* Connected Emotional Timeline 2026 -> 2027 -> 2028 -> 2030 */}
              <div className="relative py-6">
                
                {/* Horizontal connecting ribbon line */}
                <div className={`hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] z-0 ${
                  isDark ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-400/50 to-emerald-500/20' : 'bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200'
                }`} />

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  
                  {/* Year 2026 */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-black/60 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xl text-emerald-400">2026</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        BASELINE
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>First Health Onboarding</p>
                      <p className="text-slate-400 text-[11px]">• Logged baseline metabolic lab panel</p>
                      <p className="text-slate-400 text-[11px]">• Pinpointed epigastric symptom pattern</p>
                    </div>
                  </div>

                  {/* Year 2027 */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-black/60 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xl text-emerald-400">2027</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        RECOVERY
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ferritin Normalization</p>
                      <p className="text-slate-400 text-[11px]">• Iron levels restored to 45 ng/mL</p>
                      <p className="text-slate-400 text-[11px]">• Energy levels back to 100% baseline</p>
                    </div>
                  </div>

                  {/* Year 2028 */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-black/60 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xl text-emerald-400">2028</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        PREVENTIVE
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Annual Health Review</p>
                      <p className="text-slate-400 text-[11px]">• Tdap booster automated reminder</p>
                      <p className="text-slate-400 text-[11px]">• Lipid trends verified completely stable</p>
                    </div>
                  </div>

                  {/* Year 2030 */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-black/60 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xl text-emerald-400">2030+</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        LIFELONG
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Complete Health Memory</p>
                      <p className="text-slate-400 text-[11px]">• 4+ years of unbroken health history</p>
                      <p className="text-slate-400 text-[11px]">• Instant summary for any new specialist</p>
                    </div>
                  </div>

                </div>

              </div>

              <div className={`p-5 rounded-2xl border text-center space-y-2 max-w-[720px] mx-auto ${
                isDark ? 'bg-white/5 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <p className="font-heading font-bold text-base sm:text-lg">
                  "No more starting over with every new doctor. No more forgotten medical records."
                </p>
                <p className="text-xs text-slate-400">
                  Your health journey remains unified, private, and accessible whenever you need it.
                </p>
              </div>
            </SpatialGlassCard>
          )}

        </div>

      </div>
    </section>
  );
};

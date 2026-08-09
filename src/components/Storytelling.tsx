import React, { useState } from 'react';
import { HelpCircle, Sparkles, Shield, Cpu, Activity, Mic, FileText, Clock, Stethoscope, ArrowUpRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface StorytellingProps {
  theme: ThemeMode;
  onOpenWaitlist: () => void;
}

export const Storytelling: React.FC<StorytellingProps> = ({ theme, onOpenWaitlist }) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'jargon' | 'medvai'>('medvai');

  return (
    <section id="vision" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      {/* Container - max 1280px */}
      <div className="w-full max-w-[1280px] mx-auto space-y-36">

        {/* ================= CHAPTER 1: THE PROBLEM ================= */}
        <div className="max-w-[760px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#8A92A3] border border-white/10 bg-white/5">
            Chapter 01 · The Reality
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Healthcare was built for billing, not for human understanding.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Every year, billions of medical records are generated. Yet when patients open their lab reports, they are greeted by cryptic Latin terminology, unexplained reference ranges, and rushed 12-minute doctor appointments that leave them searching the internet in panic.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
            <div className={`p-5 rounded-2xl border ${isDark ? 'dark-glass border-white/10' : 'light-glass border-black/5'}`}>
              <p className="font-heading font-bold text-2xl mb-1 text-red-400">82%</p>
              <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Of patients admit to misunderstanding their lab results or diagnosis letters.
              </p>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'dark-glass border-white/10' : 'light-glass border-black/5'}`}>
              <p className="font-heading font-bold text-2xl mb-1 text-amber-400">12 Mins</p>
              <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Average time a primary care physician has per patient appointment.
              </p>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'dark-glass border-white/10' : 'light-glass border-black/5'}`}>
              <p className="font-heading font-bold text-2xl mb-1 text-blue-400">5+ Portals</p>
              <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                Average fragmentation of health records across different hospital systems.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CHAPTER 2: THE CONFUSION VS CLARITY ================= */}
        <div id="the-os" className="max-w-[1020px] mx-auto space-y-10">
          <div className="text-center space-y-4 max-w-[760px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#8A92A3] border border-white/10 bg-white/5">
              Chapter 02 · The Transformation
            </div>
            <h2 className={`font-heading font-bold text-3xl sm:text-4xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Bridging the gap between medical jargon and human peace of mind.
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
              Toggle below to compare raw medical portal output against MEDVAI's structured intelligence.
            </p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex justify-center">
            <div className={`p-1.5 rounded-full border inline-flex items-center gap-1 ${
              isDark ? 'bg-black/60 border-white/15' : 'bg-slate-100 border-black/10'
            }`}>
              <button
                onClick={() => setActiveTab('jargon')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === 'jargon'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Traditional Portal Jargon
              </button>
              <button
                onClick={() => setActiveTab('medvai')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === 'medvai'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                    : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                MEDVAI AI Health Operating System View
              </button>
            </div>
          </div>

          {/* Comparison Display Box */}
          <div className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 ${
            activeTab === 'jargon'
              ? 'border-red-500/30 bg-red-950/10'
              : isDark ? 'dark-glass border-white/15' : 'light-glass border-black/10'
          }`}>
            {activeTab === 'jargon' ? (
              <div className="space-y-4 text-left font-mono text-xs sm:text-sm text-red-200/80">
                <div className="flex justify-between border-b border-red-500/20 pb-3 text-red-400">
                  <span>RAW CLINICAL PATHOLOGY EXCERPT</span>
                  <span>FLAGGED: ABNORMAL</span>
                </div>
                <p>
                  Serum Thyroid-Stimulating Hormone (TSH): 5.8 mIU/L [Ref: 0.4 - 4.2 mIU/L] HIGH.
                </p>
                <p>
                  Anti-Thyroperoxidase (Anti-TPO) Antibodies: 142 IU/mL [Ref: &lt;34 IU/mL] ELEVATED.
                </p>
                <p className="text-red-300/60 italic text-xs">
                  Note: Autoimmune thyroiditis / subclinical hypothyroidism cannot be excluded. Patient advised to consult endocrinology or primary care provider for clinical correlation.
                </p>
                <div className="pt-2 text-[11px] text-red-400/80 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Result: Patient searches internet at 11 PM, inducing unnecessary fear and anxiety.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-heading font-semibold text-sm tracking-wide text-white">MEDVAI PATIENT BRIEF</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                    CALM STRUCTURED ANALYSIS
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-medium text-lg text-white">
                    What this means for you in plain language:
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-700'}`}>
                    Your thyroid gland (which regulates your body's energy and metabolism) is working slightly harder than usual. Your immune system is producing antibodies that slow down thyroid activity. This is extremely common and highly manageable.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs ${
                  isDark ? 'bg-black/50 border-white/10 text-[#BFC5D2]' : 'bg-slate-50 border-black/5 text-slate-700'
                }`}>
                  <div>
                    <span className="font-mono text-[10px] text-[#8A92A3]">LIKELY SYMPTOMS YOU MAY FEEL</span>
                    <p className="mt-1 font-medium text-white">Mild afternoon fatigue, feeling unusually cold, or sluggish recovery.</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#8A92A3]">NEXT RECOMMENDED ACTION</span>
                    <p className="mt-1 font-medium text-emerald-400">Schedule a routine check-in with your doctor in 2–4 weeks. No immediate emergency.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                  <span className="text-xs text-[#8A92A3]">
                    Prepared 2 specific questions for your doctor visit.
                  </span>
                  <button
                    onClick={onOpenWaitlist}
                    className="text-xs font-medium text-white hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Experience this intelligence <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= CHAPTER 3: THE 5 PILLARS OF MEDVAI ================= */}
        <div className="max-w-[1180px] mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-[760px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#8A92A3] border border-white/10 bg-white/5">
              Chapter 03 · Core Operating Pillars
            </div>
            <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Five pillars designed to unify your health life.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Pillar 1 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              isDark ? 'dark-glass dark-glass-hover' : 'light-glass hover:shadow-xl'
            }`}>
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1. Report Translation
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Upload PDFs, images, or scan lab reports. MEDVAI translates medical language into clear, contextualized explanations without sensationalism.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              isDark ? 'dark-glass dark-glass-hover' : 'light-glass hover:shadow-xl'
            }`}>
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2. Voice Health Companion
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Speak naturally about symptoms, medications, or health concerns. MEDVAI responds in a calm voice, clarifying doubts in real time.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              isDark ? 'dark-glass dark-glass-hover' : 'light-glass hover:shadow-xl'
            }`}>
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  3. Interactive Body Map
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Visualizes your organs, vitals, and systemic health nodes. Connect symptoms directly to anatomy to understand how your body works as a system.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 md:col-span-2 ${
              isDark ? 'dark-glass dark-glass-hover' : 'light-glass hover:shadow-xl'
            }`}>
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  4. 30-Second Doctor Brief
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Before your next medical appointment, MEDVAI generates a concise, 1-page clinical summary containing your timeline, active medications, key symptoms, and targeted questions to ask your physician.
                </p>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              isDark ? 'dark-glass dark-glass-hover' : 'light-glass hover:shadow-xl'
            }`}>
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  5. Lifelong Health Memory
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Encrypted, patient-controlled longitudinal record. Never lose track of past surgeries, vaccines, or blood tests again.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CHAPTER 4: WHY MEDVAI IS DIFFERENT ================= */}
        <div className="max-w-[1020px] mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-[760px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#8A92A3] border border-white/10 bg-white/5">
              Chapter 04 · The Distinction
            </div>
            <h2 className={`font-heading font-bold text-3xl sm:text-4xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why search engines fail at health, and why MEDVAI succeeds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Generic Web Search */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-red-950/10 border-red-500/20' : 'bg-red-50/50 border-red-200'}`}>
              <p className="font-mono text-xs text-red-400 mb-3 uppercase tracking-wider">GENERIC WEB SEARCH ("DR. GOOGLE")</p>
              <ul className="space-y-3 text-xs sm:text-sm text-red-200/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Shows terrifying worst-case scenarios and rare conditions first.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Lacks context about your personal baseline and medical history.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Fragmented articles written for advertising ad revenue.</span>
                </li>
              </ul>
            </div>

            {/* MEDVAI OS */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'dark-glass border-emerald-500/30' : 'light-glass border-emerald-500/30'}`}>
              <p className="font-mono text-xs text-emerald-400 mb-3 uppercase tracking-wider">MEDVAI AI HEALTH OPERATING SYSTEM</p>
              <ul className={`space-y-3 text-xs sm:text-sm ${isDark ? 'text-[#BFC5D2]' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Grounds responses in calm, validated medical knowledge bases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Integrates your encrypted longitudinal history for tailored context.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Prepares you to have a productive, confident conversation with your physician.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

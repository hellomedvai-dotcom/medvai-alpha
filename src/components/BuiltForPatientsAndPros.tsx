import React from 'react';
import { User, UserCheck, Stethoscope, Clock, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface BuiltForPatientsAndProsProps {
  theme: ThemeMode;
}

export const BuiltForPatientsAndPros: React.FC<BuiltForPatientsAndProsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative space-y-28 py-20">
      
      {/* ================= SECTION 4: BUILT FOR PATIENTS ================= */}
      <section id="for-patients" className="relative px-4 sm:px-6 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-16">
          
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
              isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
            }`}>
              04 · Built for Patients
            </div>

            <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Walk into every appointment with total clarity & confidence.
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#BFC5D2]' : 'text-slate-600'
            }`}>
              MEDVAI transforms how you relate to your health. No complex jargon, no alarming web searches—just clear, organized understanding of your own body.
            </p>
          </div>

          {/* 3 Patient Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 w-fit">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Calm Understanding
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Understand what lab metrics mean in human terms without panicking over uncontextualized internet results.
              </p>
              <ul className={`pt-4 space-y-2 border-t text-xs ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-600'}`}>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Plain-language biomarker breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Grounded clinical literature context</span>
                </li>
              </ul>
            </SpatialGlassCard>

            <SpatialGlassCard isDark={isDark} floatIndex={2} className="p-8 space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 w-fit">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Prepared Consultation
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Arrive with a structured summary of your concerns, timeline, and questions so you never forget what matters most.
              </p>
              <ul className={`pt-4 space-y-2 border-t text-xs ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-600'}`}>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Key questions checklist for your doctor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Chronological symptom logs</span>
                </li>
              </ul>
            </SpatialGlassCard>

            <SpatialGlassCard isDark={isDark} floatIndex={3} className="p-8 space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400 w-fit">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Lifelong Continuity
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Keep all your medical history, prescriptions, and doctor notes connected across years and specialists.
              </p>
              <ul className={`pt-4 space-y-2 border-t text-xs ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-600'}`}>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Unified longitudinal health memory</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Seamless doctor-to-doctor transfer</span>
                </li>
              </ul>
            </SpatialGlassCard>

          </div>

        </div>
      </section>

      {/* ================= SECTION 5: BUILT FOR HEALTHCARE PROFESSIONALS ================= */}
      <section id="for-professionals" className="relative px-4 sm:px-6 overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-16">
          
          {/* Header Card with Clinical Focus */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-10 sm:p-12 text-left space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-[700px]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
                  05 · Built for Healthcare Professionals
                </div>

                <h2 className={`font-heading font-bold text-3xl sm:text-4xl leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Better prepared patients. Cleaner history. More time for care.
                </h2>

                <p className={`text-base leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  MEDVAI empowers patients with clear context and organized health history. When patients arrive with a structured 30-Second Doctor Brief, physicians spend less time collecting scattered history and more time delivering meaningful clinical care.
                </p>

                <div className={`p-4 rounded-xl border italic text-sm font-medium ${
                  isDark ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}>
                  "Technology should enhance the doctor-patient relationship, never replace it."
                </div>
              </div>

              {/* Stethoscope Badge */}
              <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 shrink-0 ${
                isDark ? 'bg-black/60 border-emerald-500/30 text-white' : 'bg-slate-50 border-emerald-500/30 text-slate-900'
              }`}>
                <Stethoscope className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                <span className="font-heading font-bold text-lg text-emerald-500 dark:text-emerald-400">MEDVAI ASSISTS</span>
                <span className="font-mono text-xs text-[#8A92A3]">DOCTORS DECIDE</span>
              </div>
            </div>

            {/* 3 Clinical Efficiency Pillars */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              
              <div className="space-y-2">
                <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400">01. PRE-STRUCTURED HISTORY</span>
                <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Standardized Summaries
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Chief concerns, timelines, and current medications presented in clean clinical formatting.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400">02. ELIMINATE RE-TYPING</span>
                <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Instant EHR Alignment
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Reduces verbal back-and-forth so doctors can quickly verify history during initial intake.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400">03. ENHANCED ALLIANCE</span>
                <h4 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Shared Decision Making
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                  Prepared patients lead to clearer communication and higher diagnostic confidence.
                </p>
              </div>

            </div>

          </SpatialGlassCard>

        </div>
      </section>

    </div>
  );
};

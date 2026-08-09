import React from 'react';
import { Lock, ShieldCheck, Share2, UserCheck, Key, EyeOff } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface UncompromisingTrustProps {
  theme: ThemeMode;
}

export const UncompromisingTrust: React.FC<UncompromisingTrustProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="trust" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[700px] h-[450px] rounded-full blur-[140px] ${
          isDark ? 'bg-white/[0.02]' : 'bg-slate-200/40'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            06 · Uncompromising Trust
          </div>

          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Your medical records belong exclusively to you.
          </h2>

          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Built on a zero-trust foundation. Your health data is protected by strict consent controls and client-first security practices.
          </p>
        </div>

        {/* 4 Premium Floating Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1: Private by Design */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className={`p-3.5 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Private by Design
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                MEDVAI never sells, monetizes, or trains commercial third-party AI models on your personal health information.
              </p>
            </div>
            <div className={`pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Pledge: Zero Data Selling
            </div>
          </SpatialGlassCard>

          {/* Card 2: Encrypted by Default */}
          <SpatialGlassCard isDark={isDark} floatIndex={2} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className={`p-3.5 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                <Lock className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Encrypted by Default
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                All medical documents, body signals, and transcripts remain encrypted at rest and in transit using modern security protocols.
              </p>
            </div>
            <div className={`pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Pledge: Zero Data Selling & Encryption
            </div>
          </SpatialGlassCard>

          {/* Card 3: Share Only With Permission */}
          <SpatialGlassCard isDark={isDark} floatIndex={3} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className={`p-3.5 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Share Only With Permission
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                You maintain complete control over who sees your health briefs. Nothing is shared with physicians without your explicit consent.
              </p>
            </div>
            <div className={`pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Pledge: Consent First Architecture
            </div>
          </SpatialGlassCard>

          {/* Card 4: You Own Your Data */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className={`p-3.5 rounded-2xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className={`font-heading font-semibold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                You Own Your Data
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
                Export your complete health record history in FHIR or JSON formats at any time, or permanently delete your account with one tap.
              </p>
            </div>
            <div className={`pt-4 border-t text-[11px] font-mono ${isDark ? 'border-white/10 text-[#8A92A3]' : 'border-black/10 text-slate-500'}`}>
              Pledge: Complete Data Sovereignty
            </div>
          </SpatialGlassCard>

        </div>

      </div>
    </section>
  );
};

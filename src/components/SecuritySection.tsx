import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck, Database, RefreshCw } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface SecuritySectionProps {
  theme: ThemeMode;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      <div className="w-full max-w-[1280px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-[760px] mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            Security & Trust Architecture
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Your medical data belongs strictly to you. Never sold. Never trained on.
          </h2>
          <p className={`text-base ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Health information is the most private data on earth. MEDVAI is engineered from the ground up with zero-trust privacy controls.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1 */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <Lock className="w-5 h-5" />
            </div>
            <h3 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Zero-Knowledge Encryption
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              End-to-end client key derivation. Your medical records are encrypted before leaving your personal device.
            </p>
          </SpatialGlassCard>

          {/* Card 2 */}
          <SpatialGlassCard isDark={isDark} floatIndex={2} className="p-6 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Private by Design & Consent First
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Built around explicit consent, client-first encryption, zero data monetization, and complete user data ownership.
            </p>
          </SpatialGlassCard>

          {/* Card 3 */}
          <SpatialGlassCard isDark={isDark} floatIndex={3} className="p-6 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Grounded AI Medical Knowledge
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Eliminates ungrounded hallucinations by verifying every explanation against validated medical literature & clinical guidelines.
            </p>
          </SpatialGlassCard>

          {/* Card 4 */}
          <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-6 space-y-4">
            <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className={`font-heading font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Instant Export & Purge
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              Complete data sovereignty. Export your health records in standard FHIR / JSON anytime, or permanently wipe with one tap.
            </p>
          </SpatialGlassCard>

        </div>

      </div>
    </section>
  );
};

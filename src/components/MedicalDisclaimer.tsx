import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { ThemeMode } from '../types';

interface MedicalDisclaimerProps {
  theme: ThemeMode;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full max-w-[1180px] mx-auto my-12 px-6 py-5 rounded-2xl border transition-colors duration-500 ${
      isDark 
        ? 'bg-amber-950/20 border-amber-500/20 text-amber-200/90' 
        : 'bg-amber-50/80 border-amber-200 text-amber-900 shadow-sm'
    }`}>
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <p className="font-bold uppercase tracking-wider font-mono text-[11px] text-amber-600 dark:text-amber-400">
            IMPORTANT MEDICAL & REGULATORY DISCLAIMER
          </p>
          <p>
            MEDVAI is an informational artificial intelligence platform designed strictly to organize personal health records, translate technical medical terms into plain language, and help patients prepare concise briefs for consultations with licensed physicians.
          </p>
          <p className="opacity-90">
            <strong>MEDVAI is not a licensed medical provider</strong> and does not offer medical diagnoses, treatment plans, clinical prescriptions, or triage emergency conditions. Always consult a qualified physician or seek emergency medical care immediately for acute health symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};

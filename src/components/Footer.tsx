import React from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`relative border-t pt-16 pb-12 px-4 sm:px-6 transition-colors duration-500 ${
      isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="w-full max-w-[1180px] mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white text-black font-bold">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-wider">MEDVAI</span>
            </div>

            <p className={`text-xs max-w-sm leading-relaxed ${isDark ? 'text-[#8A92A3]' : 'text-slate-600'}`}>
              MEDVAI AI Health Operating System. Helping you understand your body, organize lifelong health history, and communicate clearly with doctors.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Private by Design & Encrypted by Default</span>
            </div>
          </div>

          {/* Nav Links (md:col-span-7) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <span className={`block font-mono uppercase font-bold text-[10px] tracking-wider ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                PLATFORM
              </span>
              <ul className="space-y-2">
                <li><a href="#features-showcase" className="hover:underline">Interactive Body Map</a></li>
                <li><a href="#features-showcase" className="hover:underline">Voice AI Companion</a></li>
                <li><a href="#features-showcase" className="hover:underline">Biomarker Translator</a></li>
                <li><a href="#features-showcase" className="hover:underline">30-Second Doctor Brief</a></li>
                <li><a href="#features-showcase" className="hover:underline">Lifelong Health Memory</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className={`block font-mono uppercase font-bold text-[10px] tracking-wider ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                COMPANY
              </span>
              <ul className="space-y-2">
                <li><a href="#founder-story" className="hover:underline">Why MEDVAI Exists</a></li>
                <li><a href="#careers" className="hover:underline">Careers & Opportunities</a></li>
                <li><a href="#contact" className="hover:underline">Contact & Press</a></li>
                <li><a href="#waitlist" className="hover:underline">Alpha Waitlist</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className={`block font-mono uppercase font-bold text-[10px] tracking-wider ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                TRUST & LEGAL
              </span>
              <ul className="space-y-2">
                <li><a href="#contact" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:underline">Terms of Service</a></li>
                <li><a href="#contact" className="hover:underline">Privacy & Consent Controls</a></li>
                <li><a href="#contact" className="hover:underline">Security Architecture</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-white/10 text-[#8A92A3]' : 'border-slate-200 text-slate-500'
        }`}>
          <p>© {new Date().getFullYear()} MEDVAI Labs. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for patient empowerment worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
};

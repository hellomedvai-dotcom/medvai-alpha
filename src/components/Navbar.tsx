import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const yOffset = -90;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        style={{ borderRadius: '9999px' }}
        className={`pointer-events-auto w-full max-w-[860px] mx-auto py-3 px-5 sm:px-6 flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? isDark
              ? 'scale-[0.98] bg-black/80 backdrop-blur-[24px] backdrop-saturate-150 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
              : 'scale-[0.98] bg-white/90 backdrop-blur-[24px] backdrop-saturate-150 border border-slate-300/80 shadow-[0_16px_36px_rgba(0,0,0,0.12)]'
            : isDark
            ? 'scale-100 bg-[#0c0c0e]/65 backdrop-blur-[20px] backdrop-saturate-150 border border-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'scale-100 bg-white/80 backdrop-blur-[20px] backdrop-saturate-150 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Brand Logo & OS status */}
        <a href="#" onClick={(e) => handleNavClick(e, '')} className="flex items-center gap-2.5 group">
          <div className={`p-1.5 rounded-full transition-transform duration-300 group-hover:scale-110 ${
            isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'
          }`}>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-heading font-bold text-base sm:text-lg tracking-[0.12em] transition-opacity duration-300 group-hover:opacity-85">
            {isDark ? (
              <span className="text-white">MED<span className="text-emerald-400">V</span>AI</span>
            ) : (
              <span className="text-slate-900">MED<span className="text-emerald-600">V</span>AI</span>
            )}
          </span>
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
            isDark 
              ? 'border-emerald-400/30 text-emerald-300 bg-emerald-500/10' 
              : 'border-emerald-600/30 text-emerald-800 bg-emerald-50'
          }`}>
            OS 1.0
          </span>
        </a>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide">
          <a
            href="#vision"
            onClick={(e) => handleNavClick(e, 'vision')}
            className={`transition-colors duration-200 ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vision
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className={`transition-colors duration-200 ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            How It Works
          </a>
          <a
            href="#features-showcase"
            onClick={(e) => handleNavClick(e, 'features-showcase')}
            className={`transition-colors duration-200 ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            The OS
          </a>
          <a
            href="#interactive-demo"
            onClick={(e) => handleNavClick(e, 'interactive-demo')}
            className={`transition-colors duration-200 ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interactive Demo
          </a>
          <a
            href="#security"
            onClick={(e) => handleNavClick(e, 'security')}
            className={`transition-colors duration-200 ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Security & Trust
          </a>
        </div>

        {/* Controls: Theme & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              isDark
                ? 'border-white/15 bg-white/5 text-white/90 hover:bg-white/15 hover:text-white'
                : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 shadow-sm'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Join Waitlist Action */}
          <button
            onClick={onOpenWaitlist}
            className={`relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-white text-black hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)]'
            }`}
          >
            <span className="flex items-center gap-1.5 relative z-10 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Join Waitlist</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

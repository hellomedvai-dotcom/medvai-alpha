import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { IntroAnimation } from './components/IntroAnimation';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { WhyMedvaiExists } from './components/WhyMedvaiExists';
import { HowMedvaiWorks } from './components/HowMedvaiWorks';
import { OSCarouselFeature } from './components/OSCarouselFeature';
import { InteractiveDemo } from './components/InteractiveDemo';
import { BuiltForPatientsAndPros } from './components/BuiltForPatientsAndPros';
import { UncompromisingTrust } from './components/UncompromisingTrust';
import { SecuritySection } from './components/SecuritySection';
import { FounderSection } from './components/FounderSection';
import { JoinMedvai } from './components/JoinMedvai';
import { EmotionalEnding } from './components/EmotionalEnding';
import { WaitlistSection } from './components/WaitlistSection';
import { ContactSection } from './components/ContactSection';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [showIntro, setShowIntro] = useState(true);

  const isDark = theme === 'dark';

  // Apply dark or light class to body
  useEffect(() => {
    if (isDark) {
      document.body.className = 'bg-black text-white antialiased selection:bg-white/20 selection:text-white';
    } else {
      document.body.className = 'spatial-light-bg text-slate-900 antialiased selection:bg-slate-900/10 selection:text-slate-900';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToVision = () => {
    const el = document.getElementById('vision') || document.getElementById('why-medvai');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative font-sans ${isDark ? 'bg-black text-white' : 'spatial-light-bg text-slate-900'}`}>
      
      {/* 3-Second Opening Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Custom Ring Cursor (Native speed) */}
      <CustomCursor isDark={isDark} />

      {/* Floating Glass Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenWaitlist={scrollToWaitlist}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 overflow-hidden">
        
        {/* Volumetric Radial Light */}
        <div className={`absolute top-0 inset-x-0 h-[800px] pointer-events-none ${
          isDark ? 'radial-volumetric' : 'radial-volumetric-light'
        }`} />

        {/* Hero Section with Floating AI Health Workspace */}
        <Hero
          theme={theme}
          onOpenWaitlist={scrollToWaitlist}
          onSeeVision={scrollToVision}
        />

        {/* Section 1: The Problem */}
        <ProblemSection theme={theme} />

        {/* Section 2: Why MEDVAI Exists */}
        <WhyMedvaiExists theme={theme} />

        {/* Section 2.5: How MEDVAI Works - Continuous Story Journey */}
        <HowMedvaiWorks theme={theme} />

        {/* Section 3: Interactive Operating System Feature Carousel & Showcases */}
        <OSCarouselFeature theme={theme} />

        {/* Section 3.5: Live Intelligence Demonstrations */}
        <InteractiveDemo theme={theme} onOpenWaitlist={scrollToWaitlist} />

        {/* Section 4 & Section 5: Built for Patients & Built for Healthcare Professionals */}
        <BuiltForPatientsAndPros theme={theme} />

        {/* Section 6: Uncompromising Trust */}
        <UncompromisingTrust theme={theme} />

        {/* Technical Security Pillars */}
        <SecuritySection theme={theme} />

        {/* Founder Story */}
        <FounderSection theme={theme} />

        {/* Join MEDVAI / Opportunities */}
        <JoinMedvai theme={theme} />

        {/* Emotional Storytelling Ending */}
        <EmotionalEnding theme={theme} />

        {/* Waitlist Priority Pass Access */}
        <WaitlistSection theme={theme} />

        {/* Contact Form */}
        <ContactSection theme={theme} />

        {/* Regulatory & Medical Disclaimer */}
        <MedicalDisclaimer theme={theme} />

      </main>

      {/* Footer */}
      <Footer theme={theme} />

    </div>
  );
}

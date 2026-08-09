import React, { useState } from 'react';
import { Briefcase, ArrowRight, Code, Cpu, Stethoscope, Sparkles, HeartHandshake, Clapperboard } from 'lucide-react';
import { ThemeMode } from '../types';
import { ApplicationModal } from './ApplicationModal';
import { SpatialGlassCard } from './SpatialGlassCard';

interface JoinMedvaiProps {
  theme: ThemeMode;
}

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  mission: string;
  icon: React.FC<{ className?: string }>;
}

const ROLES: Role[] = [
  {
    title: 'Founding AI Engineer',
    department: 'AI & Intelligence',
    location: 'Remote',
    type: 'Full-time',
    mission: 'Build MEDVAI\'s intelligence engine from multilingual reasoning to patient understanding.',
    icon: Cpu
  },
  {
    title: 'Founding Full Stack Engineer',
    department: 'Core Engineering',
    location: 'Remote',
    type: 'Full-time',
    mission: 'Build fast, beautiful experiences across web and mobile.',
    icon: Code
  },
  {
    title: 'Founding Product Designer',
    department: 'Product & UX',
    location: 'Remote',
    type: 'Full-time',
    mission: 'Design healthcare experiences that reduce fear and increase clarity.',
    icon: Sparkles
  },
  {
    title: 'Clinical Advisor (Part-time)',
    department: 'Medical Guidance',
    location: 'Hybrid / Remote',
    type: 'Part-time',
    mission: 'Guide clinical accuracy and patient safety.',
    icon: Stethoscope
  },
  {
    title: 'Content & Community',
    department: 'Storytelling & Growth',
    location: 'Remote',
    type: 'Full-time / Part-time',
    mission: 'Educate millions through healthcare storytelling.',
    icon: HeartHandshake
  },
  {
    title: 'Video Editor',
    department: 'Storytelling & Growth',
    location: 'Remote',
    type: 'Full-time / Part-time',
    mission: 'Turn a simple startup idea into an engaging short-form video.',
    icon: Clapperboard
  }
];

export const JoinMedvai: React.FC<JoinMedvaiProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('Founding AI Engineer');

  const handleApplyClick = (title: string) => {
    setSelectedRoleTitle(title);
    setModalOpen(true);
  };

  return (
    <section id="careers" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      <div className="relative z-10 w-full max-w-[1180px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-[780px] mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            07 · Opportunities
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Help Shape the Future of Everyday Healthcare
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            We're an early-stage team building technology that helps people understand their health. Look through our open roles or apply directly.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            return (
              <SpatialGlassCard
                key={role.title}
                isDark={isDark}
                floatIndex={(((idx % 3) + 1) as 0 | 1 | 2 | 3)}
                onClick={() => handleApplyClick(role.title)}
                className="group p-8 cursor-pointer flex flex-col justify-between hover:border-emerald-500/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl ${
                      isDark ? 'bg-white/10 text-white' : 'bg-slate-900/10 text-slate-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      {role.type}
                    </span>
                  </div>

                  <div>
                    <span className={`text-xs font-mono uppercase ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                      {role.department}
                    </span>
                    <h3 className={`font-heading font-bold text-lg mt-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {role.title}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                    {role.mission}
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t flex flex-col gap-3 text-xs ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}>
                  <div className="flex items-center justify-between font-semibold">
                    <span className={isDark ? 'text-[#8A92A3]' : 'text-slate-500'}>
                      {role.location}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(role.title);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all cursor-pointer font-medium"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className={`text-[10px] font-mono text-right ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    <span>Interactive Founder Assessment</span>
                    <span className="block opacity-75">Approx. 8–10 minutes</span>
                  </div>
                </div>
              </SpatialGlassCard>
            );
          })}
        </div>

        {/* Memorable Quote Banner */}
        <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 sm:p-10 text-center space-y-4 max-w-[880px] mx-auto">
          <Sparkles className="w-6 h-6 mx-auto text-amber-500" />
          <p className="font-heading text-lg sm:text-xl font-medium italic">
            "We're not hiring employees. We're looking for builders who want to leave fingerprints on something meaningful."
          </p>
          <span className="block text-xs font-mono text-[#8A92A3] uppercase tracking-wider">
            MEDVAI Builder Ethos
          </span>
        </SpatialGlassCard>

      </div>

      {/* Premium Full-Screen Glass Application Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedRole={selectedRoleTitle}
        isDark={isDark}
      />
    </section>
  );
};

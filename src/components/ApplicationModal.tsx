import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Send, Upload, ShieldCheck, Heart } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
  isDark?: boolean;
}

const TECH_OPTIONS = [
  'Python', 'React', 'Next.js', 'Node', 'FastAPI', 'Flutter',
  'AI', 'LLMs', 'RAG', 'LangGraph', 'MCP', 'Docker',
  'AWS', 'GCP', 'Supabase', 'Postgres', 'Other'
];

const STRONGEST_ROLES = [
  'AI Engineer', 'Full Stack', 'Frontend', 'Backend',
  'Product Designer', 'Clinical Advisor', 'Community', 'Other'
];

const HOURS_OPTIONS = [
  'Less than 10', '10–20', '20–40', 'Full Time'
];

const MOTIVATION_OPTIONS = [
  'Learning', 'Ownership', 'Equity', 'Salary', 'Solving meaningful problems'
];

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedRole = 'Founding AI Engineer',
  isDark = true
}) => {
  // Step 0: Welcome, Step 1: Candidate Details, Steps 2-16: Questions 1-15, Step 17: Confirmation
  const [step, setStep] = useState(0);
  const isVideoEditor = selectedRole === 'Video Editor';
  const totalQuestions = isVideoEditor ? 7 : 15;
  const finalQuestionStep = isVideoEditor ? 8 : 16;
  const confirmationStep = isVideoEditor ? 9 : 17;

  // Form State
  const [details, setDetails] = useState({
    fullName: '',
    email: '',
    linkedIn: '',
    gitHub: '',
    portfolio: '',
    resumeLink: '',
    role: selectedRole,
    phone: '',
    location: '',
    experience: '',
    availability: ''
  });

  const [answers, setAnswers] = useState<Record<number, string | string[]>>({
    1: '', // Tell us about yourself
    2: '', // Why MEDVAI
    3: '', // Imagine MEDVAI succeeds 5 years from now
    4: '', // Show us something you've built
    5: '', // Hardest problem you've solved
    6: '', // Balance speed with responsibility
    7: '', // First thing you would improve
    8: selectedRole.includes('AI') ? 'AI Engineer' : selectedRole.includes('Design') ? 'Product Designer' : selectedRole.includes('Clinical') ? 'Clinical Advisor' : selectedRole.includes('Community') ? 'Community' : 'Full Stack', // Strongest role
    9: [], // Tech stack multi-select
    10: 'Full Time', // Hours per week
    11: '', // Startup experience
    12: 'Solving meaningful problems', // Motivation
    13: '', // Stay through difficulty
    14: '', // Why trust you
    15: ''  // Anything else
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset form when the modal opens (fresh application)
  useEffect(() => {
    if (isOpen) {
      // Clear any saved draft
      localStorage.removeItem('medvai_app_draft');
      // Reset form state
      setStep(0);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setDetails({
        fullName: '',
        email: '',
        linkedIn: '',
        gitHub: '',
        portfolio: '',
        resumeLink: '',
        role: selectedRole,
        phone: '',
        location: '',
        experience: '',
        availability: ''
      });
      setAnswers({
        1: '', // Tell us about yourself
        2: '', // Why MEDVAI
        3: '', // Imagine MEDVAI succeeds 5 years from now
        4: '', // Show us something you've built
        5: '', // Hardest problem you've solved
        6: '', // Balance speed with responsibility
        7: '', // First thing you would improve
        8: selectedRole.includes('AI') ? 'AI Engineer' : selectedRole.includes('Design') ? 'Product Designer' : selectedRole.includes('Clinical') ? 'Clinical Advisor' : selectedRole.includes('Community') ? 'Community' : 'Full Stack', // Strongest role
        9: [], // Tech stack multi-select
        10: 'Full Time', // Hours per week
        11: '', // Startup experience
        12: 'Solving meaningful problems', // Motivation
        13: '', // Stay through difficulty
        14: '', // Why trust you
        15: '' // Anything else
      });
    }
  }, [isOpen]);

  // ... later in submitApplication payload construction
  const payload = {
    timestamp: new Date().toISOString(),
    fullName: details.fullName,
    email: details.email,
    role: details.role,
    linkedIn: details.linkedIn,
    gitHub: details.gitHub,
    portfolio: details.portfolio,
    resumeLink: details.resumeLink,
    phone: details.phone || '',
    location: details.location || '',
    experience: details.experience || '',
    availability: details.availability || '',
    q8_strongest_role: answers[8] as string,
    q9_tech_stack: answers[9] as string[],
    q10_hours: answers[10] as string,
    q12_motivation: answers[12] as string,
    q1_about: answers[1] as string,
    q2_why: answers[2] as string,
    q3_5year: answers[3] as string,
    q4_built: answers[4] as string,
    q5_hardest: answers[5] as string,
    q6_responsibility: answers[6] as string,
    q7_first_improvement: answers[7] as string,
    q11_startup: answers[11] as string,
    q13_resilience: answers[13] as string,
    q14_trust: answers[14] as string,
    q15_extra: answers[15] as string,
    additionalMessage: '' // placeholder for any future message field
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, details, answers]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!details.fullName.trim() || !details.email.trim()) {
        alert('Please provide your name and email address.');
        return;
      }
    }
    if (step < finalQuestionStep) {
      setStep(prev => prev + 1);
    } else if (step === finalQuestionStep) {
      submitApplication();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const submitApplication = async () => {
    if (!details.fullName.trim() || !details.email.trim()) {
      alert('Please fill in your name and email before submitting.');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const EXACT_QUESTIONS = {
      general: {
        1: 'Tell us about yourself.',
        2: 'Why MEDVAI?',
        3: 'Imagine MEDVAI succeeds five years from now.',
        4: "Show us something you've built.",
        5: "Tell us about the hardest problem you've solved.",
        6: 'How do you balance speed with responsibility?',
        7: 'If you joined tomorrow, what is the first thing you would improve?',
        11: 'Have you worked in a startup before?',
        12: 'What motivates you the most?',
        13: 'Tell us about a time you wanted to quit but stayed.',
        14: 'Why should we trust you with a founding role?',
        15: 'Anything else we should know?'
      },
      videoEditor: {
        1: 'Tell us briefly about your video editing experience.',
        2: 'Which editing software/tools are you comfortable using?',
        3: 'Share 2–3 examples of videos you have edited or created.',
        4: 'What type of content do you enjoy editing most?',
        5: 'How would you turn a simple startup idea into an engaging short-form video?',
        6: 'How many hours per week can you realistically contribute?',
        7: 'Why do you want to work with MEDVAI?'
      }
    };

    const qs = isVideoEditor ? EXACT_QUESTIONS.videoEditor : EXACT_QUESTIONS.general;
    let qaBlob = "";
    const questionKeys = isVideoEditor ? [1,2,3,4,5,6,7] : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    
    questionKeys.forEach((qId, index) => {
      const qText = qs[qId as keyof typeof qs];
      let rawAns = answers[qId];
      
      let ansStr = '';
      if (Array.isArray(rawAns)) {
        ansStr = rawAns.join(', ');
      } else {
        ansStr = rawAns || '';
      }
      
      ansStr = ansStr.trim();
      if (!ansStr) {
        ansStr = 'Not provided';
      }
      
      qaBlob += `Question ${index + 1}: ${qText}\n${ansStr}\n\n`;
    });



    // Save backup to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('medvai_submitted_apps') || '[]');
      existing.push({ timestamp: new Date().toISOString(), details, answers });
      localStorage.setItem('medvai_submitted_apps', JSON.stringify(existing));
    } catch (err) {
      console.error('Error storing local application backup', err);
    }

      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL;
      if (!scriptUrl) {
        setSubmitError('Configuration error: VITE_GOOGLE_SHEETS_SCRIPT_URL is not set.');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        timestamp: new Date().toISOString(),
        fullName: details.fullName,
        email: details.email,
        role: details.role,
        linkedIn: details.linkedIn,
        gitHub: details.gitHub,
        portfolio: details.portfolio,
        resumeLink: details.resumeLink,
        phone: details.phone || '',
        location: details.location || '',
        experience: details.experience || '',
        availability: details.availability || '',
        q8_strongest_role: answers[8] as string,
        q9_tech_stack: answers[9] as string[],
        q10_hours: answers[10] as string,
        q12_motivation: answers[12] as string,
        qaBlob: qaBlob
      };

      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.success) {
          // success flow
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setStep(confirmationStep);
            localStorage.removeItem('medvai_app_draft');
          }, 600);
        } else {
          throw new Error(result.error || 'Submission failed');
        }
      } catch (err) {
        console.error(err);
        setSubmitError(err instanceof Error ? err.message : String(err));
        setIsSubmitting(false);
      }
  };

  const toggleTechOption = (tech: string) => {
    const current = (answers[9] as string[]) || [];
    if (current.includes(tech)) {
      setAnswers({ ...answers, 9: current.filter(t => t !== tech) });
    } else {
      setAnswers({ ...answers, 9: [...current, tech] });
    }
  };

  // Step Progress Calculation
  const progressPercent = step === 0 ? 0 : step === confirmationStep ? 100 : Math.round((step / finalQuestionStep) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl text-white overflow-hidden">
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-1.5 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer border border-white/15"
        title="Close Application (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-between min-h-[500px] max-h-[90vh] py-6 px-4 sm:px-8 relative z-10 overflow-y-auto">
        
        {/* Step Indicator Header */}
        {step > 0 && step < confirmationStep && (
          <div className="flex items-center justify-between text-xs font-mono text-[#8A92A3] pb-4 border-b border-white/10 mb-6">
            <span>
              {step === 1 ? 'BASIC INFORMATION' : `QUESTION ${step - 1} OF ${totalQuestions}`}
            </span>
            <span className="text-emerald-400 font-medium">
              {progressPercent}% COMPLETE
            </span>
          </div>
        )}

        {/* Animated Question Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center space-y-6"
          >
            {/* STEP 0: WELCOME SCREEN */}
            {step === 0 && (
              <div className="space-y-6 text-center py-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                  <Sparkles className="w-3.5 h-3.5" /> Founding Team Application
                </div>

                <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                  Let's Talk Building.
                </h1>

                <p className="text-base sm:text-lg text-[#BFC5D2] max-w-lg mx-auto leading-relaxed">
                  This experience is designed like a personal founder conversation. We care about how you think, what you've built, and why you want to make healthcare understandable.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
                  >
                    <span>Begin Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: CANDIDATE DETAILS */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                    Let's start with your details.
                  </h2>
                  <p className="text-sm text-[#8A92A3]">
                    Applying for <span className="text-emerald-400 font-semibold">{details.role}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={details.fullName}
                      onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={details.email}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      LinkedIn <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/username"
                      value={details.linkedIn}
                      onChange={(e) => setDetails({ ...details, linkedIn: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      GitHub <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="github.com/username"
                      value={details.gitHub}
                      onChange={(e) => setDetails({ ...details, gitHub: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      Portfolio / Website <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="yourwebsite.com"
                      value={details.portfolio}
                      onChange={(e) => setDetails({ ...details, portfolio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A92A3] mb-1.5">
                      Resume Link / File Note <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Link to Google Drive / Notion / PDF"
                      value={details.resumeLink}
                      onChange={(e) => setDetails({ ...details, resumeLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-[#8A92A3] text-sm outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Q1 */}
            {step === 2 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 1</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "Tell us briefly about your video editing experience." : "Tell us about yourself."}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "What kind of projects have you worked on?" : "Not your resume. Who are you outside work?"}
                </p>
                <textarea
                  rows={5}
                  value={(answers[1] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 1: e.target.value })}
                  placeholder="Share your interests, curiosities, or what drives you..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q2 */}
            {step === 3 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 2</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "Which editing software/tools are you comfortable using?" : "Why MEDVAI?"}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Premiere, After Effects, CapCut, etc." : "Why did you decide to apply here instead of another startup?"}
                </p>
                <textarea
                  rows={5}
                  value={(answers[2] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 2: e.target.value })}
                  placeholder="What resonated with you about our mission?"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q3 */}
            {step === 4 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 3</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "Share 2–3 examples of videos you have edited or created." : "Imagine MEDVAI succeeds five years from now."}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Paste links to your best work." : 'What part would you proudly say, "I helped build this"?'}
                </p>
                <textarea
                  rows={5}
                  value={(answers[3] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 3: e.target.value })}
                  placeholder="Describe the impact or piece of technology you want to shape..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q4 */}
            {step === 5 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 4</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "What type of content do you enjoy editing most?" : "Show us something you've built."}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Educational, storytelling, fast-paced, etc." : "GitHub, Portfolio, Figma, Video, Anything."}
                </p>
                <textarea
                  rows={5}
                  value={(answers[4] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 4: e.target.value })}
                  placeholder="Paste links, explain what you crafted, or detail your favorite project..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q5 */}
            {step === 6 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 5</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "How would you turn a simple startup idea into an engaging short-form video?" : "Tell us about the hardest problem you've solved."}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Walk us through your creative process." : "Technical, Design, Business, Personal. Explain your thinking."}
                </p>
                <textarea
                  rows={5}
                  value={(answers[5] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 5: e.target.value })}
                  placeholder="What made it difficult and how did you overcome it?"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q6 */}
            {step === 7 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 6</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "How many hours per week can you realistically contribute?" : "Healthcare affects real people."}
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Be honest about your availability." : "How do you balance speed with responsibility?"}
                </p>
                <textarea
                  rows={5}
                  value={(answers[6] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 6: e.target.value })}
                  placeholder="How do you move fast without compromising quality or empathy?"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q7 */}
            {step === 8 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 7</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "Why do you want to work with MEDVAI?" : "If you joined tomorrow, what is the first thing you would improve?"}
                </h2>
                <textarea
                  rows={5}
                  value={(answers[7] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 7: e.target.value })}
                  placeholder="What caught your attention about our product, messaging, or code?"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q8 */}
            {step === 9 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 8</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Choose your strongest role.
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {STRONGEST_ROLES.map((role) => {
                    const isSelected = answers[8] === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setAnswers({ ...answers, 8: role })}
                        className={`p-3.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{role}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q9 */}
            {step === 10 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 9</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Which technologies are you strongest in?
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  Select all that apply.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {TECH_OPTIONS.map((tech) => {
                    const selectedList = (answers[9] as string[]) || [];
                    const isSelected = selectedList.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTechOption(tech)}
                        className={`px-4 py-2 rounded-full border text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                            : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{tech}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q10 */}
            {step === 11 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 10</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  How many hours can you realistically contribute every week?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {HOURS_OPTIONS.map((opt) => {
                    const isSelected = answers[10] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswers({ ...answers, 10: opt })}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q11 */}
            {step === 12 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 11</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Have you worked in a startup before?
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  Tell us about it.
                </p>
                <textarea
                  rows={5}
                  value={(answers[11] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 11: e.target.value })}
                  placeholder="Share your experience working in high-velocity startup environments..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q12 */}
            {step === 13 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 12</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  What motivates you the most?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {MOTIVATION_OPTIONS.map((opt) => {
                    const isSelected = answers[12] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswers({ ...answers, 12: opt })}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q13 */}
            {step === 14 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 13</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Imagine funding becomes difficult. Growth slows. The product pivots.
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  Would you still stay? Why?
                </p>
                <textarea
                  rows={5}
                  value={(answers[13] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 13: e.target.value })}
                  placeholder="Share your perspective on resilience and commitment..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q14 */}
            {step === 15 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 14</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Why should MEDVAI trust you?
                </h2>
                <textarea
                  rows={5}
                  value={(answers[14] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 14: e.target.value })}
                  placeholder="What defines your work ethic, integrity, and reliability?"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />
              </div>
            )}

            {/* Q15 / Final Step */}
            {step === 16 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Question 15</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Anything else you'd like us to know?
                </h2>
                <p className="text-sm text-[#8A92A3]">
                  (Optional)
                </p>
                <textarea
                  rows={4}
                  value={(answers[15] as string) || ''}
                  onChange={(e) => setAnswers({ ...answers, 15: e.target.value })}
                  placeholder="Any extra thoughts, links, or questions for our team..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-600 text-sm outline-none focus:border-emerald-400 transition-all resize-none"
                  autoFocus
                />

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span>⚠️ {submitError}</span>
                    <button
                      onClick={submitApplication}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-semibold text-xs hover:bg-red-600 transition-all cursor-pointer shrink-0"
                    >
                      Retry Submission
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 17: CONFIRMATION SCREEN */}
            {step === confirmationStep && (
              <div className="space-y-6 text-center py-8">
                <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 w-16 h-16 mx-auto flex items-center justify-center border border-emerald-500/20">
                  <Check className="w-8 h-8" />
                </div>

                <h2 className="font-heading text-3xl font-bold text-white">
                  Application received successfully.
                </h2>

                <p className="text-base text-[#BFC5D2] leading-relaxed max-w-md mx-auto">
                  We don't hire based only on resumes. We look for people who genuinely care about solving meaningful healthcare problems. Every application is personally reviewed.
                </p>

                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Done & Return to Site
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Footer */}
        {step > 0 && step < confirmationStep && (
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-[11px] font-mono text-[#8A92A3] hidden sm:inline-block">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">⌘ + Enter</kbd> to continue
            </span>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
              ) : step === finalQuestionStep ? (
                <>
                  <span>Submit Application</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  FileText, Stethoscope, Mic, Activity, Sparkles, Loader2, Play, Pause, RefreshCw, 
  Send, AlertTriangle, ShieldCheck, CheckCircle2, Clock, Brain, ArrowRight, 
  Search, Eye, Zap, Layers, ChevronRight, Heart, AlertCircle, Info, FileCheck
} from 'lucide-react';
import { ThemeMode, ReportAnalysisResult, DoctorBriefResult } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface InteractiveDemoProps {
  theme: ThemeMode;
  onOpenWaitlist: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ theme, onOpenWaitlist }) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'conversation' | 'reasoning' | 'journey' | 'homecare' | 'brief' | 'memory' | 'emergency'>('conversation');

  // -------------------------------------------------------------
  // 1. AI CONVERSATION PREVIEW STATE
  // -------------------------------------------------------------
  const [convStep, setConvStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isAnswering, setIsAnswering] = useState(false);

  const CONVERSATION_FLOW = [
    {
      q: "I've noticed a dull ache in my upper right abdomen after eating for the last 4 days, with mild nausea.",
      type: 'user_initial',
    },
    {
      aiQuestion: "MEDVAI Follow-up 1/3: Does the discomfort radiate toward your upper back or right shoulder blade?",
      options: ["Yes, slightly toward my right back", "No, it stays strictly in the front", "Unsure / Hard to pinpoint"],
    },
    {
      aiQuestion: "MEDVAI Follow-up 2/3: Is the ache triggered or made worse specifically by rich or fatty meals?",
      options: ["Yes, definitely worse after heavy meals", "No, occurs regardless of meal type", "Mainly occurs on an empty stomach"],
    },
    {
      aiQuestion: "MEDVAI Follow-up 3/3: Have you noticed any fever, chills, or yellowing in your eyes/skin?",
      options: ["No fever or discoloration noticed", "Mild chills yesterday evening", "Yes, mild warmth felt"],
    }
  ];

  const handleSelectAnswer = (option: string) => {
    setIsAnswering(true);
    setUserAnswers(prev => ({ ...prev, [convStep]: option }));
    setTimeout(() => {
      setIsAnswering(false);
      if (convStep < 3) {
        setConvStep(convStep + 1);
      }
    }, 600);
  };

  const resetConversation = () => {
    setConvStep(0);
    setUserAnswers({});
  };

  // -------------------------------------------------------------
  // 2. AI REASONING PANEL STATE
  // -------------------------------------------------------------
  const [reasoningStep, setReasoningStep] = useState<number>(0);
  const [isReasoningRunning, setIsReasoningRunning] = useState(false);

  const REASONING_STEPS = [
    { title: "Detecting Symptom Location", detail: "Mapped to Right Upper Quadrant / Hepatobiliary Region", icon: Search, confidence: 25 },
    { title: "Checking Duration & Onset", detail: "4 Days duration, post-prandial pattern identified", icon: Clock, confidence: 42 },
    { title: "Matching Symptom Patterns", detail: "Correlating with Biliary / Upper Digestive response profile", icon: Brain, confidence: 61 },
    { title: "Reviewing Health History", detail: "2024 Abdominal Scan (Normal), Past Lipid profile reviewed", icon: Layers, confidence: 78 },
    { title: "Reviewing Uploaded Reports", detail: "Cross-referencing metabolic lab snippet from 3 months ago", icon: FileText, confidence: 88 },
    { title: "Increasing Confidence Score", detail: "Symptom cluster alignment: High (89% understanding confidence)", icon: Sparkles, confidence: 89 },
    { title: "Preparing Plain-Language Explanation", detail: "Generating safe home care guidance & 30-Second Doctor Brief", icon: CheckCircle2, confidence: 95 }
  ];

  useEffect(() => {
    let timer: any;
    if (isReasoningRunning && reasoningStep < REASONING_STEPS.length - 1) {
      timer = setTimeout(() => {
        setReasoningStep(prev => prev + 1);
      }, 1200);
    } else if (reasoningStep === REASONING_STEPS.length - 1) {
      setIsReasoningRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isReasoningRunning, reasoningStep]);

  const startReasoningAnimation = () => {
    setReasoningStep(0);
    setIsReasoningRunning(true);
  };

  // -------------------------------------------------------------
  // 3. VISUAL DECISION JOURNEY STATE
  // -------------------------------------------------------------
  const [activeJourneyNode, setActiveJourneyNode] = useState<number>(0);

  const JOURNEY_NODES = [
    { label: "Body Map", desc: "Pinpoint anatomical region & pain intensity", icon: Activity },
    { label: "Voice", desc: "Speak naturally in your native language", icon: Mic },
    { label: "Chat", desc: "Interactive symptom discussion", icon: Eye },
    { label: "Reports", desc: "Upload blood labs and PDFs", icon: FileText },
    { label: "Health History", desc: "Past surgeries, baseline vitals, allergies", icon: Clock },
    { label: "AI Questions", desc: "Targeted follow-up clarification", icon: HelpCircleIcon },
    { label: "Understanding", desc: "Pattern synthesis across all inputs", icon: Brain },
    { label: "Plain Explanation", desc: "Jargon-free body insight", icon: Sparkles },
    { label: "Safe Guidance", desc: "Everyday non-urgent care boundaries", icon: ShieldCheck },
    { label: "Doctor Brief", desc: "30-second consultation summary", icon: Stethoscope },
    { label: "Lifelong Memory", desc: "Encrypted longitudinal timeline", icon: Layers }
  ];

  // -------------------------------------------------------------
  // 4. HOME CARE PREVIEW CARD STATE
  // -------------------------------------------------------------
  const [selectedHomeCareFilter, setSelectedHomeCareFilter] = useState<'comfort' | 'hydration' | 'watchlist'>('comfort');

  // -------------------------------------------------------------
  // 5. ANIMATED STEP-BY-STEP DOCTOR BRIEF CREATION STATE
  // -------------------------------------------------------------
  const [briefBuildStep, setBriefBuildStep] = useState<number>(0);
  const [isBuildingBrief, setIsBuildingBrief] = useState(false);

  const BRIEF_BUILD_STEPS = [
    "Extracting Chief Complaint & Symptom Onset...",
    "Structuring Symptom Progression & Severity...",
    "Cross-referencing Medications, Allergies & Biomarkers...",
    "Generating 3 Targeted Questions for Your Doctor...",
    "Formatting 1-Page Printable Doctor Consultation Brief!"
  ];

  const handleStartBriefBuild = () => {
    setBriefBuildStep(0);
    setIsBuildingBrief(true);
  };

  useEffect(() => {
    let timer: any;
    if (isBuildingBrief && briefBuildStep < BRIEF_BUILD_STEPS.length - 1) {
      timer = setTimeout(() => {
        setBriefBuildStep(prev => prev + 1);
      }, 1000);
    } else if (briefBuildStep === BRIEF_BUILD_STEPS.length - 1) {
      setIsBuildingBrief(false);
    }
    return () => clearTimeout(timer);
  }, [isBuildingBrief, briefBuildStep]);

  // -------------------------------------------------------------
  // 6. LIFELONG HEALTH MEMORY TIMELINE DEMO STATE
  // -------------------------------------------------------------
  const [selectedMemoryYear, setSelectedMemoryYear] = useState<'2023' | '2024' | '2025' | '2026'>('2026');

  const MEMORY_EVENTS = {
    '2023': {
      title: "Annual Metabolic & Lipid Panel",
      date: "October 14, 2023",
      category: "Lab Report",
      insight: "TSH 3.1 mIU/L (Normal), Total Cholesterol 188 mg/dL. Established healthy baseline.",
      connection: "Provides 3-year baseline for metabolic and lipid comparisons."
    },
    '2024': {
      title: "Routine Abdominal Ultrasound",
      date: "June 22, 2024",
      category: "Imaging",
      insight: "Gallbladder, liver, and pancreas clear of structural inflammation.",
      connection: "Proves absence of historical anatomical obstruction."
    },
    '2025': {
      title: "Voice Conversation — Occasional Heartburn",
      date: "November 05, 2025",
      category: "Voice Log",
      insight: "Logged intermittent indigestion after late-night coffee.",
      connection: "Links previous digestive sensitivity with current meal triggers."
    },
    '2026': {
      title: "Today's Upper Right Abdominal Signal",
      date: "August 2026 (Present)",
      category: "Active Symptom Signal",
      insight: "Post-prandial discomfort logged via Body Map & Voice AI.",
      connection: "MEDVAI connects 2023 baseline, 2024 imaging, and 2025 voice logs to synthesize understanding today."
    }
  };

  // -------------------------------------------------------------
  // 7. EMERGENCY DETECTION DEMO STATE
  // -------------------------------------------------------------
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);

  return (
    <section id="interactive-demo" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      
      {/* Volumetric background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[900px] h-[500px] rounded-full blur-[160px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-100/50'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-12 text-center">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-[820px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
            Live AI Intelligence Demonstrations
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            MEDVAI Understands Before It Explains.
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Experience how MEDVAI's AI Health Operating System gathers context, reasons step-by-step, detects emergencies, and connects lifelong health memory.
          </p>
        </div>

        {/* Demo Feature Navigation Bar */}
        <div className="flex justify-center overflow-x-auto no-scrollbar pb-2">
          <div className={`p-1.5 rounded-2xl border inline-flex items-center gap-1 sm:gap-1.5 ${
            isDark ? 'dark-glass border-white/10' : 'light-glass border-black/10'
          }`}>
            <button
              onClick={() => setActiveTab('conversation')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'conversation'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>AI Conversation</span>
            </button>

            <button
              onClick={() => setActiveTab('reasoning')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reasoning'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>AI Reasoning</span>
            </button>

            <button
              onClick={() => setActiveTab('journey')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'journey'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Decision Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('homecare')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'homecare'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Safe Guidance</span>
            </button>

            <button
              onClick={() => setActiveTab('brief')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'brief'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Doctor Brief</span>
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'memory'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-slate-900 text-white font-semibold'
                  : isDark ? 'text-[#8A92A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Health Memory</span>
            </button>

            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'emergency'
                  ? 'bg-rose-600 text-white font-semibold shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                  : isDark ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Emergency AI</span>
            </button>
          </div>
        </div>

        {/* Demo Stage Container */}
        <div className={`w-full max-w-[1060px] mx-auto p-6 sm:p-10 rounded-3xl border text-left transition-all duration-500 ${
          isDark ? 'dark-glass border-white/15' : 'light-glass border-black/10 shadow-xl'
        }`}>

          {/* ------------------------------------------------------------- */}
          {/* DEMO 1: AI CONVERSATION PREVIEW */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'conversation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-white">1. Intelligent Follow-Up Conversation</h3>
                  <p className="text-xs text-[#8A92A3]">MEDVAI asks targeted questions one-by-one to clarify symptoms before explaining.</p>
                </div>
                <button
                  onClick={resetConversation}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 text-[#8A92A3] hover:text-white hover:border-white/20 flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restart Dialogue</span>
                </button>
              </div>

              {/* Chat Window */}
              <div className="space-y-4">
                
                {/* Initial User Message */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs">YOU</div>
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium ${
                    isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'
                  }`}>
                    "{CONVERSATION_FLOW[0].q}"
                  </div>
                </div>

                {/* Question History & Current Active Question */}
                {Array.from({ length: convStep + 1 }).map((_, idx) => {
                  const stepData = CONVERSATION_FLOW[idx + 1];
                  const chosenAnswer = userAnswers[idx];

                  if (!stepData) return null;

                  return (
                    <div key={idx} className="space-y-3 pt-2 animate-in fade-in duration-300">
                      
                      {/* AI Question Bubble */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-white/10 text-white font-mono text-xs flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>MEDVAI</span>
                        </div>
                        <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border ${
                          isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}>
                          {stepData.aiQuestion}
                        </div>
                      </div>

                      {/* Options or Selected Answer */}
                      {chosenAnswer ? (
                        <div className="flex justify-end items-center gap-2 pr-2">
                          <span className="text-[11px] font-mono text-[#8A92A3]">Your Response:</span>
                          <span className="px-3 py-1.5 rounded-xl bg-white text-black font-semibold text-xs">
                            {chosenAnswer}
                          </span>
                        </div>
                      ) : (
                        <div className="pl-12 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          {stepData.options?.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectAnswer(opt)}
                              disabled={isAnswering}
                              className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${
                                isDark 
                                  ? 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30 text-white' 
                                  : 'bg-white border-black/10 hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <span>{opt}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                            </button>
                          ))}
                        </div>
                      )}

                    </div>
                  );
                })}

                {/* Synthesis Conclusion when conversation finishes */}
                {convStep >= 3 && userAnswers[2] && (
                  <div className={`p-5 rounded-2xl border space-y-3 mt-4 animate-in fade-in duration-500 ${
                    isDark ? 'bg-black/60 border-emerald-500/40' : 'bg-emerald-50/80 border-emerald-300'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Understanding Synthesized Across 3 Clarifications</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      MEDVAI has linked your post-meal upper right abdominal discomfort with your 2024 clear imaging baseline and confirmed absence of acute fever. Proceeding to plain-language guidance & doctor brief...
                    </p>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 2: AI REASONING PANEL */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'reasoning' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-white">2. AI Telemetry & Reasoning Panel</h3>
                  <p className="text-xs text-[#8A92A3]">Watch MEDVAI's multi-step neural reasoning pipeline build confidence live.</p>
                </div>
                <button
                  onClick={startReasoningAnimation}
                  disabled={isReasoningRunning}
                  className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center gap-2 ${
                    isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isReasoningRunning ? <Loader2 className="w-4 h-4 animate-spin text-emerald-500" /> : <Play className="w-4 h-4" />}
                  <span>{isReasoningRunning ? 'Reasoning in Progress...' : 'Run Reasoning Pipeline'}</span>
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8A92A3]">AI Confidence Matrix</span>
                  <span className="text-emerald-400 font-bold">{REASONING_STEPS[reasoningStep].confidence}% Confidence</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-500"
                    style={{ width: `${REASONING_STEPS[reasoningStep].confidence}%` }}
                  />
                </div>
              </div>

              {/* Steps list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REASONING_STEPS.map((s, idx) => {
                  const Icon = s.icon;
                  const isCurrent = reasoningStep === idx;
                  const isPassed = reasoningStep > idx;

                  return (
                    <div
                      key={idx}
                      onClick={() => setReasoningStep(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? isDark ? 'bg-white/15 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-white border-emerald-500 shadow-md'
                          : isPassed
                          ? isDark ? 'bg-white/5 border-white/10 opacity-70' : 'bg-slate-50 border-black/5 opacity-80'
                          : isDark ? 'bg-black/20 border-white/5 opacity-40' : 'bg-slate-100/50 border-black/5 opacity-40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">STEP 0{idx + 1}</span>
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        ) : (
                          <Icon className="w-4 h-4 text-[#8A92A3]" />
                        )}
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm text-white mb-1">{s.title}</h4>
                      <p className="text-[11px] text-[#8A92A3] leading-relaxed">{s.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 3: VISUAL DECISION JOURNEY */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="font-heading font-semibold text-lg text-white">3. Connected Decision Journey Map</h3>
                <p className="text-xs text-[#8A92A3]">Click any intelligence node to view its contribution to the continuous model.</p>
              </div>

              {/* Node Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                {JOURNEY_NODES.map((node, idx) => {
                  const Icon = node.icon;
                  const isSelected = activeJourneyNode === idx;

                  return (
                    <React.Fragment key={idx}>
                      <button
                        onClick={() => setActiveJourneyNode(idx)}
                        className={`p-3 rounded-2xl border text-center shrink-0 transition-all cursor-pointer min-w-[100px] flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? isDark ? 'bg-white text-black border-white font-bold scale-105' : 'bg-slate-900 text-white border-slate-900 font-bold scale-105'
                            : isDark ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' : 'bg-white border-black/10 text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] leading-tight">{node.label}</span>
                      </button>
                      {idx < JOURNEY_NODES.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Active Node Detail Card */}
              <div className={`p-6 rounded-2xl border space-y-2 ${
                isDark ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-900'
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  <span>Node {activeJourneyNode + 1} of 11</span>
                  <span>•</span>
                  <span>{JOURNEY_NODES[activeJourneyNode].label}</span>
                </div>
                <h4 className="font-heading font-semibold text-base sm:text-lg text-white">
                  {JOURNEY_NODES[activeJourneyNode].desc}
                </h4>
                <p className="text-xs text-[#8A92A3] leading-relaxed pt-1">
                  Integrates smoothly into MEDVAI's unified longitudinal record, eliminating isolated symptom silos and giving you and your doctor complete clarity.
                </p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 4: HOME CARE PREVIEW CARD */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'homecare' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="font-heading font-semibold text-lg text-white">4. Everyday Home Care Guidance</h3>
                <p className="text-xs text-[#8A92A3]">Safe non-urgent measures for everyday comfort with explicit safety boundaries.</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedHomeCareFilter('comfort')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer border ${
                    selectedHomeCareFilter === 'comfort' ? 'bg-white/20 border-white text-white' : 'border-white/10 text-[#8A92A3]'
                  }`}
                >
                  Comfort Protocol
                </button>
                <button
                  onClick={() => setSelectedHomeCareFilter('hydration')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer border ${
                    selectedHomeCareFilter === 'hydration' ? 'bg-white/20 border-white text-white' : 'border-white/10 text-[#8A92A3]'
                  }`}
                >
                  Dietary & Hydration
                </button>
                <button
                  onClick={() => setSelectedHomeCareFilter('watchlist')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer border ${
                    selectedHomeCareFilter === 'watchlist' ? 'bg-white/20 border-white text-white' : 'border-white/10 text-[#8A92A3]'
                  }`}
                >
                  Red Flag Watchlist
                </button>
              </div>

              {/* Home Care Box */}
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-black/5'
              }`}>
                
                {/* Mandatory Safety Boundary Notice */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">NOT A MEDICAL DIAGNOSIS</span>
                    <span>MEDVAI provides educational guidance for non-urgent comfort. Always seek professional physician evaluation for persistent symptoms.</span>
                  </div>
                </div>

                {selectedHomeCareFilter === 'comfort' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-white">Post-Meal Comfort Protocol</h4>
                    <ul className="space-y-2 text-xs text-[#BFC5D2]">
                      <li className="flex items-start gap-2">• <span>Remain upright for at least 60–90 minutes after eating to decrease pressure.</span></li>
                      <li className="flex items-start gap-2">• <span>Apply warm compress to upper right abdomen for 15-minute intervals if comfortable.</span></li>
                      <li className="flex items-start gap-2">• <span>Engage in light slow walking; avoid vigorous waist bending immediately post-meal.</span></li>
                    </ul>
                  </div>
                )}

                {selectedHomeCareFilter === 'hydration' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-white">Dietary & Hydration Adjustments</h4>
                    <ul className="space-y-2 text-xs text-[#BFC5D2]">
                      <li className="flex items-start gap-2">• <span>Sip warm water or peppermint/ginger tea slowly; avoid iced beverages.</span></li>
                      <li className="flex items-start gap-2">• <span>Temporarily pause heavy fried, greasy, or high-butter meals for the next 48 hours.</span></li>
                      <li className="flex items-start gap-2">• <span>Shift to smaller, more frequent meals to minimize digestive workload.</span></li>
                    </ul>
                  </div>
                )}

                {selectedHomeCareFilter === 'watchlist' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-white">When to Elevate to Medical Care</h4>
                    <ul className="space-y-2 text-xs text-rose-300">
                      <li className="flex items-start gap-2">• <span>Abdominal pain becomes constant, severe, or unremitting for over 3 hours.</span></li>
                      <li className="flex items-start gap-2">• <span>Onset of fever above 100.4°F (38°C) or persistent vomiting.</span></li>
                      <li className="flex items-start gap-2">• <span>Noticing yellowing of eyes, dark urine, or pale stools.</span></li>
                    </ul>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 5: ANIMATED STEP-BY-STEP DOCTOR BRIEF CREATION */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'brief' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-white">5. Animated Doctor Brief Synthesizer</h3>
                  <p className="text-xs text-[#8A92A3]">Watch MEDVAI compile weeks of history into a 1-page clinical summary step-by-step.</p>
                </div>
                <button
                  onClick={handleStartBriefBuild}
                  disabled={isBuildingBrief}
                  className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center gap-2 ${
                    isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isBuildingBrief ? <Loader2 className="w-4 h-4 animate-spin text-emerald-500" /> : <Stethoscope className="w-4 h-4" />}
                  <span>{isBuildingBrief ? 'Compiling Brief...' : 'Synthesize Doctor Brief'}</span>
                </button>
              </div>

              {/* Progress Stepper */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs text-emerald-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{BRIEF_BUILD_STEPS[briefBuildStep]}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${((briefBuildStep + 1) / BRIEF_BUILD_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Synthesized Brief Card */}
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? 'bg-black/60 border-white/15 text-white' : 'bg-slate-50 border-black/10 text-slate-900'
              }`}>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="font-heading font-bold text-sm block">30-SECOND DOCTOR BRIEF</span>
                    <span className="text-[10px] font-mono text-[#8A92A3]">PATIENT-CONTROLLED CLINICAL SUMMARY</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    READY FOR CONSULTATION
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#8A92A3] uppercase">CHIEF COMPLAINT</span>
                    <p className="font-semibold text-white">Post-Prandial Upper Right Abdominal Discomfort</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#8A92A3] uppercase">DURATION & TIMELINE</span>
                    <p className="text-[#BFC5D2]">4 Days (Onset after high-fat meals)</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#8A92A3] uppercase">HISTORICAL CONTEXT</span>
                    <p className="text-[#BFC5D2]">June 2024 Abdominal Scan Clear; Lipid panel 2023 baseline</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#8A92A3] uppercase">CURRENT MEDICATIONS</span>
                    <p className="text-[#BFC5D2]">Daily Vitamin D3 2000 IU; No antibiotics</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase block mb-1.5">3 TARGETED QUESTIONS FOR YOUR PHYSICIAN:</span>
                  <ul className="space-y-1 text-xs text-[#BFC5D2]">
                    <li>1. "Would a repeat gallbladder evaluation or liver enzyme lab be recommended?"</li>
                    <li>2. "Should I temporarily adopt a low-fat dietary protocol during flare-ups?"</li>
                    <li>3. "Are there specific red-flag indicators I should monitor at home?"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 6: LIFELONG HEALTH MEMORY TIMELINE DEMO */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'memory' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="font-heading font-semibold text-lg text-white">6. Longitudinal Health Memory Timeline</h3>
                <p className="text-xs text-[#8A92A3]">Select years to see how MEDVAI connects past reports, imaging, and voice logs across time.</p>
              </div>

              {/* Year Selector */}
              <div className="flex justify-center gap-2">
                {(['2023', '2024', '2025', '2026'] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedMemoryYear(yr)}
                    className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      selectedMemoryYear === yr 
                        ? 'bg-white text-black border-white shadow-md' 
                        : 'border-white/10 text-[#8A92A3] hover:text-white'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Event Card */}
              <div className={`p-6 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
                isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-black/5'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
                    {MEMORY_EVENTS[selectedMemoryYear].category}
                  </span>
                  <span className="text-[#8A92A3]">{MEMORY_EVENTS[selectedMemoryYear].date}</span>
                </div>

                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {MEMORY_EVENTS[selectedMemoryYear].title}
                </h4>

                <p className="text-xs text-[#BFC5D2] leading-relaxed">
                  {MEMORY_EVENTS[selectedMemoryYear].insight}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span><strong>AI Connection:</strong> {MEMORY_EVENTS[selectedMemoryYear].connection}</span>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DEMO 7: EMERGENCY DETECTION DEMONSTRATION */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'emergency' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="font-heading font-semibold text-lg text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <span>7. Automatic Emergency Pattern Recognition</span>
                </h3>
                <p className="text-xs text-[#8A92A3]">MEDVAI immediately identifies high-risk symptom combinations and routes to urgent care.</p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-white block">Simulate High-Risk Emergency Pattern</span>
                  <span className="text-[11px] text-[#8A92A3]">Inputs: "Sudden heavy chest pressure, cold sweat, radiating left arm pain"</span>
                </div>
                <button
                  onClick={() => setEmergencyMode(!emergencyMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    emergencyMode 
                      ? 'bg-rose-600 text-white border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.5)]' 
                      : 'bg-white/10 text-white/70 border-white/20'
                  }`}
                >
                  {emergencyMode ? 'Emergency Triggered' : 'Trigger Simulation'}
                </button>
              </div>

              {/* Output Display */}
              {emergencyMode ? (
                <div className="p-6 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-white space-y-4 shadow-[0_0_40px_rgba(225,29,72,0.3)] animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                    <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                    <span>🚨 CRITICAL RED FLAG DETECTED — IMMEDIATE EMERGENCY CARE REQUIRED</span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-rose-100">
                    Your described symptom combination (sudden chest pressure + cold sweat + arm radiation) indicates a potential acute cardiovascular emergency.
                  </p>

                  <div className="p-4 rounded-xl bg-black/40 border border-rose-500/40 text-xs space-y-2">
                    <span className="font-bold text-rose-300 block uppercase font-mono">REQUIRED IMMEDIATE ACTIONS:</span>
                    <p className="text-white">1. Call 911 or your local Emergency Medical Services immediately.</p>
                    <p className="text-white">2. Sit down, stay calm, and avoid physical exertion.</p>
                    <p className="text-white">3. Do NOT attempt home care or drive yourself to the hospital.</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs space-y-2">
                  <span className="font-semibold block text-white text-sm">Normal Monitoring Mode Active</span>
                  <p className="text-[#8A92A3]">Symptoms entered in normal mode receive gentle, non-urgent home care guidance. If critical red flags are detected, MEDVAI immediately halts non-urgent advice and displays high-priority emergency instructions.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom CTA */}
        <div className="pt-4">
          <button
            onClick={onOpenWaitlist}
            className={`px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2 ${
              isDark ? 'bg-white text-black hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span>Reserve Your MEDVAI Access Pass</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </button>
        </div>

      </div>
    </section>
  );
};

// Helper Icon Component
function HelpCircleIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

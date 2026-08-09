import React, { useState } from 'react';
import { 
  Activity, Mic, FileText, Stethoscope, Clock, ChevronLeft, ChevronRight, 
  Sparkles, CheckCircle2, ShieldCheck, FileCheck, Layers, Calendar, Play
} from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';
import { HumanModelContainer } from './HumanModel';

interface OSCarouselFeatureProps {
  theme: ThemeMode;
}

type FeatureKey = 'bodymap' | 'voice' | 'reports' | 'brief' | 'memory';

interface FeatureCard {
  id: FeatureKey;
  title: string;
  badge: string;
  icon: React.FC<{ className?: string }>;
  tagline: string;
}

const FEATURES: FeatureCard[] = [
  {
    id: 'bodymap',
    title: 'Interactive Body Map',
    badge: 'Anatomical Understanding',
    icon: Activity,
    tagline: 'Pinpoint body regions, map symptoms to anatomical systems, and understand your body in context.'
  },
  {
    id: 'voice',
    title: 'Voice AI Companion',
    badge: 'Natural Dialogue',
    icon: Mic,
    tagline: '"Tell me what\'s bothering you." Speak naturally in your native language as AI structures context.'
  },
  {
    id: 'reports',
    title: 'Biomarker & Report Translator',
    badge: 'Clear Understanding',
    icon: FileText,
    tagline: 'Translates dense lab PDFs and blood reports into plain human language with longitudinal context.'
  },
  {
    id: 'brief',
    title: '30-Second Doctor Brief',
    badge: 'Consultation Preparation',
    icon: Stethoscope,
    tagline: 'Compiles your health signals and timeline into a concise 1-page summary for physician appointments.'
  },
  {
    id: 'memory',
    title: 'Lifelong Health Memory',
    badge: 'Longitudinal Record',
    icon: Clock,
    tagline: 'Continuous chronological timeline linking reports, visits, and milestones across your lifetime.'
  }
];

export const OSCarouselFeature: React.FC<OSCarouselFeatureProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedFeature, setSelectedFeature] = useState<FeatureKey>('bodymap');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Synchronize index and selected Feature
  const handleSelectFeature = (key: FeatureKey, index: number) => {
    setSelectedFeature(key);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + FEATURES.length) % FEATURES.length;
    setCurrentIndex(nextIdx);
    setSelectedFeature(FEATURES[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % FEATURES.length;
    setCurrentIndex(nextIdx);
    setSelectedFeature(FEATURES[nextIdx].id);
  };

  // 1. Body Map State
  const [bodyAngle, setBodyAngle] = useState<'front' | 'side' | 'back'>('front');
  const [hoveredNode, setHoveredNode] = useState<string>('Chest');

  const BODY_NODES = [
    { 
      id: 'Head', 
      label: 'Head & Neural Cluster', 
      pain: 'Moderate Temporal Tension', 
      timeline: '2 Days Duration', 
      severity: 'Level 4 / 10', 
      description: 'Tracks temporal tension, migraine history, and stress-related headache patterns.', 
      coords: 'top-[8%] left-1/2 -translate-x-1/2' 
    },
    { 
      id: 'Neck', 
      label: 'Thyroid & Cervical Node', 
      pain: 'Mild Cervical Stiffness', 
      timeline: '3 Days Duration', 
      severity: 'Level 3 / 10', 
      description: 'Monitors TSH biomarkers, lymph node swelling logs, and cervical posture tension.', 
      coords: 'top-[16%] left-1/2 -translate-x-1/2' 
    },
    { 
      id: 'Chest', 
      label: 'Cardiopulmonary Node', 
      pain: 'Tightness on Deep Inhale', 
      timeline: '1 Week Duration', 
      severity: 'Level 5 / 10', 
      description: 'Vascular elasticity, resting heart rate trends, and oxygen saturation (SpO2).', 
      coords: 'top-[26%] left-1/2 -translate-x-1/2' 
    },
    { 
      id: 'Upper Abdomen', 
      label: 'Hepatic & Gastric Node', 
      pain: 'Post-Meal Dull Ache', 
      timeline: '4 Days Duration', 
      severity: 'Level 3 / 10', 
      description: 'Liver ALT/AST enzyme levels, gastric acidity patterns, and metabolic digestion metrics.', 
      coords: 'top-[36%] left-1/2 -translate-x-1/2' 
    },
    { 
      id: 'Lower Abdomen', 
      label: 'Renal & Intestinal Node', 
      pain: 'Lower Pelvic Discomfort', 
      timeline: '1 Day Duration', 
      severity: 'Level 2 / 10', 
      description: 'Kidney filtration (eGFR), hydration history, and gut flora balance indicators.', 
      coords: 'top-[44%] left-1/2 -translate-x-1/2' 
    },
    { 
      id: 'Joints', 
      label: 'Joint & Skeletal Frame', 
      pain: 'Morning Stiffness in Knee', 
      timeline: 'Chronic Intermittent', 
      severity: 'Level 4 / 10', 
      description: 'Bone density scan logs, joint mobility range, and cartilage wear tracking.', 
      coords: 'top-[68%] left-1/2 -translate-x-1/2' 
    }
  ];

  const activeNodeData = BODY_NODES.find((n) => n.id === hoveredNode) || BODY_NODES[2];

  // 2. Multilingual Voice State
  const [selectedLang, setSelectedLang] = useState<number>(0);
  const MULTILINGUAL_DATA = [
    { lang: 'English', native: 'English', sentence: '"I\'ve had a headache for the past two days along with mild neck tension."', translation: 'Patient reports 48-hour history of bilateral temporal headache accompanied by cervical muscle stiffness.' },
    { lang: 'Marathi', native: 'मराठी', sentence: '"नमस्कार, मला दोन दिवसांपासून डोकेदुखी आणि मानेमध्ये ताण जाणवत आहे."', translation: 'Patient reports onset of temporal headache and cervical tightness since 2 days.' },
    { lang: 'Hindi', native: 'हिन्दी', sentence: '"मुझे दो दिनों से सिरदर्द और गर्दन में जकड़न है।"', translation: 'Patient experiences continuous head pressure and neck stiffness for 2 days.' },
    { lang: 'Tamil', native: 'தமிழ்', sentence: '"எனக்கு இரண்டு நாட்களாக தலைவலியும் கழுத்து பிடிப்பும் இருக்கிறது."', translation: 'Patient indicates localized headache and neck strain starting 48 hours ago.' },
    { lang: 'Telugu', native: 'తెలుగు', sentence: '"నాకు రెండు రోజుల నుండి తలనొప్పి మరియు మెడ నొప్పులుగా ఉంది."', translation: 'Patient describes head discomfort and cervical tension for 2 days.' },
    { lang: 'Kannada', native: 'ಕನ್ನಡ', sentence: '"ನನಗೆ ಎರಡು ದಿನಗಳಿಂದ ತಲೆನೋವು ಮತ್ತು ಕುತ್ತಿಗೆ ನೋವು ಇದೆ."', translation: 'Patient indicates head aching accompanied by neck stiffness.' },
    { lang: 'Bengali', native: 'বাংলা', sentence: '"আমার দুই দিন ধরে মাথাব্যথা এবং ঘাড়ে টান লাগছে।|"', translation: 'Patient reports head pain and cervical pressure since 2 days.' }
  ];

  // 3. Medical Report AI State
  const [activeReportTab, setActiveReportTab] = useState<'metabolic' | 'lipid' | 'thyroid'>('metabolic');

  return (
    <section id="features-showcase" className="relative py-28 px-4 sm:px-6 overflow-hidden scroll-mt-28">
      
      {/* Background Volumetric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[900px] h-[500px] rounded-full blur-[160px] ${
          isDark ? 'bg-blue-900/10' : 'bg-blue-100/50'
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto space-y-16 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-[840px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#8A92A3] border border-white/10 bg-white/5">
            03 · Operating System Experience
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Engineered as One Intelligent System.
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Every feature connects to the next — Body Map → Voice → AI Understanding → Doctor Brief → Health Memory. Click through the cards below to launch live interactive system demonstrations.
          </p>
        </div>

        {/* ================= HORIZONTAL FLOATING CAROUSEL ================= */}
        <div className="relative pt-4 pb-10 flex flex-col items-center">
          
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 z-20 flex justify-between pointer-events-none px-2 sm:px-6">
            <button
              onClick={handlePrev}
              aria-label="Previous feature"
              className={`p-3 rounded-full border pointer-events-auto transition-all duration-300 cursor-pointer shadow-lg ${
                isDark 
                  ? 'bg-black/80 border-white/20 text-white hover:bg-white/20' 
                  : 'bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next feature"
              className={`p-3 rounded-full border pointer-events-auto transition-all duration-300 cursor-pointer shadow-lg ${
                isDark 
                  ? 'bg-black/80 border-white/20 text-white hover:bg-white/20' 
                  : 'bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Track */}
          <div className="w-full flex items-center justify-center gap-4 sm:gap-6 overflow-hidden py-8">
            {FEATURES.map((item, idx) => {
              const isCenter = idx === currentIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectFeature(item.id, idx)}
                  className={`relative flex-shrink-0 cursor-pointer rounded-3xl border p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                    isCenter
                      ? isDark
                        ? 'w-[290px] sm:w-[340px] bg-black/85 border-white/30 scale-105 shadow-[0_20px_50px_rgba(255,255,255,0.1)] ring-1 ring-white/40 z-10'
                        : 'w-[290px] sm:w-[340px] bg-white border-slate-300 scale-105 shadow-2xl ring-1 ring-slate-400 z-10'
                      : isDark
                      ? 'w-[220px] sm:w-[260px] bg-black/40 border-white/10 opacity-60 scale-95 hover:opacity-90'
                      : 'w-[220px] sm:w-[260px] bg-white/70 border-slate-200 opacity-60 scale-95 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${
                      isCenter 
                        ? (isDark ? 'bg-white text-black' : 'bg-slate-900 text-white') 
                        : (isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-800')
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`font-heading font-bold text-lg mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-[#8A92A3]' : 'text-slate-600'
                  }`}>
                    {item.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-2 mt-2">
            {FEATURES.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => handleSelectFeature(f.id, idx)}
                aria-label={`Select ${f.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? isDark ? 'w-8 bg-white' : 'w-8 bg-slate-900'
                    : isDark ? 'w-2 bg-white/20' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= DEDICATED SHOWCASE DEMONSTRATION PANELS ================= */}
        <SpatialGlassCard id="interactive-demo" isDark={isDark} floatIndex={1} className="w-full max-w-[1080px] mx-auto p-6 sm:p-10 text-left scroll-mt-28">

          {/* SHOWCASE 1: INTERACTIVE BODY MAP */}
          {selectedFeature === 'bodymap' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}>
                <div>
                  <h3 className={`font-heading font-bold text-xl flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Activity className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    2D Digital Health Twin
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    Interactive SVG-based anatomical visualization with active region scanning and real-time medical insights.
                  </p>
                </div>
              </div>

              {/* 3D Anatomical Human Model Interactive Canvas */}
              <HumanModelContainer isDark={isDark} />
            </div>
          )}

          {/* SHOWCASE 2: MULTILINGUAL VOICE AI */}
          {selectedFeature === 'voice' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className={`border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <h3 className={`font-heading font-bold text-xl flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <Mic className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  Multilingual Voice Access Demonstration
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                  Select any language to test natural voice input conversion into clinical terminology.
                </p>
              </div>

              {/* Language Chips */}
              <div>
                <span className={`block font-mono text-xs mb-3 uppercase tracking-wider ${
                  isDark ? 'text-[#8A92A3]' : 'text-slate-500'
                }`}>
                  SUPPORTED REGIONAL LANGUAGES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {MULTILINGUAL_DATA.map((item, idx) => (
                    <button
                      key={item.lang}
                      onClick={() => setSelectedLang(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedLang === idx
                          ? isDark 
                            ? 'bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                            : 'bg-slate-900 text-white border-slate-900 font-semibold shadow-md'
                          : isDark
                            ? 'bg-black/40 border-white/10 text-[#8A92A3] hover:text-white'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.native} ({item.lang})
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Continuous Waveform Card */}
                <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center gap-4 ${
                  isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-inner'
                }`}>
                  <div className={`p-5 rounded-full border animate-pulse ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                      : 'bg-purple-100 text-purple-700 border-purple-300'
                  }`}>
                    <Mic className="w-8 h-8" />
                  </div>

                  {/* Animated Continuous Equalizer Bars */}
                  <div className="flex items-center gap-1.5 h-8">
                    <span className="w-1 h-4 bg-purple-500 rounded-full animate-bounce" />
                    <span className="w-1 h-7 bg-purple-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-3 bg-purple-600 rounded-full animate-bounce delay-150" />
                    <span className="w-1 h-8 bg-purple-500 rounded-full animate-bounce" />
                    <span className="w-1 h-5 bg-purple-400 rounded-full animate-bounce delay-100" />
                  </div>

                  <p className={`font-heading font-medium text-base sm:text-lg italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {MULTILINGUAL_DATA[selectedLang].sentence}
                  </p>
                  <span className={`font-mono text-[11px] ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    NATIVE AUDIO SPEECH · {MULTILINGUAL_DATA[selectedLang].lang.toUpperCase()}
                  </span>
                </div>

                {/* Structured Clinical Note Card */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-md'
                }`}>
                  <div className={`flex justify-between items-center border-b pb-3 ${
                    isDark ? 'border-white/10' : 'border-slate-200'
                  }`}>
                    <span className={`font-mono text-xs uppercase ${isDark ? 'text-purple-400' : 'text-purple-700 font-semibold'}`}>
                      CLINICAL NLP TRANSLATION
                    </span>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                      MEDVAI VOICE ENGINE
                    </span>
                  </div>

                  <div>
                    <span className={`text-xs block mb-1 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>Extracted Clinical Record:</span>
                    <p className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {MULTILINGUAL_DATA[selectedLang].translation}
                    </p>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs ${
                    isDark 
                      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' 
                      : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  }`}>
                    ✓ Automatically formatted for doctor review without language barriers.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SHOWCASE 3: MEDICAL REPORT AI */}
          {selectedFeature === 'reports' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className={`border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <h3 className={`font-heading font-bold text-xl flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <FileText className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  3D Medical Report PDF Parser
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                  Floating 3D pathology report stack that converts complex blood labs into clear patient insights.
                </p>
              </div>

              {/* 3D Document Stack Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* 3D Stack View */}
                <div className="relative h-72 flex items-center justify-center">
                  
                  {/* Card 1: Metabolic */}
                  <div 
                    onClick={() => setActiveReportTab('metabolic')}
                    className={`absolute w-72 p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      activeReportTab === 'metabolic'
                        ? isDark
                          ? 'z-30 translate-y-0 scale-100 dark-glass border-white/40 shadow-2xl ring-2 ring-blue-400/50'
                          : 'z-30 translate-y-0 scale-100 bg-white border-slate-400 shadow-2xl ring-2 ring-blue-500/50'
                        : isDark
                          ? 'z-10 translate-y-6 scale-90 dark-glass opacity-50'
                          : 'z-10 translate-y-6 scale-90 bg-slate-100 border-slate-300 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-mono text-blue-600 dark:text-blue-400 mb-2 font-bold">
                      <span>METABOLIC PANEL PDF</span>
                      <span>PAGE 1</span>
                    </div>
                    <p className={`text-xs font-mono mb-1 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      TSH: 5.8 mIU/L (ELEVATED)
                    </p>
                    <p className={`text-[11px] ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>Normal Range: 0.4 - 4.2 mIU/L</p>
                  </div>

                  {/* Card 2: Lipid */}
                  <div 
                    onClick={() => setActiveReportTab('lipid')}
                    className={`absolute w-72 p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      activeReportTab === 'lipid'
                        ? isDark
                          ? 'z-30 translate-y-0 scale-100 dark-glass border-white/40 shadow-2xl ring-2 ring-blue-400/50'
                          : 'z-30 translate-y-0 scale-100 bg-white border-slate-400 shadow-2xl ring-2 ring-blue-500/50'
                        : isDark
                          ? 'z-20 translate-y-3 scale-95 dark-glass opacity-75'
                          : 'z-20 translate-y-3 scale-95 bg-slate-100 border-slate-300 opacity-75'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-mono text-blue-600 dark:text-blue-400 mb-2 font-bold">
                      <span>LIPID PANEL PDF</span>
                      <span>PAGE 2</span>
                    </div>
                    <p className={`text-xs font-mono mb-1 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      HDL CHOLESTEROL: 58 mg/dL
                    </p>
                    <p className={`text-[11px] ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>Protective Cardiovascular Marker</p>
                  </div>

                </div>

                {/* Explanation Output Panel */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-md'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs uppercase font-semibold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      PLAIN LANGUAGE SUMMARY
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      BIOMARKER TRANSLATOR
                    </span>
                  </div>

                  {activeReportTab === 'metabolic' ? (
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm">Thyroid Stimulating Hormone (TSH) Analysis</h4>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-700'}`}>
                        Your TSH reading is slightly above standard baseline ranges. This indicates your thyroid gland may be working harder than usual. It is a common finding worth reviewing with your doctor.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm">Lipid Profile & Heart Health Marker</h4>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#BFC5D2]' : 'text-slate-700'}`}>
                        Your HDL cholesterol level is in an optimal protective zone. High HDL helps carry excess cholesterol away from blood vessels back to the liver.
                      </p>
                    </div>
                  )}

                  <div className={`p-3 rounded-xl border text-xs italic ${
                    isDark 
                      ? 'border-blue-400/20 bg-blue-400/10 text-blue-300' 
                      : 'border-blue-300 bg-blue-50 text-blue-800'
                  }`}>
                    💡 Patient Safety Note: MEDVAI explains lab ranges clearly without diagnosing conditions or creating panic.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SHOWCASE 4: 30 SECOND DOCTOR BRIEF */}
          {selectedFeature === 'brief' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className={`border-b pb-4 flex justify-between items-center ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div>
                  <h3 className={`font-heading font-bold text-xl flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Stethoscope className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    30-Second Hospital Printable Brief
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    Hospital-inspired layout engineered for 12-minute doctor consultations.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 font-semibold">
                  CLINICAL FORMAT
                </span>
              </div>

              {/* Printable Card */}
              <div className="p-6 sm:p-8 rounded-2xl border bg-white text-slate-900 space-y-6 shadow-2xl font-sans">
                
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <p className="font-heading font-bold text-lg text-slate-900">MEDVAI PRE-CONSULTATION BRIEF</p>
                    <p className="text-xs text-slate-500">Prepared for Primary Care Physician Review</p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-300">
                    CONFIDENTIAL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">1. CHIEF CONCERN</span>
                    <p className="text-slate-600">Intermittent afternoon tension headache with neck stiffness for 14 days.</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">2. TIMELINE</span>
                    <p className="text-slate-600">Symptom onset 2 weeks ago; non-progressive, no visual aura reported.</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">3. CURRENT MEDICINES</span>
                    <p className="text-slate-600">Vitamin D3 2000 IU daily; No regular OTC NSAIDs taken.</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">4. QUESTIONS TO DISCUSS</span>
                    <p className="text-slate-600">1. Could sleep hygiene explain the fatigue? 2. Should we re-check TSH?</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700">5. ATTACHED LAB RECENT HISTORY: </span>
                  <span className="text-slate-600">Lipid panel (2024), TSH 5.8 mIU/L (Metabolic PDF).</span>
                </div>

              </div>
            </div>
          )}

          {/* SHOWCASE 5: LONG-TERM HEALTH MEMORY */}
          {selectedFeature === 'memory' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className={`border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <h3 className={`font-heading font-bold text-xl flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <Clock className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  Long-term Health Memory Timeline
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                  Continuous chronological record linking reports, visits, and milestones over years.
                </p>
              </div>

              {/* Floating Timeline */}
              <div className={`relative border-l-2 ml-4 pl-6 space-y-6 text-xs ${
                isDark ? 'border-white/20' : 'border-slate-300'
              }`}>
                
                <div className="relative">
                  <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 ${
                    isDark ? 'bg-amber-400 border-black' : 'bg-amber-500 border-white shadow'
                  }`} />
                  <span className={`font-mono text-[10px] font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    AUG 2026 · RECENT ENTRY
                  </span>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Follow-up Metabolic Panel</h4>
                  <p className={isDark ? 'text-[#8A92A3]' : 'text-slate-600'}>TSH stabilized to 2.1 mIU/L. Glucose optimal at 94 mg/dL.</p>
                </div>

                <div className="relative">
                  <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 ${
                    isDark ? 'bg-white/40 border-black' : 'bg-slate-400 border-white shadow'
                  }`} />
                  <span className={`font-mono text-[10px] ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>FEB 2025</span>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Primary Care Annual Exam</h4>
                  <p className={isDark ? 'text-[#8A92A3]' : 'text-slate-600'}>Tdap booster administered; routine screening recommended.</p>
                </div>

                <div className="relative">
                  <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 ${
                    isDark ? 'bg-white/40 border-black' : 'bg-slate-400 border-white shadow'
                  }`} />
                  <span className={`font-mono text-[10px] ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>OCT 2024</span>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Initial Baseline Lab Entry</h4>
                  <p className={isDark ? 'text-[#8A92A3]' : 'text-slate-600'}>Uploaded PDF pathology report into MEDVAI encrypted memory.</p>
                </div>

              </div>
            </div>
          )}

        </SpatialGlassCard>

      </div>
    </section>
  );
};

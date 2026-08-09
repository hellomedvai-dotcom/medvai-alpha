import React, { useState, useEffect, useMemo } from 'react';
import { GlassHumanModel } from './GlassHumanModel';
import { 
  Activity, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Stethoscope, 
  HeartHandshake, 
  RefreshCw,
  Brain,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
// import removed to restore original background

export interface BodyRegion {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  symptoms: string[];
}

export const BODY_REGIONS: BodyRegion[] = [
  { 
    id: 'head', 
    name: 'Head & Brain', 
    position: [0, 1.35, 0.1], 
    description: 'Neurological signals, headaches, tension, & cognition',
    symptoms: ['Temple pressure', 'Migraine pattern', 'Dizziness', 'Visual fatigue']
  },
  { 
    id: 'chest', 
    name: 'Chest & Heart', 
    position: [0, 0.92, 0.18], 
    description: 'Cardiovascular, respiratory, & sternal sensation',
    symptoms: ['Chest tightness', 'Shortness of breath', 'Palpitations', 'Sternal discomfort']
  },
  { 
    id: 'abdomen', 
    name: 'Abdomen & Gut', 
    position: [0, 0.52, 0.18], 
    description: 'Digestive tract, liver, gallbladder, & GI signals',
    symptoms: ['Post-meal ache', 'Upper quadrant discomfort', 'Nausea', 'Bloating']
  },
  { 
    id: 'spine', 
    name: 'Spine & Back', 
    position: [0, 0.72, -0.18], 
    description: 'Postural alignment, spine, & muscular tension',
    symptoms: ['Lower back stiffness', 'Upper spinal strain', 'Nerve tingling', 'Postural fatigue']
  },
  { 
    id: 'arms', 
    name: 'Shoulders & Arms', 
    position: [0.38, 0.92, 0.05], 
    description: 'Joint mobility, deltoid strain, & peripheral pathways',
    symptoms: ['Shoulder stiffness', 'Radiating numbness', 'Joint ache', 'Bicep strain']
  },
  { 
    id: 'legs', 
    name: 'Hips & Legs', 
    position: [0.2, -0.2, 0.05], 
    description: 'Lower extremity, hips, knees, & locomotion',
    symptoms: ['Femoral tightness', 'Knee joint ache', 'Calf cramping', 'Ankle stability']
  }
];

// Interactive Questionnaire Flow Data per Region
export interface RegionQuestion {
  question: string;
  options: { label: string; risk: 'low' | 'moderate' | 'emergency'; detail: string }[];
}

export const REGION_QUESTIONS: Record<string, RegionQuestion[]> = {
  head: [
    {
      question: "Where is the head sensation most localized?",
      options: [
        { label: "Forehead & temples (tight band feeling)", risk: 'low', detail: 'Consistent with tension headache or screen strain.' },
        { label: "One side (pulsating with light sensitivity)", risk: 'moderate', detail: 'Pattern aligns with vascular migraine physiology.' },
        { label: "Back of head & neck stiffness with fever", risk: 'emergency', detail: 'Potential meningeal irritation signal.' },
        { label: "Sudden 'thunderclap' peak within seconds", risk: 'emergency', detail: 'Acute neurological emergency indicator.' }
      ]
    },
    {
      question: "How long has this episode been present?",
      options: [
        { label: "Less than 2 hours (gradual onset)", risk: 'low', detail: 'Recent transient onset.' },
        { label: "Intermittent over the past 24-48 hours", risk: 'low', detail: 'Episodic pattern.' },
        { label: "Persistent & worsening for > 3 days", risk: 'moderate', detail: 'Subacute progression requiring clinical review.' },
        { label: "Accompanied by sudden facial numbness or speech slurring", risk: 'emergency', detail: 'Possible cerebrovascular warning signal.' }
      ]
    },
    {
      question: "What daily triggers seem to aggravate it?",
      options: [
        { label: "Prolonged screen time & lack of sleep", risk: 'low', detail: 'Lifestyle & postural strain factors.' },
        { label: "Stress, skipped meals, or dehydration", risk: 'low', detail: 'Metabolic & tension triggers.' },
        { label: "Physical exertion or coughing", risk: 'moderate', detail: 'Exertional intracranial pressure modulation.' },
        { label: "Recent head impact or trauma", risk: 'emergency', detail: 'Post-concussive or intracranial risk.' }
      ]
    }
  ],
  chest: [
    {
      question: "Describe the nature of your chest sensation:",
      options: [
        { label: "Dull ache or burn after eating / lying flat", risk: 'low', detail: 'Gastroesophageal reflux profile.' },
        { label: "Muscular soreness when pressing chest wall", risk: 'low', detail: 'Costochondral or pectoral muscle strain.' },
        { label: "Sharp stabbing pain when inhaling deeply", risk: 'moderate', detail: 'Pleuritic or respiratory irritation.' },
        { label: "Heavy squeezing tightness radiating to jaw or left arm", risk: 'emergency', detail: 'Ischemic cardiac warning pattern.' }
      ]
    },
    {
      question: "Are you experiencing shortness of breath or dizziness?",
      options: [
        { label: "Breathing feels normal & unhindered", risk: 'low', detail: 'Normal oxygenation perception.' },
        { label: "Mild tightness during rapid walking", risk: 'moderate', detail: 'Exertional intolerance signal.' },
        { label: "Shortness of breath at complete rest", risk: 'emergency', detail: 'Acute cardiopulmonary distress.' },
        { label: "Profuse cold sweat or lightheadedness", risk: 'emergency', detail: 'Hemodynamic compromise indicator.' }
      ]
    },
    {
      question: "What provides noticeable relief?",
      options: [
        { label: "Antacids or sitting upright", risk: 'low', detail: 'Reflux mitigation response.' },
        { label: "Resting, stretching, or gentle heat", risk: 'low', detail: 'Musculoskeletal recovery response.' },
        { label: "Nothing seems to ease the discomfort", risk: 'moderate', detail: 'Refractory pain signal.' },
        { label: "Pain is rapidly intensifying regardless of position", risk: 'emergency', detail: 'Evolving emergency profile.' }
      ]
    }
  ],
  abdomen: [
    {
      question: "In which area of your abdomen is the feeling centered?",
      options: [
        { label: "Upper abdomen (below sternum)", risk: 'low', detail: 'Gastric acid or upper GI fullness.' },
        { label: "General cramping around belly button", risk: 'low', detail: 'Functional intestinal gas or motility.' },
        { label: "Sharp pain moving to lower right quadrant", risk: 'emergency', detail: 'Classic appendiceal irritation pathway.' },
        { label: "Upper right quadrant after greasy meal", risk: 'moderate', detail: 'Biliary / gallbladder stretch signal.' }
      ]
    },
    {
      question: "Are there any associated gastrointestinal changes?",
      options: [
        { label: "Mild bloating or temporary indigestion", risk: 'low', detail: 'Benign digestive fluctuation.' },
        { label: "Nausea without active vomiting", risk: 'low', detail: 'Mild vagal digestive feedback.' },
        { label: "Inability to keep liquids down for > 24h", risk: 'moderate', detail: 'Dehydration & GI intolerance risk.' },
        { label: "High fever, rigid hard abdomen, or bloody stool", risk: 'emergency', detail: 'Acute abdominal emergency flags.' }
      ]
    },
    {
      question: "How does physical movement affect the pain?",
      options: [
        { label: "Walking or gentle stretch helps release tension", risk: 'low', detail: 'Motility-responsive discomfort.' },
        { label: "No significant change with movement", risk: 'low', detail: 'Static mild ache.' },
        { label: "Every bump or step sends severe sharp pain", risk: 'emergency', detail: 'Peritoneal rebound tenderness indicator.' },
        { label: "Constant deep ache requiring lying curled up", risk: 'moderate', detail: 'Visceral inflammation sign.' }
      ]
    }
  ],
  spine: [
    {
      question: "Where along your spine is the discomfort located?",
      options: [
        { label: "Neck & upper shoulder blade region", risk: 'low', detail: 'Cervical postural fatigue & forward head posture.' },
        { label: "Lower lumbar area (dull muscular ache)", risk: 'low', detail: 'Lumbar strain from sitting or bending.' },
        { label: "Shooting nerve ache down back of thigh to foot", risk: 'moderate', detail: 'Sciatic nerve root compression pattern.' },
        { label: "Spine pain following a fall with inability to bend", risk: 'emergency', detail: 'Vertebral fracture or structural trauma.' }
      ]
    },
    {
      question: "Are you noticing any numbness, tingling, or weakness?",
      options: [
        { label: "No numbness; purely muscular tightness", risk: 'low', detail: 'Myofascial tightness without neurological deficit.' },
        { label: "Occasional mild tingling in toes or fingers", risk: 'low', detail: 'Transient postural nerve compression.' },
        { label: "Noticeable leg weakness or foot drop when walking", risk: 'moderate', detail: 'Progressive motor nerve root impact.' },
        { label: "Loss of bowel or bladder control / saddle numbness", risk: 'emergency', detail: 'Cauda equina medical emergency flag.' }
      ]
    },
    {
      question: "What position provides the best relief?",
      options: [
        { label: "Lying flat with knees supported by pillow", risk: 'low', detail: 'Decompressive lumbar posture.' },
        { label: "Gentle walking or standing", risk: 'low', detail: 'Movement-based disc decompression.' },
        { label: "Constant pain unchanged in any position", risk: 'moderate', detail: 'Non-mechanical spinal pain.' },
        { label: "Pain is severe and preventing all movement", risk: 'emergency', detail: 'Acute incapacitating spinal crisis.' }
      ]
    }
  ],
  arms: [
    {
      question: "Which segment of the arm or shoulder is affected?",
      options: [
        { label: "Shoulder joint (overhead reach strain)", risk: 'low', detail: 'Rotator cuff tendon overload.' },
        { label: "Forearm / wrist from repetitive typing or mouse use", risk: 'low', detail: 'Carpal tunnel or extensor tendonitis.' },
        { label: "Deep ache radiating down both arms simultaneously", risk: 'moderate', detail: 'Cervical nerve or systemic pathway issue.' },
        { label: "Sudden left arm heaviness accompanied by chest pressure", risk: 'emergency', detail: 'Referred cardiac ischemia indicator.' }
      ]
    },
    {
      question: "How is your hand strength and joint mobility?",
      options: [
        { label: "Grip strength is 100% normal", risk: 'low', detail: 'Intact motor innervation.' },
        { label: "Mild stiffness in morning that warms up", risk: 'low', detail: 'Early articular fatigue.' },
        { label: "Difficulty opening jars or holding objects", risk: 'moderate', detail: 'Functional motor weakness.' },
        { label: "Complete inability to lift arm or move fingers", risk: 'emergency', detail: 'Acute focal neurological deficit.' }
      ]
    },
    {
      question: "Did a specific physical event trigger this?",
      options: [
        { label: "Repetitive office work or workout strain", risk: 'low', detail: 'Overuse muscular strain.' },
        { label: "Sleeping in an awkward position on shoulder", risk: 'low', detail: 'Transient positional compression.' },
        { label: "Pop or snap heard during heavy lift", risk: 'moderate', detail: 'Possible tendon tear.' },
        { label: "Sudden onset without any physical motion", risk: 'moderate', detail: 'Spontaneous neurological / vascular issue.' }
      ]
    }
  ],
  legs: [
    {
      question: "Where in the lower extremity is the sensation centered?",
      options: [
        { label: "Knee joint tightness when taking stairs", risk: 'low', detail: 'Patellofemoral or cartilage fatigue.' },
        { label: "Calf tightness or mild cramp after walking", risk: 'low', detail: 'Dehydration or electrolyte exertion cramp.' },
        { label: "One-sided calf swelling, warmth, and tenderness", risk: 'emergency', detail: 'Deep Vein Thrombosis (DVT) vascular red flag.' },
        { label: "Hip joint ache when bearing weight", risk: 'moderate', detail: 'Hip articular or bursal stress.' }
      ]
    },
    {
      question: "Can you comfortably put weight on the affected leg?",
      options: [
        { label: "Yes, fully weight-bearing with normal gait", risk: 'low', detail: 'Unrestricted biomechanical support.' },
        { label: "Slight limp but able to walk short distances", risk: 'low', detail: 'Mild antalgic compensation.' },
        { label: "Unable to bear weight or take 4 steps", risk: 'moderate', detail: 'Structural bone or ligament compromise.' },
        { label: "Leg is pale, cold to touch, or lacking pulse", risk: 'emergency', detail: 'Acute arterial ischemia red flag.' }
      ]
    },
    {
      question: "Are there any visible skin or vascular changes?",
      options: [
        { label: "Skin looks completely normal", risk: 'low', detail: 'Unremarkable superficial appearance.' },
        { label: "Mild puffiness around ankle after standing all day", risk: 'low', detail: 'Dependent venous stasis.' },
        { label: "Spreading redness, warmth, or fever", risk: 'moderate', detail: 'Possible soft tissue infection (cellulitis).' },
        { label: "Visible bulge along tendon with immediate sharp pain", risk: 'moderate', detail: 'Acute tendon rupture.' }
      ]
    }
  ]
};

const AnatomicalSVGFigure = ({
  view,
  hoveredRegion,
  selectedRegion,
  onHover,
  onSelect,
  pulseActive
}: {
  view: 'front' | 'back';
  hoveredRegion: BodyRegion | null;
  selectedRegion: BodyRegion;
  onHover: (r: BodyRegion | null) => void;
  onSelect: (r: BodyRegion) => void;
  pulseActive: boolean;
}) => {
  const [activeSubPaths, setActiveSubPaths] = useState<Record<string, string>>({});
  const [hoverSubPath, setHoverSubPath] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubPaths({});
    setHoverSubPath(null);
  }, [view]);

  const getPathClass = (subId: string, parentRegionId: string, isJoint: boolean = false) => {
    const isParentSelected = selectedRegion.id === parentRegionId;
    const isParentHovered = hoveredRegion?.id === parentRegionId;
    
    // If there is an active subpath for this region, only that subpath is selected.
    // If there is NO active subpath (e.g. initial load), don't select any specific subpath unless it's a fallback.
    const isActiveSelection = isParentSelected && (activeSubPaths[parentRegionId] === subId || (!activeSubPaths[parentRegionId] && subId.includes('chest')));
    const isActiveHover = hoverSubPath === subId || (isParentHovered && !hoverSubPath && isActiveSelection);

    return `transition-all duration-300 cursor-pointer ${
      isActiveSelection
        ? 'fill-[#5FD7FF]/40 stroke-[#5FD7FF] stroke-[2px] filter drop-shadow-[0_0_12px_rgba(95,215,255,0.8)]'
        : isActiveHover
          ? 'fill-[#5FD7FF]/20 stroke-[#5FD7FF]/80 stroke-[1.5px] filter drop-shadow-[0_0_8px_rgba(95,215,255,0.6)]'
          : 'fill-transparent stroke-transparent hover:stroke-[#5FD7FF]/40 hover:fill-[#5FD7FF]/10'
    }`;
  };

  const handleInteract = (e: React.MouseEvent, subId: string, parentRegionId: string, isClick: boolean) => {
    e.stopPropagation(); // VERY IMPORTANT: prevents parent limb from capturing joint clicks
    const parentRegion = BODY_REGIONS.find(r => r.id === parentRegionId);
    if (!parentRegion) return;
    
    if (isClick) {
      setActiveSubPaths(prev => ({ ...prev, [parentRegionId]: subId }));
      onSelect(parentRegion);
    } else {
      setHoverSubPath(subId);
      onHover(parentRegion);
    }
  };

  // Base coordinates for a 400x533 grid (3:4 aspect ratio)
  return (
    <div className="relative w-full h-full flex items-center justify-center p-0 select-none overflow-hidden">
      <style>
        {`
          @keyframes scanLine {
            0% { top: -20%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 120%; opacity: 0; }
          }
        `}
      </style>
      
      {/* Background Image Layer - Holographic Translucent Anatomy */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <div className="absolute bottom-[4%] w-[260px] h-[40px] rounded-[100%] bg-[#5FD7FF]/10 border border-[#5FD7FF]/20 blur-[1px] shadow-[0_0_30px_rgba(95,215,255,0.25)] left-1/2" style={{ transform: 'translateX(-50%) rotateX(75deg)' }} />
        <img 
          src={view === 'front' ? '/models/glass-human-front.png' : '/models/glass-human-back.png'}
          alt={`Anatomy ${view}`}
          className="w-full h-full object-contain max-w-[320px] transition-all duration-700 ease-in-out relative z-10"
          style={{ 
            mixBlendMode: 'screen',
            opacity: 0.95,
            filter: 'contrast(1.2) brightness(1.2) drop-shadow(0 0 15px rgba(95,215,255,0.2))'
          }}
        />
        {/* Glass Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5FD7FF]/5 to-[#5FD7FF]/10 mix-blend-overlay"></div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl z-10">
        <div className="w-full h-[150px] bg-gradient-to-b from-transparent via-[#5FD7FF]/5 to-[#5FD7FF]/15 absolute left-0" style={{ animation: 'scanLine 4s ease-in-out infinite' }} />
        <div className="w-full h-[1px] bg-[#5FD7FF]/50 absolute left-0 shadow-[0_0_8px_rgba(95,215,255,0.8)]" style={{ animation: 'scanLine 4s ease-in-out infinite', transform: 'translateY(150px)' }} />
      </div>
      
      {pulseActive && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="w-48 h-48 sm:w-64 sm:h-64 border border-[#5FD7FF]/50 rounded-full animate-ping" />
        </div>
      )}

      {/* Interaction SVG Layer */}
      <svg viewBox="0 0 400 533" className="w-full h-full max-w-[400px] relative z-20">
        
        {view === 'front' ? (
          <>
            {/* Front Head & Neck */}
            <path d="M 175,60 C 175,20 225,20 225,60 C 225,95 210,105 200,110 C 190,105 175,95 175,60 Z" onClick={(e) => handleInteract(e, 'head', 'head', true)} onMouseEnter={(e) => handleInteract(e, 'head', 'head', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('head', 'head')} />
            <path d="M 190,105 C 190,120 210,120 210,105 L 215,130 C 200,135 185,130 185,130 Z" onClick={(e) => handleInteract(e, 'neck', 'head', true)} onMouseEnter={(e) => handleInteract(e, 'neck', 'head', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('neck', 'head')} />
            
            {/* Front Torso */}
            <path d="M 150,130 C 200,125 250,130 250,130 C 245,170 235,190 225,205 C 200,200 175,205 175,205 C 165,190 155,170 150,130 Z" onClick={(e) => handleInteract(e, 'chest', 'chest', true)} onMouseEnter={(e) => handleInteract(e, 'chest', 'chest', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('chest', 'chest')} />
            <circle cx="210" cy="165" r="18" onClick={(e) => handleInteract(e, 'heart', 'chest', true)} onMouseEnter={(e) => handleInteract(e, 'heart', 'chest', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('heart', 'chest', true)} />
            <path d="M 175,205 C 200,200 225,205 225,205 C 225,225 220,240 215,245 C 200,240 185,245 185,245 C 180,240 175,225 175,205 Z" onClick={(e) => handleInteract(e, 'upper_abdomen', 'abdomen', true)} onMouseEnter={(e) => handleInteract(e, 'upper_abdomen', 'abdomen', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('upper_abdomen', 'abdomen')} />
            <path d="M 175,245 C 200,240 225,245 225,245 C 225,260 220,265 215,275 C 200,270 185,275 185,275 C 180,265 175,260 175,245 Z" onClick={(e) => handleInteract(e, 'lower_abdomen', 'abdomen', true)} onMouseEnter={(e) => handleInteract(e, 'lower_abdomen', 'abdomen', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('lower_abdomen', 'abdomen')} />
            <path d="M 185,275 C 200,270 215,275 215,275 C 220,290 210,310 200,315 C 190,310 180,290 185,275 Z" onClick={(e) => handleInteract(e, 'pelvis', 'abdomen', true)} onMouseEnter={(e) => handleInteract(e, 'pelvis', 'abdomen', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('pelvis', 'abdomen')} />

            {/* Front Right Arm (Viewer's left) */}
            <circle cx="140" cy="135" r="15" onClick={(e) => handleInteract(e, 'right_shoulder', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'right_shoulder', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_shoulder', 'arms')} />
            <path d="M 150,130 C 130,140 115,180 120,210 C 130,220 145,215 155,200 Z" onClick={(e) => handleInteract(e, 'right_upper_arm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'right_upper_arm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_upper_arm', 'arms')} />
            <circle cx="120" cy="225" r="12" onClick={(e) => handleInteract(e, 'right_elbow', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'right_elbow', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_elbow', 'arms')} />
            <path d="M 115,235 C 105,250 95,270 90,290 C 105,295 115,290 125,240 Z" onClick={(e) => handleInteract(e, 'right_forearm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'right_forearm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_forearm', 'arms')} />
            <path d="M 105,295 C 90,300 80,310 85,325 C 95,335 110,315 105,295 Z" onClick={(e) => handleInteract(e, 'right_hand', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'right_hand', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_hand', 'arms')} />

            {/* Front Left Arm (Viewer's right) */}
            <circle cx="260" cy="135" r="15" onClick={(e) => handleInteract(e, 'left_shoulder', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'left_shoulder', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_shoulder', 'arms')} />
            <path d="M 250,130 C 270,140 285,180 280,210 C 270,220 255,215 245,200 Z" onClick={(e) => handleInteract(e, 'left_upper_arm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'left_upper_arm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_upper_arm', 'arms')} />
            <circle cx="280" cy="225" r="12" onClick={(e) => handleInteract(e, 'left_elbow', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'left_elbow', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_elbow', 'arms')} />
            <path d="M 285,235 C 295,250 305,270 310,290 C 295,295 285,290 275,240 Z" onClick={(e) => handleInteract(e, 'left_forearm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'left_forearm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_forearm', 'arms')} />
            <path d="M 295,295 C 310,300 320,310 315,325 C 305,335 290,315 295,295 Z" onClick={(e) => handleInteract(e, 'left_hand', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'left_hand', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_hand', 'arms')} />

            {/* Front Right Leg (Viewer's left) */}
            <circle cx="175" cy="285" r="18" onClick={(e) => handleInteract(e, 'right_hip', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_hip', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_hip', 'legs')} />
            <path d="M 185,275 C 160,290 160,350 165,395 C 180,400 195,390 200,315 Z" onClick={(e) => handleInteract(e, 'right_thigh', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_thigh', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_thigh', 'legs')} />
            <circle cx="175" cy="400" r="16" onClick={(e) => handleInteract(e, 'right_knee', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_knee', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_knee', 'legs')} />
            <path d="M 165,395 C 150,440 155,480 155,495 C 170,495 180,480 185,450 Z" onClick={(e) => handleInteract(e, 'right_calf', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_calf', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_calf', 'legs')} />
            <circle cx="165" cy="495" r="12" onClick={(e) => handleInteract(e, 'right_ankle', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_ankle', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_ankle', 'legs')} />
            <path d="M 153,495 C 145,510 145,520 160,525 C 180,530 185,510 177,495 Z" onClick={(e) => handleInteract(e, 'right_foot', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'right_foot', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('right_foot', 'legs')} />

            {/* Front Left Leg (Viewer's right) */}
            <circle cx="225" cy="285" r="18" onClick={(e) => handleInteract(e, 'left_hip', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_hip', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_hip', 'legs')} />
            <path d="M 215,275 C 240,290 240,350 235,395 C 220,400 205,390 200,315 Z" onClick={(e) => handleInteract(e, 'left_thigh', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_thigh', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_thigh', 'legs')} />
            <circle cx="225" cy="400" r="16" onClick={(e) => handleInteract(e, 'left_knee', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_knee', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_knee', 'legs')} />
            <path d="M 235,395 C 250,440 245,480 245,495 C 230,495 220,480 215,450 Z" onClick={(e) => handleInteract(e, 'left_calf', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_calf', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_calf', 'legs')} />
            <circle cx="235" cy="495" r="12" onClick={(e) => handleInteract(e, 'left_ankle', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_ankle', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_ankle', 'legs')} />
            <path d="M 247,495 C 255,510 255,520 240,525 C 220,530 215,510 223,495 Z" onClick={(e) => handleInteract(e, 'left_foot', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'left_foot', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('left_foot', 'legs')} />
          </>
        ) : (
          <>
            {/* Back Head & Neck */}
            <path d="M 175,60 C 175,20 225,20 225,60 C 225,95 210,105 200,110 C 190,105 175,95 175,60 Z" onClick={(e) => handleInteract(e, 'back_head', 'head', true)} onMouseEnter={(e) => handleInteract(e, 'back_head', 'head', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_head', 'head')} />
            <path d="M 190,105 C 190,120 210,120 210,105 L 215,130 C 200,135 185,130 185,130 Z" onClick={(e) => handleInteract(e, 'back_neck', 'spine', true)} onMouseEnter={(e) => handleInteract(e, 'back_neck', 'spine', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_neck', 'spine')} />
            
            {/* Back Torso */}
            <path d="M 150,130 C 170,125 190,130 200,140 C 210,130 230,125 250,130 C 245,170 235,190 225,205 C 200,200 175,205 175,205 C 165,190 155,170 150,130 Z" onClick={(e) => handleInteract(e, 'upper_back', 'spine', true)} onMouseEnter={(e) => handleInteract(e, 'upper_back', 'spine', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('upper_back', 'spine')} />
            <path d="M 195,130 L 205,130 L 205,280 L 195,280 Z" onClick={(e) => handleInteract(e, 'spine', 'spine', true)} onMouseEnter={(e) => handleInteract(e, 'spine', 'spine', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('spine', 'spine')} />
            <path d="M 175,205 C 200,200 225,205 225,205 C 225,240 220,265 215,275 C 200,270 185,275 185,275 C 180,265 175,240 175,205 Z" onClick={(e) => handleInteract(e, 'lower_back', 'spine', true)} onMouseEnter={(e) => handleInteract(e, 'lower_back', 'spine', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('lower_back', 'spine')} />
            <path d="M 185,275 C 200,270 215,275 215,275 C 225,290 225,310 200,315 C 175,310 175,290 185,275 Z" onClick={(e) => handleInteract(e, 'glutes', 'spine', true)} onMouseEnter={(e) => handleInteract(e, 'glutes', 'spine', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('glutes', 'spine')} />

            {/* Back Left Arm (Viewer's left = person's left) */}
            <circle cx="140" cy="135" r="15" onClick={(e) => handleInteract(e, 'back_left_shoulder', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_shoulder', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_shoulder', 'arms')} />
            <path d="M 150,130 C 130,140 115,180 120,210 C 130,220 145,215 155,200 Z" onClick={(e) => handleInteract(e, 'back_left_upper_arm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_upper_arm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_upper_arm', 'arms')} />
            <circle cx="120" cy="225" r="12" onClick={(e) => handleInteract(e, 'back_left_elbow', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_elbow', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_elbow', 'arms')} />
            <path d="M 115,235 C 105,250 95,270 90,290 C 105,295 115,290 125,240 Z" onClick={(e) => handleInteract(e, 'back_left_forearm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_forearm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_forearm', 'arms')} />
            <path d="M 105,295 C 90,300 80,310 85,325 C 95,335 110,315 105,295 Z" onClick={(e) => handleInteract(e, 'back_left_hand', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_hand', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_hand', 'arms')} />

            {/* Back Right Arm (Viewer's right = person's right) */}
            <circle cx="260" cy="135" r="15" onClick={(e) => handleInteract(e, 'back_right_shoulder', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_shoulder', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_shoulder', 'arms')} />
            <path d="M 250,130 C 270,140 285,180 280,210 C 270,220 255,215 245,200 Z" onClick={(e) => handleInteract(e, 'back_right_upper_arm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_upper_arm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_upper_arm', 'arms')} />
            <circle cx="280" cy="225" r="12" onClick={(e) => handleInteract(e, 'back_right_elbow', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_elbow', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_elbow', 'arms')} />
            <path d="M 285,235 C 295,250 305,270 310,290 C 295,295 285,290 275,240 Z" onClick={(e) => handleInteract(e, 'back_right_forearm', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_forearm', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_forearm', 'arms')} />
            <path d="M 295,295 C 310,300 320,310 315,325 C 305,335 290,315 295,295 Z" onClick={(e) => handleInteract(e, 'back_right_hand', 'arms', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_hand', 'arms', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_hand', 'arms')} />

            {/* Back Left Leg (Viewer's left) */}
            <circle cx="175" cy="285" r="18" onClick={(e) => handleInteract(e, 'back_left_hip', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_hip', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_hip', 'legs')} />
            <path d="M 185,275 C 160,290 160,350 165,395 C 180,400 195,390 200,315 Z" onClick={(e) => handleInteract(e, 'back_left_thigh', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_thigh', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_thigh', 'legs')} />
            <circle cx="175" cy="400" r="16" onClick={(e) => handleInteract(e, 'back_left_knee', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_knee', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_knee', 'legs')} />
            <path d="M 165,395 C 150,440 155,480 155,495 C 170,495 180,480 185,450 Z" onClick={(e) => handleInteract(e, 'back_left_calf', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_calf', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_calf', 'legs')} />
            <circle cx="165" cy="495" r="12" onClick={(e) => handleInteract(e, 'back_left_ankle', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_ankle', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_ankle', 'legs')} />
            <path d="M 153,495 C 145,510 145,520 160,525 C 180,530 185,510 177,495 Z" onClick={(e) => handleInteract(e, 'back_left_foot', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_left_foot', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_left_foot', 'legs')} />

            {/* Back Right Leg (Viewer's right) */}
            <circle cx="225" cy="285" r="18" onClick={(e) => handleInteract(e, 'back_right_hip', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_hip', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_hip', 'legs')} />
            <path d="M 215,275 C 240,290 240,350 235,395 C 220,400 205,390 200,315 Z" onClick={(e) => handleInteract(e, 'back_right_thigh', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_thigh', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_thigh', 'legs')} />
            <circle cx="225" cy="400" r="16" onClick={(e) => handleInteract(e, 'back_right_knee', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_knee', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_knee', 'legs')} />
            <path d="M 235,395 C 250,440 245,480 245,495 C 230,495 220,480 215,450 Z" onClick={(e) => handleInteract(e, 'back_right_calf', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_calf', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_calf', 'legs')} />
            <circle cx="235" cy="495" r="12" onClick={(e) => handleInteract(e, 'back_right_ankle', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_ankle', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_ankle', 'legs')} />
            <path d="M 247,495 C 255,510 255,520 240,525 C 220,530 215,510 223,495 Z" onClick={(e) => handleInteract(e, 'back_right_foot', 'legs', true)} onMouseEnter={(e) => handleInteract(e, 'back_right_foot', 'legs', false)} onMouseLeave={() => setHoverSubPath(null)} className={getPathClass('back_right_foot', 'legs')} />
          </>
        )}

      </svg>
    </div>
  );
};


// Main Digital Health Twin Container
interface HumanModelProps {
  isDark?: boolean;
  selectedRegionId?: string;
  onRegionChange?: (region: BodyRegion) => void;
}

export const HumanModelContainer: React.FC<HumanModelProps> = ({
  isDark = true,
  selectedRegionId = 'chest',
  onRegionChange
}) => {
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion>(
    BODY_REGIONS.find(r => r.id === selectedRegionId) || BODY_REGIONS[1]
  );
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegion | null>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [viewState, setViewState] = useState<'front' | 'back'>('front');

  // Dynamic AI Questionnaire State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { question: string; answer: string; risk: 'low' | 'moderate' | 'emergency'; detail: string }[]
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triageComplete, setTriageComplete] = useState(false);



  // Handle region selection click
  const handleSelectRegion = (region: BodyRegion) => {
    setSelectedRegion(region);
    
    // Trigger energy pulse
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1800);

    // Reset questionnaire flow for new region
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setTriageComplete(false);
    setIsAnalyzing(false);

    if (onRegionChange) {
      onRegionChange(region);
    }
  };

  // Handle answering a question in the flow
  const handleSelectAnswer = (option: { label: string; risk: 'low' | 'moderate' | 'emergency'; detail: string }) => {
    const questions = REGION_QUESTIONS[selectedRegion.id] || [];
    const currentQ = questions[currentQuestionIdx];

    const newAnswers = [
      ...userAnswers,
      {
        question: currentQ.question,
        answer: option.label,
        risk: option.risk,
        detail: option.detail
      }
    ];

    setUserAnswers(newAnswers);

    // Check if emergency flag selected -> immediate triage override!
    if (option.risk === 'emergency') {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setTriageComplete(true);
      }, 700);
      return;
    }

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setTriageComplete(true);
      }, 1000);
    }
  };

  // Calculate final overall risk level
  const highestRisk = useMemo(() => {
    if (userAnswers.some(a => a.risk === 'emergency')) return 'emergency';
    if (userAnswers.some(a => a.risk === 'moderate')) return 'moderate';
    return 'low';
  }, [userAnswers]);


  const handleResetFlow = () => {
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setTriageComplete(false);
    setIsAnalyzing(false);
  };

  const activeQuestions = REGION_QUESTIONS[selectedRegion.id] || REGION_QUESTIONS['chest'];
  const currentQ = activeQuestions[currentQuestionIdx];

  return (
    <div className={`w-full rounded-3xl border overflow-hidden flex flex-col lg:flex-row relative transition-colors duration-500 ${
      isDark 
        ? 'dark-glass border-cyan-500/20 bg-slate-950/80 shadow-[0_0_50px_rgba(95,215,255,0.08)]' 
        : 'light-glass border-slate-300 bg-slate-50/90 shadow-xl'
    }`}>
      {/* Left 2D Digital Health Twin Stage */}
      <div 
        className="w-full lg:w-7/12 h-[420px] sm:h-[540px] relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        
        {/* Holographic Header Badge */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-cyan-400/40 text-[#5FD7FF] font-mono text-[11px] shadow-[0_0_20px_rgba(95,215,255,0.25)] backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#5FD7FF]" />
          <span>DIGITAL HEALTH TWIN • ADVANCED SVG ENGINE</span>
        </div>

        {/* Hover / Region Active Badge */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
          <Brain className="w-3.5 h-3.5 text-emerald-400" />
          <span>SCAN: <strong className="text-[#5FD7FF]">{hoveredRegion ? hoveredRegion.name : selectedRegion.name}</strong></span>
        </div>

        {/* 2D Interactive Anatomical Figure */}
        <AnatomicalSVGFigure 
          view={viewState}
          hoveredRegion={hoveredRegion}
          selectedRegion={selectedRegion}
          onHover={setHoveredRegion}
          onSelect={handleSelectRegion}
          pulseActive={pulseActive}
        />

        {/* Front/Back Toggle & Spatial UI Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-[#8A92A3] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5FD7FF] animate-ping" />
              <span className="hidden sm:inline">Select region to trigger AI pulse</span>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              <button 
                onClick={() => {
                  if (viewState !== 'front') {
                    setViewState('front');
                    handleSelectRegion(BODY_REGIONS.find(r => r.id === 'chest') || BODY_REGIONS[1]);
                  }
                }} 
                className={`px-3 py-1 rounded-md transition-all ${viewState === 'front' ? 'bg-[#5FD7FF]/20 text-[#5FD7FF] font-bold shadow-sm' : 'hover:text-white'}`}
              >
                FRONT
              </button>
              <button 
                onClick={() => {
                  if (viewState !== 'back') {
                    setViewState('back');
                    handleSelectRegion(BODY_REGIONS.find(r => r.id === 'spine') || BODY_REGIONS[3]);
                  }
                }} 
                className={`px-3 py-1 rounded-md transition-all ${viewState === 'back' ? 'bg-[#5FD7FF]/20 text-[#5FD7FF] font-bold shadow-sm' : 'hover:text-white'}`}
              >
                BACK
              </button>
            </div>
          </div>
          
          <div className="flex gap-1.5 flex-wrap justify-center">
            {BODY_REGIONS.filter(r => viewState === 'front' ? r.id !== 'spine' : r.id !== 'chest' && r.id !== 'abdomen').map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelectRegion(r)}
                onMouseEnter={() => setHoveredRegion(r)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  selectedRegion.id === r.id
                    ? 'bg-[#5FD7FF]/20 text-[#5FD7FF] border border-[#5FD7FF]/50 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {r.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right AI Clinical Reasoning Panel & Dynamic Conversation Flow */}
      <div className="w-full lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-gradient-to-b from-slate-950/90 to-slate-900/90">
        
        {/* Panel Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#5FD7FF]/10 border border-[#5FD7FF]/30 text-[#5FD7FF]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5FD7FF] font-bold uppercase tracking-wider block">
                  AI CLINICAL REASONING
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  {selectedRegion.name} Intelligence
                </h3>
              </div>
            </div>
            
            <button
              onClick={handleResetFlow}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Restart Diagnostic Flow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* AI Energy Pulse / Analyzing Spinner state */}
          {isAnalyzing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-[#5FD7FF]/20 border-t-[#5FD7FF] animate-spin" />
                <Brain className="w-5 h-5 text-[#5FD7FF] absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-mono">
                  SYNTHESIZING CLINICAL SIGNALS...
                </p>
                <p className="text-xs text-[#8A92A3]">
                  Correlating symptom vector against internal medical knowledge base.
                </p>
              </div>
            </div>
          ) : triageComplete ? (
            /* Triage Results & Guidance Screen */
            <div className="space-y-4 animate-fade-in">
              
              {/* Emergency Guidance Red Flag Callout */}
              {highestRisk === 'emergency' && (
                <div className="p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-500/80 text-rose-100 space-y-3 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                  <div className="flex items-center gap-2.5 text-rose-400 font-bold font-mono text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>URGENT: EMERGENCY RED FLAG DETECTED</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white leading-snug">
                    Immediate Medical Attention Recommended
                  </h4>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    The symptoms selected for <strong className="text-white">{selectedRegion.name}</strong> indicate potential red-flag medical criteria requiring prompt professional evaluation.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-rose-500/30 text-xs text-rose-300 font-mono space-y-1">
                    <div className="flex items-center gap-2 text-rose-200 font-bold">
                      <PhoneCall className="w-4 h-4 text-rose-400 animate-bounce" />
                      <span>Action: Call 911 or visit nearest ER</span>
                    </div>
                    <p className="text-[11px] text-rose-300/80">
                      Do not drive yourself if experiencing severe dizziness, chest pain, or weakness.
                    </p>
                  </div>
                </div>
              )}

              {/* Moderate / Severe Risk: Doctor Consultation Recommendation */}
              {highestRisk === 'moderate' && (
                <div className="p-5 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-amber-100 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase tracking-wider">
                    <Stethoscope className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>CLINICAL RECOMMENDATION</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Consult a Healthcare Professional
                  </h4>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    Your symptom pattern suggests an evolving issue that benefits from a thorough clinical exam or diagnostic imaging.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-amber-500/30 text-xs text-amber-200/90 font-mono space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Key Insights to share with Doctor:</span>
                    {userAnswers.map((a, i) => (
                      <div key={i} className="text-[11px] text-slate-300">
                        • {a.answer}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Low Risk: Evidence-Based Home Care Suggestions */}
              {highestRisk === 'low' && (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs uppercase tracking-wider">
                    <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>LOW RISK • HOME CARE SUGGESTIONS</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Self-Care & Comfort Protocol
                  </h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    Symptom signals appear consistent with mild, non-emergent factors (strain, fatigue, or mild indigestion).
                  </p>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Recommended Steps:</span>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      <li>Maintain optimal hydration (8-10 glasses water daily).</li>
                      <li>Take periodic rest breaks from postural / screen strain.</li>
                      <li>Apply gentle thermal care (heat or cold pack as comfortable).</li>
                      <li>Monitor for any worsening or new systemic symptoms.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Restart Button */}
              <button
                onClick={handleResetFlow}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#5FD7FF]" />
                <span>Evaluate Another Region</span>
              </button>

            </div>
          ) : (
            /* Active Questionnaire Flow (Question 1 -> 2 -> 3) */
            <div className="space-y-5">
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#5FD7FF] font-bold">
                  STEP {currentQuestionIdx + 1} OF {activeQuestions.length}
                </span>
                <div className="flex gap-1">
                  {activeQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentQuestionIdx
                          ? 'w-6 bg-[#5FD7FF]'
                          : idx < currentQuestionIdx
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Headline */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#8A92A3] uppercase block">
                  Symptom Vector Probe:
                </span>
                <h4 className="font-heading font-semibold text-base sm:text-lg text-white leading-snug">
                  {currentQ?.question}
                </h4>
              </div>

              {/* Multi-choice Options */}
              <div className="space-y-2">
                {currentQ?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5FD7FF]/50 text-left transition-all cursor-pointer group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs text-slate-200 font-medium group-hover:text-white block">
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-[#8A92A3] block font-mono">
                        {opt.detail}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#5FD7FF] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Footer Clinical Disclaimer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8A92A3]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MedVAI Triage Engine v4.2</span>
          </span>
          <span>Educational Guidance Only</span>
        </div>

      </div>

    </div>
  );
};

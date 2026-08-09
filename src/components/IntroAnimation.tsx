import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0); // 0: initial black, 1: heartbeat line, 2: forms V, 3: MED and AI slide in, 4: complete MEDVAI pulse, 5: fade out
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check if user already saw intro in current session
    const hasSeen = sessionStorage.getItem('medvai_intro_seen');
    if (hasSeen === 'true') {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 200);   // Start heartbeat draw
    const t2 = setTimeout(() => setStage(2), 1000);  // Heartbeat transforms into V
    const t3 = setTimeout(() => setStage(3), 1700);  // MED and AI slide in
    const t4 = setTimeout(() => setStage(4), 2400);  // Pulse complete logo
    const t5 = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        sessionStorage.setItem('medvai_intro_seen', 'true');
        onComplete();
      }, 500);
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      sessionStorage.setItem('medvai_intro_seen', 'true');
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center px-4">
        {/* ECG Line & V Formation Canvas Container */}
        <div className="relative h-28 w-80 sm:w-96 flex items-center justify-center">
          {/* Stage 1: ECG Heartbeat Path */}
          {stage >= 1 && stage < 2 && (
            <svg
              viewBox="0 0 300 80"
              className="w-full h-full stroke-white fill-none stroke-[2] transition-all duration-700"
            >
              <path
                d="M 0 40 L 90 40 L 105 15 L 120 65 L 135 10 L 150 55 L 165 40 L 300 40"
                className="stroke-dasharray-[400] stroke-dashoffset-[400] animate-[dash_1s_ease-in-out_forwards]"
                style={{
                  strokeDasharray: 400,
                  animation: 'dash 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              />
            </svg>
          )}

          {/* Stage 2, 3, 4: V and full MEDVAI reveal */}
          <div className="flex items-center justify-center tracking-[0.25em] font-heading font-bold text-3xl sm:text-5xl text-white select-none">
            {/* MED from left */}
            <span
              className={`transition-all duration-700 ease-out transform ${
                stage >= 3
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              MED
            </span>

            {/* Central V (Heartbeat formed) */}
            <span
              className={`relative mx-1 inline-flex items-center justify-center transition-all duration-500 transform ${
                stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              } ${stage === 4 ? 'animate-heartbeat text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : ''}`}
            >
              V
              {/* Subtle heartline accent on V */}
              <svg
                viewBox="0 0 24 24"
                className="absolute -bottom-2 w-5 h-2 fill-none stroke-white/60 stroke-[1.5]"
              >
                <path d="M 2 2 Q 12 12 22 2" />
              </svg>
            </span>

            {/* AI from right */}
            <span
              className={`transition-all duration-700 ease-out transform ${
                stage >= 3
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              AI
            </span>
          </div>
        </div>

        {/* Minimal status subline */}
        <p className="mt-8 text-xs font-mono uppercase tracking-[0.3em] text-[#8A92A3] opacity-80">
          {stage < 3 ? 'Initializing Health OS...' : 'MEDVAI Public System'}
        </p>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-xs font-mono tracking-widest text-[#8A92A3] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          SKIP
        </button>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

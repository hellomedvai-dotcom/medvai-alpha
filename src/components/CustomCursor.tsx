import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  isDark: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isDark }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target && ringRef.current) {
        const isInteractive = !!target.closest('button, a, input, select, textarea, [role="button"], .interactive-hover');
        if (isInteractive) {
          ringRef.current.classList.add('scale-150', 'border-emerald-400');
        } else {
          ringRef.current.classList.remove('scale-150', 'border-emerald-400');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center">
        {/* Tiny Glowing Outer Ring */}
        <div
          ref={ringRef}
          className={`w-7 h-7 rounded-full border transition-all duration-150 ease-out flex items-center justify-center ${
            isDark
              ? 'border-white/40 bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.15)]'
              : 'border-slate-800/40 bg-slate-900/5 shadow-[0_0_10px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Tiny Center Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-emerald-600 shadow-[0_0_8px_#059669]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

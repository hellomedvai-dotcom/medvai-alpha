import React, { useRef, useState } from 'react';

interface SpatialGlassCardProps {
  id?: string;
  children: React.ReactNode;
  isDark?: boolean;
  className?: string;
  floatIndex?: 1 | 2 | 3 | 0;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SpatialGlassCard: React.FC<SpatialGlassCardProps> = ({
  id,
  children,
  isDark = false,
  className = '',
  floatIndex = 0,
  onClick,
  style = {}
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, pxX: 0, pxY: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDark) return; // Specular light tilt is primarily designed for Light Mode spatial depth
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const pxX = e.clientX - rect.left;
    const pxY = e.clientY - rect.top;
    const xPct = Math.round((pxX / rect.width) * 100);
    const yPct = Math.round((pxY / rect.height) * 100);

    // Subtle 3D tilt calculation (-3 to +3 deg max)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((pxY - centerY) / centerY) * 2;
    const rotateY = ((pxX - centerX) / centerX) * 2;

    setMousePos({ x: xPct, y: yPct, pxX, pxY, isHovered: true });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, isHovered: false }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Determine float class based on floatIndex
  const floatClass = floatIndex === 1
    ? 'animate-spatial-float-1'
    : floatIndex === 2
    ? 'animate-spatial-float-2'
    : floatIndex === 3
    ? 'animate-spatial-float-3'
    : '';

  if (isDark) {
    return (
      <div
        id={id}
        onClick={onClick}
        className={`dark-glass dark-glass-hover rounded-3xl ${floatClass} ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  // Light Mode Spatial Glass with VisionOS multi-layer specular light physics
  return (
    <div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spatial-light-card group relative rounded-3xl transition-all duration-500 ease-out cursor-pointer ${floatClass} ${className}`}
      style={{
        transform: mousePos.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px) scale(1.006)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
        boxShadow: mousePos.isHovered
          ? '0 32px 64px -16px rgba(15, 23, 42, 0.08), 0 8px 24px -4px rgba(15, 23, 42, 0.03), inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.02)'
          : '0 20px 45px -12px rgba(15, 23, 42, 0.05), 0 4px 16px -2px rgba(15, 23, 42, 0.02), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.02)',
        background: 'linear-gradient(135deg, rgba(255, 255, 253, 0.82) 0%, rgba(248, 248, 244, 0.68) 100%)',
        backdropFilter: 'blur(30px) saturate(210%)',
        WebkitBackdropFilter: 'blur(30px) saturate(210%)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        ...style
      }}
    >
      {/* Specular Highlight Overlay (Follows cursor position) */}
      {mousePos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-10 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.pxX}px ${mousePos.pxY}px, rgba(255, 255, 255, 0.65), transparent 70%)`
          }}
        />
      )}

      {/* Ambient Inner Light Rim */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl z-10 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]" />

      {/* Card Content Layer */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

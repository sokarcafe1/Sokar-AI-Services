import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Building2, Landmark, GraduationCap, Scale, Award, FileCheck } from 'lucide-react';

interface AnimatedBackgroundProps {
  themeMode?: 'light' | 'dark' | 'black';
  isPreAuth?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  themeMode = 'light',
  isPreAuth = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isBlack = themeMode === 'black';
  const isDark = themeMode === 'dark';

  // Canvas Particles Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes count based on screen size and mode
    const particleCount = Math.min(Math.floor((width * height) / (isPreAuth ? 12000 : 18000)), 60);
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Color theme definition
    const particleColor = isBlack
      ? '245, 158, 11' // Amber
      : isDark
      ? '56, 189, 248' // Sky blue
      : '14, 165, 233'; // Light mode blue

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections (Network Graph representing digital services)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulse += 0.02;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const currentAlpha = p1.alpha + Math.sin(p1.pulse) * 0.2;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        // Connect nearby nodes with glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isPreAuth ? 160 : 120;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isPreAuth ? 0.35 : 0.2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${particleColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBlack, isDark, isPreAuth]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* HTML5 Canvas Interconnected Government Services Node Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Dynamic Animated Atmospheric Orbs */}
      {isBlack ? (
        <>
          {/* Black & Gold Luxury Animated Atmosphere */}
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] bg-amber-500/15 rounded-full blur-[140px] animate-blob-slow" />
          <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-yellow-600/15 rounded-full blur-[130px] animate-blob-reverse" />
          <div className="absolute -bottom-40 right-1/4 w-[750px] h-[750px] bg-amber-700/15 rounded-full blur-[160px] animate-pulse-glow" />
          
          {/* Glowing Radial Grid */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(#f59e0b 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </>
      ) : isDark ? (
        <>
          {/* Dark Mode Cyan & Indigo Ambient Aurora */}
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-sky-600/20 rounded-full blur-[150px] animate-blob-slow" />
          <div className="absolute top-1/3 -left-40 w-[650px] h-[650px] bg-indigo-600/20 rounded-full blur-[140px] animate-blob-reverse" />
          <div className="absolute -bottom-40 right-1/3 w-[750px] h-[750px] bg-teal-600/20 rounded-full blur-[160px] animate-pulse-glow" />
          
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(#38bdf8 1.5px, transparent 1.5px)`,
              backgroundSize: '36px 36px'
            }}
          />
        </>
      ) : (
        <>
          {/* Light Mode Professional Sky & Emerald Soft Ambient Motion */}
          <div className="absolute -top-36 -right-36 w-[650px] h-[650px] bg-sky-300/35 rounded-full blur-[130px] animate-blob-slow" />
          <div className="absolute top-1/3 -left-36 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] animate-blob-reverse" />
          <div className="absolute -bottom-36 right-1/4 w-[700px] h-[700px] bg-amber-200/35 rounded-full blur-[140px] animate-pulse-glow" />
          
          {/* Light Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(#0284c7 1.5px, transparent 1.5px)`,
              backgroundSize: '36px 36px'
            }}
          />
        </>
      )}

      {/* Floating Institutional Glyphs for Pre-Auth Atmosphere */}
      {isPreAuth && (
        <div className="absolute inset-0 opacity-20 hidden md:block">
          <div className="absolute top-1/6 right-1/6 animate-float-slow text-sky-500">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <div className="absolute top-1/2 left-1/12 animate-float-reverse text-teal-500">
            <Building2 className="w-20 h-20" />
          </div>
          <div className="absolute bottom-1/4 right-1/12 animate-float-slow text-amber-500">
            <Landmark className="w-14 h-14" />
          </div>
          <div className="absolute bottom-1/6 left-1/4 animate-float-reverse text-indigo-500">
            <GraduationCap className="w-16 h-16" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float-slow text-emerald-500">
            <FileCheck className="w-12 h-12" />
          </div>
        </div>
      )}

      {/* Ambient Gradient Overlay Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
    </div>
  );
};

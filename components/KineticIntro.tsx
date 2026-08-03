'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface KineticIntroProps {
  onComplete?: () => void;
}

// Pre-compute hex sine/cosine offsets once (not per frame)
const HEX_ANGLES = Array.from({ length: 6 }, (_, i) => ({
  sin: Math.sin((Math.PI / 3) * i),
  cos: Math.cos((Math.PI / 3) * i),
}));

type Phase = 'laser-scan' | 'exoskeleton' | 'gold-burst' | 'particles' | 'complete';

export default function KineticIntro({ onComplete }: KineticIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<Phase>('laser-scan');
  const progressRef = useRef(0);
  const statusRef = useRef('ESTABLISHING CONNECTION');
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const dprRef = useRef(1);

  // Throttled React state — only updated on phase change, not every frame
  const [uiPhase, setUiPhase] = useState<Phase>('laser-scan');
  const [uiProgress, setUiProgress] = useState(0);
  const [uiStatus, setUiStatus] = useState('ESTABLISHING CONNECTION');
  // Only show intro once per browser session
  const [isDone, setIsDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('bw_intro_seen') === '1';
  });


  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const complete = useCallback(() => {
    setUiPhase('complete');
    setTimeout(() => {
      sessionStorage.setItem('bw_intro_seen', '1');
      setIsDone(true);
      onComplete?.();
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Device detection
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
    dprRef.current = dpr;
    const mobile = window.innerWidth < 768;
    isMobileRef.current = mobile;

    // Particle counts by device
    const PARTICLE_COUNT = mobile ? 60 : 140;
    const HEX_SIZE = mobile ? 45 : 35; // fewer hexes on mobile
    const SHADOW_BLUR_PARTICLE = mobile ? 0 : 5; // disable shadows on mobile
    const SHADOW_BLUR_SCAN = mobile ? 12 : 25;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    setSize();

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        setSize();
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ------------------------------------------------------------------
    // Pre-build hex grid points (cached, recalculated only on resize)
    // ------------------------------------------------------------------
    type HexCell = { cx: number; cy: number; pts: [number, number][] };
    let hexCells: HexCell[] = [];

    const buildHexGrid = () => {
      hexCells = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const r = HEX_SIZE;
      const hexWidth = r * Math.sqrt(3);
      const hexHeight = r * 2;

      for (let y = -r; y < h + r; y += hexHeight * 0.75) {
        for (let x = -r; x < w + r; x += hexWidth) {
          const row = Math.floor(y / (hexHeight * 0.75));
          const offsetX = (row % 2) * (hexWidth / 2);
          const cx = x + offsetX;
          const cy = y;
          const pts: [number, number][] = HEX_ANGLES.map(({ sin, cos }) => [
            cx + r * sin,
            cy + r * cos,
          ]);
          hexCells.push({ cx, cy, pts });
        }
      }
    };
    buildHexGrid();

    // ------------------------------------------------------------------
    // Particle pool (typed array for perf)
    // ------------------------------------------------------------------
    const px = new Float32Array(PARTICLE_COUNT);
    const py = new Float32Array(PARTICLE_COUNT);
    const pvx = new Float32Array(PARTICLE_COUNT);
    const pvy = new Float32Array(PARTICLE_COUNT);
    const psize = new Float32Array(PARTICLE_COUNT);
    const palpha = new Float32Array(PARTICLE_COUNT);
    const pIsGold = new Uint8Array(PARTICLE_COUNT);

    const initParticles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        px[i] = Math.random() * w;
        py[i] = Math.random() * h;
        pvx[i] = (Math.random() - 0.5) * 1.5;
        pvy[i] = (Math.random() - 0.5) * 1.5;
        psize[i] = Math.random() * 2.2 + 0.8;
        palpha[i] = Math.random() * 0.7 + 0.2;
        pIsGold[i] = Math.random() > 0.45 ? 1 : 0;
      }
    };
    initParticles();

    // ------------------------------------------------------------------
    // Draw helpers
    // ------------------------------------------------------------------
    const drawHexGrid = (scanY: number, alphaMultiplier: number) => {
      const w = window.innerWidth;
      const halfW = w / 2;

      for (const { cx, cy, pts } of hexCells) {
        const dist = Math.abs(cy - scanY);
        let hexAlpha = 0.06;
        if (dist < 130) hexAlpha = 0.7 * (1 - dist / 130);

        const baseColor = cx < halfW ? '166,169,176' : '197,160,89';
        ctx.strokeStyle = `rgba(${baseColor},${(hexAlpha * alphaMultiplier).toFixed(3)})`;
        ctx.lineWidth = hexAlpha > 0.3 ? 1.4 : 0.7;

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let k = 1; k < 6; k++) ctx.lineTo(pts[k][0], pts[k][1]);
        ctx.closePath();
        ctx.stroke();
      }
    };

    const drawShield = (cx: number, cy: number, scale: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const grad = ctx.createLinearGradient(-150, 0, 150, 0);
      grad.addColorStop(0,    `rgba(255,255,255,${alpha})`);
      grad.addColorStop(0.48, `rgba(166,169,176,${alpha})`);
      grad.addColorStop(0.52, `rgba(197,160,89,${alpha})`);
      grad.addColorStop(1,    `rgba(244,208,128,${alpha})`);

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#C5A059';
      ctx.shadowBlur = mobile ? 10 : 18;
      ctx.lineWidth = 2.2;

      ctx.beginPath();
      ctx.moveTo(0, -150); ctx.lineTo(130, -75);
      ctx.lineTo(100, 45); ctx.lineTo(0, 140);
      ctx.lineTo(-100, 45); ctx.lineTo(-130, -75);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(0, -150); ctx.lineTo(0, 140);
      ctx.moveTo(-130, -75); ctx.lineTo(130, -75);
      ctx.moveTo(-100, 45); ctx.lineTo(100, 45);
      ctx.stroke();

      ctx.restore();
    };

    // ------------------------------------------------------------------
    // Main render loop — uses performance.now() for accuracy
    // ------------------------------------------------------------------
    const TOTAL_MS = 4800;

    const render = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      // ----- Background -----
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // ----- Determine phase (without setState every frame) -----
      let newPhase: Phase = phaseRef.current;
      let newStatus = statusRef.current;

      if (elapsed < 1200) {
        newPhase = 'laser-scan';
      } else if (elapsed < 2300) {
        newPhase = 'exoskeleton';
      } else if (elapsed < 3500) {
        newPhase = 'gold-burst';
        newStatus = 'SYSTEMS ONLINE';
      } else if (elapsed < TOTAL_MS) {
        newPhase = 'particles';
        newStatus = 'SYSTEMS ONLINE';
      } else {
        newPhase = 'complete';
      }

      // Update React state only on phase/status change (not every frame)
      if (newPhase !== phaseRef.current) {
        phaseRef.current = newPhase;
        setUiPhase(newPhase);
      }
      if (newStatus !== statusRef.current) {
        statusRef.current = newStatus;
        setUiStatus(newStatus);
      }

      // Update progress bar directly via DOM ref (avoids React re-render)
      const prog = Math.min(Math.floor((elapsed / TOTAL_MS) * 100), 100);
      if (prog !== progressRef.current) {
        progressRef.current = prog;
        if (progressBarRef.current) progressBarRef.current.style.width = `${prog}%`;
        if (progressTextRef.current) progressTextRef.current.textContent = `${prog}%`;
      }

      // ----- Phase drawing -----
      if (newPhase === 'laser-scan') {
        const t = elapsed / 1200;
        const scanY = t * (h + 200) - 100;
        drawHexGrid(scanY, 1);

        const scanGrad = ctx.createLinearGradient(0, 0, w, 0);
        scanGrad.addColorStop(0,   'rgba(166,169,176,0.85)');
        scanGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
        scanGrad.addColorStop(1,   'rgba(244,208,128,0.85)');
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = mobile ? 2 : 3;
        ctx.shadowColor = '#F4D080';
        ctx.shadowBlur = SHADOW_BLUR_SCAN;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else if (newPhase === 'exoskeleton') {
        const lp = (elapsed - 1200) / 1100;
        drawHexGrid(cy, 1 - lp * 0.5);
        drawShield(cx, cy - 20, 1 + lp * 0.1, Math.min(lp * 1.5, 1));

      } else if (newPhase === 'gold-burst') {
        const lp = (elapsed - 2300) / 1200;
        const burstR = lp * (w * 0.6);
        if (burstR > 0) {
          const bg = ctx.createRadialGradient(cx, cy - 20, 10, cx, cy - 20, Math.max(20, burstR));
          bg.addColorStop(0,   `rgba(244,208,128,${Math.max(0, 0.8 - lp)})`);
          bg.addColorStop(0.5, `rgba(197,160,89,${Math.max(0, 0.5 - lp)})`);
          bg.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(cx, cy - 20, burstR, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (newPhase === 'particles') {
        // Batch particles by color to reduce state changes
        ctx.shadowBlur = SHADOW_BLUR_PARTICLE;

        if (SHADOW_BLUR_PARTICLE > 0) ctx.shadowColor = '#F4D080';
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          px[i] += pvx[i];
          py[i] += pvy[i];
          if (px[i] < 0 || px[i] > w) pvx[i] *= -1;
          if (py[i] < 0 || py[i] > h) pvy[i] *= -1;

          const gold = pIsGold[i];
          ctx.fillStyle   = gold ? (i % 2 === 0 ? '#F4D080' : '#C5A059') : (i % 2 === 0 ? '#FFFFFF' : '#A6A9B0');
          ctx.globalAlpha = palpha[i];
          ctx.beginPath();
          ctx.arc(px[i], py[i], psize[i], 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      if (newPhase !== 'complete') {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        complete();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [complete]);

  if (isDone) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black"
      style={{
        padding: 'clamp(12px, 3vw, 32px)',
        opacity: uiPhase === 'complete' ? 0 : 1,
        pointerEvents: uiPhase === 'complete' ? 'none' : 'auto',
        transition: 'opacity 1s ease',
        willChange: 'opacity',
      }}
    >
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs tracking-widest font-mono text-[#A6A9B0] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping shrink-0" />
          <span className="text-[#FFFFFF]">BLACK WARRIORS</span>
          <span className="text-[#C5A059] hidden sm:inline">// SYSTEM ONLINE</span>
        </div>
        <span className="text-[#F4D080]">MENA</span>
      </div>

      {/* Center: Logo + Typography (visible from gold-burst onwards) */}
      <div className="flex flex-col items-center justify-center text-center z-20 pointer-events-none flex-1 py-6">
        {(uiPhase === 'gold-burst' || uiPhase === 'particles' || uiPhase === 'complete') && (
          <div
            style={{
              animation: 'bwFadeSlideIn 0.7s ease forwards',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Circular Logo */}
            <div
              className="relative mb-5 rounded-full border-2 border-[#C5A059]/70 bg-black overflow-hidden flex items-center justify-center"
              style={{
                width:  'clamp(112px, 20vw, 200px)',
                height: 'clamp(112px, 20vw, 200px)',
                boxShadow: '0 0 30px rgba(197,160,89,0.55)',
                willChange: 'transform',
              }}
            >
              <Image
                src="/logo.png"
                alt="BLACK WARRIORS Official Logo"
                fill
                className="object-contain p-3"
                priority
              />
            </div>

            {/* Dual-tone Title */}
            <h1
              className="font-black tracking-wider uppercase"
              style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
            >
              <span
                className="bg-clip-text text-transparent mr-2 sm:mr-3"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #A6A9B0, #4A4D52)',
                  filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.35))',
                }}
              >
                BLACK
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #F4D080, #C5A059, #78571A)',
                  filter: 'drop-shadow(0 0 18px rgba(197,160,89,0.65))',
                }}
              >
                WARRIORS
              </span>
            </h1>

            {/* Tagline */}
            <p
              className="font-bold uppercase tracking-widest text-[#F4D080] mt-3"
              style={{
                fontSize: 'clamp(0.65rem, 2.5vw, 1.25rem)',
                filter: 'drop-shadow(0 0 12px rgba(244,208,128,0.5))',
                letterSpacing: '0.3em',
              }}
            >
              DOMINATING THE MENA REGION
            </p>
          </div>
        )}
      </div>

      {/* Canvas (behind UI) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Bottom HUD Progress */}
      <div className="relative z-20 w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-[#F4D080] mb-1.5 tracking-widest uppercase">
          <span>{uiStatus}</span>
          <span ref={progressTextRef} className="text-[#FFFFFF]">0%</span>
        </div>
        <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-[#78571A]/60">
          <div
            ref={progressBarRef}
            className="h-full rounded-full"
            style={{
              width: '0%',
              background: 'linear-gradient(to right, #4A4D52, #A6A9B0, #C5A059, #F4D080)',
              boxShadow: '0 0 10px #C5A059',
              willChange: 'width',
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-[9px] sm:text-[10px] font-mono text-[#A6A9B0] uppercase tracking-wider">
          <span>Exoskeleton Sync Active</span>
          <span>SYSTEM // SECURE</span>
        </div>
      </div>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes bwFadeSlideIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

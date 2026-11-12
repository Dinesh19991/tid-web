import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TriangleAlert, Lock, Eye } from 'lucide-react';

interface StickerDef {
  id: string;
  wEst: number;
  hEst: number;
  render: () => React.ReactNode;
}

// Exactly the tags from the user's reference image
const STICKER_TAGS: StickerDef[] = [
  // 1. HANDOFF
  {
    id: 'handoff',
    wEst: 110,
    hEst: 44,
    render: () => (
      <div className="relative select-none px-3.5 py-1.5 rounded bg-[#f6c944] text-[#1c1917] border-2 border-[#1c1917] shadow-md transform">
        <span className="font-inter font-black text-[15px] tracking-wider uppercase block leading-none">
          HANDOFF
        </span>
      </div>
    ),
  },

  // 2. Dev Mode
  {
    id: 'dev-mode',
    wEst: 110,
    hEst: 42,
    render: () => (
      <div className="relative select-none px-3.5 py-1 rounded-full bg-[#18181b] border-2 border-white text-white shadow-md flex items-center gap-1.5">
        <span className="font-sans font-bold text-[13.5px] tracking-tight">Dev</span>
        <span className="w-4 h-4 rounded-full bg-[#22c55e] text-black font-black text-[9px] flex items-center justify-center shrink-0">
          S
        </span>
        <span className="font-sans font-bold text-[13.5px] tracking-tight">Mode</span>
      </div>
    ),
  },

  // 3. ATTENTION LIMITED TIME ONLY
  {
    id: 'attention',
    wEst: 175,
    hEst: 38,
    render: () => (
      <div className="relative select-none px-3 py-1 rounded bg-[#facc15] text-[#111827] border-2 border-black shadow-md flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
          <TriangleAlert className="w-3.5 h-3.5 text-[#facc15]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-inter font-black text-[10px] tracking-wider uppercase">ATTENTION</span>
          <span className="text-[9px] font-inter font-bold text-black/80 uppercase tracking-tight">LIMITED TIME ONLY</span>
        </div>
      </div>
    ),
  },

  // 4. POSITIVE MINDED
  {
    id: 'positive-minded',
    wEst: 165,
    hEst: 44,
    render: () => (
      <div className="relative select-none px-4 py-1.5 rounded-full bg-[#1d4ed8] border-2 border-white shadow-md">
        <span
          className="font-black text-[14px] tracking-tight text-white uppercase flex items-center gap-1.5"
          style={{ textShadow: '0 2px 0 #1e3a8a, 0 3px 0 #172554' }}
        >
          <span>POSITIVE</span>
          <span className="text-[12px] leading-none">☺</span>
          <span>MINDED</span>
        </span>
      </div>
    ),
  },

  // 5. 8-Bit Pixel Heart
  {
    id: 'pixel-heart',
    wEst: 44,
    hEst: 44,
    render: () => (
      <div className="relative select-none p-1.5 rounded-xl bg-white border-2 border-white shadow-md flex items-center justify-center">
        <svg width="26" height="24" viewBox="0 0 16 14" fill="none" className="block">
          <path
            d="M2 2h3v2H2V2zm9 0h3v2h-3V2zM1 4h5v2H1V4zm9 0h5v2h-5V4zm-1 2h8v2H0V6h9zm1 2h6v2H1V8h9zm2 2h4v2H2v-2h10zm3 2h2v2H4v-2h11z"
            fill="#ef4444"
          />
        </svg>
      </div>
    ),
  },

  // 6. Keyboard Keycaps [♡] [A]
  {
    id: 'keycaps',
    wEst: 110,
    hEst: 44,
    render: () => (
      <div className="relative select-none px-2.5 py-1.5 rounded-xl bg-[#1c1917] border-2 border-white/60 shadow-md flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-md bg-[#292524] border-b-2 border-black flex items-center justify-center text-[10px] text-rose-400 font-bold">
          ♥
        </div>
        <div className="w-6 h-6 rounded-md bg-[#292524] border-b-2 border-black flex items-center justify-center text-[11px] text-white font-inter font-bold">
          A
        </div>
      </div>
    ),
  },

  // 7. Untitled
  {
    id: 'untitled',
    wEst: 130,
    hEst: 38,
    render: () => (
      <div className="relative select-none px-4 py-1 rounded-full bg-[#fed7aa] border-2 border-white shadow-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
        <span className="font-inter font-bold text-[15px] text-[#c2410c] tracking-tight">Untitled</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
      </div>
    ),
  },

  // 8. Green Waving Hand ✋
  {
    id: 'green-hand',
    wEst: 46,
    hEst: 50,
    render: () => (
      <div className="relative select-none p-2 rounded-2xl bg-[#22c55e] text-black border-2 border-white shadow-md flex items-center justify-center">
        <svg
          width="26"
          height="28"
          viewBox="0 0 24 24"
          fill="#22c55e"
          stroke="#14532d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v7M10 10.5V6a2 2 0 0 0-4 0v8M6 14v-2a2 2 0 0 0-4 0v4a8 8 0 0 0 16 0v-4a2 2 0 0 0-4 0" />
        </svg>
      </div>
    ),
  },

  // 9. # Name Your Layers. 🔒 👁️
  {
    id: 'name-layers',
    wEst: 185,
    hEst: 36,
    render: () => (
      <div className="relative select-none px-3.5 py-1.5 rounded-md bg-[#27272a] text-zinc-200 border-2 border-white/30 font-inter text-[11px] shadow-md flex items-center gap-2">
        <span className="text-zinc-400">#</span>
        <span className="font-medium text-white">Name Your Layers.</span>
        <Lock className="w-3 h-3 text-zinc-400 ml-1" />
        <Eye className="w-3 h-3 text-zinc-400" />
      </div>
    ),
  },

  // 10. Component You & Me
  {
    id: 'component-you-and-me',
    wEst: 185,
    hEst: 46,
    render: () => (
      <div className="relative select-none px-3.5 py-1.5 rounded-lg bg-[#3b0764]/80 border-2 border-dashed border-[#c084fc] text-[#f5d0fe] shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-1.5 text-[9px] font-inter font-semibold tracking-wider text-[#d8b4fe] uppercase">
          <span className="text-[#c084fc]">❖</span>
          <span>Component</span>
        </div>
        <span className="block font-inter font-bold text-[15px] text-white tracking-tight">
          You &amp; Me
        </span>
      </div>
    ),
  },

  // 11. Green Peace Sign ✌️
  {
    id: 'peace-sign',
    wEst: 48,
    hEst: 54,
    render: () => (
      <div className="relative select-none p-2 rounded-2xl bg-[#4ade80] text-black border-2 border-white shadow-md flex items-center justify-center">
        <span className="text-[26px] leading-none" role="img" aria-label="Peace">
          ✌️
        </span>
      </div>
    ),
  },

  // 12. Auto Layout
  {
    id: 'auto-layout',
    wEst: 145,
    hEst: 50,
    render: () => (
      <div className="relative select-none px-4 py-2 rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6] border-2 border-white shadow-md">
        <span
          className="block font-black text-[17px] tracking-tight uppercase text-white"
          style={{ textShadow: '0 2px 0 #581c87, 0 4px 0 #3b0764, 0 6px 6px rgba(0,0,0,0.4)' }}
        >
          Auto Layout
        </span>
      </div>
    ),
  },

  // 13. THINK OUTSIDE THE BOX
  {
    id: 'think-outside-box',
    wEst: 105,
    hEst: 52,
    render: () => (
      <div className="relative select-none px-3 py-2 rounded-2xl bg-[#a855f7] border-2 border-white text-white font-black text-[10.5px] uppercase tracking-wider text-center leading-tight shadow-md max-w-[90px]">
        THINK OUTSIDE THE BOX
      </div>
    ),
  },

  // 14. Framed [128 × 64]
  {
    id: 'framed',
    wEst: 155,
    hEst: 48,
    render: () => (
      <div className="relative select-none px-3 py-1.5 rounded bg-[#0284c7]/20 border-2 border-[#38bdf8] text-[#e0f2fe] shadow-md backdrop-blur-sm">
        <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0284c7] rounded-sm" />
        <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0284c7] rounded-sm" />
        <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0284c7] rounded-sm" />
        <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0284c7] rounded-sm" />
        <div className="flex items-center justify-between gap-3">
          <span className="font-inter font-bold text-[14px] text-white">Framed</span>
          <span className="font-inter text-[9.5px] font-semibold bg-[#0284c7] text-white px-1.5 py-0.5 rounded">
            128 × 64
          </span>
        </div>
      </div>
    ),
  },

  // 15. Publish
  {
    id: 'publish',
    wEst: 95,
    hEst: 38,
    render: () => (
      <div className="relative select-none px-4 py-1.5 rounded-full bg-gradient-to-b from-[#38bdf8] to-[#0284c7] text-white font-medium border-2 border-white shadow-md">
        <span className="text-[13px] font-semibold tracking-tight">Publish</span>
      </div>
    ),
  },

  // 16. Design Toolbar [□ ✑ T]
  {
    id: 'toolbar',
    wEst: 135,
    hEst: 38,
    render: () => (
      <div className="relative select-none px-3.5 py-1.5 rounded-xl bg-[#18181b] border-2 border-white/40 text-white shadow-md flex items-center gap-3">
        <span className="w-3.5 h-3.5 border border-white/80 rounded-sm inline-block" />
        <span className="text-[14px] leading-none">✑</span>
        <span className="font-inter font-bold text-[14px] leading-none">T</span>
      </div>
    ),
  },

  // 17. Vector Pen Flower
  {
    id: 'pen-flower',
    wEst: 52,
    hEst: 52,
    render: () => (
      <div className="relative select-none p-2 rounded-2xl bg-[#c084fc] border-2 border-white shadow-md flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 6C16 11 21 16 26 16C21 16 16 21 16 26C16 21 11 16 6 16C11 16 16 11 16 6Z"
            fill="#7e22ce"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <path d="M6 26L12 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <rect x="4" y="24" width="4" height="4" fill="#ffffff" />
        </svg>
      </div>
    ),
  },
];

interface TagPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  w: number;
  h: number;
  isDragging: boolean;
  scale: number;
}

export default function FooterStickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const starRef = useRef<HTMLDivElement>(null);
  const physicsMapRef = useRef<Map<string, TagPhysics>>(new Map());
  const starPhysicsRef = useRef<{ y: number; vy: number; rot: number; vrot: number }>({
    y: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
  });

  const rafIdRef = useRef<number | null>(null);
  const topZRef = useRef<number>(10);
  const activeDragIdRef = useRef<string | null>(null);
  const dragInfoRef = useRef<{
    grabOffsetX: number;
    grabOffsetY: number;
    startX: number;
    startY: number;
    moves: { x: number; y: number; t: number }[];
  } | null>(null);

  const [starWinking, setStarWinking] = useState(false);

  // Position sticker tags on the floor in an organic overlapping scatter like in Image 2
  const initTags = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cWidth = rect.width || 1000;
    const cHeight = rect.height || 260;
    const floorY = cHeight - 14;
    const totalTags = STICKER_TAGS.length;

    STICKER_TAGS.forEach((tag, idx) => {
      const el = elementsRef.current.get(tag.id);
      const measuredW = el ? el.offsetWidth : tag.wEst;
      const measuredH = el ? el.offsetHeight : tag.hEst;

      // Horizontal distribution across width
      const spread = (cWidth - measuredW - 85) / Math.max(1, totalTags - 1);
      const baseX = 14 + idx * spread;
      const jitterX = Math.sin(idx * 3.7) * 10;
      const targetX = Math.max(8, Math.min(cWidth - measuredW - 80, baseX + jitterX));

      // Overlap layers: resting naturally on floor or slightly layered
      const layer = idx % 3;
      const layerOffset = layer === 0 ? 0 : layer === 1 ? 16 : 28;
      const targetY = floorY - measuredH - layerOffset + Math.cos(idx * 2.3) * 6;

      // Natural tilt angles
      const angles = [-14, 8, -5, 16, 12, -8, 6, 15, -12, 10, -6, 18, -10, 14, -15, 7, -4];
      const targetRot = angles[idx % angles.length];

      const state: TagPhysics = {
        x: targetX,
        y: targetY,
        vx: 0,
        vy: 0,
        rot: targetRot,
        vrot: 0,
        w: measuredW,
        h: measuredH,
        isDragging: false,
        scale: 1,
      };

      physicsMapRef.current.set(tag.id, state);

      if (el) {
        el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) rotate(${targetRot}deg) scale(1)`;
        el.style.zIndex = (layer + 2).toString();
      }
    });

    // Star physics position
    starPhysicsRef.current = { y: floorY - 58, vy: 0, rot: 0, vrot: 0 };
    if (starRef.current) {
      const starX = cWidth - 68;
      starRef.current.style.transform = `translate3d(${starX}px, ${floorY - 58}px, 0) rotate(0deg)`;
    }
  }, []);

  // Gravity & Physics Loop
  const startPhysics = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const tick = () => {
      if (!containerRef.current) {
        rafIdRef.current = null;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const cWidth = rect.width;
      const cHeight = rect.height;
      const floorY = cHeight - 14;
      const pad = 8;
      const GRAVITY = 0.58;
      const RESTITUTION = 0.44;
      const GROUND_FRICTION = 0.86;
      const AIR_DRAG = 0.985;
      const ROT_DAMPING = 0.94;

      let active = false;

      // Update Star Physics
      const star = starPhysicsRef.current;
      if (Math.abs(star.vy) > 0.1 || star.y < floorY - 58) {
        active = true;
        star.vy += GRAVITY * 0.8;
        star.y += star.vy;
        star.rot += star.vrot;
        star.vrot *= 0.92;

        if (star.y >= floorY - 58) {
          star.y = floorY - 58;
          if (Math.abs(star.vy) > 1.2) {
            star.vy = -star.vy * 0.35;
          } else {
            star.vy = 0;
            star.rot = 0;
            star.vrot = 0;
          }
        }

        if (starRef.current) {
          const starX = cWidth - 68;
          starRef.current.style.transform = `translate3d(${starX}px, ${star.y}px, 0) rotate(${star.rot}deg)`;
        }
      }

      // Sticker soft stacking & repulsion
      const states = Array.from(physicsMapRef.current.entries());
      for (let i = 0; i < states.length; i++) {
        for (let j = i + 1; j < states.length; j++) {
          const [, a] = states[i];
          const [, b] = states[j];
          if (a.isDragging || b.isDragging) continue;

          const dx = b.x + b.w / 2 - (a.x + a.w / 2);
          const dy = b.y + b.h / 2 - (a.y + a.h / 2);
          const dist = Math.hypot(dx, dy);
          const minDist = (a.w + b.w) * 0.35;

          if (dist < minDist && dist > 0.5) {
            const overlap = (minDist - dist) * 0.04;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * overlap;
            b.x += nx * overlap;
            if (a.y < b.y) {
              a.y -= Math.abs(ny) * overlap * 0.5;
            } else {
              b.y -= Math.abs(ny) * overlap * 0.5;
            }
            active = true;
          }
        }
      }

      // Sticker updates
      states.forEach(([id, s]) => {
        if (s.isDragging) {
          active = true;
          return;
        }

        const isMoving =
          Math.hypot(s.vx, s.vy) > 0.1 || Math.abs(s.vrot) > 0.08 || s.y + s.h < floorY - 1;

        if (isMoving) {
          active = true;

          s.vy += GRAVITY;
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vrot;

          s.vx *= AIR_DRAG;
          s.vrot *= ROT_DAMPING;

          // Floor Collision
          if (s.y + s.h > floorY) {
            s.y = floorY - s.h;
            if (Math.abs(s.vy) > 1.2) {
              s.vy = -s.vy * RESTITUTION;
              s.vrot += (Math.random() - 0.5) * 2;
            } else {
              s.vy = 0;
            }
            s.vx *= GROUND_FRICTION;
            s.vrot *= 0.85;
          }

          // Left Wall
          if (s.x < pad) {
            s.x = pad;
            s.vx = -s.vx * RESTITUTION;
          } else if (s.x + s.w > cWidth - pad) {
            s.x = cWidth - pad - s.w;
            s.vx = -s.vx * RESTITUTION;
          }

          // Ceiling
          if (s.y < pad) {
            s.y = pad;
            s.vy = -s.vy * RESTITUTION;
          }

          const el = elementsRef.current.get(id);
          if (el) {
            el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rot}deg) scale(1)`;
          }
        } else {
          s.vx = 0;
          s.vy = 0;
          s.vrot = 0;
        }
      });

      if (active) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  // Pointer Down (Pick up sticker)
  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (e.button !== 0) return;
    e.preventDefault();

    const el = elementsRef.current.get(id);
    const state = physicsMapRef.current.get(id);
    if (!el || !state || !containerRef.current) return;

    el.setPointerCapture(e.pointerId);
    activeDragIdRef.current = id;

    topZRef.current += 1;
    el.style.zIndex = topZRef.current.toString();

    const cRect = containerRef.current.getBoundingClientRect();
    const grabOffsetX = e.clientX - cRect.left - state.x;
    const grabOffsetY = e.clientY - cRect.top - state.y;

    dragInfoRef.current = {
      grabOffsetX,
      grabOffsetY,
      startX: e.clientX,
      startY: e.clientY,
      moves: [{ x: e.clientX, y: e.clientY, t: performance.now() }],
    };

    state.isDragging = true;
    state.vx = 0;
    state.vy = 0;
    state.vrot = 0;
    state.scale = 1.08;

    el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rot}deg) scale(1.08)`;
    el.style.boxShadow =
      '0 24px 38px -10px rgba(0,0,0,0.55), 0 12px 18px -6px rgba(0,0,0,0.3)';

    startPhysics();
  };

  // Pointer Move (Drag sticker)
  const handlePointerMove = (e: React.PointerEvent, id: string) => {
    if (activeDragIdRef.current !== id || !dragInfoRef.current) return;

    const el = elementsRef.current.get(id);
    const state = physicsMapRef.current.get(id);
    if (!el || !state || !containerRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const info = dragInfoRef.current;
    const now = performance.now();

    info.moves.push({ x: e.clientX, y: e.clientY, t: now });
    if (info.moves.length > 5) info.moves.shift();

    const nextX = e.clientX - cRect.left - info.grabOffsetX;
    const nextY = e.clientY - cRect.top - info.grabOffsetY;

    // Dynamic tilt based on drag speed
    const oldest = info.moves[0];
    const dt = Math.max(1, now - oldest.t);
    const instantVx = ((e.clientX - oldest.x) / dt) * 16.67;
    const tilt = Math.max(-20, Math.min(20, instantVx * 0.3));

    state.x = nextX;
    state.y = nextY;
    state.rot = tilt;

    el.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) rotate(${tilt}deg) scale(1.08)`;
  };

  // Pointer Up (Drop / Throw sticker)
  const handlePointerUp = (e: React.PointerEvent, id: string) => {
    if (activeDragIdRef.current !== id || !dragInfoRef.current) return;

    const el = elementsRef.current.get(id);
    const state = physicsMapRef.current.get(id);
    const info = dragInfoRef.current;

    activeDragIdRef.current = null;
    dragInfoRef.current = null;

    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      el.style.boxShadow = '';
    }

    if (!state) return;

    state.isDragging = false;
    state.scale = 1;

    // Release velocity
    const moves = info.moves;
    if (moves.length >= 2) {
      const oldest = moves[0];
      const newest = moves[moves.length - 1];
      const dt = Math.max(1, newest.t - oldest.t);

      let vx = ((newest.x - oldest.x) / dt) * 16.67;
      let vy = ((newest.y - oldest.y) / dt) * 16.67;

      vx = Math.max(-22, Math.min(22, vx));
      vy = Math.max(-22, Math.min(18, vy));

      state.vx = vx;
      state.vy = vy;

      const torque = (info.grabOffsetX - state.w / 2) * vx * 0.015;
      state.vrot = Math.max(-12, Math.min(12, torque));
    }

    // Tap hop if barely moved
    const dragDist = Math.hypot(e.clientX - info.startX, e.clientY - info.startY);
    if (dragDist < 5) {
      state.vy = -6.5;
      state.vrot = (Math.random() > 0.5 ? 1 : -1) * 8;
    }

    startPhysics();
  };

  // Press the Star character!
  const handlePressStar = () => {
    setStarWinking(true);
    setTimeout(() => setStarWinking(false), 500);

    const star = starPhysicsRef.current;
    star.vy = -13;
    star.vrot = (Math.random() > 0.5 ? 1 : -1) * 12;

    if (containerRef.current) {
      const cWidth = containerRef.current.clientWidth;
      const starX = cWidth - 68;

      physicsMapRef.current.forEach((tag) => {
        const dist = Math.hypot(tag.x - starX, tag.y - star.y);
        const impulse = Math.max(0.2, (cWidth - dist) / cWidth);

        tag.vy = -(8 + impulse * 11 + Math.random() * 4);
        tag.vx = (Math.random() - 0.5) * 14;
        tag.vrot = (Math.random() - 0.5) * 18;
      });
    }

    startPhysics();
  };

  useEffect(() => {
    const timer = setTimeout(initTags, 80);
    const handleResize = () => initTags();

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [initTags]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[230px] sm:h-[250px] md:h-[270px] overflow-hidden select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* 17 Authentic Sticker Tags from Reference Image */}
      {STICKER_TAGS.map((tag) => (
        <div
          key={tag.id}
          ref={(node) => {
            if (node) {
              elementsRef.current.set(tag.id, node);
            } else {
              elementsRef.current.delete(tag.id);
            }
          }}
          onPointerDown={(e) => handlePointerDown(e, tag.id)}
          onPointerMove={(e) => handlePointerMove(e, tag.id)}
          onPointerUp={(e) => handlePointerUp(e, tag.id)}
          onPointerCancel={(e) => handlePointerUp(e, tag.id)}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto will-change-transform transition-shadow duration-150 hover:brightness-105 active:brightness-110"
          style={{
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {tag.render()}
        </div>
      ))}

      {/* The cute mascot star on the bottom right (as invited by headline) */}
      <div
        ref={starRef}
        onClick={handlePressStar}
        title="Press the star!"
        className="absolute top-0 left-0 w-12 h-12 cursor-pointer pointer-events-auto will-change-transform hover:scale-110 active:scale-95 transition-transform"
        style={{ zIndex: 50 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="block">
          <path
            d="M24 4L29.5 16.8L43.2 18.2L32.8 27.2L35.8 40.8L24 33.8L12.2 40.8L15.2 27.2L4.8 18.2L18.5 16.8L24 4Z"
            fill="#e2e8f0"
            stroke="#1e293b"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {starWinking ? (
            <>
              <path d="M19 22L23 22" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              <circle cx="28" cy="22" r="1.8" fill="#1e293b" />
            </>
          ) : (
            <>
              <circle cx="20" cy="22" r="1.8" fill="#1e293b" />
              <circle cx="28" cy="22" r="1.8" fill="#1e293b" />
            </>
          )}
          <path
            d="M21 26C22.2 27.5 25.8 27.5 27 26"
            stroke="#1e293b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

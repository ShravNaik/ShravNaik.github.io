import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  color: string;
}

const SYMBOLS = ['∑', '∫', 'π', 'λ', 'Δ', 'Ω', 'μ', 'θ', '∞', '≈', '✦', '✧'];
const COLORS = [
  'text-[#00d2ff]',
  'text-cyan-300',
  'text-blue-400',
  'text-sky-300',
  'text-indigo-400',
  'text-white'
];

export default function ParticleTrail({ isDark }: { isDark: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(Date.now());
  const particleId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);

      // Spawn a particle if moved at least 35px or 50ms elapsed since last spawn
      if (dist > 35 && now - lastSpawnTime.current > 50) {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastSpawnTime.current = now;
        particleId.current += 1;

        const id = particleId.current;
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = Math.floor(Math.random() * 12) + 14; // 14px to 26px

        const newParticle: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          symbol,
          size,
          color,
        };

        setParticles(prev => [...prev.slice(-25), newParticle]); // keep max 25 alive in state

        // Remove particle after animation duration (1000ms)
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 0.5, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: p.x - p.size / 2 + (Math.random() * 40 - 20),
              y: p.y - p.size / 2 - (Math.random() * 40 + 20), // float upwards
              rotate: Math.random() * 90 - 45,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute font-bold select-none pointer-events-none ${p.color} ${isDark ? 'drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]' : 'drop-shadow-md'}`}
            style={{ fontSize: `${p.size}px` }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

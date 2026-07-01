import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

export default function EasterEgg() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const keysPressed = useRef<string[]>([]);
  const secretCode = 'matrix';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Listen for keyboard input to unlock easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if active element is an input or textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      keysPressed.current.push(e.key.toLowerCase());
      if (keysPressed.current.length > secretCode.length) {
        keysPressed.current.shift();
      }

      if (keysPressed.current.join('') === secretCode) {
        setIsUnlocked(true);
        keysPressed.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isUnlocked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Matrix characters + Math/AI symbols
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ∑∫πλΔΩ∞≈';
    const charArray = chars.split('');
    const fontSize = 16;
    const columns = width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff70'; // Vibrant matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isUnlocked]);

  return (
    <AnimatePresence>
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-hidden"
        >
          {/* Matrix Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"></canvas>

          {/* Modal Overlay */}
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative z-10 max-w-lg mx-4 p-8 rounded-3xl border border-[#00ff70]/40 bg-[#061810]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,112,0.4)] text-center text-white"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#00ff70]/20 border border-[#00ff70]/50 flex items-center justify-center text-[#00ff70] shadow-[0_0_20px_rgba(0,255,112,0.5)]">
              <Terminal size={32} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#00ff70]/20 text-[#00ff70] border border-[#00ff70]/40 mb-4 inline-block">
              Easter Egg Unlocked
            </span>

            <h3 className="text-3xl font-bold mb-4 tracking-tight text-[#00ff70] drop-shadow-[0_0_12px_rgba(0,255,112,0.8)]">
              The Matrix Mode
            </h3>

            <p className="text-slate-300 text-base leading-relaxed mb-8 italic">
              "You take the blue pill... the story ends. You take the red pill... you stay in Wonderland, and I show you how deep the rabbit hole goes."
            </p>

            <button
              onClick={() => setIsUnlocked(false)}
              className="w-full py-4 px-8 rounded-2xl font-bold bg-gradient-to-r from-[#00ff70] to-emerald-600 text-black hover:shadow-[0_0_30px_rgba(0,255,112,0.6)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <X size={20} className="text-black" />
              <span>Exit Wonderland</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

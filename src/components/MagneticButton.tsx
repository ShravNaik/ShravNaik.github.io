import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  proximity?: number;
  pull?: number;
}

export default function MagneticButton({
  children,
  className = '',
  proximity = 40,
  pull = 0.6
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Physically accurate, smooth spring configuration
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      // Get the current un-transformed coordinates by subtracting current spring values
      // This prevents the button from "running away" if it gets pulled out of the cursor's proximity
      const { height, width, left, top } = ref.current.getBoundingClientRect();

      // Calculate the original center without the spring translation
      const middleX = left - x.get() + width / 2;
      const middleY = top - y.get() + height / 2;

      const distanceX = clientX - middleX;
      const distanceY = clientY - middleY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < proximity) {
        // Attract towards the mouse
        x.set(distanceX * pull);
        y.set(distanceY * pull);
      } else {
        // Bounce back smoothly
        x.set(0);
        y.set(0);
      }
    };

    // We use passive: true to ensure mousemove doesn't block scrolling/rendering
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, proximity, pull]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`relative inline-flex justify-center items-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

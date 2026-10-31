import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function CursorGlow() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glowX = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!finePointer) return undefined;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, x, y]);

  if (!finePointer || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: glowX, top: glowY }}
      className="pointer-events-none fixed z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),rgba(34,211,238,0.08)_42%,transparent_70%)]" />
    </motion.div>
  );
}

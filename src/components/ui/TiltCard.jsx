import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glare = false,
}) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
  });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(165,180,252,0.16) 0%, rgba(165,180,252,0.05) 28%, transparent 60%)`;

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    glareX.set(x * 100);
    glareY.set(y * 100);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />
      )}
    </motion.div>
  );
}
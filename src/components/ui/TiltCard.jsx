import { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glare = false,
  spotlightBorder = false,
  hoverLift = 0,
  hoverScale = 1,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

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

  const scaleRaw = useMotionValue(1);
  const liftRaw = useMotionValue(0);
  const scale = useSpring(scaleRaw, { stiffness: 260, damping: 24 });
  const lift = useSpring(liftRaw, { stiffness: 260, damping: 24 });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(320px circle at ${glareX}% ${glareY}%, rgba(79,70,229,0.24) 0%, rgba(34,211,238,0.12) 32%, transparent 66%)`;
  const borderBg = useMotionTemplate`radial-gradient(260px circle at ${glareX}% ${glareY}%, rgba(79,70,229,0.95) 0%, rgba(34,211,238,0.65) 34%, transparent 70%)`;

  const handleEnter = () => {
    setHovered(true);
    if (reduceMotion) return;
    scaleRaw.set(hoverScale);
    liftRaw.set(-hoverLift);
  };

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    glareX.set(x * 100);
    glareY.set(y * 100);
  };

  const handleLeave = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
    glareX.set(50);
    glareY.set(50);
    scaleRaw.set(1);
    liftRaw.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        y: lift,
        transformPerspective: 900,
      }}
      className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}

      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-45'
          }`}
        />
      )}

      {spotlightBorder && (
        <motion.div
          aria-hidden
          style={{ background: borderBg }}
          className={`spotlight-border pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-30'
          }`}
        />
      )}
    </motion.div>
  );
}

import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/content';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery';

const HeroScene = lazy(() => import('./three/HeroScene'));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const reduceMotion = useReducedMotion() || prefersReduced;

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className={`absolute inset-0 ${
          isMobile ? 'opacity-40' : 'pointer-events-none'
        }`}
      >
        <Suspense fallback={null}>
          <HeroScene reduced={reduceMotion} />
        </Suspense>
      </div>

      <div className="section-pad relative z-10 pt-28">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="font-mono text-sm tracking-widest text-accent"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl"
          >
            {profile.name.split(' ')[0]}
            <br />
            <span className="text-gradient">{profile.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-xl font-medium text-zinc-200 sm:text-2xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-surface-border bg-surface-card/60 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition-colors hover:border-accent/60 hover:text-white"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-8 font-mono text-xs text-zinc-500"
          >
            <span>
              <span className="text-zinc-200">6+</span> projects shipped
            </span>
            <span className="h-4 w-px bg-surface-border" />
            <span>
              <span className="text-zinc-200">3</span> years coding
            </span>
            <span className="h-4 w-px bg-surface-border" />
            <span>
              <span className="text-zinc-200">∞</span> coffee
            </span>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-zinc-500 transition-colors hover:text-accent"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
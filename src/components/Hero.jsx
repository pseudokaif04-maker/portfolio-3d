import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import Magnetic from './ui/Magnetic';
import AnimatedNumber from './ui/AnimatedNumber';

const HeroScene = lazy(() => import('./three/HeroScene'));

const palettes = [
  { name: 'Indigo', color: '#4f46e5', tint: '#eef2ff', glow: 'rgba(79, 70, 229, 0.35)' },
  { name: 'Violet', color: '#8b5cf6', tint: '#f5f3ff', glow: 'rgba(139, 92, 246, 0.32)' },
  { name: 'Cyan', color: '#0891b2', tint: '#ecfeff', glow: 'rgba(8, 145, 178, 0.3)' },
  { name: 'Rose', color: '#e11d48', tint: '#fff1f2', glow: 'rgba(225, 29, 72, 0.28)' },
  { name: 'Emerald', color: '#059669', tint: '#ecfdf5', glow: 'rgba(5, 150, 105, 0.28)' },
];

const stats = [
  { value: 5, suffix: '+', label: 'projects shipped' },
  { value: 3, suffix: '', label: 'years coding' },
  { display: '∞', label: 'cups of coffee' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const titleCase = (word) => word.charAt(0) + word.slice(1).toLowerCase();
const [firstName, lastName] = profile.name.split(' ');

function SceneFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent/15 border-t-accent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
        loading scene
      </span>
    </div>
  );
}

export default function Hero() {
  const prefersReduced = usePrefersReducedMotion();
  const reduceMotion = useReducedMotion() || prefersReduced;
  const [palette, setPalette] = useState(palettes[0]);

  const cyclePalette = () => {
    setPalette((current) => {
      const next = palettes.indexOf(current) + 1;
      return palettes[next % palettes.length];
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-indigo-200/45 blur-[100px]" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-cyan-100/60 blur-[110px]" />
      </div>

      <div className="section-pad relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-medium text-emerald-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for internships &amp; freelance
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(3rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink"
          >
            {titleCase(firstName)}
            <br />
            <span className="text-gradient">{titleCase(lastName)}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 flex items-center gap-3 font-mono text-sm text-accent"
          >
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-soft"
              >
                View projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink shadow-soft backdrop-blur transition-all hover:border-accent/40 hover:text-accent"
              >
                Get in touch
                <span aria-hidden className="text-accent transition-transform duration-300 group-hover:rotate-45">↗</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-6 font-mono text-xs text-ink-muted"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden className="hidden h-4 w-px bg-surface-border sm:block" />}
                <span>
                  <span className="text-sm font-semibold text-ink">
                    {stat.display ?? (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    )}
                  </span>{' '}
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.4rem] bg-gradient-to-br from-indigo-200/40 via-transparent to-cyan-100/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 p-2 shadow-lift ring-1 ring-surface-border/80 backdrop-blur-sm">
            <div
              role="group"
              aria-label="Interactive 3D scene"
              className="relative h-[400px] overflow-hidden rounded-[1.6rem] transition-[background] duration-700 sm:h-[460px] lg:h-[540px]"
              style={{
                background: `radial-gradient(120% 95% at 50% 4%, #ffffff 0%, #ffffff 42%, ${palette.tint} 100%)`,
              }}
            >
              <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />
              <div
                aria-hidden
                className="absolute bottom-14 left-1/2 h-24 w-56 -translate-x-1/2 rounded-[50%] blur-2xl transition-colors duration-700"
                style={{ background: palette.glow, opacity: 0.35 }}
              />

              <Suspense fallback={<SceneFallback />}>
                <HeroScene
                  reduced={reduceMotion}
                  color={palette.color}
                  onCycle={cyclePalette}
                />
              </Suspense>

              <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-ink-soft shadow-sm backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Live 3D
                </span>
                <span className="rounded-full border border-white/80 bg-white/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted shadow-sm backdrop-blur-md">
                  three.js · r3f
                </span>
              </div>

              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/85 px-3.5 py-2.5 shadow-soft backdrop-blur-md">
                <div className="flex items-center gap-2" role="group" aria-label="3D scene color">
                  {palettes.map((p) => {
                    const active = p.name === palette.name;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setPalette(p)}
                        aria-label={`Set 3D color to ${p.name}`}
                        aria-pressed={active}
                        className={`h-5 w-5 rounded-full transition-transform duration-200 hover:scale-110 ${
                          active
                            ? 'scale-110 ring-2 ring-ink ring-offset-2 ring-offset-white'
                            : 'ring-1 ring-black/10'
                        }`}
                        style={{ backgroundColor: p.color }}
                      />
                    );
                  })}
                </div>
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:block">
                  click the knot · move cursor
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-muted transition-colors hover:text-accent sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}

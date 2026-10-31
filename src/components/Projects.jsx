import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { projects } from '../data/content';
import { projectDetails } from '../data/projectDetails';

const filters = ['All', 'React', 'Node.js', 'AI', 'Python', 'JavaScript'];

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);
  const frontButtonRef = useRef(null);
  const backButtonRef = useRef(null);
  const primaryLink = project.demo || project.github;
  const details = projectDetails[project.title] ?? {
    subtitle: 'Project overview',
    highlights: [
      `Built with ${project.tech.join(', ')}.`,
      project.description,
      'Explore the source to see how it fits together.',
    ],
  };

  const handleCardClick = (event) => {
    if (event.target.closest('a, button')) return;
    if (window.getSelection()?.toString()) return;
    setFlipped((current) => !current);
  };

  const flipToBack = (event) => {
    event.stopPropagation();
    setFlipped(true);
    if (event.detail === 0) {
      window.requestAnimationFrame(() => backButtonRef.current?.focus({ preventScroll: true }));
    }
  };

  const flipToFront = (event) => {
    event.stopPropagation();
    setFlipped(false);
    if (event.detail === 0) {
      window.requestAnimationFrame(() => frontButtonRef.current?.focus({ preventScroll: true }));
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard
        maxTilt={10}
        glare
        spotlightBorder
        hoverLift={8}
        hoverScale={1.015}
        className="group h-full rounded-2xl"
      >
        <div className="h-full [perspective:1600px]">
          <div
            onClick={handleCardClick}
            className="grid h-full cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 will-change-transform [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <span className="sr-only" aria-live="polite">
              {flipped ? `${project.title} details shown.` : `${project.title} overview shown.`}
            </span>

            {/* Front — overview */}
            <div
              inert={flipped}
              aria-hidden={flipped || undefined}
              className={`backface-hidden relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-soft transition-[border-color,box-shadow] duration-300 group-hover:border-accent/40 group-hover:shadow-lift ${
                flipped ? 'pointer-events-none' : ''
              }`}
            >
              <div className={`relative h-36 shrink-0 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div aria-hidden className="absolute inset-0 bg-dots opacity-35 mix-blend-overlay" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
                <div
                  aria-hidden
                  className="absolute -right-8 -top-10 h-32 w-32 animate-float rounded-full bg-white/25 blur-2xl"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-12 left-4 h-28 w-28 animate-float rounded-full bg-black/15 blur-2xl [animation-delay:-2.5s]"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:animate-sweep group-hover:opacity-100"
                />

                <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
                  project {String(index + 1).padStart(2, '0')}
                </span>
                <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/95 backdrop-blur-sm">
                  {project.tech[0]}
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-[spin_22s_linear_infinite] rounded-full border border-dashed border-white/25 transition-colors duration-300 group-hover:border-white/60"
                    />
                    <span aria-hidden className="absolute inset-4 rounded-full bg-white/10 blur-md" />
                    <span className="relative font-mono text-4xl font-bold text-white/95 transition-transform duration-500 group-hover:scale-110">
                      {'{ }'}
                    </span>
                  </div>
                </div>

                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="pointer-events-none absolute bottom-3 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/35 bg-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {project.demo ? 'live demo' : 'source'}
                  <span aria-hidden>↗</span>
                </a>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <div className="flex shrink-0 gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      onClick={(event) => event.stopPropagation()}
                      className="rounded-full border border-surface-border bg-white p-2 text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent hover:shadow-sm"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.11 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        onClick={(event) => event.stopPropagation()}
                        className="rounded-full border border-surface-border bg-white p-2 text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent hover:shadow-sm"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-surface-border bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-ink-soft transition-colors duration-300 group-hover:border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-surface-border/80 pt-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                      <path d="M21 3v5h-5" />
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                      <path d="M3 21v-5h5" />
                    </svg>
                    flip for details
                  </span>
                  <button
                    ref={frontButtonRef}
                    type="button"
                    onClick={flipToBack}
                    aria-label={`Show what I learned building ${project.title}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-surface-border bg-white px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition-all duration-200 hover:border-accent/40 hover:text-accent hover:shadow-sm"
                  >
                    What I learned
                    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Back — what I learned */}
            <div
              inert={!flipped}
              aria-hidden={!flipped || undefined}
              style={{ transform: 'rotateY(180deg)' }}
              className={`backface-hidden relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-white via-white to-indigo-50 p-6 shadow-soft transition-[box-shadow] duration-300 group-hover:shadow-lift ${
                flipped ? '' : 'pointer-events-none'
              }`}
            >
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-25" />
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r ${project.gradient}`}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    what i learned
                  </span>
                  <button
                    ref={backButtonRef}
                    type="button"
                    onClick={flipToFront}
                    aria-label={`Flip ${project.title} back to overview`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/20 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-accent shadow-sm transition-colors duration-200 hover:bg-accent hover:text-white"
                  >
                    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                      <path d="M21 3v5h-5" />
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                      <path d="M3 21v-5h5" />
                    </svg>
                    Back
                  </button>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {details.subtitle}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                    design + build
                  </span>
                  <span className="rounded-full border border-surface-border bg-white/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    {project.demo ? 'live' : 'open source'}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {details.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <svg aria-hidden width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {details.takeaway && (
                  <div className="mt-5 rounded-xl border border-accent/15 bg-white/70 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                      biggest takeaway
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {details.takeaway}
                    </p>
                  </div>
                )}

                <div className="mt-auto border-t border-accent/10 pt-4">
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                    built with
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-accent/15 bg-white/70 px-2.5 py-1 font-mono text-[10px] text-ink-soft"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="rounded-full border border-accent/15 bg-white/70 px-2.5 py-1 font-mono text-[10px] text-ink-muted">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        Live demo
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-4 py-2 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                    >
                      Source
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((project) =>
          project.tech.some((tech) => tech.toLowerCase().includes(active.toLowerCase())),
        );

  return (
    <section id="projects" className="relative border-y border-surface-border bg-white/60 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-100/35 blur-[110px]" />
      </div>

      <div className="section-pad relative z-10">
        <SectionHeading
          eyebrow="// projects"
          title="Things I've built"
          description="A selection of projects where I explored new ideas — from 3D visualization to real-time collaboration and AI."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div
            role="group"
            aria-label="Filter projects by technology"
            className="no-scrollbar flex flex-wrap gap-2"
          >
            {filters.map((filter) => {
              const isActive = active === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-accent bg-accent text-white shadow-glow'
                      : 'border-surface-border bg-white text-ink-soft hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            {filtered.length} / {projects.length} projects
          </p>
        </motion.div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-ink-muted">
            No projects match that filter yet.
          </p>
        )}
      </div>
    </section>
  );
}

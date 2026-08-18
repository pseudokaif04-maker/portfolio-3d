import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { projects } from '../data/content';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="h-full"
    >
      <TiltCard
        maxTilt={8}
        glare
        className="group h-full rounded-2xl border border-surface-border bg-surface-card transition-colors duration-300 hover:border-accent/50"
      >
        <div className="flex h-full flex-col p-6">
          <div
            className={`mb-5 flex h-24 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} opacity-90`}
          >
            <span className="font-mono text-4xl font-bold text-white/90">
              {'{ }'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <div className="flex shrink-0 gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="rounded-full bg-surface-raised p-2 text-zinc-400 transition-colors hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.11 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="rounded-full bg-surface-raised p-2 text-zinc-400 transition-colors hover:text-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-surface-border bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="section-pad">
        <SectionHeading
          eyebrow="// projects"
          title="Things I've built"
          description="A selection of projects where I explored new ideas — from 3D visualization to real-time collaboration."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
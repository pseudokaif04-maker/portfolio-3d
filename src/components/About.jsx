import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { profile, skills } from '../data/content';

const exploring = ['React', 'Three.js', 'AI tooling', 'Node.js', 'Design systems'];

function SkillCard({ title, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard
        maxTilt={5}
        className="group h-full rounded-2xl border border-surface-border bg-surface-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
            {title}
          </h3>
          <span className="font-mono text-[10px] text-ink-muted">
            {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <ul className="mt-5 space-y-4">
          {items.map((skill, i) => (
            <li key={skill.name} className="group/skill">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink transition-colors group-hover/skill:text-accent">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + index * 0.05 + i * 0.04,
                    ease: 'easeOut',
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-accent via-accent-soft to-cyan-400 transition-all duration-300 group-hover/skill:shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                />
              </div>
            </li>
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}

export default function About() {
  const paragraphs = profile.bio
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-indigo-100/40 blur-[100px]" />
      </div>

      <div className="section-pad relative z-10">
        <SectionHeading
          eyebrow="// about"
          title="A developer who cares about the details"
          description="Software should feel as good as it works. Here's a bit about my journey and the tools I reach for."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              Turning ideas into{' '}
              <span className="text-gradient">interactive reality</span>
            </h3>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <p className="flex items-center gap-3 font-mono text-sm text-ink-muted">
                <span className="text-accent">//</span> {profile.location}
              </p>
              <p className="flex items-center gap-3 font-mono text-sm text-ink-muted">
                <span className="text-accent">//</span> First-year B.Tech Engineering
              </p>
              <p className="flex items-center gap-3 font-mono text-sm text-ink-muted">
                <span className="text-accent">//</span> Open to internships &amp; freelance
              </p>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                currently exploring
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exploring.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default rounded-full border border-surface-border bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SkillCard title="Languages" items={skills.languages} index={0} />
            <SkillCard title="Frameworks" items={skills.frameworks} index={1} />
            <SkillCard title="Tools" items={skills.tools} index={2} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-accent/25 bg-gradient-to-br from-white via-white to-indigo-50/70 p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <div aria-hidden className="absolute inset-0 bg-dots opacity-30" />
              <div className="relative flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-300" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  growth.js
                </span>
              </div>
              <div className="relative mt-auto pt-8 font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-violet-500">const</span>{' '}
                  <span className="text-ink">growth</span>{' '}
                  <span className="text-ink-muted">=</span>{' '}
                  <span className="text-emerald-600">'always'</span>
                  <span className="text-ink-muted">;</span>
                </p>
                <p className="text-ink-muted">// never stop learning</p>
                <p className="mt-2 text-ink-muted">
                  <span className="text-accent">while</span>
                  <span className="text-ink-muted"> (</span>
                  <span className="text-ink">curious</span>
                  <span className="text-ink-muted">) </span>
                  <span className="text-accent">build</span>
                  <span className="text-ink-muted">();</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

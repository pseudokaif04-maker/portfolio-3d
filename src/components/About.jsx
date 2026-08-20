import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { profile, skills } from '../data/content';

function SkillCard({ title, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <TiltCard
        maxTilt={6}
        className="h-full rounded-2xl border border-surface-border bg-surface-card p-6 shadow-glow/30"
      >
        <h3 className="font-mono text-sm uppercase tracking-widest text-accent">
          {title}
        </h3>
        <ul className="mt-5 space-y-4">
          {items.map((skill) => (
            <li key={skill.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-200">{skill.name}</span>
                <span className="font-mono text-xs text-zinc-500">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-glow"
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
  return (
    <section id="about" className="relative py-28">
      <div className="section-pad">
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
            <h3 className="text-2xl font-semibold text-white">
              Turning ideas into{' '}
              <span className="text-gradient">interactive reality</span>
            </h3>
            <p className="mt-5 leading-relaxed text-zinc-400">{profile.bio}</p>

            <div className="mt-8 space-y-3">
              <p className="flex items-center gap-3 font-mono text-sm text-zinc-500">
                <span className="text-accent">//</span> {profile.location}
              </p>
              <p className="flex items-center gap-3 font-mono text-sm text-zinc-500">
                <span className="text-accent">//</span> First-year B.Tech Engineering
              </p>
              <p className="flex items-center gap-3 font-mono text-sm text-zinc-500">
                <span className="text-accent">//</span> Open to internships &amp; freelance
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SkillCard title="Languages" items={skills.languages} index={0} />
            <SkillCard title="Frameworks" items={skills.frameworks} index={1} />
            <SkillCard
              title="Tools"
              items={skills.tools}
              index={2}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex items-center justify-center rounded-2xl border border-dashed border-surface-border p-6"
            >
              <p className="text-center font-mono text-sm leading-relaxed text-zinc-500">
                <span className="text-accent">const</span> growth ={' '}
                <span className="text-accent-glow">'always'</span>;
                <br />
                <span className="text-zinc-600">// never stop learning</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
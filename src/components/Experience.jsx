import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { timeline } from '../data/content';

const lineVariants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.4, ease: 'easeOut', delay: 0.3 },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="section-pad">
        <SectionHeading
          eyebrow="// experience & education"
          title="My journey so far"
          description="Where I've studied, worked, and grown as a developer."
        />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-surface-border to-transparent md:left-1/2"
          />

          <div className="space-y-10">
            {timeline.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={`${entry.title}-${i}`}
                  className={`relative flex md:items-center ${
                    left ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="ml-10 w-full pl-4 md:ml-0 md:w-[calc(50%-2.5rem)] md:px-0"
                  >
                    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 transition-colors hover:border-accent/50">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
                            entry.type === 'work'
                              ? 'bg-accent/15 text-accent-glow'
                              : 'bg-emerald-500/15 text-emerald-400'
                          }`}
                        >
                          {entry.type}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {entry.period}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {entry.title}
                      </h3>
                      <p className="font-mono text-sm text-accent">{entry.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {entry.description}
                      </p>
                    </div>
                  </motion.div>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className={`absolute top-2 left-4 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent bg-surface shadow-glow md:top-1/2 md:left-1/2 md:-translate-y-1/2`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
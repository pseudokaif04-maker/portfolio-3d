import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-xs tracking-widest text-accent"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent via-accent-soft to-cyan-400"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-ink-soft"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

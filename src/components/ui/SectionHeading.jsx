import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-mono text-sm tracking-widest text-accent"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-3 text-3xl font-bold text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-accent-glow"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-zinc-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
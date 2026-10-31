const items = [
  'React',
  'Three.js',
  'Tailwind CSS',
  'Framer Motion',
  'Node.js',
  'TypeScript',
  'Python',
  'PostgreSQL',
  'Vite',
  'AI Tools',
  'Git & GitHub',
  'Figma',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {item}
          </span>
          <span aria-hidden className="text-[10px] text-accent/50">
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative border-y border-surface-border bg-white/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
      <div className="group flex overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}

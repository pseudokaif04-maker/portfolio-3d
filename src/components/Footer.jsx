import { profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-surface-border bg-white/70 py-8 backdrop-blur">
      <div className="section-pad flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-ink-muted">
          &copy; {year} {profile.name}. Built with React, Three.js &amp; Tailwind.
        </p>
        <div className="flex items-center gap-5">
          <p className="font-mono text-xs text-ink-muted/80">
            <span className="text-accent">{'</>'}</span> Crafted from scratch
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1.5 font-mono text-[11px] text-ink-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
          >
            Back to top
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

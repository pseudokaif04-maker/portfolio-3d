import { profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-border py-8">
      <div className="section-pad flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-zinc-500">
          &copy; {year} {profile.name}. Built with React, Three.js &amp; Tailwind.
        </p>
        <p className="font-mono text-xs text-zinc-600">
          <span className="text-accent">{"</>"}</span> Crafted from scratch
        </p>
      </div>
    </footer>
  );
}
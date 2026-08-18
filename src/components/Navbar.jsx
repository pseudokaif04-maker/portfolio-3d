import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, profile } from '../data/content';

function useScrollSpy() {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-surface-border' : 'bg-transparent'
      }`}
    >
      <nav className="section-pad flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={closeMenu}
          className="font-mono text-lg font-semibold tracking-tight text-white"
        >
          <span className="text-accent">{"<"}</span>
          {profile.firstName.toLowerCase()}
          <span className="text-accent">{" />"}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? 'text-accent'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={profile.socials.email}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded bg-white transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition-transform duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="glass overflow-hidden border-b border-surface-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active === link.href
                        ? 'bg-accent/10 text-accent'
                        : 'text-zinc-300 hover:bg-surface-raised hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={profile.socials.email}
                  onClick={closeMenu}
                  className="block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
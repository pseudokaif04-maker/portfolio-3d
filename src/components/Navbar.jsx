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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-surface-border shadow-[0_8px_30px_-24px_rgba(24,24,27,0.35)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="section-pad flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={closeMenu}
          className="group font-mono text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5 inline-block">{'<'}</span>
          {profile.firstName.toLowerCase()}
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 inline-block">{' />'}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? 'text-accent'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-accent/[0.08] ring-1 ring-inset ring-accent/15"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={profile.socials.email}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Hire me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-surface-raised md:hidden"
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-ink transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-ink transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-ink transition-transform duration-300 ${
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
            className="glass-dark overflow-hidden border-b border-surface-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active === link.href
                        ? 'bg-accent/[0.08] text-accent'
                        : 'text-ink-soft hover:bg-surface-raised hover:text-ink'
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
                  className="block rounded-xl bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white"
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

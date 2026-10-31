import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const ContactScene = lazy(() => import('./three/ContactScene'));

const inputClasses =
  'w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink shadow-sm placeholder-zinc-400 outline-none transition-all focus:border-accent/60 focus:ring-4 focus:ring-accent/10';

export default function Contact() {
  const prefersReduced = usePrefersReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const timers = useRef([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const flash = (setter) => {
    setter(true);
    timers.current.push(setTimeout(() => setter(false), 2600));
  };

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      flash(setCopied);
    } catch {
      window.location.href = profile.socials.email;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `${profile.socials.email}?subject=${subject}&body=${body}`;
    flash(setSent);
  };

  const socials = [
    {
      label: 'GitHub',
      href: profile.socials.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.11 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: profile.socials.email,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-surface-border py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <Suspense fallback={null}>
          <ContactScene reduced={prefersReduced} />
        </Suspense>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-transparent to-indigo-50/60" />

      <div className="section-pad relative z-10">
        <SectionHeading
          eyebrow="// contact"
          title="Let's build something together"
          description="Have a project in mind, a question, or just want to say hi? My inbox is always open."
        />

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3 py-1.5 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available now
            </span>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
              {profile.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={profile.socials.email}
                className="font-mono text-sm text-accent transition-colors hover:text-accent-soft"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-surface-border bg-white text-ink-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
              <span
                aria-live="polite"
                className={`font-mono text-[11px] text-emerald-600 transition-opacity duration-200 ${
                  copied ? 'opacity-100' : 'opacity-0'
                }`}
              >
                copied!
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Currently open to internships, freelance, and cool side projects.
              I usually reply within 24 hours.
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-ink-muted">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-accent">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              {profile.location}
            </div>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-white text-ink-muted shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-glow"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-surface-border bg-white/85 p-6 shadow-soft backdrop-blur-md transition-shadow duration-300 focus-within:shadow-lift sm:p-7"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Doe"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                {sent ? 'Opening mail app…' : 'Send message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  {sent ? <path d="M20 6L9 17l-5-5" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
                </svg>
              </button>
              <p className="text-center font-mono text-[11px] text-ink-muted">
                opens your email client with everything pre-filled
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const ContactScene = lazy(() => import('./three/ContactScene'));

const inputClasses =
  'w-full rounded-xl border border-surface-border bg-surface-card/70 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-accent/20';

export default function Contact() {
  const prefersReduced = usePrefersReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `${profile.socials.email}?subject=${subject}&body=${body}`;
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
    <section id="contact" className="relative overflow-hidden py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <Suspense fallback={null}>
          <ContactScene reduced={prefersReduced} />
        </Suspense>
      </div>

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
            <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
            <p className="mt-2 font-mono text-sm text-accent">
              {profile.email}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Currently open to internships, freelance, and cool side projects.
              I usually reply within 24 hours.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-surface-card text-zinc-400 transition-all hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-glow"
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
            className="rounded-2xl border border-surface-border bg-surface-card/70 p-6 backdrop-blur-md"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
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
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
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
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                Send message
              </button>
              <p className="text-center font-mono text-xs text-zinc-600">
                opens your email client with everything pre-filled
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import CursorGlow from './components/ui/CursorGlow';

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-surface text-ink-soft">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-200/35 blur-[130px]" />
        <div className="absolute right-[-12rem] top-[38%] h-[460px] w-[460px] rounded-full bg-cyan-100/50 blur-[110px]" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-[420px] w-[420px] rounded-full bg-violet-100/50 blur-[110px]" />
      </div>

      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

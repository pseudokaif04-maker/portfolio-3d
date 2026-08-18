export const profile = {
  name: 'MOHAMMAD KAIF',
  firstName: 'MOHAMMAD',
  role: 'CS Student & Developer',
  tagline:
    "I build thoughtful, interactive web experiences — where clean engineering meets a touch of 3D magic.",
  bio: `Hi, I'm KAIF — a computer science student with a passion for crafting fast, accessible, and genuinely delightful web applications. I love the intersection of logic and design: turning complex problems into elegant interfaces that feel effortless to use.

  Currently focused on full-stack development, real-time apps, and creative front-end work with React and Three.js. When I'm not writing code you'll find me exploring procedural generation, contributing to open source, or mentoring first-year CS students.`,
  email: 'hello@mohammadkaif.dev',
  location: 'Toronto, Canada',
  socials: {
    github: 'https://github.com/mohammadkaif',
    linkedin: 'https://linkedin.com/in/mohammadkaif',
    email: 'mailto:hello@mohammadkaif.dev',
  },
};

export const skills = {
  languages: [
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Python', level: 80 },
    { name: 'C++', level: 65 },
    { name: 'Rust', level: 55 },
    { name: 'SQL', level: 75 },
  ],
  frameworks: [
    { name: 'React', level: 92 },
    { name: 'Three.js / R3F', level: 85 },
    { name: 'Next.js', level: 88 },
    { name: 'Node.js', level: 82 },
    { name: 'Tailwind CSS', level: 93 },
    { name: 'Framer Motion', level: 78 },
  ],
  tools: [
    { name: 'Git & GitHub', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'PostgreSQL', level: 72 },
    { name: 'Figma', level: 68 },
    { name: 'Vite', level: 88 },
    { name: 'Linux', level: 75 },
  ],
};

export const projects = [
  {
    title: 'Orbit — 3D Data Dashboard',
    description:
      'Real-time analytics dashboard rendered in 3D. Visualizes server metrics as an interactive particle constellation with click-to-inspect nodes.',
    tech: ['React', 'Three.js', 'R3F', 'WebSocket', 'Tailwind'],
    github: 'https://github.com/alexmorgan/orbit',
    demo: 'https://orbit-demo.vercel.app',
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    title: 'PulseNotes',
    description:
      'A collaborative markdown editor with live cursors, CRDT-based syncing, and offline-first storage via IndexedDB. Used by 2k+ students.',
    tech: ['Next.js', 'CRDT', 'IndexedDB', 'Node.js'],
    github: 'https://github.com/alexmorgan/pulsenotes',
    demo: 'https://pulsenotes.app',
    gradient: 'from-cyan-500 to-sky-600',
  },
  {
    title: 'Voxel Builder',
    description:
      'Browser-based voxel editor with procedural terrain generation, instanced meshes, and one-click GLTF export. Runs smoothly on mobile.',
    tech: ['Three.js', 'WebGL', 'GLTF', 'Rust (WASM)'],
    github: 'https://github.com/alexmorgan/voxel-builder',
    demo: null,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Echo — Music Visualization',
    description:
      'Audio-reactive music visualizer that maps frequency bands to a generative 3D particle field. Toggle between 6 shader presets.',
    tech: ['Web Audio API', 'Three.js', 'GLSL', 'Vite'],
    github: 'https://github.com/alexmorgan/echo',
    demo: 'https://echo-vis.vercel.app',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  {
    title: 'StudyFlow',
    description:
      'Pomodoro + spaced-repetition planner with a distraction-free focus mode, streak tracking, and smart scheduling recommendations.',
    tech: ['React', 'TypeScript', 'Local-first', 'Chart.js'],
    github: 'https://github.com/alexmorgan/studyflow',
    demo: 'https://studyflow.app',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Raytracer in Rust',
    description:
      'A from-scratch CPU raytracer supporting soft shadows, reflections, and depth-of-field. Renders scenes to PNG in under 2 seconds.',
    tech: ['Rust', 'Linear Algebra', 'PPM'],
    github: 'https://github.com/alexmorgan/raytracer',
    demo: null,
    gradient: 'from-slate-500 to-zinc-600',
  },
];

export const timeline = [
  {
    type: 'education',
    period: '2023 — Present',
    title: 'B.Sc. Computer Science',
    org: 'University of Toronto',
    description:
      'Focusing on graphics, distributed systems, and HCI. Dean’s List (2 terms). Teaching assistant for Intro to Programming.',
  },
  {
    type: 'work',
    period: 'Summer 2025',
    title: 'Software Engineer Intern',
    org: 'Pixelforge Labs',
    description:
      'Shipped a WebGL-based 3D configurator used by 40k monthly visitors. Cut render time 3x via instancing and draw-call batching.',
  },
  {
    type: 'education',
    period: '2021 — 2023',
    title: 'High School Diploma',
    org: 'Northview Collegiate',
    description:
      'Graduated with honours. Built the school’s first robotics club and led it to a provincial final.',
  },
  {
    type: 'work',
    period: '2024 — 2025',
    title: 'Open Source Contributor',
    org: 'React Three Fiber ecosystem',
    description:
      'Contributed examples, docs, and bug fixes to R3F and drei. Maintainer of two community hooks used in 300+ repos.',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
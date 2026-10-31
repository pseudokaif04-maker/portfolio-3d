export const profile = {
  name: 'MOHAMMAD KAIF',
  firstName: 'MOHAMMAD',
  role: 'Engineering Student & Developer',
  tagline:
    "I build thoughtful, interactive web experiences — where clean engineering meets a touch of 3D magic.",
  bio: `Hi, I'm KAIF — a first-year B.Tech engineering student at ZHCET, AMU Aligarh, with a growing passion for building fast, clean, and genuinely useful web applications. I love taking an idea and turning it into a working product, learning how everything fits together along the way.

  I'm also quite handy with AI tools — I use them daily to write code faster, prototype ideas, and ship real projects like StudyPal and my scholarship portal. Always exploring new tech and leveling up one project at a time.`,
  email: 'pseudokaif04@gmail.com',
  location: 'Aligarh, India',
  socials: {
    github: 'https://github.com/pseudokaif04-maker',
    email: 'mailto:pseudokaif04@gmail.com',
  },
};

export const skills = {
  languages: [
    { name: 'JavaScript', level: 88 },
    { name: 'HTML / CSS', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'C++', level: 50 },
    { name: 'SQL', level: 45 },
  ],
  frameworks: [
    { name: 'Tailwind CSS', level: 80 },
    { name: 'React', level: 70 },
    { name: 'Vite', level: 72 },
    { name: 'Node.js', level: 60 },
    { name: 'Framer Motion', level: 50 },
    { name: 'Three.js / R3F', level: 40 },
  ],
  tools: [
    { name: 'AI Tools (LLMs, Copilots)', level: 92 },
    { name: 'Git & GitHub', level: 85 },
    { name: 'Google Sheets API', level: 65 },
    { name: 'Telegram Bot API', level: 65 },
    { name: 'Figma', level: 40 },
    { name: 'Linux', level: 45 },
  ],
};

export const projects = [
  {
    title: 'Aftertide',
    description:
      'A calm, anonymous space to share how you\'re really feeling. Posts get gentle reflective replies, and support comes as quiet "ripples" instead of likes. Full-stack: React frontend, Express API, permanent storage on Neon Postgres, generated rain-and-birdsong ambience, deployed live on Render.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/pseudokaif04-maker/aftertide',
    demo: 'https://aftertide.onrender.com',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Studypal',
    description:
      'AI-powered study buddy for students. Ask anything, any subject — or paste your notes to generate flashcards, quizzes, and summaries. Free and open source.',
    tech: ['JavaScript', 'AI', 'CSS', 'HTML'],
    github: 'https://github.com/pseudokaif04-maker/studypal',
    demo: null,
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    title: 'Scholarshine — Scholarships Portal',
    description:
      'A free guide to government and private scholarships for students in India — with eligibility details, application instructions, deadlines, and an eligibility checker. Data loads live from a Google Sheet.',
    tech: ['JavaScript', 'Google Sheets API', 'CSS', 'HTML'],
    github: 'https://github.com/pseudokaif04-maker/Scholarships-portal',
    demo: 'https://pseudokaif04-maker.github.io/Scholarships-portal/',
    gradient: 'from-cyan-500 to-sky-600',
  },
  {
    title: 'Deadline Bot',
    description:
      'A Telegram bot that sends deadline reminders, so you never miss an application, assignment, or submission date.',
    tech: ['Python', 'Telegram Bot API'],
    github: 'https://github.com/pseudokaif04-maker/deadline-bot',
    demo: null,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'B.Tech Career Guide',
    description:
      'Interactive single-page guide for B.Tech students — pick an engineering branch and see career paths, jobs, salaries, and skills to master with YouTube learning playlists.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/pseudokaif04-maker/Btech-career-guide',
    demo: 'https://pseudokaif04-maker.github.io/Btech-career-guide/',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
];

export const timeline = [
  {
    type: 'education',
    period: '2023 — Present',
    title: 'B.Tech, Engineering',
    org: 'Zakir Husain College of Engineering and Technology (ZHCET), AMU Aligarh',
    description:
      'Currently in my first year of B.Tech — building a strong foundation in engineering and programming while exploring full-stack development and AI.',
  },
  {
    type: 'education',
    period: '2020 — 2023',
    title: 'Intermediate (Class 11–12)',
    org: 'Saiyyid Hamid Senior Secondary School (Boys), AMU Aligarh',
    description:
      'Completed my senior secondary education in 2023, building the foundations in science and mathematics that led me into engineering.',
  },
  {
    type: 'education',
    period: 'till 2020',
    title: 'High School',
    org: 'St. Francis Inter College, Hathras',
    description:
      'Finished my schooling in 2020 with a strong academic record and an early interest in computers and technology.',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
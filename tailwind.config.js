/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#4f46e5',
          soft: '#6366f1',
          glow: '#818cf8',
        },
        ink: {
          DEFAULT: '#18181b',
          soft: '#52525b',
          muted: '#71717a',
        },
        surface: {
          DEFAULT: '#fafafa',
          card: '#ffffff',
          raised: '#f4f4f5',
          border: '#e4e4e7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(24, 24, 27, 0.04), 0 10px 30px -18px rgba(24, 24, 27, 0.18)',
        lift: '0 2px 4px rgba(24, 24, 27, 0.03), 0 28px 50px -28px rgba(79, 70, 229, 0.38)',
        glow: '0 14px 38px -14px rgba(79, 70, 229, 0.55)',
        'glow-lg': '0 24px 70px -20px rgba(79, 70, 229, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.7)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        sweep: {
          '0%': { transform: 'translateX(-200%) skewX(-12deg)', opacity: '0' },
          '12%': { opacity: '1' },
          '100%': { transform: 'translateX(400%) skewX(-12deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        sweep: 'sweep 1.1s ease-in-out',
      },
    },
  },
  plugins: [],
};

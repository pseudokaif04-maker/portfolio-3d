/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
          glow: '#a5b4fc',
        },
        surface: {
          DEFAULT: '#09090b',
          card: '#111114',
          raised: '#17171c',
          border: '#26262e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99, 102, 241, 0.55)',
        'glow-lg': '0 0 80px -12px rgba(99, 102, 241, 0.65)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
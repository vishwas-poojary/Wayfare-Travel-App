/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0F1720',
          800: '#151F2B',
          700: '#1C2836',
          600: '#26374A',
        },
        sand: {
          50: '#FBF7EF',
          100: '#F6EFE0',
          200: '#EFE3CC',
        },
        gold: {
          400: '#E7B466',
          500: '#DFA23F',
          600: '#C4832A',
        },
        teal: {
          400: '#4C8C86',
          500: '#316662',
          600: '#234C49',
        },
        rust: {
          500: '#B4552F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(15, 23, 32, 0.35)',
      },
      transitionTimingFunction: {
        atlas: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

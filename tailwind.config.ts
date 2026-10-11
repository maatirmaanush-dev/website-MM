import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50:  '#FAF7F2',
          100: '#F5F0E8',
          200: '#EDE8DC',
          300: '#DDD5C5',
        },
        earth: {
          500: '#A87B50',
          600: '#7A5230',
          700: '#5C3D1E',
          800: '#3D2510',
          900: '#2C1810',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
export default config

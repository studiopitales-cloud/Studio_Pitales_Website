/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f0ece4',
          dark: '#e6e2da',
          mid: '#dbd7cf',
        },
        'blue-gray': '#92a6b4',
        brand: {
          dark: '#1a1a1a',
          mid: '#5c5c5c',
          light: '#8a8a8a',
          gray: '#c8c8c8',
        },
        salmon: '#f9a08c',
      },
      fontFamily: {
        sans: ['"Noto Sans Hebrew"', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollDot: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '20%':  { opacity: '1' },
          '80%':  { opacity: '1' },
          '100%': { transform: 'translateY(320%)', opacity: '0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-dot': 'scrollDot 2.2s cubic-bezier(0.4, 0, 0.6, 1) 1.8s infinite',
        'spin-slow':  'spinSlow 32s linear infinite',
      },
    },
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: '#0a192f',
        gold: '#d4af37',
        charcoal: '#36454f',
      },
    },
  },
  plugins: [],
};

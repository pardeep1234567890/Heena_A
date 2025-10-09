/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#d66817',
      },
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
      }
    },
  },
  plugins: [],
}
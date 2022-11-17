/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '576px',
      },
      brightness: {
        35: '.35',
      },
      blur: {
        'xs': '2px'
      },
      padding: {
        '22': '5.5rem'
      }
    }
  },
  plugins: [],
}

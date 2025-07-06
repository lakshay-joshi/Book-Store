/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFCE1A',
        secondary: '#0D0842',
        blackbg: '#F3F3F3',
        favourite: '#FF5841',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

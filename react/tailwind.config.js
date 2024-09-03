/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Example font setup
      },
      // fontSize: {
      //   base: '5px',
      // },
    },
  },

  plugins: [
    require ("@tailwindcss/forms")
  ],
}


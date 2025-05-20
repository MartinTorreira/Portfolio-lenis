/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        aleo: ["Aleo", "sans-serif"],

        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
}

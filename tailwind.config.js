/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#39DB4A',
        secondary: '#FAFAFA', 
        customCardBg: '#C1F1C6', // Added custom card background color
      },
    },
  },
  plugins: [],
}

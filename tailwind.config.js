
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#000000",
          fg: "#FFFFFF"
        }
      }
    },
  },
  plugins: [],
};

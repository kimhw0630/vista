/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#781723",
        "primary-dark": "#9e1e2d",
        "background-light": "#f8f9fc",
        "background-dark": "#0a0a0a",
        "surface-light": "#ffffff",
        "surface-dark": "#1a1a1a",
        "border-light": "#e7ebf3",
        "border-dark": "#2d2d2d",
        "text-main": "#1a1a1a",
        "text-secondary": "#4a5568",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}

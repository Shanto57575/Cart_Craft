/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["nord", "sunset", "coffee"],
  },
  plugins: [require("daisyui")],
}


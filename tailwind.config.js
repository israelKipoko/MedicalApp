/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:  {
          DEFAULT: "#6DB9EF",
          100: "#3081D0",
          200: "#125B9A",
        },
        secondary: {
          DEFAULT: "#F5F7F8",
          100: "#FCF8F3",
          200: "#F6F5F2",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
    },
  },
  plugins: [],
}


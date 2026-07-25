/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#09090b",
          900: "#111113",
          850: "#17171a",
          800: "#202025",
          700: "#303038",
          500: "#747480",
          300: "#b7b7c2",
          100: "#f4f4f5"
        },
        accent: {
          500: "#8b5cf6",
          400: "#a78bfa",
          300: "#c4b5fd"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(0, 0, 0, 0.22)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};

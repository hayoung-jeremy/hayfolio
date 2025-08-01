// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suit: ["var(--font-suit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

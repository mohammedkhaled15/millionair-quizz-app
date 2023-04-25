/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(2, 2, 48,0.8)), url('../src/assets/images/bg.jpg')",
      },
    },
  },
  plugins: [],
};

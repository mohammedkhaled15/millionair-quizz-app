/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(2, 2, 48,0.8)), url('../src/assets/images/bg.jpg')",
      },
      keyframes: {
        correct: {
          "0%,22%,42%": { background: "mediumblue" },
          "20%,40%,60%": {
            background: "linear-gradient(#0e0124,#22074d)",
          },
          "62%,100%": { background: "green" },
        },
        wrong: {
          "0%,22%,42%": { background: "mediumblue" },
          "20%,40%,60%": {
            background: "linear-gradient(#0e0124,#22074d)",
          },
          "62%,100%": { background: "crimson" },
        },
      },
      animation: {
        correct: "correct ease 3s forwards",
        wrong: "wrong ease 3s forwards",
      },
    },
  },
  plugins: [],
};

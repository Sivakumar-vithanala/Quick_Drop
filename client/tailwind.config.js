/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "one-orginal": "#FD752D",
        "one-dark": "#A84317",
        "one-light": "#FFC8A2",

        "two-orginal": "#00b050",
        "two-dark": "#00703C",
        "two-light": "#33D17A",
      },
    },
  },
  plugins: [],
};

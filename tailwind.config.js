/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      "2md": "860px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1700px",
      "4xl": "1920px",
    },
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#0088D0",
        secondary: "#93A8BB",
        light: "#ffffff",
        dark: "#001626",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

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
        sans: ["var(--font-geist-sans)", "sans-serif"],
        openSans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        canvas: "#F7F6F2",
        ink: "#111318",
        accent: "#155EEF",
        "accent-soft": "#DCE6F8",
        muted: "#646873",
        line: "#E5E5E0",
        card: "#FFFFFF",
        inverse: "#101216",
        primary: "#155EEF",
        secondary: "#646873",
        light: "#111318",
        dark: "#F7F6F2",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

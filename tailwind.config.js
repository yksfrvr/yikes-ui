/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundColor: {
        light: "#8298B0",
        primary: "#0c0c0c",
        secondary: "#101013ee",
        header: "#0c0c0c11",
        dark: "#09090b",
        light_dark: "#101013ee",
      },
      textColor: {
        gray: "#a1a1aa",
        white: "#fafafa",
      },
    },
  },
  plugins: [],
};

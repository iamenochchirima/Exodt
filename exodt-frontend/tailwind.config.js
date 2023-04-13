/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        roboto: ['roboto-regular',  'sans-serif'],
        robotoItalic: ['roboto-italic',  'sans-serif'],
        robotoBold: ['roboto-bold', 'sans-serif'],
        robotoLight: ['roboto-light', 'sans-serif'],
        robotoThin: ['roboto-thin', 'sans-serif'],
        robotoThinItalic: ['roboto-thin-italic', 'sans-serif'],
        graphikBold: ['graphik-bold', 'sans-serif'],
        graphik: ['graphik', 'sans-serif'],
      },
    },
    screens: {
      ts: "360px",
      xs: "375px",
      ss: "620px",
      sm: "770px",
      md: "900px",
      mid: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

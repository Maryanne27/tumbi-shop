/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "gray-custom": "#EDEDED",
        gray1: "#8C93A3",
        buttonblack: "#20232D",
        black1: "#0F1D40",
        greengray: "#DFE3E8",
        checkoutgray: "#8C93A3",
        bluebase: "#375DFB",
        bordergray: "#CDD0D5",
        lightblue: "#C2D6FF",
        darkblue: "#162664",
        checkoutblack: "#0F1D40",
      },
    },
  },
  plugins: [],
};

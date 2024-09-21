/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playball: ["Playball", "cursive"],
        quicksand: ["Quicksand", "sansSerif"],
      },
      keyframes: {
        fadeInScaleUp: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeInScaleUp: "fadeInScaleUp 0.3s ease-out",
      },
      colors: {
        text_header: "#cd9b32",
        text_category: "rgba(255,255,255, 0.68)",
        title_sale: "#dd433f",
      },
      spacing: {
        100: "400px",
      },
    },
  },
  plugins: [],
};

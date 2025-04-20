/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lighthouse: "#F3F4F4",
        lightwhite: "#F5F6F6",
        cornsilk: "#FEFAF0",
        gunmental: "#1c2628",
        swamp: "#34474B",
        "swamp-500": "#416858",
        "swamp-300": "#a7beb3",
        "swamp-100": "#EDF2EF",
        "distant-cloud": "#F7F8F8",
        mirage: "#001f3f",
        "medium-gray": "#333333",
        "medli-gray": "#666666",
        "light-gray": "#999999",
        "danger-red": "#800000",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      backgroundImage: {
        "hero-pattern": "url('../public/pngbg.png')",
      },
      keyframes: {
        down: {
          "0%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(15px)" },
          "40%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        down: "down 1.5s infinite",
        "fade-in-fast": "fade-in 1s ease-in-out forwards",
        "fade-in-slow": "fade-in 2.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

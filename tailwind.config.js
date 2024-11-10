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
        "swamp-light": "#416858",
        "distant-cloud": "#E5EAE6",
        mirage: "#001f3f",
        "medium-gray": "#333333",
        "light-gray": "#888888",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      backgroundImage: {
        "hero-pattern": "url('../public/pngbg.png')",
      },
    },
  },
  plugins: [],
};

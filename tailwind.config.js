module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        openMenu: {
          "0%": { left: "-100vw" },
          "100%": { left: "0" },
        },
      },
      animation: {
        openMenu: "openMenu 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};

module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "568px",
      lg: "768px",
      xl: "1024px",
    },
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        barlow: "'Barlow', sans-serif",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: { color: theme("colors.primary.title") },
          },
        },
      }),
      colors: {
        primary: {
          DEFAULT: "var(--first-color)",
          second: "var(--first-color-second)",
          lighter: "var(--first-color-lighter)",
          alt: "var(--first-color-alt)",
          title: "var(--title-color)",
          text: "var(--text-color)",
          textLight: "var(--text-color-light)",
          input: "var(--input-color)",
          body: "var(--body-color)",
          container: "var(--container-color)",
        },
      },
      spacing: {
        1.8: "0.438rem",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("tailwindcss-animate")],
};

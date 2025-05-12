/** @type {import('tailwindcss').Config} */
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

      keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideInFromLeft: {
            '0%': { transform: 'translateX(-100%)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
          slideInFromRight: {
            '0%': { transform: 'translateX(100%)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
        },
      animation: {
          fadeIn: 'fadeIn 1s ease-in-out',
          slideInFromLeft: 'slideInFromLeft 1s ease-in-out',
          slideInFromRight: 'slideInFromRight 1s ease-in-out',
        },
    
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("tailwindcss-animate")],
};

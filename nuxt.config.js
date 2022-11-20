import { join } from "path";
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  /* head: {
    title: "Bertyn Boulikou Portfolio",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/BB.png" }],
  }, */

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // content
  content: {
    // Options
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        "postcss-nested": {},
        "tailwindcss/nesting": {},
        tailwindcss: join(__dirname, "tailwind.config.js"),
        autoprefixer: {},
      },
    },
  },
});

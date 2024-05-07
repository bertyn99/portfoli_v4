import { join } from "path";
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
  ],
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

  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      "postcss-nested": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Barlow: [200, 400, 600, 800, 900],
    },
  },
  // content
  content: {
    // Options
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
});

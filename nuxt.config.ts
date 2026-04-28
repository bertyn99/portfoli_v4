import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  modules: [
    "@nuxtjs/seo",
    /*     "@nuxt/content", */
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    "@nuxt/icon",
    '@vueuse/nuxt',
    "@nuxt/image",
    "motion-v/nuxt",
  ],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2026-04-21",
  devtools: { enabled: false },

    vite: {
      optimizeDeps: {
        include: [
          '@emailjs/browser',
        ]
      }
    },
  
  /** @nuxtjs/seo / nuxt-site-config — set NUXT_SITE_URL in production for correct canonicals, OG URLs, and sitemap */
  site: {
    url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    name: "Bertyn Boulikou",
    description:
      "Portfolio de Bertyn Boulikou : développement web, compétences, réalisations et contact. Contenu en français pour recruteurs et clients.",
    defaultLocale: "fr",
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: { lang: "fr" },
      meta: [{ name: "format-detection", content: "telephone=no" }],
      link: [{ rel: "icon", type: "image/png", href: "/BB.png" }],
      templateParams: {
        separator: "·",
      },
      titleTemplate: "%s %separator Bertyn Boulikou",
    },
  },


  sitemap: {
    zeroRuntime: true,
  },
  ogImage: {
    zeroRuntime: true,
  },

  css: ["@/assets/css/main.css"],
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi', 'vscode-icons'] // <!--- this
    }
  },

  runtimeConfig: {
    public: {
      EMAILJS_SERVICE_ID: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_OWNER_ID: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_MYSELF,
      EMAILJS_TEMPLATE_REPLY_ID: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_VISITOR,
      EMAILJS_PUBLIC_KEY: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    },
  },

  /** Align @nuxt/image `sizes` keys with `assets/css/main.css` breakpoints */
  image: {
    screens: {
      xs: 320,
      sm: 375,
      md: 568,
      lg: 768,
      xl: 1024,
      "2xl": 1280,
      "3xl": 1536,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
});
<template>
  <main>
    <Home></Home>
    <About></About>
    <Skills></Skills>
    <Graduate></Graduate>
    <Services></Services>
    <AuditCTA></AuditCTA>
    <Portfolio></Portfolio>
    <DevisCTA></DevisCTA>
    <ProjectInMind></ProjectInMind>

    <Contactme></Contactme>
  </main>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const pageUrl = useAbsoluteSiteUrl("/")
const ogImageUrl = useAbsoluteSiteUrl("/img/bertyn.png")

const title = "Développeur web freelance — portfolio & réalisations"
const description =
  "Bertyn Boulikou, développeur web full stack (Nuxt, Vue). Portfolio, études de cas, devis et audit gratuit — recruteurs et clients en France."

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogLocale: "fr_FR",
  ogSiteName: site.name,
  ogUrl: pageUrl,
  ogImage: ogImageUrl,
  ogImageAlt: "Bertyn Boulikou — développeur web freelance",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImageUrl,
  robots: "index, follow, max-image-preview:large",
})

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  meta: [
    { name: "author", content: "Bertyn Boulikou" },
    {
      name: "keywords",
      content:
        "développeur web freelance, Nuxt, Vue.js, portfolio développeur, création site web, Bertyn Boulikou",
    },
  ],
})

useSchemaOrg([
  defineWebSite({
    name: site.name,
    description: site.description,
    url: site.url,
    inLanguage: "fr-FR",
  }),
  defineWebPage({
    "@type": "ProfilePage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "fr-FR",
  }),
  definePerson({
    name: "Bertyn Boulikou",
    url: site.url,
    jobTitle: "Développeur web full stack",
    description,
    image: ogImageUrl,
    sameAs: [
      "https://github.com/bertyn99",
      "https://www.linkedin.com/in/bertyn-boulikou/",
      "https://www.facebook.com/helenbertyn.boulikoudamours",
    ],
    knowsAbout: [
      "Développement web",
      "Nuxt",
      "Vue.js",
      "TypeScript",
      "Applications web",
    ],
  }),
])
</script>
<style scoped lang="postcss"></style>

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
const title = "Développeur web freelance — portfolio & réalisations"
const description =
  "Bertyn Boulikou, développeur web full stack (Nuxt, Vue). Portfolio, études de cas, devis et audit gratuit — recruteurs et clients en France."

const { pageUrl, site } = usePageSeo({
  path: "/",
  title,
  description,
})

const portraitUrl = useAbsoluteSiteUrl("/img/bertyn.png")

useSchemaOrg([
  defineWebSite({
    name: site.name,
    description: site.description,
    url: site.url,
    inLanguage: "fr-FR",
    potentialAction: [
      {
        "@type": "ContactAction",
        target: `${site.url}#contact`,
        name: "Contact",
      },
    ],
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
    image: portraitUrl,
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

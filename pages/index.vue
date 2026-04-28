<template>
  <main>
    <Home></Home>
    <About></About>
    <Skills></Skills>
    <Graduate></Graduate>
    <Services></Services>
    <Portfolio></Portfolio>
    <ProjectInMind></ProjectInMind>

    <Contactme></Contactme>
  </main>
</template>

<script setup lang="ts">
const site = useSiteConfig()

const title = "Portfolio & développement web"
const description =
  "Développeur web : compétences, études de cas et prise de contact. Site portfolio en français."

const pageUrl = computed(() => {
  try {
    return new URL("/", site.url).href
  } catch {
    return site.url
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogLocale: "fr_FR",
  ogSiteName: site.name,
  ogUrl: pageUrl,
  ogImage: "/img/bertyn.png",
  ogImageAlt: "Portrait de Bertyn Boulikou",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: "/img/bertyn.png",
})

useHead({
  meta: [{ name: "author", content: "Bertyn Boulikou" }],
})
</script>
<style scoped lang="postcss"></style>

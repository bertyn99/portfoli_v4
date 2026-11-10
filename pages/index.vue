<template>
  <main>
    <Home></Home>
    <About></About>
    <ExpertiseLocale></ExpertiseLocale>
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
import {
  homeLocalFaq,
  homePageDescription,
  homePageTitle,
} from "@/data/site-identity"

const { pageUrl, site } = usePageSeo({
  path: "/",
  title: homePageTitle,
  description: homePageDescription,
  ogTitle: homePageTitle,
  ogDescription: homePageDescription,
  ogBadge: "Développeur web freelance",
})

const siteBase = site.url.endsWith("/") ? site.url : `${site.url}/`
const identityId = `${siteBase}#identity`

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
    name: homePageTitle,
    description: homePageDescription,
    url: pageUrl,
    inLanguage: "fr-FR",
    mainEntity: { "@id": identityId },
  }),
  ...homeLocalFaq.map((item) =>
    defineQuestion({
      name: item.question,
      acceptedAnswer: item.answer,
    }),
  ),
])
</script>
<style scoped lang="postcss"></style>

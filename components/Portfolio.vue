<template>
  <section id="portfolio" class="portfolio py-16 sm:py-20 md:py-28">
    <UContainer>
      <header class="section-heading">
        <h2 class="section-title">Derniers projets</h2>
      </header>
    </UContainer>
    <UContainer class="relative">
      <UCarousel
        v-slot="{ item }"
        :items="projects"
        arrows
        dots
        loop
        :ui="{ item: 'basis-full min-w-0 shrink-0', viewport: 'overflow-hidden' }"
        :prev="{ color: 'primary', variant: 'outline' }"
        :next="{ color: 'primary', variant: 'outline' }"
      >
        <div
          class="portfolio-slide grid min-h-0 gap-7 py-8 px-12 sm:gap-8 sm:py-10 md:min-h-[min(24rem,68vh)] md:grid-cols-2 md:items-start md:gap-x-8 md:gap-y-8 md:px-6 md:py-12 lg:items-center xl:gap-x-10">
          <NuxtImg :src="`/img/${item.img}`" :alt="`Aperçu : ${item.name}`" width="960" height="540"
            class="aspect-video w-full max-w-full shrink-0 justify-self-center rounded-lg object-cover object-top max-h-[min(17.5rem,42svh)] sm:max-h-[min(24rem,56vh)] md:h-full md:max-h-none"
            sizes="sm:100vw md:45vw xl:576px" loading="lazy" />
          <div class="portfolio-data w-full max-w-[min(100%,65ch)] md:justify-self-start">
            <h3 class="mb-2 text-xl font-semibold tracking-tight sm:text-2xl">{{ item.name }}</h3>
            <p class="mb-4 text-[0.9375rem] leading-relaxed text-primary-text sm:text-base">
              {{ item.desc }}
            </p>
            <div class="mb-4 text-sm leading-relaxed text-primary-text">
              <strong>Stack :</strong>
              <ul class="mt-2 flex flex-wrap gap-x-3 gap-y-2.5" aria-label="Technologies utilisées">
                <li v-for="(tech, index) in item.stack" :key="`${item.link}-stack-${index}`"
                  class="group relative flex items-center">
                  <UTooltip :text="tech.name">
                    <Icon :name="tech.icon" class="size-6 shrink-0 text-primary-title" aria-hidden="true" />
                  </UTooltip>
                  <span class="sr-only">{{ tech.name }}</span>
                </li>
              </ul>
            </div>
            <p class="mb-2 text-sm font-semibold text-primary-text">Fonctionnalités :</p>
            <ul
              class="mb-6 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-primary-text marker:text-primary sm:mb-5 sm:pl-5">
              <li v-for="(feature, index) in item.features" :key="`${item.link}-feat-${index}`">{{ feature }}</li>
            </ul>
            <UButton
              :to="item.link"
              target="_blank"
              trailing-icon="i-mdi-arrow-right"
              :aria-label="`Ouvrir la démo ${item.name} dans un nouvel onglet`"
            >
              Démo
            </UButton>
          </div>
        </div>
      </UCarousel>
    </UContainer>
  </section>
</template>

<script setup>
const projects = ref([
  {
    name: 'Site vitrine Restaurant de PokeBowls',
    img: 'hawa.png',
    link: 'https://hawa-bowls-website.vercel.app/',
    desc: 'Site web adapté responsive avec des composants ui et des interactions animées.',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
      { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
    ],
    features: [
      'Design responsive avec Tailwind CSS',
      'Composants UI dynamiques',
      'Animations et transitions fluides',
    ],
  },
  {
    name: 'Click n Chill',
    link: 'https://wonderful-mcnulty-82fef7.netlify.app/',
    img: 'V2.png',
    desc: 'Extension chrome qui permet de synchroniser une série Netflix à plusieurs personnes.',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
      { name: 'Chrome Extensions', icon: '/icons/chrome.svg' },
    ],
    features: [
      'Synchronisation en temps réel entre utilisateurs',
      'Extension Chrome personnalisée',
      'Intégration transparente avec Netflix',
    ],
  },
  {
    name: 'Carrousel Star wars',
    link: 'https://reverent-jepsen-c6ce5c.netlify.app/',
    img: 'star_wars.png',
    desc: 'Projet d\'un client fiverr',
    stack: [
      { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
      { name: 'CSS', icon: '/icons/css.svg' },
    ],
    features: [
      'Carrousel interactif sur le thème Star Wars',
      'Animations personnalisées',
      'Personnalisation spécifique au client',
    ],
  },
  {
    name: 'Site Star wars',
    link: 'https://clever-golick-c20c5f.netlify.app/',
    img: 'website_star_wars.png',
    desc: 'Projet de cours sur l\'intégration d\'une API Star Wars',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
    ],
    features: [
      'Intégration avec l\'API Star Wars',
      'Chargement de contenu dynamique',
      'Design responsive',
    ],
  },
  {
    name: 'Sciredev',
    link: 'https://sciredev.com/',
    img: 'sciredev.png',
    desc: 'Blog sur le développement web et mobile. Où je partage tutoriels et news sur la tech. Dans le futur, je pense le transformer en une plateforme de formation.',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
    ],
    features: [
      'Gestion de contenu pour tutoriels et news',
      'Design moderne et responsive',
      'Prêt pour une transformation en plateforme de formation',
    ],
  },
  {
    name: 'FightingClubFinder',
    link: 'https://fightingclubfinder.com',
    img: 'fcf.png',
    desc: 'Site web pour trouver des clubs de combat en France. Avec une carte interactive et une liste de clubs.',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
    ],
    features: [
      'Carte interactive pour trouver des clubs de combat',
      'Liste de clubs avec des informations détaillées',
      'Scrapping de données pour mettre à jour la liste des clubs',
      'SEO optimisé pour une meilleure visibilité',
    ],
  },
  {
    name: 'Journal du cuistot',
    link: 'https://journalducuistot.fr/',
    img: 'journalducuistot.png',
    desc: 'Blog de cuisine où je partage mes recettes et mes astuces culinaires. Avec un CMS pour gerer la gestion du contenu',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'Strapi', icon: 'vscode-icons:file-type-strapi' },
      { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
    ],
    features: [
      'Partage et gestion de recettes',
      'Design responsive optimisé pour mobile et desktop',
      'Interface engageante et conviviale',
    ],
  },
  {
    name: 'Kosmonotes',
    link: 'https://kosmonotes.com/',
    img: 'kosmonotes.png',
    desc: 'Application pour booster les notes de vos élèves et leur aider dans leur révision.',
    stack: [
      { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'Cloudflare Worker', icon: 'i-devicon-cloudflareworkers' },
      { name: 'NuxtUi', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'OpenAI', icon: 'i-tabler-brand-openai' },
      { name: 'llama3', icon: 'i-simple-icons-ollama' },
    ],
    features: [
      'Accompagnement des élèves pour améliorer leurs résultats',
      'Outils de révision adaptés au parcours',
      'Nuxt, Workers et expérimentations autour de l\'IA',
    ],
  },
])
</script>

<style lang="postcss" scoped></style>

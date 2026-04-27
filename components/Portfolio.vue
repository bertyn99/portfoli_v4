<template>
  <section id="portfolio" class="portfolio @container bg-primary-container py-16 md:py-24">
    <h2 class="section-title">Portfolio</h2>
    <span class="section-subtitle">Derniers projets</span>
    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <carousel :slide-count="projects.length" v-slot="{ visibleSlide, direction }">
        <template v-for="(p, i) in projects" :key="p.link">
          <carousel-slide :index="i" :visible-index="visibleSlide" :direction="direction">
            <div
              class="portfolio-slide grid min-h-[min(28rem,75vh)] gap-6 px-6 py-10 md:grid-cols-2 md:gap-8 md:py-12 lg:items-center xl:gap-10"
            >
              <NuxtImg
                :src="`/img/${p.img}`"
                :alt="`Aperçu : ${p.name}`"
                width="960"
                height="540"
                class="h-full max-h-[min(22rem,50vh)] w-full justify-self-center rounded-lg object-cover object-top aspect-video md:max-h-none"
                sizes="sm:100vw md:45vw xl:576px"
                loading="lazy"
              />
              <div class="portfolio-data max-w-prose">
                <h3 class="mb-2 text-2xl font-semibold">{{ p.name }}</h3>
                <p class="mb-4 text-primary-text">
                  {{ p.desc }}
                </p>
                <div class="mb-4 text-sm text-primary-text">
                  <strong>Stack :</strong>
                  <ul class="mt-2 flex flex-wrap gap-x-3 gap-y-2" aria-label="Technologies utilisées">
                    <li v-for="(tech, index) in p.stack" :key="`${p.link}-stack-${index}`"
                      class="group relative flex items-center"
                    >
                      <Icon :name="tech.icon" class="size-6 shrink-0 text-primary-title" aria-hidden="true" />
                      <span class="sr-only">{{ tech.name }}</span>
                      <span
                        class="pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2 -translate-y-9 rounded bg-[var(--title-color)] px-2 py-1 text-xs text-[var(--body-color)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        {{ tech.name }}
                      </span>
                    </li>
                  </ul>
                </div>
                <p class="mb-2 text-sm font-semibold text-primary-text">Fonctionnalités :</p>
                <ul class="mb-5 list-disc space-y-1 pl-5 text-sm text-primary-text">
                  <li v-for="(feature, index) in p.features" :key="`${p.link}-feat-${index}`">{{ feature }}</li>
                </ul>
                <a
                  :href="p.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="button button-flex button-small group inline-flex items-center px-4 py-2 transition-transform duration-300 ease-out hover:-translate-y-px"
                  :aria-label="`Ouvrir la démo ${p.name} dans un nouvel onglet`"
                >
                  Démo
                  <svg xmlns="http://www.w3.org/2000/svg" class="button-icon ml-2 group-hover:translate-x-2"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </carousel-slide>
        </template>
      </carousel>
    </div>
  </section>
</template>

<script setup>
import Carousel from '@/components/Carousel/carousel.vue'
import CarouselSlide from '@/components/Carousel/carouselSlide.vue'

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

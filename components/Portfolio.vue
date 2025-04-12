<template>
  <section id="portfolio" class="portfolio section py-16">
    <h2 class="section-title text-3xl font-bold text-center mb-4">Portfolio</h2>
    <span class="section-subtitle text-xl text-center block mb-10">Derniers Projet</span>
    <div class="portfolio-container container mx-auto px-4 sm:px-6 lg:px-8">
      <carousel v-slot="{ visibleSlide, direction }">
        <template v-for="(p, i) in projects" :key="i">
          <carousel-slide :index="i" :visible-index="visibleSlide" :direction="direction">
            <div class="portfolio-content grid gap-6">
              <img :src="`/img/${p.img}`" :alt="p.name" class="portfolio-img" />
              <div class="portfolio-data">
                <h3 class="portfolio-title text-2xl font-semibold">{{ p.name }}</h3>
                <p class="portfolio-description text-gray-700">
                  {{ p.desc }}
                </p>
                <div class="portfolio-tech text-sm text-gray-600 mb-4">
                  <strong>Stack :</strong>
                  <ul class="flex space-x-2 mt-1">
                    <li v-for="(tech, index) in p.stack" :key="index"
                      class="relative flex items-center space-x-1 group">
                      <Icon :name="tech.icon" class="w-6 h-6" />
                      <span
                        class="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {{ tech.name }}
                      </span>
                    </li>
                  </ul>
                </div>
                <p class="portfolio-tech text-sm text-gray-600">
                  <strong>Fonctionnalité:</strong> {{ p.framework }}
                </p>
                <ul class="portfolio-features list-disc list-inside mb-3 text-sm text-gray-600">
                  <li v-for="(feature, index) in p.features" :key="index">{{ feature }}</li>
                </ul>
                <a :href="p.link"
                  class="button button-flex button-small portfolio-button inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg transition-transform duration-300 ease-in-out hover:bg-blue-700">
                  Demo
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 button-icon ml-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
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


const projects = ref([{
  name: 'Site vitrine Restaurant de PokeBowls',
  img: 'hawa.png',
  link: 'https://hawa-bowls-website.vercel.app/',
  desc: 'Site web adapté responsive avec des composants ui et des interactions animées.',
  stack: [
    { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
    { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
    { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
    { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' }
  ],
  features: [
    'Design responsive avec Tailwind CSS',
    'Composants UI dynamiques',
    'Animations et transitions fluides'
  ]
},
{
  name: 'Click n Chill',
  link: 'https://wonderful-mcnulty-82fef7.netlify.app/',
  img: 'V2.png',
  desc: 'Extension chrome qui permet de synchroniser une série Netflix à plusieurs personnes.',
  stack: [
    { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
    { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
    { name: 'Chrome Extensions', icon: '/icons/chrome.svg' }
  ],
  features: [
    'Synchronisation en temps réel entre utilisateurs',
    'Extension Chrome personnalisée',
    'Intégration transparente avec Netflix'
  ]
},
{
  name: 'Carrousel Star wars',
  link: 'https://reverent-jepsen-c6ce5c.netlify.app/',
  img: 'star_wars.png',
  desc: "Projet d'un client fiverr",
  stack: [
    { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
    { name: 'CSS', icon: '/icons/css.svg' }
  ],
  features: [
    'Carrousel interactif sur le thème Star Wars',
    'Animations personnalisées',
    'Personnalisation spécifique au client'
  ]
},
{
  name: 'Site Star wars',
  link: 'https://clever-golick-c20c5f.netlify.app/',
  img: 'website_star_wars.png',
  desc: "Projet de cours sur l'intégration d'une API Star Wars",
  stack: [
    { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
    { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
  ],
  features: [
    'Intégration avec l\'API Star Wars',
    'Chargement de contenu dynamique',
    'Design responsive'
  ]
},
{
  name: 'Sciredev',
  link: 'https://sciredev.com/',
  img: 'sciredev.png',
  desc: 'Blog sur le développement web et mobile. Où je partage tutoriels et news sur la tech. Dans le futur, je pense le transformer en une plateforme de formation.',
  stack: [
    { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
    { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
    { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' }
  ],
  features: [
    'Gestion de contenu pour tutoriels et news',
    'Design moderne et responsive',
    'Prêt pour une transformation en plateforme de formation'
  ]
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
    { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' }
  ],
  features: [
    'Partage et gestion de recettes',
    'Design responsive optimisé pour mobile et desktop',
    'Interface engageante et conviviale'
  ]
},  {
    name: 'Kosmonotes',
    link: 'https://kosmonotes.com/',
    img: 'kosmonotes.png',
    desc: 'Application pour booster les notes de vos élèves et leur aider dans leur révision.',
    stack: [
    { name: 'Vue.js', icon: 'vscode-icons:file-type-vue' },
    { name: 'Nuxt.js', icon: 'vscode-icons:file-type-nuxt' },
    { name: 'Cloudlflare Worker', icon: 'i-devicon-cloudflareworkers' },

    {name:"NuxtUi", icon:"vscode-icons:file-type-nuxt"},
    {name: "OpenAI",icon:"i-tabler-brand-openai"},
    {name:"llama3", icon:"i-simple-icons-ollama"},  
  ],
  },])
</script>

<style lang="postcss" scoped>
.portfolio {
  &-container {
    overflow: hidden;
    position: relative;
  }

  &-content {
    @apply py-12 px-6 md:grid-cols-2 grid-cols-1 md:gap-6 lg:items-center xl:gap-10;
  }

  &-img {
    @apply rounded-lg object-cover justify-self-center aspect-video h-full;
  }

  &-title {
    @apply text-lg mb-2;
  }

  &-description {
    @apply mb-3;
  }

  &-button:hover>.button-icon {
    @apply transform translate-x-2;
  }

  &-tech {
    @apply mb-3 text-sm;
  }

  &-features {
    @apply list-disc list-inside mb-3 text-sm;
  }
}
</style>

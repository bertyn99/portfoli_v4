<script setup>
const selectedIndex = ref(0)
const carousel = useTemplateRef("carousel")

const carouselUi = {
  root: "portfolio-carousel relative",
  viewport: "overflow-hidden",
  container: "portfolio-slides ms-0",
  item: "portfolio-item basis-full min-w-0 ps-0",
  controls: "relative mt-8 flex flex-wrap items-center justify-between gap-4",
  arrows: "relative order-2 flex items-center gap-2",
  prev: "static inset-auto start-auto top-auto translate-none rounded-[0.9rem]",
  next: "static inset-auto end-auto top-auto translate-none rounded-[0.9rem]",
  dots: "relative inset-auto -bottom-auto order-1 flex flex-wrap items-center justify-start gap-1.5",
  dot: "size-auto h-1 w-5 rounded-full bg-primary/30 hover:bg-primary/50 data-[state=active]:w-8 data-[state=active]:bg-primary",
}

const arrowButton = {
  color: "primary",
  variant: "subtle",
  size: "lg",
}

const projects = ref([
  {
    title: "Site vitrine Restaurant de PokeBowls",
    description:
      "Site vitrine responsive, avec des composants UI et des interactions animées.",
    img: "/img/hawa.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
    ],
    demo: "https://hawaibowls.bertynboulikou.com/",
    features: [
      "Design responsive avec Tailwind CSS",
      "Composants UI dynamiques",
      "Animations et transitions fluides",
    ],
  },
  {
    title: "Click n Chill",
    description:
      "Application web pour gérer vos films et séries, et vous aider à choisir votre prochain visionnage.",
    img: "/img/V2.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
      { name: "Node", icon: "vscode-icons:file-type-node" },
      { name: "MongoDB", icon: "vscode-icons:file-type-mongo" },
    ],
    demo: "https://click-n-chill.bertynboulikou.com/",
    features: [
      "Authentification utilisateur",
      "Gestion de films et séries",
      "Recommandations personnalisées",
    ],
  },
  {
    title: "Star Wars Api",
    description: "Site vitrine utilisant l'API Star Wars.",
    img: "/img/star_wars.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
    ],
    demo: "https://swapi.bertynboulikou.com/",
    github: "https://github.com/Bertyn/swapi",
    features: ["Utilisation de l'API Star Wars", "Design responsive"],
  },
  {
    title: "Sciredev",
    description:
      "Site vitrine de l'agence web Sciredev, présentant leurs services et réalisations.",
    img: "/img/sciredev.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
      { name: "Strapi", icon: "logos:strapi-icon" },
    ],
    demo: "https://sciredev.com/",
    features: [
      "Design responsive",
      "Présentation des services",
      "Galerie de réalisations",
    ],
  },
  {
    title: "FightingClubFinder",
    description:
      "Application web pour trouver des clubs de combat près de chez vous.",
    img: "/img/fcf.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
      { name: "Node", icon: "vscode-icons:file-type-node" },
      { name: "MongoDB", icon: "vscode-icons:file-type-mongo" },
    ],
    demo: "https://fightingclubfinder.bertynboulikou.com/",
    features: [
      "Recherche de clubs de combat",
      "Géolocalisation",
      "Profils de clubs détaillés",
    ],
  },
  {
    title: "Journal du cuistot",
    description: "Site de recettes de cuisine avec un CMS headless.",
    img: "/img/journalducuistot.png",
    stack: [
      { name: "Vue", icon: "vscode-icons:file-type-vue" },
      { name: "Nuxt", icon: "vscode-icons:file-type-nuxt" },
      { name: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
      { name: "Strapi", icon: "logos:strapi-icon" },
    ],
    demo: "https://journalducuistot.bertynboulikou.com/",
    features: [
      "Recettes de cuisine",
      "CMS headless avec Strapi",
      "Design responsive",
    ],
  },
  {
    title: "Kosmonotes",
    description: "Application de prise de notes en ligne.",
    img: "/img/kosmonotes.png",
    stack: [
      { name: "HTML", icon: "vscode-icons:file-type-html" },
      { name: "CSS", icon: "vscode-icons:file-type-css" },
      { name: "Javascript", icon: "vscode-icons:file-type-js-official" },
      { name: "Chrome", icon: "mdi:google-chrome" },
    ],
    demo: "https://kosmonotes.bertynboulikou.com/",
    features: ["Prise de notes", "Stockage local", "Design épuré"],
  },
])

const projectCount = computed(() =>
  String(projects.value.length).padStart(2, "0"),
)

const projectCursor = computed(() =>
  String(selectedIndex.value + 1).padStart(2, "0"),
)

function onSelect(index) {
  selectedIndex.value = index
}

onMounted(() => {
  carousel.value?.emblaApi?.scrollTo(0, true)
  selectedIndex.value = 0
})
</script>

<template>
  <section
    id="projet"
    class="portfolio overflow-x-clip pt-16 pb-28 text-primary-text md:pt-24 md:pb-36"
  >
    <div class="container">
      <div class="portfolio-board">
        <h2 class="portfolio-display">
          <span class="portfolio-display-kicker">Derniers</span>
          <span>projets</span>
        </h2>

        <p class="portfolio-index" aria-live="polite">
          <span class="sr-only">Projet </span>{{ projectCursor }}
          <span class="portfolio-index-sep">/</span>
          {{ projectCount }}
        </p>

        <UCarousel
          ref="carousel"
          v-slot="{ item }"
          :items="projects"
          arrows
          dots
          loop
          :duration="0"
          :start-index="0"
          prev-icon="i-mdi-chevron-left"
          next-icon="i-mdi-chevron-right"
          :prev="arrowButton"
          :next="arrowButton"
          :ui="carouselUi"
          class="portfolio-track"
          aria-label="Projets réalisés"
          @select="onSelect"
        >
          <article
            class="portfolio-slide"
            :class="{ 'is-active': item === projects[selectedIndex] }"
          >
            <figure class="portfolio-figure">
              <img
                class="portfolio-shot"
                :src="item.img"
                :alt="`Capture du projet ${item.title}`"
                loading="lazy"
                decoding="async"
              >
            </figure>

            <div class="portfolio-sheet">
              <h3 class="portfolio-title">
                {{ item.title }}
              </h3>
              <p class="portfolio-desc">
                {{ item.description }}
              </p>

              <ul class="portfolio-stack" aria-label="Stack technique">
                <li v-for="tech in item.stack" :key="tech.name">
                  <UTooltip :text="tech.name">
                    <span class="portfolio-stack-chip">
                      <Icon :name="tech.icon" class="size-6" />
                      <span class="sr-only">{{ tech.name }}</span>
                    </span>
                  </UTooltip>
                </li>
              </ul>

              <ul class="portfolio-features">
                <li v-for="feature in item.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>

              <UButton
                :to="item.demo"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                size="lg"
                trailing-icon="i-mdi-arrow-right"
              >
                Go See
              </UButton>
            </div>
          </article>
        </UCarousel>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.portfolio-board {
  display: grid;
  gap: 1rem 0;
}

.portfolio-display {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.1rem, 1.3rem + 8vw, 6.4rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: -0.07em;
  color: var(--title-color);
  text-wrap: balance;
}

.portfolio-display span {
  display: block;
}

.portfolio-display-kicker {
  color: var(--first-color);
}

.portfolio-index {
  margin: 0.35rem 0 0;
  font-family: var(--font-family-display);
  font-size: clamp(1.55rem, 1rem + 2vw, 2.35rem);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--first-color);
  opacity: 0.55;
}

.portfolio-index-sep {
  margin-inline: 0.2em;
  font-weight: 600;
  opacity: 0.7;
}

.portfolio-track {
  min-width: 0;
}

.portfolio-slides {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr);
  transform: none !important;
}

.portfolio-item {
  grid-area: 1 / 1;
  transform: none !important;
  visibility: hidden;
  pointer-events: none;
}

.portfolio-item:has(.is-active) {
  visibility: visible;
  pointer-events: auto;
  z-index: 1;
}

.portfolio-slide {
  display: grid;
  gap: 1.25rem;
  padding-block: 0.5rem 0.25rem;
}

.portfolio-figure {
  position: relative;
  z-index: 1;
  width: min(100%, 38rem);
  margin: 0 auto;
  min-width: 0;
}

.portfolio-slide.is-active .portfolio-figure {
  animation: portfolio-enter-left 250ms var(--ease-out) both;
}

.portfolio-shot {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  border-radius: 1.15rem;
}

.portfolio-sheet {
  position: relative;
  z-index: 5;
  display: grid;
  gap: 0.85rem;
  justify-items: start;
  padding: 0;
}

.portfolio-slide.is-active .portfolio-sheet {
  animation: portfolio-enter-right 250ms var(--ease-out) 50ms both;
}

@keyframes portfolio-enter-left {
  from {
    opacity: 0;
    transform: translateX(-8%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes portfolio-enter-right {
  from {
    opacity: 0;
    transform: translateX(8%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes portfolio-enter-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-slide.is-active .portfolio-figure,
  .portfolio-slide.is-active .portfolio-sheet {
    animation: portfolio-enter-fade 200ms var(--ease-out) both;
  }
}

.portfolio-title {
  margin: 0;
  max-width: 22ch;
  font-size: clamp(1.35rem, 1.1rem + 1.1vw, 1.85rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--title-color);
  text-wrap: balance;
}

.portfolio-desc {
  margin: 0;
  max-width: 42ch;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--text-color);
  text-wrap: pretty;
}

.portfolio-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.portfolio-stack-chip {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 0.7rem;
  background: color-mix(in srgb, var(--first-color) 10%, transparent);
}

.portfolio-features {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.4;
}

.portfolio-features li {
  position: relative;
  padding-inline-start: 0.9rem;
}

.portfolio-features li::before {
  content: "";
  position: absolute;
  top: 0.55em;
  left: 0;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.12rem;
  background: var(--first-color);
}

@media (min-width: 768px) {
  .portfolio-board {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1rem;
    align-items: end;
  }

  .portfolio-display {
    grid-column: 1 / 9;
  }

  .portfolio-index {
    grid-column: 9 / 13;
    margin: 0 0 0.35rem;
    text-align: right;
  }

  .portfolio-track {
    grid-column: 1 / -1;
    margin-top: 0.75rem;
  }

  .portfolio-slide {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: center;
    gap: 0 1.25rem;
  }

  .portfolio-figure {
    grid-column: 1 / 8;
    grid-row: 1;
    width: 100%;
    margin-inline: 0;
  }

  .portfolio-sheet {
    grid-column: 8 / 13;
    grid-row: 1;
    padding: 0;
  }
}
</style>

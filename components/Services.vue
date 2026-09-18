<script setup>
const blobClipId = "services-blob-clip"

/** Portrait rectangle-blob: flatter top/bottom than About, bite on the right. */
const blobPath =
  "M48 16C24 16 14 36 16 80C18 124 12 168 28 204C44 232 90 236 140 228C178 222 186 196 172 164C158 132 192 108 186 72C180 36 140 14 96 14C70 14 56 16 48 16Z"

/** `blobPath` mapped into 0–1 for CSS `clip-path` (viewBox 200×240). */
const blobClipPath =
  "M0.24 0.067C0.12 0.067 0.07 0.15 0.08 0.333C0.09 0.517 0.06 0.7 0.14 0.85C0.22 0.967 0.45 0.983 0.7 0.95C0.89 0.925 0.93 0.817 0.86 0.683C0.79 0.55 0.96 0.45 0.93 0.3C0.9 0.15 0.7 0.058 0.48 0.058C0.35 0.058 0.28 0.067 0.24 0.067Z"

const services = [
  {
    id: "web",
    index: "01",
    name: "Développement web",
    description:
      "Sites vitrines, landings et parcours marketing soignés (Vue, Nuxt), intégration au pixel près, performances et bonnes pratiques d’accessibilité.",
    tags: ["Vue", "Nuxt", "Accessibilité"],
  },
  {
    id: "fullstack",
    index: "02",
    name: "Applications fullstack",
    description:
      "Conception et livraison d’applications web complètes : interfaces, API, persistance et déploiement, avec une stack moderne centrée sur Vue et Nuxt.",
    tags: ["API", "Vue", "Nuxt"],
  },
  {
    id: "cms",
    index: "03",
    name: "CMS et contenu",
    description:
      "Mise en place et prise en main de CMS headless (Strapi, Directus, Nuxt Studio) pour que vos équipes publient en autonomie sans sacrifier la qualité du front.",
    tags: ["Strapi", "Directus", "Nuxt Studio"],
  },
]

const activeId = ref("web")

const activeService = computed(() =>
  services.find(service => service.id === activeId.value) ?? services[0],
)

const filterStatus = computed(
  () => `${activeService.value.name} au premier plan.`,
)

function selectService(id) {
  activeId.value = id
}
</script>

<template>
  <section id="services" class="services overflow-x-clip pt-16 pb-28 text-primary-text md:pt-24 md:pb-36">
    <div class="container">
      <div class="services-board">
        <header class="services-heading">
          <h2 id="services-heading" class="services-display">
            <span class="services-display-kicker">Mes</span>
            <span>services</span>
          </h2>
        </header>

        <figure class="services-figure">
          <div
            class="pointer-events-none absolute inset-[16%] -z-10 rounded-full bg-primary/25 blur-2xl dark:bg-primary/30"
            aria-hidden="true"
          />
          <div class="services-blob-stage motion-safe:animate-blob-float">
            <svg
              class="services-blob-svg fill-current text-primary"
              viewBox="0 0 200 240"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                class="services-blob-echo"
                :d="blobPath"
                transform="translate(8 10)"
              />
              <path :d="blobPath" />
              <clipPath :id="blobClipId" clipPathUnits="objectBoundingBox">
                <path :d="blobClipPath" />
              </clipPath>
            </svg>
            <img
              class="services-blob-photo"
              src="/img/laptop.jpg"
              alt="Espace de travail avec ordinateur portable, illustrant le développement web."
              width="2400"
              height="3000"
              decoding="async"
            >
          </div>
        </figure>

        <p class="sr-only" aria-live="polite">{{ filterStatus }}</p>

        <div class="services-menu">
          <p class="services-lede">
            Cliquez une offre pour la poser au premier plan.
          </p>

          <div
            class="services-offers"
            role="radiogroup"
            aria-labelledby="services-heading"
          >
            <article
              v-for="service in services"
              :key="service.id"
              class="services-item"
              :class="{ 'is-active': activeId === service.id }"
            >
              <button
                type="button"
                class="services-hit"
                role="radio"
                :aria-checked="activeId === service.id"
                @click="selectService(service.id)"
              >
                <span class="services-index">{{ service.index }}</span>
                <span class="services-name">{{ service.name }}</span>
                <Icon
                  name="i-mdi-arrow-right"
                  class="services-hint"
                  aria-hidden="true"
                />
              </button>

              <div v-if="activeId === service.id" class="services-sheet">
                <p>{{ service.description }}</p>
                <ul class="services-tags" role="list">
                  <li v-for="tag in service.tags" :key="tag">
                    <UBadge
                      :label="tag"
                      color="primary"
                      variant="subtle"
                      size="sm"
                    />
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <div class="services-follow">
            <UButton
              to="#contact"
              variant="ghost"
              trailing-icon="i-mdi-arrow-right"
              class="w-fit transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-px motion-safe:active:scale-[0.98]"
            >
              Discutons de votre projet
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.services-board {
  display: grid;
  gap: 1rem 0;
}

.services-display {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.1rem, 1.3rem + 8vw, 6.4rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: -0.07em;
  color: var(--title-color);
  text-wrap: balance;
}

.services-display span {
  display: block;
}

.services-display-kicker {
  color: var(--first-color);
}

.services-lede {
  margin: 0 0 0.35rem;
  max-width: 32ch;
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--text-color);
  text-wrap: pretty;
}

.services-figure {
  position: relative;
  z-index: 1;
  width: min(100%, 20.5rem);
  margin-inline: auto;
}

.services-blob-stage {
  position: relative;
  aspect-ratio: 200 / 240;
  animation-duration: 8.5s;
  animation-delay: -3.4s;
}

.services-blob-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.services-blob-echo {
  fill: var(--first-color);
  opacity: 0.22;
}

.dark .services-blob-echo {
  opacity: 0.28;
}

.services-blob-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 28% 42%;
  clip-path: url("#services-blob-clip");
}

.services-menu {
  position: relative;
  z-index: 5;
  display: grid;
  gap: 0.45rem;
  margin: -2.75rem 0.2rem 0;
}

.services-offers {
  display: grid;
  gap: 1.15rem;
}

.services-item {
  width: min(100%, 28rem);
  padding: 0.75rem 1rem 0.8rem;
  border-radius: 1rem;
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.28s ease,
    box-shadow 0.28s ease,
    opacity 0.28s ease;
}

.services-item:nth-child(1) {
  justify-self: start;
}

.services-item:nth-child(2) {
  justify-self: end;
}

.services-item:nth-child(3) {
  justify-self: center;
}

.services-item:not(.is-active) {
  opacity: 0.78;
}

.services-item:not(.is-active) .services-hit {
  cursor: pointer;
}

.services-item:not(.is-active):hover,
.services-item:not(.is-active):focus-within {
  opacity: 1;
  background: hsla(250, 45%, 55%, 0.1);
  box-shadow: inset 0 0 0 1px hsla(250, 40%, 50%, 0.2);
  transform: translateY(-0.2rem);
}

.services-item:not(.is-active):hover .services-name,
.services-item:not(.is-active):focus-within .services-name {
  color: var(--first-color);
}

.services-item:not(.is-active):hover .services-hint,
.services-item:not(.is-active):focus-within .services-hint {
  opacity: 1;
  transform: translateX(0);
}

.services-item:not(.is-active) .services-hit:active {
  transform: translateY(1px) scale(0.99);
}

.services-item.is-active {
  z-index: 2;
  background: var(--container-color);
  box-shadow:
    0 16px 32px -18px hsla(250, 40%, 16%, 0.5),
    inset 0 0 0 1px hsla(250, 40%, 50%, 0.16);
  transform: translateY(-0.3rem);
}

.services-hit {
  display: flex;
  width: 100%;
  align-items: baseline;
  gap: 0.75rem;
  margin: 0;
  padding: 0.15rem 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: inherit;
  transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.services-item:not(.is-active) .services-hint {
  margin-left: auto;
  width: 1.1rem;
  height: 1.1rem;
  color: var(--first-color);
  opacity: 0;
  transform: translateX(-0.35rem);
  transition:
    opacity 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.services-item.is-active .services-hint {
  display: none;
}

.services-hit:focus-visible {
  outline: 2px solid var(--first-color);
  outline-offset: 4px;
  border-radius: 0.4rem;
}

.services-index {
  flex: none;
  font-family: var(--font-family-display);
  font-size: 0.85rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--first-color);
}

.services-name {
  font-family: var(--font-family-display);
  font-size: 1.12rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--title-color);
  text-wrap: balance;
  transition: color 0.2s ease;
}

.services-sheet {
  padding: 0.65rem 0 0.1rem 1.85rem;
}

.services-sheet p {
  margin: 0;
  max-width: 42ch;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--text-color);
  text-wrap: pretty;
}

.services-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.7rem 0 0;
  padding: 0;
  list-style: none;
}

.services-follow {
  margin-top: 0.2rem;
  justify-self: start;
}

@media (min-width: 768px) {
  .services-board {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: auto 1fr;
    column-gap: 0.6rem;
    row-gap: 0;
    align-items: start;
  }

  .services-heading {
    grid-column: 1 / 8;
    grid-row: 1;
    z-index: 3;
  }

  .services-figure {
    grid-column: 1 / 8;
    grid-row: 1 / 3;
    z-index: 1;
    width: min(100%, 24rem);
    justify-self: start;
    margin: 4.25rem 0 0;
  }

  .services-menu {
    grid-column: 6 / 13;
    grid-row: 1 / 3;
    align-self: start;
    margin: 0.35rem 0 0;
    padding-top: 0.15rem;
    gap: 0.85rem;
  }

  .services-offers {
    gap: 1.45rem;
  }

  .services-lede {
    justify-self: stretch;
    margin: 0 0 0.55rem 18%;
    text-align: right;
  }

  .services-item {
    width: auto;
    max-width: none;
    justify-self: stretch;
  }

  .services-item:nth-child(1) {
    margin-right: 1.1rem;
  }

  .services-item:nth-child(2) {
    margin-left: 1.35rem;
  }

  .services-item:nth-child(3) {
    margin-right: 2rem;
  }

  .services-item.is-active {
    transform: translate(-1.35rem, -0.35rem);
  }

  .services-name {
    font-size: 1.22rem;
  }

  .services-follow {
    justify-self: end;
    margin: 0.15rem 2rem 0 0;
  }
}

@media (min-width: 1024px) {
  .services-figure {
    margin-top: 3.75rem;
  }

  .services-menu {
    margin-top: 0.15rem;
  }

  .services-item.is-active {
    transform: translate(-1.65rem, -0.4rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-blob-stage {
    animation: none;
  }

  .services-item,
  .services-item.is-active,
  .services-item:not(.is-active):hover,
  .services-item:not(.is-active):focus-within,
  .services-item:not(.is-active) .services-hit:active,
  .services-item:not(.is-active) .services-hint {
    transform: none;
    transition: none;
  }
}

.dark .services-item.is-active {
  box-shadow:
    0 18px 36px -20px hsla(250, 40%, 4%, 0.65),
    inset 0 0 0 1px hsla(250, 20%, 100%, 0.08);
}

.dark .services-item:not(.is-active):hover,
.dark .services-item:not(.is-active):focus-within {
  background: hsla(250, 40%, 70%, 0.1);
  box-shadow: inset 0 0 0 1px hsla(250, 20%, 100%, 0.12);
}
</style>

<script setup lang="ts">
const facts = [
  { label: "Localisation", value: "Nantes" },
  { label: "Expérience", value: "4+ années" },
  { label: "Projets", value: "10+ livrés" },
] as const

const blobClipId = "about-blob-clip"

/** Same technique as the hero blob, different form: three lobes, pinch on the right. */
const blobPath =
  "M100 10C132 8 170 32 180 70C190 108 164 124 168 158C172 192 132 212 96 200C60 188 28 168 18 128C8 88 22 62 44 40C66 18 68 12 100 10Z"

/** `blobPath` mapped into 0–1 for CSS `clip-path` (viewBox 200×220). */
const blobClipPath =
  "M0.5 0.045C0.66 0.036 0.85 0.145 0.9 0.318C0.95 0.491 0.82 0.564 0.84 0.718C0.86 0.873 0.66 0.964 0.48 0.909C0.3 0.855 0.14 0.764 0.09 0.582C0.04 0.4 0.11 0.282 0.22 0.182C0.33 0.082 0.34 0.055 0.5 0.045Z"
</script>

<template>
  <section id="about" class="about overflow-x-clip pt-16 pb-28 text-primary-text md:pt-24 md:pb-36">
    <div class="container">
      <div class="about-board">
        <h2 class="about-display">
          <span class="about-display-kicker">A</span>
          <span>propos</span>
        </h2>

        <figure class="about-figure">
          <div
            class="pointer-events-none absolute inset-[18%] -z-10 rounded-full bg-primary/25 blur-2xl dark:bg-primary/30"
            aria-hidden="true"
          />
          <div class="about-blob-stage motion-safe:animate-blob-float">
            <svg
              class="about-blob-svg fill-current text-primary"
              viewBox="0 0 200 220"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                class="about-blob-echo"
                :d="blobPath"
                transform="translate(10 12)"
              />
              <path :d="blobPath" />
              <clipPath :id="blobClipId" clipPathUnits="objectBoundingBox">
                <path :d="blobClipPath" />
              </clipPath>
            </svg>
            <img
              class="about-blob-photo"
              src="/img/pose1.jpg"
              alt="Bertyn Boulikou, à Nantes"
              width="590"
              height="613"
              decoding="async"
            >
          </div>
        </figure>

        <dl class="about-spine">
          <div v-for="fact in facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>

        <blockquote class="about-card">
          <p>
            Au fil des années, j'ai exploré et maîtrisé différentes technologies qui ont évolué rapidement, parfois de
            manière imprévisible, mais toujours avec la même mission : apporter des solutions efficaces et innovantes.
            Je suis passionné par la conception et le développement d'applications robustes, optimisées et centrées sur
            l'expérience utilisateur.
          </p>
        </blockquote>

        <div class="about-follow">
          <p>
            Que ce soit pour des projets front-end dynamiques avec Nuxt.js ou pour des back-ends puissants, mon objectif
            est de transformer des idées en produits fonctionnels et intuitifs.
          </p>
          <UButton
            href="/CV_Bertyn_Boulikou.pdf"
            download="CV_Bertyn_Boulikou.pdf"
            :external="true"
            trailing-icon="i-mdi-download"
            size="lg"
            class="mt-6 w-fit transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-px motion-safe:active:scale-[0.98]"
          >
            Télécharger mon CV
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.about-board {
  display: grid;
  gap: 1.25rem 0;
}

.about-display {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.4rem, 1.4rem + 10vw, 7.25rem);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.07em;
  color: var(--title-color);
  text-wrap: balance;
}

.about-display span {
  display: block;
}

.about-display-kicker {
  color: var(--first-color);
}

.about-figure {
  position: relative;
  z-index: 1;
  width: min(100%, 26rem);
  margin-inline: auto;
}

.about-blob-stage {
  position: relative;
  aspect-ratio: 200 / 220;
  animation-duration: 9s;
  animation-delay: -2.2s;
}

.about-blob-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.about-blob-echo {
  fill: var(--first-color);
  opacity: 0.22;
}

.dark .about-blob-echo {
  opacity: 0.28;
}

.about-blob-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center top;
  clip-path: url("#about-blob-clip");
}

.about-spine {
  position: relative;
  z-index: 5;
  display: grid;
  width: max-content;
  max-width: 100%;
  gap: 0.95rem;
  justify-self: end;
  margin: -2.75rem 0.35rem 0 0;
  padding: 0.95rem 1.15rem 1.05rem;
  border-radius: 1rem;
  background: var(--container-color);
  box-shadow:
    0 16px 32px -18px hsl(250 40% 16% / 0.5),
    inset 0 0 0 1px hsl(var(--hue-color) 40% 50% / 0.16);
}

.about-spine dt {
  font-size: 0.7rem;
  line-height: 1.3;
  color: var(--text-color);
}

.about-spine dd {
  margin: 0.1rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--title-color);
}

.about-card {
  position: relative;
  z-index: 2;
  margin: 0.25rem 0.75rem 0;
  max-width: 38rem;
  padding: 1.15rem 1.25rem 1.25rem;
  border-radius: 1rem;
  background: var(--container-color);
  box-shadow:
    0 18px 36px -20px hsl(250 40% 20% / 0.45),
    inset 0 0 0 1px hsl(var(--hue-color) 40% 50% / 0.14);
}

.about-card p {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--title-color);
  text-wrap: pretty;
}

.about-follow {
  max-width: 38rem;
}

.about-follow p {
  margin: 0;
  max-width: 42ch;
  line-height: 1.65;
  text-wrap: pretty;
}

@media (min-width: 768px) {
  .about-board {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: auto auto auto;
    column-gap: 0.8rem;
    row-gap: 0.35rem;
    align-items: start;
  }

  .about-display {
    grid-column: 1 / 7;
    grid-row: 1;
    z-index: 3;
  }

  .about-figure {
    grid-column: 5 / 12;
    grid-row: 1 / 4;
    z-index: 1;
    width: 100%;
    margin: 2.75rem 0 0;
  }

  .about-spine {
    grid-column: 10 / 13;
    grid-row: 2 / 4;
    align-self: center;
    justify-self: start;
    margin: 0 0 1.5rem -0.75rem;
  }

  .about-card {
    grid-column: 1 / 7;
    grid-row: 2;
    z-index: 4;
    max-width: none;
    margin: -0.35rem 0.5rem 0 0;
  }

  .about-follow {
    grid-column: 1 / 6;
    grid-row: 3;
    z-index: 3;
    max-width: none;
    padding: 1.1rem 1.5rem 0 0;
  }
}

@media (min-width: 1024px) {
  .about-figure {
    grid-column: 5 / 12;
    margin-top: 1.75rem;
  }

  .about-spine {
    grid-column: 10 / 13;
    margin: 0 0 2.5rem -1.25rem;
  }

  .about-card {
    grid-column: 1 / 7;
    padding: 1.35rem 1.4rem 1.45rem;
  }

  .about-follow {
    padding-top: 1.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-blob-stage {
    animation: none;
  }
}

@media (min-width: 768px) {
  .dark .about-spine,
  .dark .about-card {
    box-shadow:
      0 18px 36px -20px hsl(250 40% 4% / 0.65),
      inset 0 0 0 1px hsl(250 20% 100% / 0.08);
  }
}
</style>

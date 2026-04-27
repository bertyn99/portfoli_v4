<script setup>
import { useReducedMotion } from "motion-v";

const prefersReducedMotion = useReducedMotion();
</script>

<template>
  <section id="graduate" class="@container graduate graduate-section shell-section">
    <div class="graduate-heading mx-auto mb-3 max-w-7xl px-4 text-center sm:mb-4 sm:px-6 lg:px-8">
      <h2 class="section-title mb-1">Diplômes et certifications</h2>
      <span class="section-subtitle graduate-subtitle">Mon parcours professionnel</span>
    </div>

    <div class="container mx-auto mb-3 max-w-7xl px-4 sm:mb-3 sm:px-6 lg:px-8">
      <div class="flex justify-center" role="tablist" aria-label="Filtrer le parcours">
        <div
          class="inline-flex flex-wrap justify-center gap-0.5 rounded-2xl border border-primary-input/90 bg-primary-container/70 p-1 shadow-sm backdrop-blur-sm dark:border-primary-input/50 dark:bg-primary-container/40"
        >
          <Motion
            v-for="opt in filterOptions"
            :key="opt.value"
            as="button"
            type="button"
            role="tab"
            :aria-selected="activeFilter === opt.value"
            class="graduate-filter-chip relative cursor-pointer rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors duration-200 sm:px-4 sm:py-2.5"
            :class="[
              activeFilter === opt.value
                ? 'graduate-filter-chip--active text-white shadow-md'
                : 'text-primary-text hover:text-primary',
            ]"
            :while-hover="prefersReducedMotion ? {} : { scale: 1.02 }"
            :while-press="prefersReducedMotion ? {} : { scale: 0.98 }"
            :transition="{ type: 'spring', stiffness: 450, damping: 26 }"
            @click="activeFilter = opt.value"
          >
            {{ opt.label }}
          </Motion>
        </div>
      </div>
    </div>

    <!-- Mobile: vertical list in container. lg+: full-viewport-width horizontal strip -->
    <div
      class="lg:relative lg:left-1/2 lg:w-screen lg:max-w-dvw lg:-translate-x-1/2"
    >
      <div
        class="graduate-scroll mx-auto max-w-7xl overflow-x-visible overflow-y-visible px-4 pb-2 pt-0 [scrollbar-width:thin] sm:px-6 sm:pb-3 lg:max-w-none lg:overflow-x-auto lg:px-8 lg:pb-4 lg:pt-1 xl:px-12"
      >
        <ul
          class="graduate-timeline-list m-0 mx-auto flex w-full max-w-2xl list-none flex-col gap-6 p-0 lg:mx-0 lg:max-w-none lg:flex-row lg:gap-6 xl:gap-8"
          role="list"
          aria-live="polite"
        >
          <li
            v-for="(item, index) in filteredTimeline"
            :key="`${activeFilter}-${item.id}`"
            class="graduate-timeline-item flex w-full flex-row items-stretch gap-4 lg:w-90 lg:max-w-none lg:shrink-0 lg:flex-col lg:gap-2 lg:snap-start xl:w-96"
          >
            <!-- Mobile: vertical spine -->
            <div
              class="flex w-6 shrink-0 flex-col items-center lg:hidden"
              aria-hidden="true"
            >
              <div
                class="w-px flex-1 min-h-2 rounded-full bg-transparent"
                :class="index === 0 ? '' : 'graduate-line-v'"
              />
              <span
                class="graduate-node my-1.5 block size-3 shrink-0 rounded-full ring-4 ring-primary-body"
                :class="item.kind === 'education' ? 'bg-primary' : 'bg-primary-alt'"
              />
              <div
                class="w-px flex-1 min-h-2 rounded-full bg-transparent"
                :class="index === filteredTimeline.length - 1 ? '' : 'graduate-line-v'"
              />
            </div>

            <!-- Desktop: horizontal spine above card -->
            <div class="mb-2 hidden h-8 w-full items-center sm:mb-2.5 sm:h-9 lg:flex">
              <div
                class="h-[3px] min-w-3 flex-1 rounded-full transition-opacity"
                :class="index === 0 ? 'opacity-0' : 'graduate-line-h'"
                aria-hidden="true"
              />
              <span
                class="graduate-node relative mx-1.5 block size-3 shrink-0 rounded-full ring-4 ring-primary-body sm:size-3.5"
                :class="item.kind === 'education' ? 'bg-primary' : 'bg-primary-alt'"
                aria-hidden="true"
              />
              <div
                class="h-[3px] min-w-3 flex-1 rounded-full transition-opacity"
                :class="index === filteredTimeline.length - 1 ? 'opacity-0' : 'graduate-line-h'"
                aria-hidden="true"
              />
            </div>

            <Motion
              as="article"
              class="graduate-card-shell group relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl text-primary-text"
              :class="[
                item.kind === 'education' ? 'graduate-card-shell--edu' : 'graduate-card-shell--work',
                item.current ? 'graduate-card-shell--current' : '',
              ]"
              :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }"
              :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
              :while-hover="prefersReducedMotion ? {} : { y: -4, transition: { type: 'spring', stiffness: 420, damping: 24 } }"
              :transition="
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 360, damping: 28, delay: index * 0.04 }
              "
              :viewport="{ once: true, margin: '0px -8% 0px -8%' }"
            >
              <div class="graduate-card-sheen pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div
                class="graduate-card-blob pointer-events-none absolute -right-10 -top-10 size-36 rounded-full opacity-40 blur-3xl"
                aria-hidden="true"
              />
              <div
                class="graduate-card-blob2 pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full opacity-30 blur-2xl"
                aria-hidden="true"
              />

              <div
                class="relative flex min-h-0 flex-1 flex-col rounded-[0.9375rem] border border-primary-input/70 bg-primary-container/90 p-4 shadow-lg backdrop-blur-md dark:border-primary-input/40 dark:bg-primary-container/75 sm:p-5"
              >
                <div class="graduate-card-accent absolute inset-x-0 top-0 z-1 h-1 rounded-t-[0.9375rem]" aria-hidden="true" />

                <div class="relative mb-3 flex items-start gap-3">
                  <div
                    class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-linear-to-br from-primary/12 to-primary/5 text-primary shadow-inner dark:from-primary/25 dark:to-primary/5 dark:text-primary-lighter"
                    :class="
                      item.kind === 'work'
                        ? 'border-primary-alt/30 from-primary-alt/15 to-primary-alt/5 dark:from-primary-alt/20'
                        : ''
                    "
                  >
                    <Icon
                      :name="item.kind === 'education' ? 'mdi:school-outline' : 'mdi:briefcase-outline'"
                      class="size-6"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                      <span
                        class="font-mono text-[0.6rem] font-bold tabular-nums tracking-[0.2em] text-primary-textLight"
                        aria-hidden="true"
                      >
                        {{ stepNumber(item) }}
                      </span>
                      <div class="flex flex-wrap items-center justify-end gap-1.5">
                        <span
                          class="inline-flex items-center rounded-md px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/25 dark:ring-primary/35 sm:text-[0.65rem]"
                          :class="
                            item.kind === 'education'
                              ? 'bg-primary/12'
                              : 'bg-primary-alt/18 text-primary-alt ring-primary-alt/30'
                          "
                        >
                          {{ item.kind === "education" ? "Formation" : "Expérience" }}
                        </span>
                        <span
                          v-if="item.current"
                          class="inline-flex items-center rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400 sm:text-[0.65rem]"
                        >
                          En cours
                        </span>
                      </div>
                    </div>
                    <h3
                      class="text-balance wrap-break-word text-base font-extrabold leading-snug tracking-tight text-primary-title sm:text-lg"
                    >
                      {{ item.title }}
                    </h3>
                  </div>
                </div>

                <p
                  class="relative mb-2 text-[0.65rem] font-bold uppercase leading-snug tracking-wide text-primary-textLight sm:text-xs"
                >
                  {{ item.org }}
                  <span class="block font-semibold normal-case text-primary-text sm:inline sm:font-medium">
                    · {{ item.city }}
                  </span>
                </p>

                <p
                  class="relative mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-md border border-primary/15 bg-primary-body/50 px-2 py-1 text-xs font-bold text-primary-text dark:border-primary/25 dark:bg-primary-body/30"
                >
                  <Icon name="mdi:calendar-month-outline" class="size-3.5 shrink-0 text-primary opacity-80" />
                  {{ item.period }}
                </p>

                <p
                  class="relative mb-3 flex-1 text-[0.8125rem] leading-relaxed text-primary-text/95 sm:text-sm"
                >
                  {{ item.description }}
                </p>

                <ul
                  v-if="item.tags && item.tags.length"
                  class="relative m-0 flex list-none flex-wrap gap-1.5 border-t border-primary-input/50 pt-3 dark:border-primary-input/35"
                  aria-label="Technologies"
                >
                  <li
                    v-for="tag in item.tags"
                    :key="tag"
                    class="rounded-md bg-linear-to-br from-primary/10 to-primary/5 px-2 py-0.5 text-[0.65rem] font-semibold text-primary ring-1 ring-primary/15 dark:from-primary/20 dark:to-primary/10 dark:ring-primary/25 sm:text-xs"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </div>
            </Motion>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeFilter: "education",
      filterOptions: [
        { value: "education", label: "Formations" },
        { value: "work", label: "Expériences" },
      ],
      timeline: [
        {
          id: "edu-l1",
          kind: "education",
          title: "Licence 1 MIP",
          org: "Université des Sciences",
          city: "Nantes",
          period: "2017 – 2019",
          description:
            "Socle en mathématiques, informatique et physique — première étape avant une spécialisation web.",
          tags: [],
        },
        {
          id: "edu-thp",
          kind: "education",
          title: "Certification développeur fullstack",
          org: "The Hacking Project",
          city: "Nantes",
          period: "2019 – 2020",
          description:
            "Bootcamp intensif : conception d’applications web, travail en équipe et bonnes pratiques de développement.",
          tags: ["Ruby on Rails", "Git", "MVC"],
        },
        {
          id: "edu-master",
          kind: "education",
          title: "Master en Web Development",
          org: "Ynov Campus Nantes",
          city: "Nantes",
          period: "2020 – 2023",
          description:
            "Parcours orienté conception et développement d’applications web modernes, de l’architecture au déploiement.",
          tags: ["Vue.js", "Node.js", "API REST"],
        },
        {
          id: "work-hawabowls",
          kind: "work",
          title: "Développeur web stagiaire",
          org: "Hawabowls",
          city: "Nantes",
          period: "2021",
          description:
            "Contribution au produit web en équipe : fonctionnalités, corrections et premières mises en production.",
          tags: ["Vue", "JavaScript"],
        },
        {
          id: "work-exp4",
          kind: "work",
          title: "Développeur fullstack",
          org: "Exp4",
          city: "Nantes",
          period: "2022 – 2024",
          description:
            "Développement et maintenance de solutions métier : interfaces utilisateur, API et intégrations.",
          tags: ["Vue", "Nuxt", "TypeScript", "Node.js"],
        },
        {
          id: "work-aldere",
          kind: "work",
          title: "Développeur freelance fullstack",
          org: "Aldere",
          city: "Nantes",
          period: "2024 · mission courte",
          description:
            "Mission ciblée : livraison rapide d’une fonctionnalité ou d’un module selon le besoin client.",
          tags: ["Nuxt", "Vue"],
        },
        {
          id: "work-vagabox",
          kind: "work",
          title: "Développeur freelance fullstack",
          org: "VAGABOX",
          city: "Nantes",
          period: "2024 – 2025",
          description:
            "Accompagnement technique sur l’écosystème Vue / Nuxt et évolution continue du produit.",
          tags: ["Nuxt", "Vue", "TypeScript"],
        },
        {
          id: "work-kosmonotes",
          kind: "work",
          title: "Développeur freelance fullstack",
          org: "Kosmonotes",
          city: "Nantes",
          period: "2025",
          description:
            "Projets clients et produit autour de Nuxt : intégrations, performance et expérience utilisateur.",
          tags: ["Nuxt", "Vue", "TypeScript"],
          current: true,
        },
      ],
    };
  },
  computed: {
    filteredTimeline() {
      return this.timeline.filter((e) => e.kind === this.activeFilter);
    },
  },
  methods: {
    stepNumber(item) {
      const n = this.timeline.findIndex((t) => t.id === item.id) + 1;
      return String(Math.max(1, n)).padStart(2, "0");
    },
  },
};
</script>

<style lang="postcss">
/* Tighter section: less dead space under the strip */
.graduate-section.shell-section {
  @apply pb-8 md:pb-10;
}

.graduate-heading .section-title {
  @apply mb-0;
}

.graduate-subtitle.section-subtitle {
  @apply mt-1 mb-0 text-xl md:text-2xl;
}

/* Horizontal strip only from lg (768px in this project) */
.graduate-timeline-list {
  scroll-snap-align: none;
}

@media (min-width: 768px) {
  .graduate-timeline-list {
    padding-left: max(0.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(0.5rem, env(safe-area-inset-right, 0px));
  }
}

.graduate-timeline-list::after {
  content: "";
  display: none;
}

@media (min-width: 768px) {
  .graduate-timeline-list::after {
    display: block;
    flex-shrink: 0;
    width: clamp(2.5rem, calc(50vw - 11.25rem), 12rem);
    align-self: stretch;
    pointer-events: none;
  }
}

.graduate-scroll {
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .graduate-scroll {
    scroll-snap-type: x mandatory;
    scroll-padding-inline: max(1rem, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px));
  }
}

.graduate-timeline-item {
  scroll-snap-align: none;
}

@media (min-width: 768px) {
  .graduate-timeline-item {
    scroll-snap-align: start;
  }
}

.graduate-line-v {
  background: linear-gradient(
    to bottom,
    hsl(var(--hue-color) 57% 53% / 0.12),
    hsl(var(--hue-color) 69% 61% / 0.45),
    hsl(var(--hue-color) 57% 53% / 0.12)
  );
}

:global(.dark) .graduate-line-v {
  background: linear-gradient(
    to bottom,
    hsl(var(--hue-color) 57% 53% / 0.08),
    hsl(var(--hue-color) 69% 61% / 0.4),
    hsl(var(--hue-color) 57% 53% / 0.08)
  );
}

.graduate-filter-chip--active {
  @apply bg-primary text-white shadow-md;
}

.graduate-filter-chip:not(.graduate-filter-chip--active):hover {
  @apply bg-primary-input/55 dark:bg-primary-input/25;
}

.graduate-node {
  box-shadow: 0 0 0 1px hsl(var(--hue-color) 69% 61% / 0.35);
}

:global(.dark) .graduate-node {
  box-shadow: 0 0 10px hsl(var(--hue-color) 69% 61% / 0.3);
}

/* Outer shell: gradient frame + depth */
.graduate-card-shell {
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(
    145deg,
    hsl(var(--hue-color) 69% 61% / 0.55),
    hsl(var(--hue-color) 57% 53% / 0.25) 40%,
    hsl(var(--hue-color) 69% 61% / 0.2) 100%
  );
  box-shadow:
    0 12px 40px -12px hsl(var(--hue-color) 69% 45% / 0.22),
    0 4px 12px -4px hsl(var(--hue-color) 8% 15% / 0.08);
  transition:
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

:global(.dark) .graduate-card-shell {
  background: linear-gradient(
    145deg,
    hsl(var(--hue-color) 69% 58% / 0.45),
    hsl(var(--hue-color) 57% 48% / 0.2) 45%,
    hsl(var(--hue-color) 30% 20% / 0.5) 100%
  );
  box-shadow:
    0 16px 48px -14px hsl(var(--hue-color) 69% 40% / 0.35),
    0 0 0 1px hsl(var(--hue-color) 69% 61% / 0.12);
}

.graduate-card-shell--work {
  background: linear-gradient(
    145deg,
    hsl(var(--hue-color) 57% 53% / 0.5),
    hsl(var(--hue-color) 69% 61% / 0.2) 50%,
    hsl(var(--hue-color) 57% 45% / 0.25) 100%
  );
}

.graduate-card-shell--current {
  box-shadow:
    0 12px 40px -12px hsl(var(--hue-color) 69% 45% / 0.28),
    0 0 0 2px hsl(var(--hue-color) 69% 61% / 0.35),
    0 0 28px -6px hsl(160 84% 39% / 0.2);
}

.graduate-card-shell:hover {
  box-shadow:
    0 20px 48px -14px hsl(var(--hue-color) 69% 45% / 0.3),
    0 8px 16px -6px hsl(var(--hue-color) 8% 15% / 0.1);
}

:global(.dark) .graduate-card-shell:hover {
  box-shadow:
    0 22px 56px -16px hsl(var(--hue-color) 69% 45% / 0.4),
    0 0 0 1px hsl(var(--hue-color) 69% 61% / 0.2);
}

.graduate-card-sheen {
  background: linear-gradient(
    125deg,
    transparent 0%,
    hsl(0 0% 100% / 0.07) 35%,
    transparent 55%
  );
  border-radius: inherit;
}

:global(.dark) .graduate-card-sheen {
  background: linear-gradient(
    125deg,
    transparent 0%,
    hsl(0 0% 100% / 0.04) 40%,
    transparent 60%
  );
}

.graduate-card-shell--edu .graduate-card-blob {
  background: radial-gradient(
    circle,
    hsl(var(--hue-color) 69% 61% / 0.35) 0%,
    transparent 70%
  );
}

.graduate-card-shell--work .graduate-card-blob {
  background: radial-gradient(
    circle,
    hsl(var(--hue-color) 57% 53% / 0.35) 0%,
    transparent 70%
  );
}

.graduate-card-blob2 {
  background: radial-gradient(
    circle,
    hsl(var(--hue-color) 92% 95% / 0.5) 0%,
    transparent 65%
  );
}

:global(.dark) .graduate-card-blob2 {
  background: radial-gradient(circle, hsl(var(--hue-color) 69% 61% / 0.12) 0%, transparent 65%);
}

.graduate-card-accent {
  background: linear-gradient(
    90deg,
    hsl(var(--hue-color) 69% 61% / 0.9),
    hsl(var(--hue-color) 57% 53% / 0.85),
    hsl(var(--hue-color) 69% 61% / 0.75)
  );
}

.graduate-card-shell--work .graduate-card-accent {
  background: linear-gradient(
    90deg,
    hsl(var(--hue-color) 57% 53% / 0.95),
    hsl(var(--hue-color) 69% 61% / 0.7),
    hsl(var(--hue-color) 57% 48% / 0.85)
  );
}

.graduate-line-h {
  background: linear-gradient(
    to right,
    hsl(var(--hue-color) 57% 53% / 0.15),
    hsl(var(--hue-color) 69% 61% / 0.55),
    hsl(var(--hue-color) 57% 53% / 0.15)
  );
}

:global(.dark) .graduate-line-h {
  background: linear-gradient(
    to right,
    hsl(var(--hue-color) 57% 53% / 0.1),
    hsl(var(--hue-color) 69% 61% / 0.5),
    hsl(var(--hue-color) 57% 53% / 0.1)
  );
}

.graduate-scroll::-webkit-scrollbar {
  height: 8px;
}

.graduate-scroll::-webkit-scrollbar-track {
  @apply mx-2 rounded-full bg-primary-input/35;
}

.graduate-scroll::-webkit-scrollbar-thumb {
  @apply rounded-full border-2 border-transparent bg-primary/45 bg-clip-padding;
}

.graduate-scroll::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/65;
}

@media (prefers-reduced-motion: reduce) {
  .graduate-filter-chip {
    transform: none !important;
  }

  .graduate-scroll {
    scroll-snap-type: none;
  }
}
</style>

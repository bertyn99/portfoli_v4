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
          class="inline-flex flex-wrap justify-center gap-0.5 rounded-2xl border border-primary-input/90 bg-primary-container/70 p-1 shadow-sm backdrop-blur-sm dark:border-primary-input/50 dark:bg-primary-container/40">
          <Motion v-for="opt in filterOptions" :key="opt.value" as="button" type="button" role="tab"
            :aria-selected="activeFilter === opt.value"
            class="graduate-filter-chip relative cursor-pointer rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors duration-200 sm:px-4 sm:py-2.5"
            :class="[
              activeFilter === opt.value
                ? 'graduate-filter-chip--active text-white shadow-md'
                : 'text-primary-text hover:text-primary',
            ]" :while-hover="prefersReducedMotion ? {} : { scale: 1.02 }"
            :while-press="prefersReducedMotion ? {} : { scale: 0.98 }"
            :transition="{ type: 'spring', stiffness: 450, damping: 26 }" @click="activeFilter = opt.value">
            {{ opt.label }}
          </Motion>
        </div>
      </div>
    </div>

    <!-- Mobile: vertical list. lg+: wrapping grid — no horizontal scroll; cards shrink when there are many -->
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="graduate-scroll pb-3 pt-0 sm:pb-4">
        <ul
          class="graduate-timeline-list m-0 mx-auto flex w-full max-w-2xl list-none flex-col gap-6 p-0 lg:max-w-none lg:grid lg:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] lg:gap-x-4 lg:gap-y-10 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]"
          role="list"
          aria-live="polite"
        >
          <li
            v-for="(item, index) in filteredTimeline"
            :key="`${activeFilter}-${item.id}`"
            class="graduate-timeline-item flex w-full min-w-0 flex-row items-stretch gap-4 lg:flex-col lg:gap-2"
          >
            <!-- Mobile: vertical spine -->
            <div class="flex w-6 shrink-0 flex-col items-center lg:hidden" aria-hidden="true">
              <div class="w-px flex-1 min-h-2 rounded-full bg-transparent"
                :class="index === 0 ? '' : 'graduate-line-v'" />
              <span class="graduate-node my-1.5 block size-3 shrink-0 rounded-full ring-4 ring-primary-body"
                :class="item.kind === 'education' ? 'bg-primary' : 'bg-primary-alt'" />
              <div class="w-px flex-1 min-h-2 rounded-full bg-transparent"
                :class="index === filteredTimeline.length - 1 ? '' : 'graduate-line-v'" />
            </div>

            <!-- Desktop: horizontal spine above card -->
            <div class="mb-2 hidden h-8 w-full items-center sm:mb-2.5 sm:h-9 lg:flex">
              <div class="h-[3px] min-w-3 flex-1 rounded-full transition-opacity"
                :class="index === 0 ? 'opacity-0' : 'graduate-line-h'" aria-hidden="true" />
              <span
                class="graduate-node relative mx-1.5 block size-3 shrink-0 rounded-full ring-4 ring-primary-body sm:size-3.5"
                :class="item.kind === 'education' ? 'bg-primary' : 'bg-primary-alt'" aria-hidden="true" />
              <div class="h-[3px] min-w-3 flex-1 rounded-full transition-opacity"
                :class="index === filteredTimeline.length - 1 ? 'opacity-0' : 'graduate-line-h'" aria-hidden="true" />
            </div>

            <Motion as="article"
              class="graduate-card group flex min-w-0 flex-1 flex-col p-4 sm:p-5"
              :class="[
                item.kind === 'education' ? 'graduate-card--edu' : 'graduate-card--work',
                item.current ? 'graduate-card--current' : '',
              ]"
              :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }"
              :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
              :while-hover="prefersReducedMotion ? {} : { y: -2, transition: { type: 'spring', stiffness: 440, damping: 26 } }"
              :transition="prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 360, damping: 28, delay: index * 0.04 }
                "
              :viewport="{ once: true, margin: '0px -8% 0px -8%' }"
            >
              <header class="border-b border-primary-input/55 pb-3 dark:border-primary-input/30">
                <div class="mb-2.5 flex items-center justify-between gap-2">
                  <span
                    class="font-mono text-[0.6rem] font-semibold tabular-nums tracking-[0.2em] text-primary-textLight"
                    aria-hidden="true"
                  >
                    {{ stepNumber(item) }}
                  </span>
                  <div class="flex flex-wrap items-center justify-end gap-1.5">
                    <span
                      class="rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider"
                      :class="
                        item.kind === 'education'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-primary-alt/12 text-primary-alt'
                      "
                    >
                      {{ item.kind === "education" ? "Formation" : "Expérience" }}
                    </span>
                    <span
                      v-if="item.current"
                      class="rounded bg-emerald-500/12 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400"
                    >
                      En cours
                    </span>
                  </div>
                </div>

                <h3 class="text-balance text-[1.05rem] font-bold leading-snug tracking-tight text-primary-title sm:text-[1.1rem]">
                  {{ item.title }}
                </h3>

                <div class="mt-3 space-y-1.5">
                  <p class="flex items-center gap-1.5 text-[0.72rem] leading-snug sm:text-xs">
                    <Icon
                      :name="item.kind === 'education' ? 'mdi:school-outline' : 'mdi:briefcase-outline'"
                      class="size-3.5 shrink-0 text-primary/60"
                      aria-hidden="true"
                    />
                    <span class="font-semibold text-primary-title">{{ item.org }}</span>
                    <span class="text-primary-textLight">· {{ item.city }}</span>
                  </p>
                  <p class="flex items-center gap-1.5 text-[0.72rem] text-primary-textLight sm:text-xs">
                    <Icon
                      name="mdi:calendar-month-outline"
                      class="size-3.5 shrink-0 text-primary/60"
                      aria-hidden="true"
                    />
                    <time class="font-medium text-primary-text/90">{{ item.period }}</time>
                  </p>
                </div>
              </header>

              <div class="flex-1 py-3">
                <p class="m-0 text-[0.8125rem] leading-relaxed text-primary-text sm:text-sm">
                  {{ item.description }}
                </p>
              </div>

              <footer
                v-if="item.tags && item.tags.length"
                class="mt-auto border-t border-primary-input/50 pt-2.5 dark:border-primary-input/30"
              >
                <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Technologies">
                  <li
                    v-for="tag in item.tags"
                    :key="tag"
                    class="rounded bg-primary-body/60 px-2 py-0.5 text-[0.62rem] font-medium text-primary-text dark:bg-primary-input/40 sm:text-xs"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </footer>
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
.graduate-section.shell-section {
  @apply pb-8 md:pb-10;
}

.graduate-heading .section-title {
  @apply mb-0;
}

.graduate-subtitle.section-subtitle {
  @apply mt-1 mb-0 text-xl md:text-2xl;
}

.graduate-timeline-list {
  align-items: start;
}

.graduate-line-v {
  background: linear-gradient(
    to bottom,
    hsl(var(--hue-color) 57% 53% / 0.1),
    hsl(var(--hue-color) 69% 61% / 0.4),
    hsl(var(--hue-color) 57% 53% / 0.1)
  );
}

:global(.dark) .graduate-line-v {
  background: linear-gradient(
    to bottom,
    hsl(var(--hue-color) 57% 53% / 0.07),
    hsl(var(--hue-color) 69% 61% / 0.35),
    hsl(var(--hue-color) 57% 53% / 0.07)
  );
}

.graduate-line-h {
  background: linear-gradient(
    to right,
    hsl(var(--hue-color) 57% 53% / 0.12),
    hsl(var(--hue-color) 69% 61% / 0.5),
    hsl(var(--hue-color) 57% 53% / 0.12)
  );
}

:global(.dark) .graduate-line-h {
  background: linear-gradient(
    to right,
    hsl(var(--hue-color) 57% 53% / 0.08),
    hsl(var(--hue-color) 69% 61% / 0.45),
    hsl(var(--hue-color) 57% 53% / 0.08)
  );
}

.graduate-node {
  box-shadow: 0 0 0 1px hsl(var(--hue-color) 69% 61% / 0.3);
}

:global(.dark) .graduate-node {
  box-shadow: 0 0 8px hsl(var(--hue-color) 69% 61% / 0.25);
}

.graduate-filter-chip--active {
  @apply bg-primary text-white shadow-sm;
}

.graduate-filter-chip:not(.graduate-filter-chip--active):hover {
  @apply bg-primary-input/55 dark:bg-primary-input/25;
}

.graduate-card {
  @apply rounded-xl border border-primary-input/60 bg-primary-container dark:border-primary-input/30 dark:bg-primary-container;
  box-shadow: 0 1px 4px hsl(var(--hue-color) 8% 15% / 0.05);
  transition: box-shadow 0.25s ease;
}

:global(.dark) .graduate-card {
  box-shadow: 0 1px 6px hsl(var(--hue-color) 69% 10% / 0.2);
}

.graduate-card:hover {
  box-shadow:
    0 4px 16px -4px hsl(var(--hue-color) 69% 50% / 0.12),
    0 1px 4px hsl(var(--hue-color) 8% 15% / 0.06);
}

:global(.dark) .graduate-card:hover {
  box-shadow: 0 6px 20px -6px hsl(var(--hue-color) 69% 50% / 0.22);
}

.graduate-card--current {
  @apply border-primary/25 dark:border-primary/20;
}

@media (prefers-reduced-motion: reduce) {
  .graduate-filter-chip {
    transform: none !important;
  }
}
</style>

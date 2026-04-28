<script setup>
import { useReducedMotion } from "motion-v";

const prefersReducedMotion = useReducedMotion();

/** Ease-out (no bounce), impeccable motion */
const easeOut = [0.22, 1, 0.36, 1];

const services = [
  {
    id: "web",
    name: "Développement web",
    icon: "streamline:paint-palette-solid",
    description:
      "Sites vitrines, landings et parcours marketing soignés (Vue, Nuxt), intégration au pixel près, performances et bonnes pratiques d’accessibilité.",
  },
  {
    id: "fullstack",
    name: "Applications fullstack",
    icon: "ion:desktop",
    description:
      "Conception et livraison d’applications web complètes : interfaces, API, persistance et déploiement, avec une stack moderne centrée sur Vue et Nuxt.",
  },
  {
    id: "cms",
    name: "CMS et contenu",
    icon: "clarity:blocks-group-line",
    description:
      "Mise en place et prise en main de CMS headless (Strapi, Directus, Nuxt Studio) pour que vos équipes publient en autonomie sans sacrifier la qualité du front.",
  },
];
</script>

<template>
  <section id="services" class="services shell-section">
    <Motion
      as="div"
      class="w-full text-center"
      :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }"
      :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
      :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut }"
      :viewport="{ once: true, margin: '0px 0px -8% 0px' }"
    >
      <h2 class="section-title">Expertise</h2>
      <span class="section-subtitle">Services</span>
    </Motion>

    <div class="container">
      <div class="lg:flex lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
        <Motion
          as="div"
          class="flex justify-center lg:w-1/2 lg:max-w-xl lg:justify-end"
          :initial="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }"
          :while-in-view="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }"
          :transition="
            prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: easeOut, delay: 0.06 }
          "
          :viewport="{ once: true, margin: '0px 0px -12% 0px' }"
        >
          <div class="w-[30.375rem] max-w-full flex-none lg:w-[40.5rem]">
            <StylizedImg
              src="/img/laptop.jpg"
              alt="Espace de travail avec ordinateur portable, illustrant le développement web et les services proposés."
              sizes="(min-width: 1024px) 36.9rem, 27.9rem"
              class="justify-center lg:justify-end"
            />
          </div>
        </Motion>

        <ul
          role="list"
          class="mt-12 w-full max-w-2xl text-primary-text lg:mt-0 lg:w-1/2 lg:min-w-0 lg:max-w-none xl:mt-0"
        >
          <li
            v-for="(service, index) in services"
            :key="service.id"
            class="group mt-10 first:mt-0 lg:mt-12 lg:first:mt-0"
          >
            <Motion
              as="div"
              :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }"
              :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
              :while-hover="prefersReducedMotion ? {} : { y: -2 }"
              :transition="
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.48, ease: easeOut, delay: 0.1 + index * 0.07 }
              "
              :viewport="{ once: true, margin: '0px 0px -10% 0px' }"
            >
              <Border
                position="top"
                class="pt-10 text-primary-text transition-shadow duration-300 group-first:pt-0 group-first:before:hidden group-first:after:hidden"
                :class="prefersReducedMotion ? '' : 'hover:shadow-sm'"
              >
                <div class="flex gap-4 sm:gap-5">
                  <Motion
                    as="div"
                    class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/12 bg-primary/8 text-primary dark:border-primary/20 dark:bg-primary/12 sm:size-12"
                    aria-hidden="true"
                    :while-hover="prefersReducedMotion ? {} : { scale: 1.04 }"
                    :transition="{ type: 'tween', duration: 0.22, ease: easeOut }"
                  >
                    <Icon :name="service.icon" class="size-6 sm:size-[1.35rem]" />
                  </Motion>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-lg font-bold leading-snug tracking-tight text-primary-title sm:text-xl">
                      {{ service.name }}
                    </h3>
                    <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-primary-text sm:text-base">
                      {{ service.description }}
                    </p>
                  </div>
                </div>
              </Border>
            </Motion>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

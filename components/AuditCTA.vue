<script setup lang="ts">
import { useReducedMotion } from 'motion-v'

const prefersReducedMotion = useReducedMotion()
const easeOut = [0.22, 1, 0.36, 1] as const

const bullets = [
  { icon: 'i-mdi:clock-outline', text: 'Réponse sous 48h ouvrées' },
  { icon: 'i-mdi:handshake-outline', text: 'Sans engagement ni frais cachés' },
  { icon: 'i-mdi:file-chart-outline', text: 'Rapport performance + recommandations' },
] as const
</script>

<template>
  <section id="audit-cta" class="shell-section">
    <Motion
      as="div"
      class="w-full text-center"
      :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }"
      :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
      :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut }"
      :viewport="{ once: true, margin: '0px 0px -8% 0px' }"
    >
      <h2 class="section-title">Votre site peut faire mieux</h2>
      <span class="section-subtitle">Audit gratuit</span>
    </Motion>

    <div class="container">
      <div class="lg:flex lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
        <Motion
          as="div"
          class="lg:w-1/2 lg:min-w-0"
          :initial="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }"
          :while-in-view="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }"
          :transition="
            prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: easeOut, delay: 0.06 }
          "
          :viewport="{ once: true, margin: '0px 0px -12% 0px' }"
        >
          <p class="mb-6 max-w-prose text-primary-text">
            Obtenez une analyse gratuite de votre site : performance, SEO, accessibilité et design.
            Un rapport personnalisé avec des actions concrètes, livré en 48h.
          </p>
          <ul class="mb-8 grid gap-3" role="list">
            <li
              v-for="item in bullets"
              :key="item.text"
              class="flex items-center gap-3 text-sm text-primary-text"
            >
              <Icon :name="item.icon" class="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              {{ item.text }}
            </li>
          </ul>
          <NuxtLink
            to="/audit-gratuit"
            class="button button-flex inline-flex items-center gap-2 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
          >
            Obtenir mon audit gratuit
            <Icon name="i-mdi:arrow-right" class="button-icon" aria-hidden="true" />
          </NuxtLink>
        </Motion>

        <Motion
          as="div"
          class="mt-10 flex justify-center lg:mt-0 lg:w-1/2 lg:max-w-xl lg:justify-end"
          :initial="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 22 }"
          :while-in-view="prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }"
          :transition="
            prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: easeOut, delay: 0.1 }
          "
          :viewport="{ once: true, margin: '0px 0px -12% 0px' }"
        >
          <div class="w-[30.375rem] max-w-full flex-none lg:w-[36rem]">
            <StylizedImg
              src="/img/laptop.jpg"
              alt="Ordinateur portable affichant un site web, illustrant l'audit de site."
              sizes="(min-width: 1024px) 36rem, 27.9rem"
              class="justify-center lg:justify-end"
            />
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

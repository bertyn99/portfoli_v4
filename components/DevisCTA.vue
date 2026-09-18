<script setup lang="ts">
import { useReducedMotion } from 'motion-v'

const prefersReducedMotion = useReducedMotion()
const easeOut = [0.22, 1, 0.36, 1] as const

const benefits = [
  {
    title: 'Estimation instantanée',
    text: 'Fourchette de prix mise à jour à chaque étape',
  },
  {
    title: 'Sans engagement',
    text: 'Devis indicatif, affiné lors d’un échange',
  },
] as const
</script>

<template>
  <section id="devis-cta" class="py-16 md:py-20">
    <div class="container">
      <Motion
        as="div"
        class="grid gap-8 border-y border-primary-input py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-12 md:py-14"
        :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }"
        :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
        :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut }"
        :viewport="{ once: true, margin: '0px 0px -8% 0px' }"
      >
        <div>
          <h2 class="section-title">Devis en ligne</h2>
          <p class="mt-4 max-w-prose text-lg leading-relaxed text-primary-text">
            Estimez le budget de votre site ou application en quelques clics, puis affinez avec moi lors d’un échange.
          </p>
        </div>
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start">
          <ul class="grid gap-5 sm:grid-cols-2 lg:max-w-md" role="list">
            <li v-for="benefit in benefits" :key="benefit.title">
              <p class="font-bold text-primary-title">{{ benefit.title }}</p>
              <p class="mt-1 text-sm leading-relaxed text-primary-text">{{ benefit.text }}</p>
            </li>
          </ul>
          <UButton
            to="/devis"
            trailing-icon="i-mdi-arrow-right"
            size="lg"
            class="shrink-0"
          >
            Créer mon devis
          </UButton>
        </div>
      </Motion>
    </div>
  </section>
</template>

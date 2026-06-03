<script setup lang="ts">
import { useReducedMotion } from 'motion-v'

const prefersReducedMotion = useReducedMotion()
const easeOut = [0.22, 1, 0.36, 1] as const

const benefits = [
  {
    icon: 'i-mdi:calculator-variant-outline',
    title: 'Estimation instantanée',
    text: 'Fourchette de prix mise à jour à chaque étape',
  },
  {
    icon: 'i-mdi:shield-check-outline',
    title: 'Sans engagement',
    text: 'Devis indicatif, affiné lors d\'un échange',
  },
] as const
</script>

<template>
  <section id="devis-cta" class="shell-section text-center">
    <Motion
      as="div"
      class="w-full"
      :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }"
      :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
      :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut }"
      :viewport="{ once: true, margin: '0px 0px -8% 0px' }"
    >
      <h2 class="section-title">Combien va coûter votre projet ?</h2>
      <span class="section-subtitle">Devis en ligne</span>
      <p class="container mx-auto mb-8 max-w-xl text-primary-text">
        Estimez le budget de votre site ou application en quelques clics, puis affinez avec moi lors d'un échange.
      </p>
    </Motion>

    <div class="container">
      <div class="mx-auto mb-8 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-xl border border-primary/12 bg-primary-body px-5 py-5 text-left shadow-sm"
        >
          <Icon :name="benefit.icon" class="mb-3 h-8 w-8 text-primary" aria-hidden="true" />
          <p class="font-bold text-primary-title">{{ benefit.title }}</p>
          <p class="mt-1 text-sm text-primary-text">{{ benefit.text }}</p>
        </div>
      </div>
      <NuxtLink
        to="/devis"
        class="button button-flex inline-flex items-center gap-2 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
      >
        Créer mon devis
        <Icon name="i-mdi:arrow-right" class="button-icon" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>

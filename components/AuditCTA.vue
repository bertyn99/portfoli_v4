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
  <section id="audit-cta" class="py-16 md:py-20">
    <div class="container">
      <Motion
        as="div"
        class="rounded-2xl bg-primary-input px-6 py-10 md:px-10 md:py-12 lg:px-14"
        :initial="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }"
        :while-in-view="prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }"
        :transition="prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: easeOut }"
        :viewport="{ once: true, margin: '0px 0px -8% 0px' }"
      >
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <h2 class="section-title">Audit gratuit</h2>
            <p class="mt-4 max-w-prose text-lg leading-relaxed text-primary-text">
              Une lecture de votre site: performance, SEO, accessibilité et design. Un rapport avec des actions concrètes, en 48h.
            </p>
            <ul class="mt-6 grid gap-2.5" role="list">
              <li
                v-for="item in bullets"
                :key="item.text"
                class="flex items-center gap-3 text-sm text-primary-text"
              >
                <Icon :name="item.icon" class="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {{ item.text }}
              </li>
            </ul>
          </div>
          <div class="lg:justify-self-end">
            <UButton
              to="/audit-gratuit"
              trailing-icon="i-mdi-arrow-right"
              size="lg"
            >
              Obtenir mon audit
            </UButton>
          </div>
        </div>
      </Motion>
    </div>
  </section>
</template>

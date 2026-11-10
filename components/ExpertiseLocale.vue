<script setup lang="ts">
import { homeLocalFaq } from "@/data/site-identity"
</script>

<template>
  <section
    id="expertise-nantes"
    class="shell-section border-t border-neutral-200/80 pt-16 pb-28 text-primary-text dark:border-neutral-800 md:pt-24 md:pb-36"
    aria-labelledby="expertise-nantes-heading"
  >
    <div class="container max-w-3xl">
      <h2
        id="expertise-nantes-heading"
        class="section-title text-balance"
      >
        Développeur web freelance à Nantes
      </h2>
      <p class="mt-4 text-lg leading-relaxed text-primary-text">
        Je conçois et livre des sites et applications pour des clients à Nantes et en France : front-end Nuxt/Vue,
        back-end et APIs, intégrations entre outils, automatisation de processus et briques IA quand le besoin est
        concret.
      </p>

      <h3 class="mt-10 text-base font-semibold uppercase tracking-wide text-primary">
        Questions fréquentes
      </h3>
      <dl class="mt-4 space-y-6">
        <div
          v-for="item in homeLocalFaq"
          :key="item.question"
          class="rounded-lg border border-neutral-200/90 bg-neutral-50/80 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900/40"
        >
          <dt class="font-semibold text-primary-title">
            {{ item.question }}
          </dt>
          <dd class="mt-2 text-primary-text">
            {{ item.answer }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

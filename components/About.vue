<template>
  <section id="about"
    class="about pt-8 pb-16 text-primary-text md:pt-24 md:pb-8 dark:bg-primary-container dark:text-primary-text">
    <div class="container">
      <h2 ref="title" class="section-title text-primary-title">A propos</h2>
      <span ref="subtitle" class="section-subtitle">Ma présentation</span>
      <div class="grid lg:grid-cols-2 gap-8 mt-4">
        <div class="about-data col-span-2 flex flex-col md:flex-row gap-1.5">
          <div class="w-full md:basis-1/3" ref="contentLeft">
            <div class="text-center text-primary-title md:text-left">
            <span class="inline-flex items-center gap-1 font-medium text-primary"> Bertyn
              <Icon name="i-mdi:star-four-points" class="w-4 h-4 text-primary" />Boulikou
            </span>
            <h2 class="about-heading mt-4 text-pretty text-3xl font-bold text-primary-title">
              Développeur Full Stack |
              Créateur
              d'applications web</h2>

            <Icon name="i-mdi:star-four-points" class="w-4 h-4 text-primary" />
          </div>

          </div>
          <div class="w-full text-primary-text md:basis-2/3" ref="contentRight">

          <p class="mb-4 font-semibold text-primary-title">
            Au fil des années, j'ai exploré et maîtrisé différentes technologies qui ont évolué rapidement, parfois de
            manière imprévisible, mais toujours avec la même mission : apporter des solutions efficaces et innovantes.
            Je suis passionné par la conception et le développement d'applications robustes, optimisées et centrées sur
            l'expérience utilisateur.
          </p>
          <p class="mb-6 text-primary-text">
            Que ce soit pour des projets front-end dynamiques avec Nuxt.js ou pour des back-ends puissants, mon objectif
            est de transformer des idées en produits fonctionnels et intuitifs.
          </p>
          <div class="mt-4 grid grid-cols-3 gap-4 text-center text-xs font-semibold">
            <div>
              <span class="block text-primary">Localisation</span>
              <span class="mt-0.5 block text-primary-title">Nantes</span>
            </div>
            <div>
              <span class="block text-primary">EXPERIENCE</span>
              <span class="mt-0.5 block text-primary-title">4+ Années</span>
            </div>
            <div>
              <span class="block text-primary">DATE OF BIRTH</span>
              <span class="mt-0.5 block text-primary-title">24 Mai 1999</span>
            </div>
          </div>
        </div>
        </div>

      <div
        class="about-info col-span-2 mx-auto flex w-full max-w-3xl divide-x divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white text-center shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-primary-body">
        <div class="flex min-w-0 flex-1 flex-col items-center bg-white p-4 dark:bg-primary-body">
          <span class="about-info-title text-xl font-semibold text-primary-title">4+</span>
          <span class="about-info-name mt-2 block text-xs text-primary-text">Années <br /> d'expériences</span>
        </div>
        <div class="flex min-w-0 flex-1 flex-col items-center bg-primary-lighter p-4 dark:bg-primary/25">
          <span class="about-info-title text-xl font-semibold text-primary-title">10+</span>
          <span class="about-info-name mt-2 block text-xs text-primary-text">Projets <br /> Complétés</span>
        </div>
        <div class="flex min-w-0 flex-1 flex-col items-center bg-white p-4 dark:bg-primary-body">
          <span class="about-info-title text-xl font-semibold text-primary-title">2</span>
          <span class="about-info-name mt-2 block text-xs text-primary-text">Entreprises<br /> où j'ai travaillés</span>
        </div>
      </div>
      <div class="about-buttons col-span-full inline-flex justify-center mt-8">
        <the-button link="CV-Bertyn_Boulikou.pdf" class="button button-flex bg-blue-600 text-white px-4 py-2 rounded"
          download="CV-Bertyn Boulikou.pdf">Télécharger mon cv</the-button>
      </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import TheButton from './TheButton.vue'

// Refs for the elements
const title = ref(null)
const subtitle = ref(null)
const contentLeft = ref(null)
const contentRight = ref(null)
const stat = ref(null)
// Intersection Observer callback
const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
  if (entry?.isIntersecting) {
    entry.target.classList.add('animate-fadeIn')
    if (entry.target === contentLeft.value) {
      entry?.target.classList?.add('animate-slideInFromLeft')
    }
    if (entry.target === contentRight.value) {
      entry?.target.classList?.add('animate-slideInFromRight')
    }

    entry.target.classList.add('animate-fadeIn')
  }
}

// Use Intersection Observer on elements
useIntersectionObserver(title, handleIntersect)
useIntersectionObserver(subtitle, handleIntersect)
useIntersectionObserver(contentLeft, handleIntersect)
useIntersectionObserver(contentRight, handleIntersect)
</script>

<style></style>

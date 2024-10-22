<template>
  <section id="about" class="about section bg-gray-100 py-8">
    <h2 ref="title" class="section-title text-gray-800 text-center">A propos</h2>
    <span ref="subtitle" class="section-subtitle text-gray-600 text-center block mb-6">Ma présentation</span>
    <div class="about-container container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 mt-4">
      <div class="about-data col-span-2 flex flex-col md:flex-row gap-1.5">
        <div class="w-full md:basis-1/3" ref="contentLeft">
          <div class="text-center md:text-left">
            <span class="inline-flex items-center gap-1"> Bertyn
              <Icon name="i-mdi:star-four-points" class="w-4 h-4 text-primary" />Boulikou
            </span>
            <h2 class="about-heading text-3xl font-bold mt-4 text-gray-800 text-pretty">Développeur Full Stack |
              Créateur
              d'applications web</h2>

            <Icon name="i-mdi:star-four-points" class="w-4 h-4 text-primary" />
          </div>

        </div>
        <div class="text-gray-600 w-full md:basis-2/3" ref="contentRight">

          <p class="mb-4 font-semibold">
            Au fil des années, j'ai exploré et maîtrisé différentes technologies qui ont évolué rapidement, parfois de
            manière imprévisible, mais toujours avec la même mission : apporter des solutions efficaces et innovantes.
            Je suis passionné par la conception et le développement d'applications robustes, optimisées et centrées sur
            l'expérience utilisateur.
          </p>
          <p class="text-gray-600 mb-6">
            Que ce soit pour des projets front-end dynamiques avec Nuxt.js ou pour des back-ends puissants, mon objectif
            est de transformer des idées en produits fonctionnels et intuitifs.
          </p>
          <div class="grid grid-cols-3 gap-4 text-center text-xs font-semibold mt-4">
            <div>
              <span class="block text-primary">Localisation</span>
              <span class="block">Nantes</span>
            </div>
            <div>
              <span class="block text-primary">EXPERIENCE</span>
              <span class="block">4+ Années</span>
            </div>
            <div>
              <span class="block text-primary">DATE OF BIRTH</span>
              <span class="block">24 Mai 1999</span>
            </div>
          </div>
        </div>
      </div>

      <div class="about-info flex justify-center w-full col-span-2 text-center">
        <div class="border p-4 basis-1/3 flex flex-col items-center rounded-l-md">
          <span class="about-info-title text-xl font-semibold ">4+</span>
          <span class="about-info-name text-xs block mt-2">Années <br /> d'expériences</span>
        </div>
        <div class="border bg-primary-lighter p-4 basis-1/3 flex flex-col items-center">
          <span class="about-info-title text-xl font-semibold">10+</span>
          <span class="about-info-name text-xs block mt-2">Projets <br /> Complétés</span>
        </div>
        <div class="border p-4 basis-1/3 flex flex-col items-center   rounded-r-md">
          <span class="about-info-title text-xl font-semibold  ">2</span>
          <span class="about-info-name text-xs  block mt-2">Entreprises<br /> où j'ai travaillés</span>
        </div>
      </div>
      <div class="about-buttons col-span-full inline-flex justify-center mt-8">
        <the-button link="CV-Bertyn_Boulikou.pdf" class="button button-flex bg-blue-600 text-white px-4 py-2 rounded"
          download="CV-Bertyn Boulikou.pdf">Télécharger mon cv</the-button>
      </div>
    </div>

  </section>
</template>

<script setup>
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
const handleIntersect = ([entry]) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('animate-fadeIn')
    if (entry.target === contentLeft.value) {
      entry.target.classList.add('animate-slideInFromLeft')
    }
    if (entry.target === contentRight.value) {
      entry.target.classList.add('animate-slideInFromRight')
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

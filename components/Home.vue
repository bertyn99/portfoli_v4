<template>
  <section class="@container home shell-section">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 pt-14 sm:grid-cols-[auto_1fr] md:grid-cols-[max-content_1fr_1fr] md:gap-x-8 lg:pt-20 lg:gap-x-10">
        <div class="grid grid-cols-[max-content] gap-y-2 md:mr-4">
          <a href="https://www.facebook.com/helenbertyn.boulikoudamours"
            class="touch-target-square text-xl text-primary transition duration-300 hover:text-primary-alt"
            aria-label="Facebook">
            <Icon name="i-mdi:facebook" class="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="https://github.com/bertyn99"
            class="touch-target-square text-xl text-primary transition duration-300 hover:text-primary-alt"
            aria-label="GitHub">
            <Icon name="i-mdi:github" class="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/bertyn-boulikou/"
            class="touch-target-square text-xl text-primary transition duration-300 hover:text-primary-alt"
            aria-label="LinkedIn">
            <Icon name="i-mdi:linkedin" class="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <div class="inline-flex justify-center md:justify-self-center">
          <svg class="w-48 fill-current text-primary lg:w-72 xl:w-80" viewBox="0 0 200 187"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <mask id="mask0" mask-type="alpha">
              <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
        130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
        97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
        0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
            </mask>
            <g mask="url(#mask0)">
              <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
        165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
        129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
        -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
              <image class="w-44" x="14" y="18" xlink:href="/img/bertyn.png" />
            </g>
          </svg>
        </div>
        <div class="[grid-column:1/3] md:[grid-column:initial]">
          <h1 class="text-2xl">Salut, je m'appelle Bertyn</h1>
          <h2 class="text-xl font-medium mb-3 text-primary-text">Développeur web</h2>
          <p class="mb-8">
            Freelance développeur full stack, produisant du travail de qualité et
            toujours curieux de découvrir de nouvelles technologies.
          </p>
          <the-button link="https://cal.com/bertyn-boulikou"
            class="button button-flex inline-flex items-center">Discutons de votre projet
            <Icon name="i-mdi:email-outline" class="button-icon ml-2 h-6 w-6 transition duration-300"
              aria-hidden="true" />
          </the-button>

        </div>

        <div class="col-span-full flex justify-center">
          <nuxt-link to="#about"
            class="button-flex touch-target-inline mt-8 text-primary transition duration-300 hover:translate-y-1 hover:transform">
            <Icon name="i-mdi:mouse" class="h-8 w-6" aria-hidden="true" />
            <span class="mr-1 text-sm font-medium text-primary-title">Scroll down</span>
            <Icon name="i-mdi:chevron-down" class="h-4 w-4" aria-hidden="true" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TheButton from './TheButton.vue'

</script>

<style lang="postcss"></style>

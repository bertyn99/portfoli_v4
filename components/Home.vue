<template>
  <section class="home relative flex min-h-[100dvh] items-center overflow-hidden max-lg:min-h-[calc(100dvh-var(--mobile-dock-height)-env(safe-area-inset-bottom,0px))]">
    <div
      class="pointer-events-none absolute -left-24 top-1/4 size-[28rem] rounded-full bg-primary/12 blur-3xl dark:bg-primary/18"
      aria-hidden="true"
    />
    <div class="container relative">
      <div
        class="grid items-center gap-x-8 gap-y-10 pt-10 sm:pt-12 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-10 lg:gap-x-14 lg:pt-6"
      >
        <div class="hidden flex-col items-center gap-3 self-stretch py-6 md:flex">
          <span class="h-10 w-px rounded-full bg-primary/35" aria-hidden="true" />
          <UButton
            icon="i-mdi-facebook"
            to="https://www.facebook.com/helenbertyn.boulikoudamours"
            target="_blank"
            color="primary"
            variant="ghost"
            aria-label="Facebook"
          />
          <UButton
            icon="i-mdi-github"
            to="https://github.com/bertyn99"
            target="_blank"
            color="primary"
            variant="ghost"
            aria-label="GitHub"
          />
          <UButton
            icon="i-mdi-linkedin"
            to="https://www.linkedin.com/in/bertyn-boulikou/"
            target="_blank"
            color="primary"
            variant="ghost"
            aria-label="LinkedIn"
          />
          <span class="w-px flex-1 rounded-full bg-primary/20" aria-hidden="true" />
        </div>

        <div class="relative flex justify-center md:justify-self-center">
          <div
            class="absolute inset-6 -z-10 rounded-full bg-primary/25 blur-2xl dark:bg-primary/30"
            aria-hidden="true"
          />
          <svg
            class="home-blob w-52 fill-current text-primary motion-safe:animate-blob-float lg:w-80 xl:w-[22rem]"
            viewBox="0 0 200 187"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
          >
            <mask id="home-blob-mask" mask-type="alpha">
              <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547
        130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775
        97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666
        0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
            </mask>
            <g mask="url(#home-blob-mask)">
              <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346
        165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403
        129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028
        -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
              <image class="w-44" x="14" y="18" xlink:href="/img/bertyn.png" />
            </g>
          </svg>
        </div>

        <div class="max-w-xl md:py-6">
          <p class="mb-2 text-sm font-semibold text-primary md:text-base">Développeur web freelance</p>
          <h1
            class="font-display text-[clamp(2.4rem,1.4rem+4vw,4.25rem)] font-extrabold leading-[1.08] tracking-tight text-primary-title"
          >
            Bertyn Boulikou
          </h1>
          <p class="mt-4 max-w-[36ch] text-lg leading-relaxed text-primary-text">
            Sites vitrines, applications et intégrations sur mesure, en Nuxt, Vue et TypeScript.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <UButton to="#portfolio" size="lg" trailing-icon="i-mdi-arrow-right">
              Voir mes projets
            </UButton>
            <div class="flex gap-1 md:hidden">
              <UButton
                icon="i-mdi-facebook"
                to="https://www.facebook.com/helenbertyn.boulikoudamours"
                target="_blank"
                color="primary"
                variant="ghost"
                aria-label="Facebook"
              />
              <UButton
                icon="i-mdi-github"
                to="https://github.com/bertyn99"
                target="_blank"
                color="primary"
                variant="ghost"
                aria-label="GitHub"
              />
              <UButton
                icon="i-mdi-linkedin"
                to="https://www.linkedin.com/in/bertyn-boulikou/"
                target="_blank"
                color="primary"
                variant="ghost"
                aria-label="LinkedIn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="postcss"></style>

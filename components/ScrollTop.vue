<template>
  <button
    id="scroll-up"
    type="button"
    class="fixed right-4 -bottom-1/4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary opacity-80 transition duration-500 hover:bg-primary-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-body"
    aria-label="Retour en haut de la page"
    @click="goTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 fill-current text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 11l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
  </button>
</template>

<script>
export default {
  destroyed() {
    window.removeEventListener('scroll', this.scrollTop)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollTop)
  },
  methods: {
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollTop() {
      const scrollUp = document.getElementById('scroll-up')
      if (!scrollUp) return
      if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll')
      } else {
        scrollUp.classList.remove('show-scroll')
      }
    },
  },
}
</script>

<style lang="postcss">
.show-scroll {
  bottom: 5rem;
}
</style>

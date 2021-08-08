<template>
  <a id="scroll-up" href="#" class="scrollup">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="scrollup-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 11l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
  </a>
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
    scrollTop() {
      const scrollUp = document.getElementById('scroll-up')
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
.scrollup {
  @apply fixed right-4 -bottom-1/4 rounded bg-primary opacity-80 py-0 px-2 z-10 transition duration-500;
  &:hover {
    @apply bg-primary-alt;
  }
  &-icon {
    @apply text-white h-6 w-6 fill-current;
  }
}
.show-scroll {
  @apply bottom-20;
}
</style>
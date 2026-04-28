<template>
  <div
    class="relative flex flex-col justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--first-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--body-color)] rounded-sm"
    role="region" aria-roledescription="carousel" aria-label="Projets réalisés" tabindex="0"
    @keydown="onCarouselKeydown">
    <div :id="slidesPanelId">
      <slot :visible-slide="currentSlide" :direction="direction" />
    </div>

    <button type="button"
      class="absolute top-1/2 -left-2 z-[1] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-primary-title hover:text-primary md:-left-3 xl:-left-4"
      :aria-controls="slidesPanelId" aria-label="Projet précédent" @click.prevent="goPrev">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button type="button"
      class="absolute top-1/2 right-0 z-[1] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-primary-title hover:text-primary md:right-1 xl:right-2"
      :aria-controls="slidesPanelId" aria-label="Projet suivant" @click.prevent="goNext">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="carousel-pagination mt-2 w-full text-center">
      <button v-for="n in totalSlides" :key="n" type="button" :aria-label="`Afficher le projet ${n} sur ${totalSlides}`"
        :aria-current="n - 1 === currentSlide ? 'true' : undefined" :class="{ active: n - 1 === currentSlide }"
        class="mx-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
        @click="goTo(n - 1)">
        <span class="carousel-dot h-2.5 w-2.5 rounded-full bg-[var(--text-color-light)]" />
      </button>
    </div>
  </div>
</template>

<script setup>
const slidesPanelId = useId()

const props = defineProps({
  slideCount: {
    type: Number,
    default: 0,
  },
})

const currentSlide = ref(0)
const domSlideCount = ref(null)
const direction = ref('right')

const totalSlides = computed(() => {
  if (props.slideCount > 0) {
    return props.slideCount
  }
  return domSlideCount.value ?? 0
})

onMounted(() => {
  if (props.slideCount <= 0) {
    domSlideCount.value = document.querySelectorAll('[data-slide]').length
  }
})

function goNext() {
  const last = totalSlides.value - 1
  if (last < 0) return

  direction.value = 'right'
  if (currentSlide.value === last) {
    currentSlide.value = 0
    return
  }
  currentSlide.value++
}

function goPrev() {
  const last = totalSlides.value - 1
  if (last < 0) return

  direction.value = 'left'
  if (currentSlide.value === 0) {
    currentSlide.value = last
    return
  }
  currentSlide.value--
}

function goTo(i) {
  if (i === currentSlide.value || totalSlides.value <= 0) return
  direction.value = i > currentSlide.value ? 'right' : 'left'
  currentSlide.value = i
}

function onCarouselKeydown(e) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    goPrev()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    goNext()
  }
}
</script>

<style lang="postcss" scoped>
.carousel-dot {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.carousel-pagination button.active .carousel-dot {
  background: var(--first-color);
  transform: scale(1.08);
}
</style>

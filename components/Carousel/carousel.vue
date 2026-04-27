<template>
  <div class="flex flex-col justify-center overflow-hidden">
    <slot :visibleSlide="currentSlide" :direction="direction"></slot><button class="absolute top-1/2 left-2.5 xl:left-4"
      @click.prevent="goPrev">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button class="absolute top-1/2 right-2.5 left-auto xl:right-4" @click.prevent="goNext">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="carousel-pagination mt-2 w-full text-center">
      <button v-for="n in getSlideCount" :key="n" :class="{ active: n - 1 == currentSlide }"
        class="mx-0.5 inline-block h-2.5 w-2.5 rounded-lg bg-[var(--text-color-light)] opacity-80"
        @click="goTo(n - 1)"></button>
    </div>
  </div>
</template>

<script setup>
const index = ref(0);
const currentSlide = ref(0);
const getSlideCount = ref(null);
const direction = ref("right");
onMounted(() => {
  getSlideCount.value = document.querySelectorAll("[data-slide]").length;
});
function goNext() {
  if (currentSlide.value === getSlideCount.value - 1) {
    currentSlide.value = 0;
    direction.value = "right"
    return;
  }

  currentSlide.value++;
}
function goPrev() {
  if (currentSlide.value === 0) {
    currentSlide.value = getSlideCount.value - 1;
    direction.value = "left"
    return;
  }
  currentSlide.value--;
}
function goTo(i) {
  currentSlide.value = i;
}
</script>

<style lang="postcss" scoped>
.carousel-pagination button.active {
  background: var(--first-color);
}
</style>

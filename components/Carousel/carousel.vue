<template>
  <div class="carousel">
    <slot :visibleSlide="currentSlide" :direction="direction"></slot><button class="carousel-nav carousel-prev"
      @click.prevent="goPrev">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button class="carousel-nav carousel-next" @click.prevent="goNext">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="carousel-pagination">
      <button v-for="n in getSlideCount" :key="n" :class="{ active: n - 1 == currentSlide }"
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
.carousel {
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;

  &-nav {
    position: absolute;
    top: 50%;
  }

  &-next {
    right: 10px;
    left: auto;

    @screen xl {
      @apply right-4;
    }
  }

  &-prev {
    position: absolute;
    left: 10px;

    @screen xl {
      @apply left-4;
    }
  }

  &-pagination {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;

    button {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: var(--text-color-light);
      opacity: 0.8;
      border-radius: 0.5rem;
      margin: 0 0.1rem;

      &.active {
        background: var(--first-color);
      }
    }
  }
}
</style>

<template>
  <div class="carousel">
    <slot></slot
    ><button class="carousel-nav carousel-prev" @click.prevent="prev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button class="carousel-nav carousel-next" @click.prevent="next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <div class="carousel-pagination">
      <button
        v-for="n in slidesCount"
        :key="n"
        :class="{ active: n - 1 == index }"
        @click="goto(n - 1)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      slides: [],
      direction: 'right',
    }
  },
  computed: {
    slidesCount() {
      return this.slides.length
    },
  },
  mounted() {
    this.slides = this.$children
  },
  methods: {
    next() {
      this.index++
      this.direction = 'right'
      if (this.index >= this.slidesCount) {
        this.index = 0
      }
    },
    prev() {
      this.index--
      this.direction = 'left'
      if (this.index < 0) {
        this.index = this.slidesCount - 1
      }
    },
    goto(index) {
      this.direction = index > this.index ? 'right' : 'left'
      this.index = index
    },
  },
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
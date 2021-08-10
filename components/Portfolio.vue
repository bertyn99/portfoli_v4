<template>
  <section id="portfolio" class="portfolio section">
    <h2 class="section-title">Portfolio</h2>
    <span class="section-subtitle">Derniers Projet</span>
    <div class="portfolio-container container mx-auto px-4 sm:px-6 lg:px-8">
      <carousel>
        <carousel-slide v-for="(p, i) in projects" :key="i" :index="i">
          <div class="portfolio-content grid">
            <img :src="`/img/${p.img}`" alt="" class="portfolio-img" />
            <div class="portfolio-data">
              <h3 class="portfolio-title">{{ p.name }}</h3>
              <p class="portfolio-description">
                {{ p.desc }}
              </p>
              <a
                :href="p.link"
                class="button button-flex button-small portfolio-button"
                >Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div></div
        ></carousel-slide>
      </carousel>
    </div>
  </section>
</template>

<script>
import Carousel from '@/components/Carousel/carousel.vue'
import CarouselSlide from '@/components/Carousel/carouselSlide.vue'
export default {
  components: { Carousel, CarouselSlide },
  data() {
    return {
      projects: [
        {
          name: 'Site web Moderne',
          img: 'hawa.png',
          link: 'https://www.hawabowls.com/',
          desc: 'Site web adapté responsive avec des composants ui et des intéractions animées.',
        },
        {
          name: 'Click n Chill',
          link: 'https://clicknchill.net/',
          img: 'v2.png',
          desc: 'Extension chrome qui permet de synchroniser une série Netflix à plusieurs personnes.',
        },
      ],
    }
  },
}
</script>

<style lang="postcss">
.portfolio {
  &-contianer {
    overflow: initial;
  }
  &-content {
    @apply py-12 px-6;
    @screen md {
      @apply grid-cols-2 gap-6;
    }
    @screen lg {
      @apply items-center;
    }
  }
  &-img {
    width: 256px;
    min-height: 150px;
    @apply rounded-lg object-cover justify-self-center;
    @screen lg {
      @apply w-80;
    }
  }
  &-title {
    @apply text-lg mb-2;
  }
  &-description {
    @apply mb-3;
  }
  &-button:hover > .button-icon {
    @apply transform translate-x-2;
  }
}
</style>
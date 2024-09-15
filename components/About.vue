<template>
  <section id="about" class="about section">
    <h2 ref="title" class="section-title">A propos</h2>
    <span ref="subtitle" class="section-subtitle">Ma présentation</span>
    <div class="about-container container grid mx-auto px-4 sm:px-6 lg:px-8">
      <img ref="image" src="/img/pose1.jpg" class="about-img" alt="" />
      <div ref="content" class="about-data">
        <p class="about-description">
          Je suis un développeur web passionné et polyvalent, maîtrisant les technologies front-end, notamment les
          frameworks React et Vue.js. Côté back-end, je dispose d'une solide expérience avec Node.js, Laravel,
          AdonisJS et Express. En matière de gestion de contenu, j'utilise et customise efficacement des CMS tel que
          WordPress et Strapi, et j'ai une
          bonne compréhension du SEO pour optimiser la visibilité de vos projets en ligne.
          <br />
          Si vous recherchez un développeur dévoué, capable de transformer vos idées en réalité,
          n'hésitez pas à me contacter. Ensemble, nous pouvons créer des solutions innovantes et performantes adaptées à
          vos besoins.
        </p>
        <div class="about-info">
          <div>
            <span class="about-info-title">4+</span>
            <span class="about-info-name">Années <br />
              d'expériences</span>
          </div>
          <div>
            <span class="about-info-title">10+</span>
            <span class="about-info-name">Projets <br />
              Complétés</span>
          </div>
          <div>
            <span class="about-info-title">2</span>
            <span class="about-info-name">Entreprises<br />
              où j'ai travaillés</span>
          </div>
        </div>
        <div class="about-buttons">
          <the-button link="CV-Bertyn_Boulikou.pdf" class="button button-flex"
            download="CV-Bertyn Boulikou.pdf">Telecharger mon cv<svg xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-4 transition duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg></the-button>
        </div>
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
const image = ref(null)
const content = ref(null)

// Intersection Observer callback
const handleIntersect = ([entry]) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('animate-fadeIn')
    if (entry.target === image.value) {
      entry.target.classList.add('animate-slideInFromLeft')
    } else if (entry.target === content.value) {
      entry.target.classList.add('animate-slideInFromRight')
    }
  }
}

// Use Intersection Observer on elements
useIntersectionObserver(title, handleIntersect)
useIntersectionObserver(subtitle, handleIntersect)
useIntersectionObserver(image, handleIntersect)
useIntersectionObserver(content, handleIntersect)

</script>

<style lang="postcss">
.about {
  &-container {
    @screen md {
      @apply grid grid-cols-2;
    }

    @screen lg {
      @apply gap-20;
    }
  }

  &-img {
    @apply w-48 aspect-[3/4] rounded-lg self-center justify-self-center;

    @screen md {
      @apply w-56;
    }

    @screen lg {
      width: 350px;
    }
  }

  &-description {
    @apply text-center mb-10;

    @screen lg {
      text-align: initial;
    }
  }

  &-info {
    @apply flex justify-evenly mb-10;

    @screen lg {
      @apply justify-between;
    }

    &-name {
      @apply block text-center text-xs;
    }

    &-title {
      @apply block text-center text-xl font-semibold text-primary-title;
    }
  }

  &-buttons {
    @apply flex justify-center;

    @screen lg {
      @apply justify-start;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.animate-slideInFromLeft {
  animation: slideInFromLeft 1s ease-in-out;
}

.animate-slideInFromRight {
  animation: slideInFromRight 1s ease-in-out;
}
</style>

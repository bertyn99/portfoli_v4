<template>
  <section id="about" class="about section">
    <h2 class="section-title">A propos</h2>
    <span class="section-subtitle">Ma présentation</span>
    <div class="about-container container grid mx-auto px-4 sm:px-6 lg:px-8">
      <img src="/img/pose1.jpg" class="about-img" alt="" />
      <div class="about-data">
        <p class="about-description">
          Web developper junior, qui grâce a ces projet à acquis beaucoup de
          connaissance, en travaillant sur des technologie web tels que vuejs,
          angular, ionic,..etc. J'aime me challenge et apprendre de nouvelle
          chose.
        </p>
        <div class="about-info">
          <div>
            <span class="about-info-title">3+</span>
            <span class="about-info-name"
              >Année <br />
              d'expériences</span
            >
          </div>
          <div>
            <span class="about-info-title">8+</span>
            <span class="about-info-name"
              >Projet <br />
              Complétés</span
            >
          </div>
          <div>
            <span class="about-info-title">2</span>
            <span class="about-info-name"
              >Entreprise<br />
              où j'ai travaillé</span
            >
          </div>
        </div>
        <div class="about-buttons">
          <the-button link="/Bertyn_Boulikou_CV.pdf" class="button button-flex"
            >Telecharger mon cv<svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-4 transition duration-1000"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              /></svg
          ></the-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TheButton from './TheButton.vue'
export default {
  components: { TheButton },
}
</script>

<style lang="postcss">
.about {
  &-container {
    @screen md {
      @apply grid grid-cols-2;
    }
  }
  &-img {
    @apply w-48 rounded-lg self-center justify-self-center;
    @screen md {
      @apply w-56;
    }
  }
  &-description {
    @apply text-center mb-10;
  }
  &-info {
    @apply flex justify-evenly mb-10;
    &-name {
      @apply block text-center text-xs;
    }
    &-title {
      @apply block  text-center text-xl font-semibold text-primary-title;
    }
  }
  &-buttons {
    @apply flex justify-center;
  }
}
</style>
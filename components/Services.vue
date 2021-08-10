<template>
  <section id="services" class="services section">
    <h2 class="section-title">Services</h2>
    <span class="section-subtitle">Que puis-je offrir?</span>
    <div
      class="services-container container grid mx-auto px-12 sm:px-14 lg:px-20"
    >
      <div v-for="(service, i) in services" :key="i" class="services-content">
        <div>
          <svg
            v-if="service.name == 'Ux/Ui'"
            class="h-6 w-6 text-primary mb-4 lg:h-8 lg:w-8"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
            />
          </svg>
          <svg
            v-if="service.name == 'Website'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-primary mb-4 lg:h-8 lg:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <svg
            v-if="service.name == 'Server'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-primary mb-4 lg:h-8 lg:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
            />
          </svg>
          <h3 class="services-title">
            {{ service.name }} <br />
            {{ service.post }}
          </h3>
        </div>

        <!--    <span
          class="button button-flex button-small button-link services-button"
        ></span> -->
        <div
          class="services-button button-small button-flex button-link"
          @click="service.isOpen = !service.isOpen"
        >
          Voir plus
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="button-icon"
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
        </div>
        <services-modal
          v-if="service.isOpen"
          :class="[service.isOpen ? 'active-modal' : '']"
          :service="service"
          @close-modal="close(i)"
        ></services-modal>
      </div>
    </div>
  </section>
</template>

<script>
import ServicesModal from './ServicesModal.vue'

export default {
  components: { ServicesModal },
  data() {
    return {
      services: [
        {
          name: 'Ux/Ui',
          post: 'Designer',
          isOpen: false,
          skills: [
            'Je developpe des interface utilisateur',
            'Developpement de page web',
            'Je crée des intéraction avec des élement Ux',
          ],
        },
        {
          name: 'Website',
          post: 'Front-End',
          isOpen: false,
          skills: [
            'Je developpe des interface utilisateur',
            'Developpement de page web',
          ],
        },
        {
          name: 'Server',
          post: 'Back-End',
          isOpen: false,
          skills: [
            'Je developpe des serveur Api Rest',
            "Je developpe des systeme d'administration",
            "Je crée des systeme d'authentification",
          ],
        },
      ],
    }
  },
  methods: {
    close(v) {
      this.services[v].isOpen = false
    },
  },
}
</script>

<style lang="postcss">
.services {
  &-container {
    @apply grid-cols-1 gap-6;
    @screen md {
      @apply grid-cols-2;
    }
    @screen lg {
      @apply grid-cols-3 justify-center;
    }
    @screen xl {
      grid-template-columns: repeat(3, 238px);
    }
  }
  &-content {
    @apply relative bg-primary-body pt-14 pr-14 pl-5 pb-6 rounded shadow-sm transition duration-300;
    @screen lg {
      @apply pt-24 pr-0 pl-8 pb-10;
    }
    &:hover {
      @apply shadow-md;
    }
  }
  &-title {
    @apply text-lg font-medium mb-4;
  }
  &-button {
    @apply cursor-pointer text-sm;
    &:hover > .button-icon {
      @apply transform translate-x-2;
    }
  }
}
.active-modal {
  opacity: 1;
}
</style>
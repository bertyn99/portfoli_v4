<template>
  <transition>
    <div class="services-modal">
      <div class="services-modal-content">
        <h4 class="services-modal-title">
          {{ service.name }} <br />
          {{ service.post }}
        </h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 services-modal-close"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="closeModal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <ul class="services-modal-services grid">
          <li
            v-for="(skill, i) in service.skills"
            :key="i"
            class="services-modal-service"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 services-modal-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{{ skill }}</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style lang="postcss">
.services-modal {
  @apply fixed top-0 inset-x-0 h-screen bg-black bg-opacity-80 flex items-center justify-center px-2 py-4 z-30 opacity-0 transition duration-500;
  &-content {
    @apply relative bg-primary-body p-6 rounded-lg;
    @screen lg {
      width: 450px;
    }
  }

  &-services {
    @apply gap-4;
  }
  &-service {
    @apply flex;
  }
  &-title {
    @apply text-lg font-medium mb-6;
  }
  &-close {
    @apply absolute top-4 right-4 text-2xl text-primary cursor-pointer;
  }
  &-icon {
    @apply text-primary mr-1;
  }
}
</style>
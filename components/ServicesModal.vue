<template>
  <transition>
    <div class="fixed top-0 inset-x-0 h-screen bg-black bg-opacity-80 flex items-center justify-center px-2 py-4 z-30 opacity-0 transition duration-500">
      <div class="relative rounded-lg bg-primary-body p-6 lg:w-[450px]">
        <h4 class="mb-6 text-lg font-medium">
          {{ service.name }} <br />
          {{ service.post }}
        </h4>
        <button
          type="button"
          class="touch-target-square absolute top-2 right-2 text-primary"
          aria-label="Fermer la fenêtre"
          @click="closeModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul class="grid gap-4">
          <li
            v-for="(skill, i) in service.skills"
            :key="i"
            class="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-6 w-6 text-primary"
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

<style></style>

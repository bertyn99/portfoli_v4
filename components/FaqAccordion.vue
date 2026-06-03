<script setup lang="ts">
defineProps<{
  items: Array<{ question: string; answer: string }>
}>()
</script>

<template>
  <div class="grid gap-4">
    <details
      v-for="(item, index) in items"
      :key="index"
      class="rounded-lg border border-primary/12 bg-primary-container transition open:border-primary"
    >
      <summary class="cursor-pointer px-5 py-4 font-medium text-primary-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container">
        {{ item.question }}
      </summary>
      <p class="border-t border-primary/12 px-5 pb-4 pt-3 text-sm text-primary-text">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>

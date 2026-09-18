<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui"

const props = defineProps<{
  items: Array<{ question: string; answer: string }>
}>()

const accordionItems = computed<AccordionItem[]>(() =>
  props.items.map((item) => ({
    label: item.question,
    content: item.answer,
  })),
)
</script>

<template>
  <UAccordion :items="accordionItems" type="multiple" />
</template>

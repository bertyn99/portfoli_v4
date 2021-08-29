<template>
  <div class="flex" :class="[justifyClass]">
    <div v-if="prev" class="flex flex-col">
      <span class="text-primary-text text-base">Post Précedent</span>
      <NuxtLink
        :to="{ name: 'blog-articles-slug', params: { slug: prev.slug } }"
        class="flex font-bold hover:text-primary"
      >
        {{ prev.title }}
      </NuxtLink>
    </div>

    <div v-if="next" class="flex flex-col">
      <span class="text-primary-text text-base">Post suivant</span>
      <NuxtLink
        :to="{ name: 'blog--articles-slug', params: { slug: next.slug } }"
        class="font-bold hover:text-primary"
      >
        {{ next.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    justifyClass() {
      return this.prev == null ? 'justify-end' : 'justify-between'
    },
  },
}
</script>

<style>
</style>
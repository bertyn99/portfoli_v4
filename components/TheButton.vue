<template>
  <a v-if="download" :href="link" :download="download"><slot></slot></a>
  <nuxt-link v-else :to="link"><slot></slot></nuxt-link>
</template>

<script>
export default {
  props: {
    link: { type: String, required: true, default: '' },
    download: { type: String, default: null },
  },
}
</script>

<style>
</style>
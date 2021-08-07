<template>
  <nuxt-link :to="link"><slot></slot> </nuxt-link>
</template>

<script>
export default {
  props: {
    link: { type: String, require: true, default: '' },
  },
}
</script>

<style>
</style>
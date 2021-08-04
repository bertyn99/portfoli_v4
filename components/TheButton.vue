<template>
  <nuxt-link
    :to="link"
    class="
      inline-flex
      justify-between
      bg-primary
      text-white
      p-4
      rounded-lg
      hover:bg-primary-alt
    "
    ><slot></slot>
  </nuxt-link>
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
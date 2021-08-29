<template>
  <div
    class="
      rounded-md
      w-full
      max-w-3xl
      h-auto
      mx-auto
      mb-4
      bg-white
      shadow-md
      overflow-hidden
    "
  >
    <div class="article-img">
      <img
        :src="imgUrl"
        class="w-full h-96 max-h-96 object-cover"
        :alt="title"
      />
      <div
        class="
          rounded-md
          w-18
          h-18
          lg:w-20
          lg:h-20
          bg-blue-500
          absolute
          left-3
          -bottom-6
          px-2
          text-center
        "
      >
        <span class="text-3xl lg:text-4xl text-white font-semibold">24</span>
        <p class="text-xl text-white font-normal">Aout</p>
      </div>
    </div>
    <div class="article-details">
      <nuxt-link
        :to="{ name: 'blog-articles-slug', params: { slug: slug } }"
        class="text-xl"
        >{{ title }}</nuxt-link
      >
      <p class="text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    slug: { type: String, default: '' },
    imgUrl: { type: String, default: 'none' },
  },
}
</script>

<style lang="postcss" scoped>
.article-img {
  position: relative;
  width: 100%;
  flex: 4;
}

.article-details {
  flex: 2;
  @apply pl-8 pr-1 pt-8 pb-4;
}
</style>

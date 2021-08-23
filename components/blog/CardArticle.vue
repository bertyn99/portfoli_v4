<template>
  <div class="rounded-md w-full h-96 mb-4 bg-white shadow-md overflow-hidden">
    <div class="h-3/5 relative">
      <img src="imgUrl" class="w-full h-full object-cover" alt="" />
      <div
        class="
          rounded-md
          w-20
          h-20
          bg-blue-500
          absolute
          left-3
          -bottom-6
          px-2
          text-center
        "
      >
        <span class="text-4xl text-white font-semibold">24</span>
        <p class="text-xl text-white font-normal">Aout</p>
      </div>
    </div>
    <div class="pl-8 pr-1 pt-8 pb-2">
      <span class="text-xl">{{ title }}</span>
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
    imgUrl: { type: String, default: 'none' },
  },
}
</script>

<style></style>

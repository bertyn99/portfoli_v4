<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    siteName?: string
    badge?: string
  }>(),
  {
    title: "Développeur web freelance",
    description: "Portfolio, réalisations et contact",
    siteName: "Bertyn Boulikou",
    badge: "bertynboulikou.com",
  },
)
</script>

<template>
  <div
    class="flex h-[630px] w-[1200px] flex-col justify-between bg-[#120f1f] p-16 text-white"
    style="font-family: Barlow, system-ui, sans-serif"
  >
    <div class="flex items-center justify-between">
      <p class="text-2xl font-semibold text-[#a78bfa]">
        {{ siteName }}
      </p>
      <p class="text-xl text-white/70">
        {{ badge }}
      </p>
    </div>

    <div class="max-w-[920px]">
      <h1 class="mb-6 text-6xl font-bold leading-tight">
        {{ title }}
      </h1>
      <p class="text-3xl leading-snug text-white/85">
        {{ description }}
      </p>
    </div>

    <div class="flex items-center gap-4">
      <div class="h-2 w-24 rounded-full bg-[#7c5cff]" />
      <p class="text-xl text-white/60">Nuxt · Vue · TypeScript</p>
    </div>
  </div>
</template>

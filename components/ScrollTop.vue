<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY >= 560
}

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <UButton
    v-show="visible"
    icon="i-mdi-arrow-up"
    aria-label="Retour en haut de la page"
    class="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-10 lg:bottom-8"
    @click="goTop"
  />
</template>

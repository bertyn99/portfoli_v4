<script setup lang="ts">
import { fr } from "@nuxt/ui/locale"
</script>

<template>
  <UApp :locale="fr">
    <div class="site-grain" aria-hidden="true" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

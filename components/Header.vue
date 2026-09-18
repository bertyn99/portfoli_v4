<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Accueil",
    to: "/",
    exact: true,
    active: route.path === "/" && !route.hash,
  },
  {
    label: "A propos",
    to: "/#about",
    exactHash: true,
  },
  {
    label: "Compétences",
    to: "/#skills",
    exactHash: true,
  },
  {
    label: "Audit",
    to: "/audit-gratuit",
    active: route.path.startsWith("/audit-gratuit"),
  },
  {
    label: "Devis",
    to: "/devis",
    active: route.path.startsWith("/devis"),
  },
  {
    label: "Portfolio",
    to: "/#portfolio",
    exactHash: true,
  },
  {
    label: "Contact",
    to: "/#contact",
    exactHash: true,
  },
])

const mobileItems = computed(() => [
  { label: "Accueil", to: "/", icon: "i-mdi-home-outline", active: route.path === "/" && !route.hash },
  { label: "A propos", to: "/#about", icon: "i-mdi-account-outline", active: route.hash === "#about" },
  { label: "Compétences", to: "/#skills", icon: "i-mdi-puzzle-outline", active: route.hash === "#skills" },
  { label: "Audit", to: "/audit-gratuit", icon: "i-mdi-check-circle-outline", active: route.path.startsWith("/audit-gratuit") },
  { label: "Devis", to: "/devis", icon: "i-mdi-calculator-variant-outline", active: route.path.startsWith("/devis") },
  { label: "Portfolio", to: "/#portfolio", icon: "i-mdi-flask-outline", active: route.hash === "#portfolio" },
  { label: "Contact", to: "/#contact", icon: "i-mdi-email-outline", active: route.hash === "#contact" },
])
</script>

<template>
  <UHeader
    title="Bertyn Boulikou"
    to="/"
    :toggle="false"
    class="hidden lg:block"
  >
    <template #title>
      <img src="/BB.png" alt="Bertyn Boulikou" class="h-8 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
      <UButton
        to="https://cal.com/bertyn-boulikou"
        target="_blank"
        label="Discutons de votre projet"
        trailing-icon="i-mdi-email-outline"
      />
    </template>
  </UHeader>

  <header v-show="!menuOpen" class="header-mobile">
    <NuxtLink to="/" class="inline-flex items-center" aria-label="Bertyn Boulikou">
      <img src="/BB.png" alt="" class="h-8 w-auto" />
    </NuxtLink>
    <div class="flex items-center gap-0.5">
      <UColorModeButton />
      <UButton
        icon="i-mdi-apps"
        color="neutral"
        variant="ghost"
        aria-label="Ouvrir le menu"
        @click="menuOpen = true"
      />
    </div>
  </header>

  <UDrawer
    v-model:open="menuOpen"
    direction="bottom"
    :handle="false"
    :ui="{
      content: 'lg:hidden rounded-t-3xl bg-primary-input dark:bg-primary-container',
    }"
  >
    <template #content>
      <nav class="px-5 pb-3 pt-8" aria-label="Navigation principale">
        <ul class="m-0 grid list-none grid-cols-4 gap-y-7 p-0">
          <li v-for="item in mobileItems" :key="item.to" class="flex justify-center">
            <NuxtLink
              :to="item.to"
              class="flex min-h-11 w-full max-w-[4.75rem] flex-col items-center gap-1.5 text-[0.7rem] leading-tight text-primary-title"
              :class="item.active ? 'text-primary' : 'text-primary-title'"
              @click="menuOpen = false"
            >
              <UIcon :name="item.icon" class="size-6" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-4 flex justify-end">
          <UButton
            icon="i-mdi-close"
            color="primary"
            variant="ghost"
            aria-label="Fermer le menu"
            @click="menuOpen = false"
          />
        </div>
      </nav>
    </template>
  </UDrawer>
</template>

<style lang="postcss">
.header-mobile {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  height: calc(3.75rem + env(safe-area-inset-bottom, 0px));
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem env(safe-area-inset-bottom, 0px);
  background-color: var(--container-color);
  box-shadow: 0 -1px 4px hsl(var(--hue-color) 8% 15% / 0.08);
}

.dark .header-mobile {
  box-shadow: 0 -1px 4px hsl(var(--hue-color) 8% 8% / 0.45);
}

@media (min-width: 768px) {
  .header-mobile {
    display: none;
  }
}
</style>

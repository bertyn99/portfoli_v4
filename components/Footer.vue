<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const links: NavigationMenuItem[] = [
  { label: "Services", to: "/#services" },
  { label: "Portfolio", to: "/#portfolio" },
  { label: "Contact", to: "/#contact" },
  { label: "Devis gratuit", to: "/devis" },
  { label: "Audit gratuit", to: "/audit-gratuit" },
  { label: "Blog", to: "https://sciredev.com", target: "_blank" },
]
</script>

<template>
  <UFooter>
    <template #left>
      <div>
        <p class="text-lg font-display font-extrabold tracking-tight text-highlighted">Bertyn Boulikou</p>
        <p class="text-sm text-muted">Développeur full stack freelance</p>
      </div>
    </template>

    <UNavigationMenu :items="links" variant="link" />

    <template #right>
      <UButton
        icon="i-mdi-facebook"
        color="neutral"
        variant="ghost"
        to="https://www.facebook.com/helenbertyn.boulikoudamours"
        target="_blank"
        aria-label="Facebook"
      />
      <UButton
        icon="i-mdi-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/bertyn99"
        target="_blank"
        aria-label="GitHub"
      />
      <UButton
        icon="i-mdi-linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/in/bertyn-boulikou/"
        target="_blank"
        aria-label="LinkedIn"
      />
    </template>

    <template #bottom>
      <p class="w-full text-center text-xs text-muted">
        © Bertyn. Tous droits réservés
      </p>
    </template>
  </UFooter>
</template>

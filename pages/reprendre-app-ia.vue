<script setup lang="ts">
import { repriseFaq, reprisePageDescription, reprisePageTitle } from "@/data/site-identity"

const { pageUrl, site } = usePageSeo({
  path: "/reprendre-app-ia",
  title: reprisePageTitle,
  description: reprisePageDescription,
  ogTitle: "Reprendre une app vibe coding — Bertyn Boulikou",
  ogDescription: reprisePageDescription,
  ogBadge: "Reprise proto IA",
})

const siteBase = site.url.endsWith("/") ? site.url : `${site.url}/`
const identityId = `${siteBase}#identity`

const trustBadges = ["Audit 48h", "Patch avant rewrite", "Nantes et à distance"] as const

const tools = ["Cursor", "Lovable", "v0", "Bolt", "Claude Code"] as const

const failures = [
  {
    title: "Auth et secrets",
    text: "Clés en dur, sessions qui expirent, OAuth à moitié câblé, `.env` jamais documenté.",
  },
  {
    title: "Data et paiements",
    text: "Schéma instable, pas de migrations, Stripe en mode test, webhooks ignorés.",
  },
  {
    title: "Mise en prod",
    text: "Ça tourne en local. Vercel, Cloudflare ou un VPS : CORS, build, logs, backups.",
  },
  {
    title: "SEO et perf",
    text: "SPA générée que Google ne voit pas, images lourdes, pas de cache, titre unique partout.",
  },
] as const

const steps = [
  { index: "01", title: "Audit du proto", text: "Repo ou URL. Liste priorisée sous 48h ouvrées." },
  { index: "02", title: "Patch ciblé", text: "Auth, data, paiements, déploiement. Rewrite seulement si le fond est cassé." },
  { index: "03", title: "Mise en prod", text: "Environnements, monitoring minimal, passage de relais documenté." },
] as const

useSchemaOrg([
  defineWebPage({
    name: reprisePageTitle,
    description: reprisePageDescription,
    url: pageUrl,
    inLanguage: "fr-FR",
  }),
  {
    "@type": "Service",
    name: "Reprise d’application générée par IA",
    description: reprisePageDescription,
    provider: { "@id": identityId },
    areaServed: [
      { "@type": "City", name: "Nantes" },
      { "@type": "Country", name: "France" },
    ],
    serviceType: "Développement web freelance",
  },
  ...repriseFaq.map((item) =>
    defineQuestion({
      name: item.question,
      acceptedAnswer: item.answer,
    }),
  ),
])
</script>

<template>
  <main>
    <section class="shell-section pt-24 md:pt-28">
      <div class="container max-w-3xl">
        <p class="mb-3 text-sm font-semibold text-primary">Développeur web freelance · Nantes</p>
        <h1 class="section-title text-balance">
          App générée avec l’IA, bloquée avant la prod
        </h1>
        <p class="section-subtitle mt-5 text-lg">
          Un développeur web freelance pour finir ce que Cursor, Lovable, v0 ou Bolt a commencé :
          auth, data, paiements, déploiement.
        </p>
        <ul class="mt-8 flex flex-wrap gap-3" role="list">
          <li
            v-for="badge in trustBadges"
            :key="badge"
            class="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary"
          >
            {{ badge }}
          </li>
        </ul>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton to="/audit-gratuit?from=ia" size="lg" trailing-icon="i-mdi-arrow-right">
            Demander un audit du proto
          </UButton>
          <UButton to="/devis" size="lg" color="neutral" variant="outline">
            Estimer une reprise
          </UButton>
        </div>
      </div>
    </section>

    <section class="shell-section pt-0" aria-labelledby="tools-heading">
      <div class="container">
        <h2 id="tools-heading" class="text-base font-semibold uppercase tracking-wide text-primary">
          Outils concernés
        </h2>
        <ul class="mt-4 flex flex-wrap gap-2" role="list">
          <li
            v-for="tool in tools"
            :key="tool"
            class="rounded-md border border-neutral-200/90 px-3 py-1.5 text-sm text-primary-title dark:border-neutral-800"
          >
            {{ tool }}
          </li>
        </ul>
      </div>
    </section>

    <section class="shell-section pt-0" aria-labelledby="failures-heading">
      <div class="container">
        <h2 id="failures-heading" class="section-title">Ce qui casse le plus souvent</h2>
        <p class="section-subtitle">
          Le proto a l’air fini. La prod demande autre chose.
        </p>
        <ul class="mt-10 grid gap-8 sm:grid-cols-2" role="list">
          <li v-for="item in failures" :key="item.title">
            <h3 class="font-semibold text-primary-title">{{ item.title }}</h3>
            <p class="mt-2 text-primary-text">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="shell-section pt-0" aria-labelledby="process-heading">
      <div class="container">
        <h2 id="process-heading" class="section-title">Comment ça se passe</h2>
        <ol class="mt-10 grid gap-8 md:grid-cols-3">
          <li v-for="step in steps" :key="step.index">
            <p class="text-sm font-semibold text-primary">{{ step.index }}</p>
            <h3 class="mt-2 font-semibold text-primary-title">{{ step.title }}</h3>
            <p class="mt-2 text-primary-text">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="shell-section">
      <div class="container max-w-3xl">
        <h2 class="section-title mb-8">Questions fréquentes</h2>
        <FaqAccordion :items="[...repriseFaq]" />
      </div>
    </section>

    <section class="shell-section pt-0 pb-28">
      <div class="container max-w-3xl">
        <h2 class="section-title">Envoyez le proto</h2>
        <p class="mt-4 max-w-prose text-lg text-primary-text">
          URL, repo GitHub ou export Lovable. Je reviens avec ce qui bloque et dans quel ordre le corriger.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton to="/audit-gratuit?from=ia" size="lg" trailing-icon="i-mdi-arrow-right">
            Audit du proto
          </UButton>
          <UButton to="/#contact" size="lg" color="neutral" variant="outline">
            Écrire directement
          </UButton>
        </div>
      </div>
    </section>
  </main>
</template>

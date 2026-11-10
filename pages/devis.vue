<script setup lang="ts">
const title = "Devis gratuit — développement web & applications"
const description =
  "Estimez le coût de votre projet en quelques clics : site vitrine, application, e-commerce, automatisation. Devis gratuit et sans engagement."

const trustBadges = [
  { label: "Gratuit", icon: "i-lucide-check" },
  { label: "2 min", icon: "i-lucide-timer" },
  { label: "Sans engagement", icon: "i-lucide-unlock" },
] as const

const faqItems = [
  {
    question: "Le devis est-il engageant ?",
    answer:
      "Non. C'est une estimation indicative basée sur vos choix. Le devis final est affiné après un échange.",
  },
  {
    question: "Comment sont calculés les prix ?",
    answer:
      "Les estimations sont basées sur les tarifs du marché et mon expérience sur des projets similaires.",
  },
  {
    question: "Puis-je modifier mon projet ensuite ?",
    answer:
      "Oui. Le devis est un point de départ. Tout est ajustable lors de notre premier échange.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer:
      "Paiement en 3 fois : 30% à la commande, 40% à la livraison, 30% après la garantie.",
  },
]

const { pageUrl } = usePageSeo({
  path: "/devis",
  title,
  description,
  ogTitle: "Devis gratuit — développement web — Bertyn Boulikou",
  ogDescription:
    "Calculez le budget de votre projet web. Estimation instantanée et personnalisée.",
  ogBadge: "Devis en ligne",
})

useSchemaOrg([
  defineWebPage({
    name: title,
    description,
    url: pageUrl,
    inLanguage: "fr-FR",
  }),
  {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
])
</script>

<template>
  <div>
    <section class="devis-intro">
      <UContainer>
        <h1 class="devis-intro-title">Estimez votre projet</h1>
        <p class="devis-intro-lead">
          Quatre questions, une fourchette de prix. Rien n'est contractuel.
        </p>
        <ul class="mt-5 flex flex-wrap gap-2" role="list">
          <li v-for="badge in trustBadges" :key="badge.label">
            <UBadge
              color="primary"
              variant="subtle"
              :icon="badge.icon"
              size="md"
              :label="badge.label"
            />
          </li>
        </ul>
      </UContainer>
    </section>

    <DevisWizard />

    <section class="devis-faq" aria-labelledby="devis-faq-heading">
      <UContainer class="max-w-3xl">
        <h2 id="devis-faq-heading" class="devis-faq-title">Questions fréquentes</h2>
        <dl class="divide-y divide-default border-y border-default">
          <div
            v-for="item in faqItems"
            :key="item.question"
            class="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8"
          >
            <dt class="font-semibold text-highlighted">{{ item.question }}</dt>
            <dd class="text-default">{{ item.answer }}</dd>
          </div>
        </dl>
      </UContainer>
    </section>
  </div>
</template>

<style lang="postcss">
.devis-intro {
  @apply bg-primary-body pb-6 md:pb-8;
  padding-top: max(2.75rem, calc(var(--ui-header-height) + 1.75rem));
}

.devis-intro-title {
  @apply text-left text-3xl font-extrabold tracking-tight text-highlighted md:text-4xl;
  font-family: var(--font-family-display);
  letter-spacing: -0.03em;
  line-height: 1.15;
  text-wrap: balance;
}

.devis-intro-lead {
  @apply mt-3 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg;
}

.devis-faq {
  @apply bg-primary-body pb-20 md:pb-28;
  margin-top: 2.5rem;
  padding-top: 2.75rem;
  border-top: 1px solid color-mix(in oklch, var(--first-color) 12%, transparent);
}

.devis-faq-title {
  @apply mb-8 text-left text-2xl font-extrabold tracking-tight text-highlighted;
  font-family: var(--font-family-display);
  letter-spacing: -0.03em;
}
</style>

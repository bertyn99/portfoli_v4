<script setup lang="ts">
const site = useSiteConfig()
const pageUrl = useAbsoluteSiteUrl('/devis')
const ogImageUrl = useAbsoluteSiteUrl('/img/bertyn.png')

const title = 'Devis gratuit — développement web & applications'
const description =
  'Estimez le coût de votre projet web en quelques clics : site vitrine, application, e-commerce. Devis gratuit et sans engagement.'

const trustBadges = ['Gratuit', '2 min', 'Sans engagement'] as const

const faqItems = [
  {
    question: 'Le devis est-il engageant ?',
    answer:
      'Non. C\'est une estimation indicative basée sur vos choix. Le devis final est affiné après un échange.',
  },
  {
    question: 'Comment sont calculés les prix ?',
    answer:
      'Les estimations sont basées sur les tarifs du marché et mon expérience sur des projets similaires.',
  },
  {
    question: 'Puis-je modifier mon projet ensuite ?',
    answer:
      'Bien sûr. Le devis est un point de départ — tout est ajustable lors de notre premier échange.',
  },
  {
    question: 'Quels modes de paiement acceptez-vous ?',
    answer:
      'Paiement en 3 fois : 30% à la commande, 40% à la livraison, 30% après la garantie.',
  },
]

useSeoMeta({
  title,
  description,
  ogTitle: 'Devis gratuit — développement web — Bertyn Boulikou',
  ogDescription: 'Calculez le budget de votre projet web. Estimation instantanée et personnalisée.',
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogSiteName: site.name,
  ogUrl: pageUrl,
  ogImage: ogImageUrl,
  ogImageAlt: 'Devis développement web — Bertyn Boulikou',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImageUrl,
  robots: 'index, follow',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSchemaOrg([
  defineWebPage({
    name: title,
    description,
    url: pageUrl,
    inLanguage: 'fr-FR',
  }),
  {
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
])
</script>

<template>
  <main>
    <section class="shell-section pt-24 md:pt-28">
      <div class="container text-center">
        <h1 class="section-title text-2xl md:text-3xl">Créez votre devis</h1>
        <span class="section-subtitle">Estimation en ligne</span>
        <p class="mx-auto mb-8 max-w-2xl text-primary-text">
          Parcourez quatre étapes guidées : type de projet, fonctionnalités, détails — puis recevez une fourchette de prix adaptée.
        </p>
        <ul class="flex flex-wrap justify-center gap-3" role="list">
          <li
            v-for="badge in trustBadges"
            :key="badge"
            class="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary"
          >
            {{ badge }}
          </li>
        </ul>
      </div>
    </section>

    <DevisWizard />

    <section class="shell-section">
      <div class="container max-w-3xl">
        <h2 class="section-title">Questions fréquentes</h2>
        <span class="section-subtitle">FAQ</span>
        <FaqAccordion :items="faqItems" />
      </div>
    </section>
  </main>
</template>

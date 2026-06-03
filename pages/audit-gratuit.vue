<script setup lang="ts">
const site = useSiteConfig()
const pageUrl = useAbsoluteSiteUrl('/audit-gratuit')
const ogImageUrl = useAbsoluteSiteUrl('/img/bertyn.png')

const title = 'Audit gratuit de votre site web'
const description =
  'Analyse gratuite de votre site : performance, SEO, accessibilité et design. Rapport personnalisé livré en 48h, sans engagement.'

const faqItems = [
  {
    question: 'L\'audit est-il vraiment gratuit ?',
    answer:
      'Oui, sans engagement. Vous recevez un rapport détaillé sans avoir à payer quoi que ce soit.',
  },
  {
    question: 'Combien de temps prend l\'audit ?',
    answer: 'Vous recevez votre rapport sous 48h ouvrées.',
  },
  {
    question: 'Que contient le rapport ?',
    answer:
      'Analyse de performance (Core Web Vitals), SEO technique, accessibilité WCAG, et recommandations de design avec priorités.',
  },
  {
    question: 'Que faire après ?',
    answer:
      'Vous êtes libre de suivre les recommandations seul ou de me contacter pour un devis sur mesure.',
  },
]

useSeoMeta({
  title,
  description,
  ogTitle: 'Audit gratuit de votre site web — Bertyn Boulikou',
  ogDescription:
    'Découvrez les points d\'amélioration de votre site avec un audit gratuit : performance, SEO, accessibilité et design.',
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogSiteName: site.name,
  ogUrl: pageUrl,
  ogImage: ogImageUrl,
  ogImageAlt: 'Audit SEO et performance gratuit — Bertyn Boulikou',
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
        <h1 class="section-title text-2xl md:text-3xl">Audit gratuit de votre site web</h1>
        <span class="section-subtitle">Sans engagement</span>
        <p class="mx-auto mb-8 max-w-2xl text-primary-text">
          Recevez un rapport personnalisé : performance, SEO, accessibilité et design.
        </p>
        <ul class="flex flex-wrap justify-center gap-3" role="list">
          <li class="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
            Gratuit
          </li>
          <li class="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
            48h
          </li>
          <li class="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
            Sans engagement
          </li>
        </ul>
      </div>
    </section>

    <AuditForm />

    <section class="shell-section">
      <div class="container">
        <h2 class="section-title">Questions fréquentes</h2>
        <span class="section-subtitle">FAQ</span>
        <FaqAccordion :items="faqItems" />
      </div>
    </section>
  </main>
</template>

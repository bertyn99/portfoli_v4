export interface PageSeoOptions {
  path: string
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogBadge?: string
  robots?: string
}

/** Shared meta, canonical, and prerendered OG image (1200×630) for marketing pages. */
export function usePageSeo(options: PageSeoOptions) {
  const site = useSiteConfig()
  const pageUrl = useAbsoluteSiteUrl(options.path)

  const ogTitle = options.ogTitle ?? options.title
  const ogDescription = options.ogDescription ?? options.description

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle,
    ogDescription,
    ogType: "website",
    ogLocale: "fr_FR",
    ogSiteName: site.name,
    ogUrl: pageUrl,
    twitterCard: "summary_large_image",
    twitterTitle: ogTitle,
    twitterDescription: ogDescription,
    robots: options.robots ?? "index, follow, max-image-preview:large",
  })

  defineOgImageComponent("OgImagePortfolio", {
    title: ogTitle,
    description: ogDescription,
    siteName: site.name,
    badge: options.ogBadge ?? "bertynboulikou.com",
  })

  useHead({
    link: [{ rel: "canonical", href: pageUrl }],
    meta: [{ name: "author", content: "Bertyn Boulikou" }],
  })

  return { pageUrl, site }
}

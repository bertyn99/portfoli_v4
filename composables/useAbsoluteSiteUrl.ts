/** Resolve a site path to an absolute URL using `useSiteConfig().url`. */
export function useAbsoluteSiteUrl(path = "/") {
  const site = useSiteConfig()

  return computed(() => {
    try {
      return new URL(path, site.url).href
    } catch {
      return site.url
    }
  })
}

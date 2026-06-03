export function useEstimate() {
  const basePrices: Record<string, [number, number]> = {
    'Site vitrine': [800, 2500],
    'Application web': [3000, 12000],
    'E-commerce': [2500, 8000],
    'Landing page': [500, 1500],
    'Refonte / Redesign': [1000, 4000],
    Autre: [1000, 5000],
  }

  const featureAddons: Record<string, [number, number]> = {
    'Design UI/UX sur mesure': [300, 1500],
    'Responsive / Mobile-first': [200, 800],
    'CMS (gestion de contenu)': [500, 2000],
    'Authentification utilisateurs': [400, 1500],
    'Paiement en ligne': [500, 2000],
    'SEO & référencement': [200, 800],
    'Analytics & tracking': [100, 400],
    'Multi-langue': [300, 1000],
  }

  function calculate(projectType: string, features: string[]): { min: number; max: number } {
    const base = basePrices[projectType] ?? [1000, 5000]
    let min = base[0]
    let max = base[1]
    for (const f of features) {
      const addon = featureAddons[f]
      if (addon) {
        min += addon[0]
        max += addon[1]
      }
    }
    return { min, max }
  }

  return { calculate, basePrices, featureAddons }
}

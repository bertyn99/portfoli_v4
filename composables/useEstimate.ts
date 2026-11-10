export type ProjectTypeLabel =
  | 'Site vitrine'
  | 'Application web'
  | 'E-commerce'
  | 'Landing page'
  | 'Automatisation'
  | 'Refonte / Redesign'
  | 'Reprise app IA'
  | 'Autre'

export interface ProjectTypeDef {
  label: ProjectTypeLabel
  icon: string
  hint: string
  subtypes?: readonly string[]
}

export interface FeatureDef {
  label: string
  hint?: string
  types: readonly ProjectTypeLabel[]
}

export const PROJECT_TYPES = [
  {
    label: 'Site vitrine',
    icon: 'i-lucide-globe',
    hint: 'Présentation et pages clés',
    subtypes: ['Institutionnel', 'Blog / contenu', 'Portfolio'],
  },
  {
    label: 'Application web',
    icon: 'i-lucide-app-window',
    hint: 'SaaS, outil métier, portail',
    subtypes: ['SaaS', 'Outil métier interne', 'Espace client'],
  },
  {
    label: 'E-commerce',
    icon: 'i-lucide-shopping-bag',
    hint: 'Vente en ligne',
    subtypes: ['Boutique', 'Marketplace'],
  },
  {
    label: 'Landing page',
    icon: 'i-lucide-megaphone',
    hint: 'Campagne ciblée',
    subtypes: ['Campagne ads', 'Page produit'],
  },
  {
    label: 'Automatisation',
    icon: 'i-lucide-workflow',
    hint: 'n8n, Make, agents IA',
    subtypes: ['n8n / Make', 'Scripts & API', 'Agents IA'],
  },
  {
    label: 'Refonte / Redesign',
    icon: 'i-lucide-palette',
    hint: 'Site ou app existant',
    subtypes: ['Site vitrine', 'Application', 'E-commerce'],
  },
  {
    label: 'Reprise app IA',
    icon: 'i-lucide-bot',
    hint: 'Proto Cursor, Lovable, v0',
    subtypes: ['Cursor', 'Lovable / v0', 'Autre proto'],
  },
  {
    label: 'Autre',
    icon: 'i-lucide-ellipsis',
    hint: 'Projet sur mesure',
  },
] as const satisfies readonly ProjectTypeDef[]

export const FEATURES_CATALOG: readonly FeatureDef[] = [
  {
    label: 'Design UI/UX sur mesure',
    types: [
      'Site vitrine',
      'Application web',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Reprise app IA',
      'Autre',
    ],
  },
  {
    label: 'Responsive / Mobile-first',
    types: [
      'Site vitrine',
      'Application web',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Reprise app IA',
      'Autre',
    ],
  },
  {
    label: 'CMS (gestion de contenu)',
    types: ['Site vitrine', 'E-commerce', 'Refonte / Redesign', 'Autre'],
  },
  {
    label: 'Authentification utilisateurs',
    types: ['Application web', 'E-commerce', 'Reprise app IA', 'Automatisation', 'Autre'],
  },
  {
    label: 'Paiement en ligne',
    types: ['E-commerce', 'Application web', 'Autre'],
  },
  {
    label: 'SEO & référencement',
    types: [
      'Site vitrine',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Reprise app IA',
      'Autre',
    ],
  },
  {
    label: 'Analytics & tracking',
    types: [
      'Site vitrine',
      'Application web',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Autre',
    ],
  },
  {
    label: 'Multi-langue',
    types: [
      'Site vitrine',
      'Application web',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Autre',
    ],
  },
  {
    label: 'Performance (PageSpeed)',
    hint: 'Core Web Vitals, temps de chargement',
    types: [
      'Site vitrine',
      'Application web',
      'E-commerce',
      'Landing page',
      'Refonte / Redesign',
      'Reprise app IA',
      'Autre',
    ],
  },
  {
    label: 'Optimisation backend & charge',
    hint: 'Backend, requêtes, RAM, CPU, montée en charge',
    types: [
      'Application web',
      'E-commerce',
      'Automatisation',
      'Reprise app IA',
      'Refonte / Redesign',
      'Autre',
    ],
  },
  {
    label: 'Optimisation des coûts d\'infra',
    hint: 'Hébergement, cache, serverless',
    types: ['Application web', 'E-commerce', 'Automatisation', 'Reprise app IA', 'Autre'],
  },
  {
    label: 'MCP ou CLI',
    hint: 'Connecteur pour agents IA ou terminal',
    types: ['Application web', 'Automatisation', 'Reprise app IA', 'Autre'],
  },
  {
    label: 'Booking / réservation',
    hint: 'Calendrier, créneaux, paiements',
    types: ['Site vitrine', 'Application web', 'Autre'],
  },
  {
    label: 'Refacto / structuration complète',
    hint: 'Architecture, dossiers, dette technique du proto',
    types: ['Reprise app IA', 'Autre'],
  },
  {
    label: 'Tests poussés pour agents IA',
    hint: 'E2E, régression, benchmarks de vitesse',
    types: ['Reprise app IA', 'Application web', 'Autre'],
  },
  {
    label: 'Audit du proto',
    hint: 'Qualité, risques, plan de reprise',
    types: ['Reprise app IA', 'Autre'],
  },
]

export function featuresForType(projectType: string): FeatureDef[] {
  if (projectType === 'Autre') return [...FEATURES_CATALOG]
  return FEATURES_CATALOG.filter((feature) =>
    feature.types.includes(projectType as ProjectTypeLabel),
  )
}

export function useEstimate() {
  const basePrices: Record<string, [number, number]> = {
    'Site vitrine': [800, 2500],
    'Application web': [3000, 12000],
    'E-commerce': [2500, 8000],
    'Landing page': [500, 1500],
    Automatisation: [1200, 5000],
    'Refonte / Redesign': [1000, 4000],
    'Reprise app IA': [1500, 6000],
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
    'Performance (PageSpeed)': [300, 1200],
    'Optimisation backend & charge': [400, 1500],
    'Optimisation des coûts d\'infra': [400, 1500],
    'MCP ou CLI': [500, 2000],
    'Booking / réservation': [400, 1800],
    'Refacto / structuration complète': [800, 3500],
    'Tests poussés pour agents IA': [600, 2500],
    'Audit du proto': [400, 1500],
  }

  const subtypeAddons: Record<string, [number, number]> = {
    Marketplace: [800, 3000],
    SaaS: [500, 2000],
    'Agents IA': [500, 2500],
    'Espace client': [400, 1500],
  }

  function calculate(
    projectType: string,
    features: string[],
    subtype?: string,
  ): { min: number; max: number } {
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
    if (subtype) {
      const extra = subtypeAddons[subtype]
      if (extra) {
        min += extra[0]
        max += extra[1]
      }
    }
    return { min, max }
  }

  return {
    calculate,
    basePrices,
    featureAddons,
    subtypeAddons,
    projectTypes: PROJECT_TYPES,
    featuresCatalog: FEATURES_CATALOG,
    featuresForType,
  }
}

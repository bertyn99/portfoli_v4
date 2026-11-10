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

export const TYPE_ENVELOPES: Record<ProjectTypeLabel, [number, number]> = {
  'Site vitrine': [450, 2000],
  'Application web': [3000, 12000],
  'E-commerce': [2500, 8000],
  'Landing page': [500, 1500],
  Automatisation: [1200, 5000],
  'Refonte / Redesign': [1000, 4000],
  'Reprise app IA': [1500, 6000],
  Autre: [1000, 5000],
}

const FEATURE_WEIGHTS: Record<string, [number, number]> = {
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

const SUBTYPE_WEIGHTS: Record<string, [number, number]> = {
  Institutionnel: [200, 600],
  'Blog / contenu': [300, 900],
  Portfolio: [150, 500],
  SaaS: [500, 2000],
  'Outil métier interne': [300, 1200],
  'Espace client': [400, 1500],
  Boutique: [200, 800],
  Marketplace: [800, 3000],
  'Campagne ads': [100, 400],
  'Page produit': [200, 700],
  'n8n / Make': [200, 800],
  'Scripts & API': [300, 1200],
  'Agents IA': [500, 2500],
  'Site vitrine': [200, 800],
  Application: [500, 2000],
  'E-commerce': [400, 1800],
  Cursor: [300, 1200],
  'Lovable / v0': [200, 800],
  'Autre proto': [250, 1000],
}

function addonWeight(addon?: [number, number]) {
  if (!addon) return 0
  return (addon[0] + addon[1]) / 2
}

function clampQuote(value: number, lo: number, hi: number) {
  const rounded = Math.round(value / 50) * 50
  return Math.min(hi, Math.max(lo, rounded))
}

function availableWeightForType(projectType: string) {
  let availableWeight = 0
  for (const feature of featuresForType(projectType)) {
    availableWeight += addonWeight(FEATURE_WEIGHTS[feature.label])
  }
  const typeDef = PROJECT_TYPES.find((item) => item.label === projectType)
  let maxSubtypeWeight = 0
  for (const option of typeDef?.subtypes ?? []) {
    maxSubtypeWeight = Math.max(maxSubtypeWeight, addonWeight(SUBTYPE_WEIGHTS[option]))
  }
  return availableWeight + maxSubtypeWeight
}

export function calculateEstimate(
  projectType: string,
  features: string[],
  subtype?: string,
): { min: number; max: number } {
  const [lo, hi] = TYPE_ENVELOPES[projectType as ProjectTypeLabel] ?? [1000, 5000]
  const span = hi - lo

  let selectedWeight = 0
  for (const feature of features) {
    selectedWeight += addonWeight(FEATURE_WEIGHTS[feature])
  }
  if (subtype) selectedWeight += addonWeight(SUBTYPE_WEIGHTS[subtype])
  if (selectedWeight === 0) return { min: lo, max: hi }

  const availableWeight = availableWeightForType(projectType)
  const t = availableWeight > 0 ? Math.min(1, selectedWeight / availableWeight) : 0
  const min = clampQuote(lo + span * 0.55 * t, lo, hi)
  return { min: Math.min(min, hi), max: hi }
}

export function useEstimate() {
  return {
    calculate: calculateEstimate,
    basePrices: TYPE_ENVELOPES,
    featureAddons: FEATURE_WEIGHTS,
    subtypeAddons: SUBTYPE_WEIGHTS,
    projectTypes: PROJECT_TYPES,
    featuresCatalog: FEATURES_CATALOG,
    featuresForType,
  }
}

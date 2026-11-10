/** Shared Person / local SEO fields for schema.org identity and the homepage graph. */

export const sitePersonKnowsAbout = [
  "Développement web",
  "Développement frontend",
  "Développement backend",
  "Full stack",
  "Nuxt",
  "Vue.js",
  "TypeScript",
  "Applications web",
  "Intégration API",
  "Automatisation de workflows",
  "Intelligence artificielle appliquée",
] as const

export const sitePersonSameAs = [
  "https://github.com/bertyn99",
  "https://www.linkedin.com/in/bertyn-boulikou/",
  "https://www.facebook.com/helenbertyn.boulikoudamours",
] as const

/** Used in `nuxt.config` `schemaOrg.identity` and merged into page-level schema. */
export function buildSitePersonIdentity(siteUrl: string, portraitPath = "/img/bertyn.png") {
  const description =
    "Développeur web freelance à Nantes. Front-end Nuxt/Vue, back-end, et reprise d’apps commencées avec Cursor, Lovable ou v0 jusqu’à la mise en prod."

  return {
    type: "Person" as const,
    name: "Bertyn Boulikou",
    url: siteUrl,
    image: portraitPath,
    description,
    jobTitle: "Développeur web full stack — freelance",
    inLanguage: "fr-FR",
    sameAs: [...sitePersonSameAs],
    knowsAbout: [...sitePersonKnowsAbout],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nantes",
      addressRegion: "Pays de la Loire",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Nantes" },
      { "@type": "AdministrativeArea", name: "Loire-Atlantique" },
      { "@type": "Country", name: "France" },
    ],
  }
}

export const homePageTitle = "Développeur web freelance à Nantes"

export const homePageDescription =
  "Développeur web freelance à Nantes. Je reprends les apps commencées avec Cursor, Lovable ou v0, je corrige auth, data et mise en prod. Devis et audit."

export const reprisePageTitle = "Reprendre une app vibe coding"

export const reprisePageDescription =
  "Proto Cursor, Lovable, v0 ou Bolt bloqué avant la prod. Un développeur web freelance à Nantes pour corriger auth, paiements, data et déploiement."

/** Visible FAQ + FAQ schema (fan-out queries autour de « développeur Nantes »). */
export const homeLocalFaq = [
  {
    question: "Cherchez-vous un développeur web freelance à Nantes ?",
    answer:
      "Oui : je suis basé à Nantes et j’accompagne startups, PME et équipes produit en France, en présentiel ponctuel ou à distance. Contact via le formulaire ou LinkedIn.",
  },
  {
    question: "Proposez-vous du développement front-end à Nantes ?",
    answer:
      "Oui. Interfaces soignées avec Vue, Nuxt et TypeScript : sites vitrines, dashboards, performances, accessibilité et SEO technique.",
  },
  {
    question: "Faites-vous du développement back-end et des API ?",
    answer:
      "Oui. APIs REST, logique métier, persistance et déploiement (Node/Nitro, Laravel ou stack adaptée au projet), en lien avec le front Nuxt.",
  },
  {
    question: "Intégration et automatisation : quels types de projets ?",
    answer:
      "Connexion CRM, formulaires, webhooks, synchronisation de données, tâches récurrentes et workflows (scripts, jobs, outils no-code/low-code quand c’est pertinent).",
  },
  {
    question: "Travaillez-vous sur des projets avec de l’IA ?",
    answer:
      "Oui : assistants, recherche, APIs LLM, et surtout la reprise de prototypes générés (Cursor, Lovable, v0, Bolt) pour les rendre livrables.",
  },
] as const

export const repriseFaq = [
  {
    question: "Vous touchez aux apps générées avec Cursor, Lovable, v0 ou Bolt ?",
    answer:
      "Oui. J’ouvre le repo, je liste ce qui casse (auth, env, data, paiements, SEO, déploiement), puis je corrige ce qui bloque la mise en prod.",
  },
  {
    question: "Vous réécrivez tout depuis zéro ?",
    answer:
      "Seulement si le modèle de données ou l’auth est irrécupérable. Le plus souvent on patche : secrets, migrations, tests sur le chemin critique, puis on déploie.",
  },
  {
    question: "Combien de temps pour un premier diagnostic ?",
    answer:
      "L’audit du proto part sous 48h ouvrées : URL ou repo, stack, et une liste priorisée. Ensuite un devis si vous voulez que je continue.",
  },
  {
    question: "Faut-il être à Nantes ?",
    answer:
      "Je suis développeur web freelance à Nantes, missions en présentiel ponctuel ou à distance partout en France.",
  },
  {
    question: "Quels outils no-code ou IA connaissez-vous ?",
    answer:
      "Cursor, Claude Code, v0, Lovable, Bolt, plus n8n et des APIs LLM quand l’automatisation fait partie du produit.",
  },
] as const

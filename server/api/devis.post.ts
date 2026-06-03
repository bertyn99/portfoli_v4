import type { H3Event } from 'h3'
import {
  getDatabaseTitleProperty,
  notionBullet,
  notionHeading2,
  notionParagraph,
  useNotion,
} from '../utils/notion'

interface DevisBody {
  projectType?: string
  features?: string[]
  budget?: string
  timeline?: string
  name?: string
  email?: string
  url?: string
  description?: string
  estimateMin?: number
  estimateMax?: number
}

function validateBody(body: DevisBody) {
  const errors: string[] = []
  if (!body.projectType?.trim()) errors.push('Le type de projet est requis.')
  if (!body.name?.trim()) errors.push('Le nom est requis.')
  if (!body.email?.trim()) errors.push('L\'email est requis.')
  if (!body.budget?.trim()) errors.push('Le budget est requis.')
  if (!body.timeline?.trim()) errors.push('Le délai est requis.')
  if (body.estimateMin == null || body.estimateMax == null) {
    errors.push('L\'estimation est requise.')
  }
  return errors
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<DevisBody>(event)
  const errors = validateBody(body)
  if (errors.length) {
    throw createError({ statusCode: 400, statusMessage: errors.join(' ') })
  }

  const config = useRuntimeConfig(event)
  const clientDbId = config.notionClientDbId
  const projectDbId = config.notionProjectDbId
  if (!clientDbId || !projectDbId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bases Notion non configurées',
    })
  }

  const notion = useNotion(event)
  const clientTitleProp = await getDatabaseTitleProperty(notion, clientDbId)
  const projectTitleProp = await getDatabaseTitleProperty(notion, projectDbId)

  const name = body.name!.trim()
  const email = body.email!.trim()

  await notion.pages.create({
    parent: { database_id: clientDbId },
    properties: {
      [clientTitleProp]: {
        title: [{ text: { content: name } }],
      },
    },
    children: [
      notionParagraph(`Email : ${email}`),
      notionParagraph(`Devis : ${body.projectType}`),
    ],
  })

  const projectChildren = [
    notionHeading2('Type de projet'),
    notionParagraph(body.projectType!),
    notionHeading2('Fonctionnalités'),
    ...(body.features?.length
      ? body.features.map((f) => notionBullet(f))
      : [notionParagraph('Aucune fonctionnalité supplémentaire')]),
    notionHeading2('Budget & Délai'),
    notionParagraph(`${body.budget} · ${body.timeline}`),
    notionHeading2('Estimation'),
    notionParagraph(`~ ${body.estimateMin} € – ${body.estimateMax} €`),
    notionHeading2('Contact'),
    notionParagraph(
      [name, email, body.url?.trim() ? `URL : ${body.url.trim()}` : '']
        .filter(Boolean)
        .join(' · '),
    ),
  ]
  if (body.description?.trim()) {
    projectChildren.push(notionParagraph(body.description.trim()))
  }

  await notion.pages.create({
    parent: { database_id: projectDbId },
    properties: {
      [projectTitleProp]: {
        title: [
          {
            text: {
              content: `[DEVIS] ${body.projectType} — ${name}`.slice(0, 2000),
            },
          },
        ],
      },
    },
    children: projectChildren,
  })

  return { success: true }
})

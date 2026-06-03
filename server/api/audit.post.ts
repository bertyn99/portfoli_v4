import type { H3Event } from 'h3'
import {
  getDatabaseTitleProperty,
  notionBullet,
  notionHeading2,
  notionParagraph,
  useNotion,
} from '../utils/notion'

interface AuditBody {
  url?: string
  name?: string
  email?: string
  objectives?: string[]
  message?: string
}

function validateBody(body: AuditBody) {
  const errors: string[] = []
  if (!body.url?.trim()) errors.push('L\'URL du site est requise.')
  if (!body.name?.trim()) errors.push('Le nom est requis.')
  if (!body.email?.trim()) errors.push('L\'email est requis.')
  if (!body.objectives?.length) errors.push('Sélectionnez au moins un objectif.')
  return errors
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<AuditBody>(event)
  const errors = validateBody(body)
  if (errors.length) {
    throw createError({ statusCode: 400, statusMessage: errors.join(' ') })
  }

  const config = useRuntimeConfig(event)
  const clientDbId = config.notionClientDbId
  if (!clientDbId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Base clients Notion non configurée',
    })
  }

  const notion = useNotion(event)
  const titleProp = await getDatabaseTitleProperty(notion, clientDbId)

  const children = [
    notionHeading2('Demande d\'audit'),
    notionParagraph(`URL : ${body.url!.trim()}`),
    notionParagraph(`Email : ${body.email!.trim()}`),
    ...body.objectives!.map((o) => notionBullet(o)),
  ]
  if (body.message?.trim()) {
    children.push(notionParagraph(body.message.trim()))
  }

  await notion.pages.create({
    parent: { database_id: clientDbId },
    properties: {
      [titleProp]: {
        title: [{ text: { content: body.name!.trim() } }],
      },
    },
    children,
  })

  return { success: true }
})

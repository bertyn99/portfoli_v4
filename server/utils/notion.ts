import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'

export function useNotion(event: H3Event) {
  const config = useRuntimeConfig(event)
  if (!config.notionToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuration Notion manquante',
    })
  }
  return new Client({ auth: config.notionToken })
}

export async function getDatabaseTitleProperty(
  notion: Client,
  databaseId: string,
): Promise<string> {
  const database = await notion.databases.retrieve({ database_id: databaseId })
  for (const [name, prop] of Object.entries(database.properties)) {
    if (prop.type === 'title') {
      return name
    }
  }
  throw createError({
    statusCode: 500,
    statusMessage: 'Propriété titre introuvable dans la base Notion',
  })
}

export function notionParagraph(text: string) {
  return {
    object: 'block' as const,
    type: 'paragraph' as const,
    paragraph: {
      rich_text: [{ type: 'text' as const, text: { content: text.slice(0, 2000) } }],
    },
  }
}

export function notionHeading2(text: string) {
  return {
    object: 'block' as const,
    type: 'heading_2' as const,
    heading_2: {
      rich_text: [{ type: 'text' as const, text: { content: text } }],
    },
  }
}

export function notionBullet(text: string) {
  return {
    object: 'block' as const,
    type: 'bulleted_list_item' as const,
    bulleted_list_item: {
      rich_text: [{ type: 'text' as const, text: { content: text } }],
    },
  }
}

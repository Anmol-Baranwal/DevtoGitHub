export interface DevToArticle {
  id?: number
  title: string
  published_timestamp: string
  description: string
  cover_image?: string
  social_image?: string
  tag_list: string[]
  url: string
  positive_reactions_count: number
  public_reactions_count: number
  canonical_url?: string
  organization?: string
  series?: string
  body_markdown?: string
}

export interface DevtoError {
  error: string
  status: number
}

export interface LocalArticle {
  body_markdown: string
}

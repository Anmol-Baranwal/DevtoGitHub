export interface DevToArticle {
  id?: number
  title: string
  published_timestamp: string
  description: string
  cover_image?: string
  social_image?: string
  tag_list: string[]
  tags: string[]
  url: string
  positive_reactions_count: number
  public_reactions_count: number
  canonical_url?: string
  organization?: string
  series?: string
  body_markdown?: string
  edited_at?: string
}

export interface ReadingListArticle {
  id: number
  title: string
  readable_publish_date: string
  url: string
  cover_image: string
  canonical_url: string
  reading_time_minutes: number
  tags: string
}

export interface ReadingList {
  id?: number
  created_at: string
  article: ReadingListArticle
}

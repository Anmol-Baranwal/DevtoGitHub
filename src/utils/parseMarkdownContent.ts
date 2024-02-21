import { DevToArticle } from "../types"

export function parseMarkdownContent(article: DevToArticle): string {
  const coverImageBanner = article.cover_image
    ? `<img src="${article.cover_image}" alt="Cover Image" />`
    : ""

  const formattedTimestamp = formatTimestamp(article.published_timestamp)
  const formattedTags = article.tag_list.map((tag) => `\`${tag}\``).join(", ")

  return `\
  ${coverImageBanner}
  <hr />
  
  # ${article.title}
  
  **Tags:** ${formattedTags}

  **Published At:** ${formattedTimestamp}

  **URL:** [${article.url}](${article.url})

  <hr />
  ${article.body_markdown}    
  `
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

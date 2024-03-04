import { DevToArticle } from "../types"

type Choice = {
  option?: "1" | "2"
}

export function parseMarkdownContent(
  article: DevToArticle,
  choice: Choice = { option: "1" }
): string {
  const coverImageBanner = article.cover_image
    ? `<img src="${article.cover_image}" alt="Cover Image" />`
    : ""

  const formattedTimestamp = formatTimestamp(article.published_timestamp)

  // the api response of article fetched using id has different fields compared to api response of user's article.
  const formattedTags =
    choice && choice.option === "2"
      ? article.tags.join(", ")
      : article.tag_list.map((tag) => `\`${tag}\``).join(", ")

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

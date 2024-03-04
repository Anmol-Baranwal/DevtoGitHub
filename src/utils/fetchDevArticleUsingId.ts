import { DevToArticle } from "../types"

export async function fetchDevArticleUsingId(
  id: number,
  apiKey: string
): Promise<DevToArticle> {
  const apiUrl = `https://dev.to/api/articles/${id}`
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "api-key": apiKey
  }

  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch article. Status: ${response.status}`)
  }

  const article = await response.json()

  return article as DevToArticle
}

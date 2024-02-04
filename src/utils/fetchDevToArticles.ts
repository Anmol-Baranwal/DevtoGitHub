import { DevToArticle } from "../types"
import fetch from "node-fetch"

export async function fetchDevToArticles(): Promise<any[]> {
  const apiUrl = `https://dev.to/api/articles/me`

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json"
  }

  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch articles. Status: ${response.status}`)
  }

  const articles = await response.json()
  return articles as DevToArticle[]
}

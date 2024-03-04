import { DevToArticle } from "../types"
import fetch from "node-fetch"
import * as core from "@actions/core"

export async function fetchDevToArticles(
  apiKey: string,
  per_page?: number
): Promise<DevToArticle[]> {
  if (per_page === undefined) per_page = 999 // default is 30
  let page = 1
  let articles: DevToArticle[] = []

  while (true) {
    const apiUrl = `https://dev.to/api/articles/me?page=${page}&per_page=${per_page}`

    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      "api-key": apiKey
    }

    const response = await fetch(apiUrl, { headers })

    if (!response.ok) {
      throw new Error(`Failed to fetch articles. Status: ${response.status}`)
    }

    const pageArticles = (await response.json()) as DevToArticle[]

    if (pageArticles.length === 0) {
      break // No more articles left
    }

    articles = articles.concat(pageArticles)
    page++
  }

  core.notice("Articles fetched and saved successfully.")

  return articles
}

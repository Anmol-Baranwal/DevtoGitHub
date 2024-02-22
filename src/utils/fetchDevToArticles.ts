import { DevToArticle } from "../types"
import fetch from "node-fetch"
import * as core from "@actions/core"

export async function fetchDevToArticles(
  apiKey: string,
  per_page?: number
): Promise<DevToArticle[]> {
  if (per_page === undefined) per_page = 999 // default is 30
  const apiUrl = `https://dev.to/api/articles/me?per_page=${per_page}`

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "api-key": apiKey
  }

  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch articles. Status: ${response.status}`)
  }

  core.notice("Articles fetched and saved successfully.")

  const articles = await response.json()

  return articles as DevToArticle[]
}

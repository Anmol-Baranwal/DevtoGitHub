import { DevToArticle } from "../types"
import fetch from "node-fetch"
import * as core from "@actions/core"

export async function fetchDevToArticles(
  apiKey: string
): Promise<DevToArticle[]> {
  const apiUrl = `https://dev.to/api/articles/me`

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

import { ReadingList } from "../types"
import fetch from "node-fetch"
import * as core from "@actions/core"

export async function fetchDevToReadingList(
  apiKey: string,
  per_page?: number
): Promise<ReadingList[]> {
  if (per_page === undefined) per_page = 200 // default is 30
  const apiUrl = `https://dev.to/api/readinglist?per_page=${per_page}`

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "api-key": apiKey
  }

  console.log({ apiUrl })

  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch reading list. Status: ${response.status}`)
  }

  core.notice("Reading list fetched successfully.")

  const articles = await response.json()
  return articles as ReadingList[]
}

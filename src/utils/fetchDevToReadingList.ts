import { ReadingList } from "../types"
import fetch from "node-fetch"
import * as core from "@actions/core"

const filteredArticles = (
  articles: ReadingList[],
  excludeTags: string[],
  mustIncludeTags: string[]
): ReadingList[] => {
  if (excludeTags.length === 0) {
    // No filtering if excludeTags is empty
    return articles
  }

  return articles.filter((articleItem) => {
    const articleTags = articleItem.article.tags

    const hasExcludedTag = excludeTags.some((tag) => articleTags.includes(tag))
    const hasMustIncludeTag =
      mustIncludeTags.length !== 0 &&
      mustIncludeTags.some((tag) => articleTags.includes(tag))

    const shouldInclude = hasMustIncludeTag || !hasExcludedTag

    return shouldInclude
  })
}

export async function fetchDevToReadingList(
  apiKey: string,
  per_page?: number
): Promise<ReadingList[]> {
  if (per_page === undefined) per_page = 30 // Default per page value is 30
  let page = 1
  let readingList: ReadingList[] = []

  while (true) {
    const apiUrl = `https://dev.to/api/readinglist?page=${page}&per_page=${per_page}`

    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      "api-key": apiKey
    }

    const response = await fetch(apiUrl, { headers })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch reading list. Status: ${response.status}`
      )
    }

    const articles = (await response.json()) as ReadingList[]

    if (articles.length === 0) {
      break // break when no more articles left
    }

    readingList = readingList.concat(articles)
    page++
  }

  core.notice("Reading list fetched successfully.")

  const excludeTags = core
    .getInput("excludeTags")
    .split(",")
    .map((tag) => tag.trim())

  const mustIncludeTags = core
    .getInput("mustIncludeTags")
    .split(",")
    .map((tag) => tag.trim())

  const filteredReadingList = filteredArticles(
    readingList,
    excludeTags,
    mustIncludeTags
  )

  return filteredReadingList
}

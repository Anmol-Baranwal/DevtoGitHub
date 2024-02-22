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
  if (per_page === undefined) per_page = 999 // default is 30
  const apiUrl = `https://dev.to/api/readinglist?per_page=${per_page}`

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "api-key": apiKey
  }

  const excludeTags = core
    .getInput("excludeTags")
    .split(",")
    .map((tag) => tag.trim())

  const mustIncludeTags = core
    .getInput("mustIncludeTags")
    .split(",")
    .map((tag) => tag.trim())

  core.notice(`excludeTags: ${excludeTags}`)
  core.notice(`mustIncludeTags: ${mustIncludeTags}`)

  // we can also do this.
  // core.getInput("mustIncludeTags").flatMap(tagList => tagList.split(", "));

  // sample values
  // const excludeTags = ["webdev", "react", "discuss"]
  // const mustIncludeTags = ["startup", "programming", "beginners"]

  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch reading list. Status: ${response.status}`)
  }

  core.notice("Reading list fetched successfully.")

  const articles = (await response.json()) as ReadingList[]

  const filteredReadingList = filteredArticles(
    articles,
    excludeTags,
    mustIncludeTags
  )

  core.notice(`filteredArticles: ${filteredArticles}`)

  return filteredReadingList
}

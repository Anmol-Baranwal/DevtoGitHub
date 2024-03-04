import { fetchDevToArticles } from "./utils/fetchDevToArticles"
import { createMarkdownFile } from "./utils/createMarkdownFile"
import * as core from "@actions/core"
import { createReadingList } from "./utils/createReadingList"
import { fetchDevToReadingList } from "./utils/fetchDevToReadingList"
import { synchronizeReadingList } from "./utils/synchronizeReadingList"

async function DevtoGitHub() {
  try {
    const apiKey = core.getInput("devApiKey")
    const outputDir = core.getInput("outputDir") || "./articles" // Default is the articles directory
    const outputDirReading = core.getInput("outputDirReading") || "./" // Default is the root directory
    const branch = core.getInput("branch") || "main"
    const readingList = core.getInput("readingList") === "true" || false
    const saveArticles = core.getInput("saveArticles") === "true" || false
    const synchronizeReadingListInput =
      core.getInput("synchronizeReadingList") === "true" || false

    if (saveArticles === true) {
      const articles = await fetchDevToArticles(apiKey)
      createMarkdownFile(articles, outputDir, branch, apiKey)
      core.notice("Articles fetched and saved successfully.")
    } else {
      core.notice(`skipping saving of articles`)
    }

    if (readingList === true) {
      const readingListArticles = await fetchDevToReadingList(apiKey)

      createReadingList(readingListArticles, outputDirReading, branch)

      if (synchronizeReadingListInput === true) {
        // synchronize reading list from DEV with readme
        synchronizeReadingList(readingListArticles, outputDirReading, branch)
      } else {
        core.notice(`skipping synchronization of reading list`)
      }
    } else {
      core.notice(`skipping saving reading list`)
    }
  } catch (error) {
    console.error("Error:", (error as Error).message)
  }
}

DevtoGitHub()

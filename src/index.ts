import { fetchDevToArticles } from "./utils/fetchDevToArticles"
import { createMarkdownFile } from "./utils/createMarkdownFile"
import * as core from "@actions/core"

async function DevSync() {
  try {
    const apiKey = core.getInput("devApiKey")
    const outputDir = core.getInput("outputDir") || "./articles" // Default is the articles directory
    // const branch = core.getInput("branch") || "main"
    // const conventionalCommits = core.getInput("conventional_commits") === "true"

    const articles = await fetchDevToArticles(apiKey)
    createMarkdownFile(articles, outputDir)
    // core.notice("Articles fetched and saved successfully.")
  } catch (error) {
    console.error("Error:", (error as Error).message)
  }
}

DevSync()

import { fetchDevToArticles } from "./utils/fetchDevToArticles"
import { createMarkdownFile } from "./utils/createMarkdownFile"
import * as core from "@actions/core"

async function DevSync() {
  try {
    const token = core.getInput("gh-token")

    if (!token) core.debug(token + "")
    else core.debug(token)

    if (!token) {
      core.setFailed(
        "GitHub token is missing. Make sure to set the GITHUB_TOKEN secret."
      )
      return
    }

    const apiKey = core.getInput("devApiKey")
    const outputDir = core.getInput("outputDir") || "/" // Default is the root directory
    const branch = core.getInput("branch") || "main"
    const conventionalCommits = core.getInput("conventional_commits") === "true"

    const articles = await fetchDevToArticles(apiKey)
    createMarkdownFile(articles, outputDir, branch, conventionalCommits)
    core.notice("Articles fetched and saved successfully.")
  } catch (error) {
    console.error("Error:", (error as Error).message)
  }
}

DevSync()

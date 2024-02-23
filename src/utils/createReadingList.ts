import * as core from "@actions/core"
import * as fs from "fs"
import { ReadingList } from "../types"
import { gitAdd, gitCommit, gitPush } from "./git"

export async function createReadingList(
  articles: ReadingList[],
  outputDir: string,
  branch: string
): Promise<void> {
  const readTime = core.getInput("readTime") === "true" || false

  const conventionalCommits =
    core.getInput("conventional_commits") === "true" || true

  // Read existing content of README
  let existingContent = ""
  const readmePath = `${outputDir}README.md`
  if (fs.existsSync(readmePath)) {
    existingContent = fs.readFileSync(readmePath, "utf8")
  }

  const hasReadingListHeading = existingContent.includes("## Reading List")
  let commitMessage = hasReadingListHeading
    ? "update reading list"
    : "create reading list"

  if (conventionalCommits) {
    commitMessage = `chore: ${commitMessage.toLowerCase()}`
  }

  // Check if the reading list heading exists, if not add it
  if (!hasReadingListHeading) {
    existingContent += "\n <hr/> \n\n## Reading List\n\n"
  }

  // Add bullet points for each article
  for (const articleItem of articles) {
    const articleUrl = articleItem.article.url
    // url is used to avoid adding duplicate articles
    if (existingContent.includes(articleUrl)) {
      console.log(
        `Skipping article "${articleItem.article.title}" because it already exists in the reading list.`
      )
      continue
    }

    if (readTime) {
      existingContent += `- [${articleItem.article.title}](${articleItem.article.url}) - ${articleItem.article.reading_time_minutes} minutes\n`
    } else {
      existingContent += `- [${articleItem.article.title}](${articleItem.article.url})\n`
    }
  }

  fs.writeFileSync(readmePath, existingContent)

  try {
    await gitAdd(readmePath)
    await gitCommit(commitMessage, readmePath)
    await gitPush(branch)

    core.notice(`reading list file created and committed`)
  } catch (error) {
    core.setFailed(
      `Failed to commit and push changes: ${(error as Error).message}`
    )
  }

  core.notice(`Reading list updated in README.md`)
}

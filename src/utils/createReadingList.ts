import * as core from "@actions/core"
import * as fs from "fs"
import { ReadingList } from "../types"
import { performGitActions } from "./performGitActions"

export async function createReadingList(
  articles: ReadingList[],
  outputDir: string,
  branch: string
): Promise<void> {
  const readTime = core.getInput("readTime") === "true" || false

  const conventionalCommits =
    core.getInput("conventionalCommits") === "true" || true

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    try {
      fs.mkdirSync(outputDir)
    } catch (error) {
      core.setFailed(
        `Failed to create directory ${outputDir}: ${(error as Error).message}`
      )
      return
    }
  }

  let existingContent = ""
  const readmePath = `./${outputDir}/README.md`

  if (fs.existsSync(readmePath)) {
    existingContent = fs.readFileSync(readmePath, "utf8")
  } else {
    fs.writeFileSync(readmePath, "")
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

  performGitActions({
    commitMessage,
    path: readmePath,
    branch,
    noticeMessage: "Reading list file created and committed"
  })

  core.notice(`Reading list updated in README.md`)
}

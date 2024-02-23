import * as core from "@actions/core"
import * as fs from "fs"
import {
  getFileNameFromTitle,
  gitAdd,
  gitCommit,
  gitConfig,
  gitPush
} from "./git"
import { parseMarkdownContent } from "./parseMarkdownContent"

export async function createMarkdownFile(
  articles: any[],
  outputDir: string,
  branch: string
): Promise<void> {
  const conventionalCommits =
    core.getInput("conventional_commits") === "true" || true

  // output directory must exist
  if (!fs.existsSync(outputDir)) {
    try {
      // Create the directory with necessary permissions
      fs.mkdirSync(outputDir)
    } catch (error) {
      core.setFailed(
        `Failed to create directory ${outputDir}: ${(error as Error).message}`
      )
      return
    }
  }

  // Create content for README.md
  let readmeContent = "# Table of Contents\n\n"

  for (const article of articles) {
    const fileName = getFileNameFromTitle(article.title).trim()
    const filePath = `${outputDir}/${fileName}.md`

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
      let commitMessage = `add ${fileName} markdown file`

      if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`
      }

      const markdownContent = parseMarkdownContent(article)
      // Write markdown content to file
      fs.writeFileSync(filePath, markdownContent)

      readmeContent += `- [${article.title}](${fileName}.md)\n`

      try {
        await gitAdd(filePath)
        await gitCommit(commitMessage, filePath)
        await gitPush(branch)

        core.notice(`Markdown file created and committed: ${filePath}`)
      } catch (error) {
        core.setFailed(
          `Failed to commit and push changes: ${(error as Error).message}`
        )
      }
      core.notice(`Markdown file created: ${filePath}`)
    } else {
      core.notice(
        `Markdown file already exists for "${article.title}". Skipping.`
      )
    }
  }

  const readmePath = `${outputDir}/README.md`
  fs.writeFileSync(readmePath, readmeContent)

  // Git operations for README.md
  let commitMessage = "Update README with table of contents"

  if (conventionalCommits) {
    commitMessage = `chore: ${commitMessage.toLowerCase()}`
  }

  try {
    await gitAdd(readmePath)
    await gitCommit(commitMessage, readmePath)
    await gitPush(branch)

    core.notice("README.md file created and committed")
  } catch (error) {
    core.setFailed(
      `Failed to commit and push changes (readme articles): ${error}`
    )
  }
}

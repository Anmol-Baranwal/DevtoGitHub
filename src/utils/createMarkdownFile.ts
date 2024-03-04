import * as core from "@actions/core"
import * as fs from "fs"
import {
  getFileNameFromTitle,
  gitAdd,
  gitCommit,
  gitConfig,
  gitPull,
  gitPush
} from "./git"
import { parseMarkdownContent } from "./parseMarkdownContent"
import { fetchDevArticleUsingId } from "./fetchDevArticleUsingId"

const conventionalCommits =
  core.getInput("conventionalCommits") === "true" || true

export async function createMarkdownFile(
  articles: any[],
  outputDir: string,
  branch: string,
  apiKey: string
): Promise<void> {
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

  for (const article of articles) {
    const fileName = getFileNameFromTitle(article.title).trim()
    const filePath = `./${outputDir}/${fileName}.md`

    let commitMessage

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
      commitMessage = `add ${fileName} markdown file`

      if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`
      }

      const markdownContent = parseMarkdownContent(article)
      // Write markdown content to file
      fs.writeFileSync(filePath, markdownContent)

      try {
        await gitConfig()
        await gitAdd(filePath)
        await gitCommit(commitMessage, filePath)
        await gitPull(branch)
        await gitPush(branch)

        core.notice(`Markdown file created and committed: ${filePath}`)
      } catch (error) {
        core.setFailed(
          `Failed to commit and push changes: ${(error as Error).message}`
        )
      }

      core.notice(`Markdown file created: ${filePath}`)
    } else {
      const existingContent = fs.readFileSync(filePath, "utf8")
      const fetchedArticle = await fetchDevArticleUsingId(article.id, apiKey)

      // Check if the article has been edited by comparing the existing content with the fetched article's content
      const newMarkdownContent = parseMarkdownContent(fetchedArticle, {
        option: "2"
      })
      if (existingContent !== newMarkdownContent) {
        core.notice(
          `Article has been edited, updating the Markdown file content.`
        )
        fs.writeFileSync(filePath, newMarkdownContent)

        commitMessage = `update ${fileName} markdown file with edited content`

        if (conventionalCommits) {
          commitMessage = `chore: ${commitMessage.toLowerCase()}`
        }

        try {
          await gitConfig()
          await gitAdd(filePath)
          await gitCommit(commitMessage, filePath)
          await gitPull(branch)
          await gitPush(branch)

          core.notice(`Markdown file created and committed: ${filePath}`)
        } catch (error) {
          core.setFailed(
            `Failed to commit and push changes: ${(error as Error).message}`
          )
        }
      } else {
        core.notice(
          `Markdown file already exists for "${article.title}" and it is not edited. Skipping.`
        )
      }
    }
  }
  const tableOfContents =
    core.getInput("saveArticlesReadme") === "true" || false

  if (tableOfContents) {
    await createArticlesReadme(articles, outputDir, branch)
  }
}

async function createArticlesReadme(
  articles: any[],
  outputDir: string,
  branch: string
): Promise<void> {
  // Create content for README.md
  let readmeContent = ""
  const readmePath = `${outputDir}/README.md`
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, "utf8")
  }

  const hasTableOfContentsHeading = readmeContent.includes(
    "# Table of Contents\n\n"
  )

  // Set the commit message based on whether the heading exists
  let commitMessage = hasTableOfContentsHeading
    ? "update readme with table of contents"
    : "create readme with table of contents"

  if (!hasTableOfContentsHeading) {
    readmeContent = "# Table of Contents\n\n"
  }

  for (const article of articles) {
    const fileName = getFileNameFromTitle(article.title).trim()

    const fileLink = `./${fileName}.md`

    if (readmeContent.includes(`[${article.title}]`)) {
      console.log(
        `Skipping "${article.title}" because it already exists in the table of contents.`
      )
      continue
    }

    // Add entry to README content
    readmeContent += `- [${article.title}](${fileLink.replace(/ /g, "%20")})\n`
  }

  // Write README.md
  fs.writeFileSync(readmePath, readmeContent)

  if (conventionalCommits) {
    commitMessage = `chore: ${commitMessage.toLowerCase()}`
  }

  try {
    await gitConfig()
    await gitAdd(readmePath)
    await gitCommit(commitMessage, readmePath)
    await gitPull(branch)
    await gitPush(branch)

    core.notice("README.md file created and committed")
  } catch (error) {
    core.setFailed(
      `Failed to commit and push changes (readme articles): ${error}`
    )
  }
}

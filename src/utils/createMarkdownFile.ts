import * as core from "@actions/core"
import * as fs from "fs"
import { getFileNameFromTitle } from "./git"
import { parseMarkdownContent } from "./parseMarkdownContent"
import { fetchDevArticleUsingId } from "./fetchDevArticleUsingId"
import { performGitActions } from "./performGitActions"
import { createArticlesReadme } from "./createArticlesReadme"

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

      performGitActions({
        commitMessage,
        path: filePath,
        branch
        // noticeMessage: "Markdown file created and committed"
      })

      // core.notice(`Markdown file created: ${filePath}`)
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

        performGitActions({
          commitMessage,
          path: filePath,
          branch,
          noticeMessage: "Markdown file created and committed"
        })
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

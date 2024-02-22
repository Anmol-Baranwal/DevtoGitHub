import * as core from "@actions/core"
import * as fs from "fs"
import { getFileNameFromTitle } from "./git"
import { parseMarkdownContent } from "./parseMarkdownContent"

export async function createMarkdownFile(
  articles: any[],
  outputDir: string,
  branch?: string
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
    const filePath = `${outputDir}/${fileName}.md`

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
      const markdownContent = parseMarkdownContent(article)
      // Write markdown content to file
      fs.writeFileSync(filePath, markdownContent)

      core.notice(`markdownContent: ${markdownContent}`)

      core.notice(`Markdown file created: ${filePath}`)
    } else {
      core.notice(
        `Markdown file already exists for "${article.title}". Skipping.`
      )
    }
  }
}

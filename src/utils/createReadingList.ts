import * as core from "@actions/core"
import * as fs from "fs"
import { ReadingList } from "../types"

export async function createReadingList(
  articles: ReadingList[],
  outputDir: string,
  branch?: string
): Promise<void> {
  const readTime = core.getInput("readTime") === "true" || false

  core.notice(`readTime: ${readTime}`)
  // Read existing content of README
  let existingContent = ""
  const readmePath = `${outputDir}README.md`
  if (fs.existsSync(readmePath)) {
    existingContent = fs.readFileSync(readmePath, "utf8")
  }

  core.notice(`readmePath: ${readmePath}`)
  // core.notice(`existingContent: ${existingContent}`)

  // Check if the reading list heading exists, if not add it
  if (!existingContent.includes("## Reading List")) {
    existingContent += "\n <hr/> \n\n## Reading List\n\n"
  }

  core.notice(`existingContent: ${existingContent}`)

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

  core.notice(`Reading list updated in README.md`)
}

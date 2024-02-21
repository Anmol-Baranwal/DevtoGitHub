import * as core from "@actions/core"
import * as fs from "fs"
import { ReadingList } from "../types"

export async function createReadingList(
  articles: ReadingList[],
  branch?: string
): Promise<void> {
  const outputDir = "./"

  // Read existing content of README
  let existingContent = ""
  const readmePath = `${outputDir}/README.md`
  if (fs.existsSync(readmePath)) {
    existingContent = fs.readFileSync(readmePath, "utf8")
  }

  // Check if the reading list heading exists, if not add it
  if (!existingContent.includes("## Reading List")) {
    existingContent += "\n <hr/> \n\n## Reading List\n\n"
  }

  // Add bullet points for each article
  for (const articleItem of articles) {
    existingContent += `- [${articleItem.article.title}](${articleItem.article.url})\n`
  }

  fs.writeFileSync(readmePath, existingContent)

  core.notice(`Reading list updated in README.md`)
}

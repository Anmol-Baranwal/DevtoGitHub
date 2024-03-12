import * as core from "@actions/core"
import * as fs from "fs"
import { getFileNameFromTitle } from "./git"
import { performGitActions } from "./performGitActions"

const conventionalCommits =
  core.getInput("conventionalCommits") === "true" || true

export async function createArticlesReadme(
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

  performGitActions({
    commitMessage,
    path: readmePath,
    branch,
    noticeMessage: "README.md file created and committed"
  })
}

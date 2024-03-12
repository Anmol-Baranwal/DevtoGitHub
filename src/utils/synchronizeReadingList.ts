import * as fs from "fs"
import { ReadingList } from "../types"
import * as core from "@actions/core"
import { performGitActions } from "./performGitActions"

export async function synchronizeReadingList(
  readingList: ReadingList[],
  outputDir: string,
  branch: string
): Promise<void> {
  const readmePath = `./${outputDir}/README.md`

  let commitMessage = "synchronize reading list"

  const conventionalCommits =
    core.getInput("conventionalCommits") === "true" || true

  if (conventionalCommits) {
    commitMessage = `chore: ${commitMessage.toLowerCase()}`
  }

  try {
    const existingContent = fs.readFileSync(readmePath, "utf8")

    // For logging names of removed articles
    const removedArticles: string[] = []

    // Iterate each line in the readme
    let updatedContent = existingContent
      .split("\n")
      .filter((line) => {
        // Extract the URL from the line
        const urlMatch = line.match(/\[.*\]\((.*)\)/)
        if (urlMatch) {
          const articleUrl = urlMatch[1]

          // Check if the article URL exists in the fetched reading list
          const existsInReadingList = readingList.some(
            (article) => article.article.url === articleUrl
          )

          // If the article doesn't exist in the reading list, add it to removedArticles
          if (!existsInReadingList) {
            const titleMatch = line.match(/\[(.*)\]/)
            if (titleMatch) {
              const articleTitle = titleMatch[1]
              removedArticles.push(articleTitle)
            }
          }

          return existsInReadingList
        }
        // Preserve lines that are not article URLs
        return true
      })
      .join("\n")

    // Log removed articles
    if (removedArticles.length > 0) {
      console.log(
        `Removed these articles from the reading list: ${removedArticles.join(
          ", "
        )}`
      )
    }

    fs.writeFileSync(readmePath, updatedContent)

    performGitActions({
      commitMessage,
      path: readmePath,
      branch
    })

    core.notice(`Reading list synchronized successfully.`)
  } catch (error) {
    core.notice(
      `Failed to synchronize reading list: ${(error as Error).message}`
    )
  }
}

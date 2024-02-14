import * as core from "@actions/core"
import * as fs from "fs"
import { getFileNameFromTitle } from "./git"

export async function createMarkdownFile(
  articles: any[],
  outputDir: string,
  branch: string
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

  const commits = []

  for (const article of articles) {
    const fileName = getFileNameFromTitle(article.title)
    const filePath = `${outputDir}/${fileName}.md`

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
      const commitMessage = `Add ${fileName}`

      const markdownContent = `---
title: "${article.title}"
description: "${article.description}"
cover_image: "${article.cover_image || ""}"
tags: [${article.tag_list.map((tag: string) => `"${tag}"`).join(", ")}]
url: "${article.url}"
created_at: "${article.published_timestamp}"
---

`

      core.notice(`markdown content`)
      // Write markdown content to file
      fs.writeFileSync(filePath, markdownContent)

      core.notice(`push start`)
      commits.push({ message: commitMessage, filePath })

      core.notice(`Markdown file created: ${filePath}`)
    } else {
      core.notice(
        `Markdown file already exists for "${article.title}". Skipping.`
      )
    }
  }

  if (commits.length > 0) {
    await createCommitAndPush(branch, commits)
  }
}

async function createCommitAndPush(branch: string, commits: any[]) {
  try {
    const token = core.getInput("gh-token")

    if (!token) core.debug(token + "")
    else core.debug(token)

    if (!token) {
      core.setFailed(
        "GitHub token is missing. Make sure to set the GITHUB_TOKEN secret."
      )
      return
    }

    const commitData = {
      branch,
      commits: commits.map(({ message, filePath }) => {
        const content = fs.readFileSync(filePath, "utf8")
        return {
          message,
          content: Buffer.from(content).toString("base64")
        }
      })
    }

    // Create a new commit using the GitHub REST API
    await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commitData)
      }
    )
  } catch (error) {
    throw new Error(`Failed to create commit: ${(error as Error).message}`)
  }
}

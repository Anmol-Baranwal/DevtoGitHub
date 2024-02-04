import * as fs from "fs"
import * as core from "@actions/core"
import {
  gitAdd,
  gitCommit,
  gitPush,
  getFileNameFromTitle,
  gitConfig
} from "./git"

export async function createMarkdownFile(
  articles: any[],
  outputDir: string,
  branch: string,
  conventionalCommits: boolean
): Promise<void> {
  // output directory must exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  for (const article of articles) {
    const fileName = getFileNameFromTitle(article.title)
    const filePath = `${outputDir}/${fileName}.md`

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
      let commitMessage = `Update ${fileName} markdown file`

      if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`
      }

      const markdownContent = `---
title: "${article.title}"
description: "${article.description}"
cover_image: "${article.cover_image || ""}"
tags: [${article.tag_list.map((tag: string) => `"${tag}"`).join(", ")}]
url: "${article.url}"
created_at: "${article.published_timestamp}"
---

`

      fs.writeFileSync(filePath, markdownContent)

      // Commit and push the new markdown file to the specified branch
      await gitAdd(filePath)
      await gitCommit(commitMessage, gitConfig)
      await gitPush(branch, gitConfig)

      core.notice(`Markdown file created and committed: ${filePath}`)
    } else {
      core.notice(
        `Markdown file already exists for "${article.title}". Skipping.`
      )
    }
  }
}

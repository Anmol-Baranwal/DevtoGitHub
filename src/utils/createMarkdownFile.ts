import * as fs from "fs"

export function createMarkdownFile(articles: any[], outputDir: string): void {
  // output directory must exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  articles.forEach((article) => {
    const fileName = getFileNameFromTitle(article.title)
    const filePath = `${outputDir}/${fileName}.md`

    // Check if the markdown file already exists
    if (!fs.existsSync(filePath)) {
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
      console.log(`Markdown file created: ${filePath}`)
    } else {
      console.log(
        `Markdown file already exists for "${article.title}". Skipping.`
      )
    }
  })
}

// generate a valid file name from the article title
function getFileNameFromTitle(title: string): string {
  // Replace spaces and special characters with underscores
  return title
    .replace(/[^\w\s]/gi, "_")
    .replace(/\s+/g, "_")
    .toLowerCase()
}

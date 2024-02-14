import * as fs from "fs"
import * as core from "@actions/core"

async function createAnmolMarkdownFile(outputDir: string): Promise<void> {
  try {
    // Output directory must exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir) // Create the directory if it doesn't exist
    }

    // Define file path
    const filePath = `${outputDir}/anmol.md`

    // Check if the Markdown file already exists
    if (!fs.existsSync(filePath)) {
      // Markdown content
      const markdownContent = `---
title: "Anmol"
description: "Anmol Baranwal"
---

Anmol Baranwal`

      // Write markdown content to file
      fs.writeFileSync(filePath, markdownContent)

      core.notice(`Markdown file created: ${filePath}`)
    } else {
      core.notice(`Markdown file already exists: ${filePath}`)
    }
  } catch (error) {
    core.setFailed(
      `Failed to create Markdown file: ${(error as Error).message}`
    )
  }
}

// Example usage
createAnmolMarkdownFile("./articles")

import * as exec from "@actions/exec"

// generate a valid file name using the title
export function getFileNameFromTitle(title: string): string {
  // Replace spaces and special characters with underscores
  return title
    .replace(/[^\w\s]/gi, "_")
    .replace(/\s+/g, "_")
    .toLowerCase()
}

export async function gitAdd(filePath: string): Promise<void> {
  await exec.exec("git", ["add", filePath])
}

export async function gitCommit(
  message: string,
  config: string[]
): Promise<void> {
  // Set user name and email configuration
  await exec.exec("git", [...config])

  // Commit with the specified message
  await exec.exec("git", ["commit", "-m", message])
}

export async function gitPush(branch: string, config: string[]): Promise<void> {
  await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config])
}

export const gitConfig = [
  "-c",
  `user.name="${process.env.GITHUB_ACTOR || "GitHub Actions"}"`,
  "-c",
  `user.email="${process.env.GITHUB_ACTOR}@users.noreply.github.com"`
]

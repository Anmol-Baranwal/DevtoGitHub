import * as exec from "@actions/exec"
import process from "node:process"
import * as core from "@actions/core"

// generate a valid file name using the title
export function getFileNameFromTitle(title: string): string {
  // Replace special characters other than apostrophes and hyphens with spaces
  return title
    .replace(/[^\w\s'-]/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
}

const githubToken = core.getInput(`gh-token`)

export async function gitAdd(filePath: string): Promise<void> {
  await exec.exec("git", ["add", filePath], {
    env: { ...process.env, GITHUB_TOKEN: githubToken }
  })
}

export async function gitCommit(
  message: string,
  config: string[]
): Promise<void> {
  await exec.exec("git", [...config, "commit", "-m", message], {
    env: { ...process.env, GITHUB_TOKEN: githubToken }
  })
}

export async function gitPush(branch: string, config: string[]): Promise<void> {
  await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config], {
    env: { ...process.env, GITHUB_TOKEN: githubToken }
  })
}

export const gitConfig = [
  "config",
  "--global",
  "user.name",
  process.env.GITHUB_ACTOR || "GitHub Actions",
  "config",
  "--global",
  "user.email",
  `${process.env.GITHUB_ACTOR}@users.noreply.github.com`
]

// export async function gitAdd(filePath: string): Promise<void> {
//   await exec.exec("git", ["add", filePath])
// }

// export async function gitCommit(
//   message: string,
//   config: string[]
// ): Promise<void> {
//   await exec.exec("git", [...config, "commit", "-m", message])
// }

// export async function gitPush(branch: string, config: string[]): Promise<void> {
//   await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config])
// }

// export const gitConfig = [
//   "config",
//   "--global",
//   "user.name",
//   process.env.GITHUB_ACTOR || "GitHub Actions",
//   "config",
//   "--global",
//   "user.email",
//   `${process.env.GITHUB_ACTOR}@users.noreply.github.com`
// ]

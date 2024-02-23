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

export async function gitAdd(filePath: string): Promise<void> {
  core.notice(`inside gitAdd`)
  await exec.exec("git", ["add", filePath])
}

// export async function gitCommit(
//   message: string,
//   config: string[]
// ): Promise<void> {
//   core.notice(`inside gitCommit`)
//   await exec.exec("git", [...config, "commit", "-m", message])
// }

// export async function gitPush(branch: string, config: string[]): Promise<void> {
//   core.notice(`inside gitPush`)
//   await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config])
// }

export async function gitCommit(
  message: string,
  filePath: string
): Promise<void> {
  core.notice(`inside gitCommit`)
  await exec.exec("git", ["commit", "-m", message, filePath])
}

export async function gitPush(branch: string): Promise<void> {
  core.notice(`inside gitPush`)
  await exec.exec("git", ["push", "origin", `HEAD:${branch}`])
}

export const gitConfig = [
  "config",
  "--global",
  `user.name=Anmol Baranwal`,
  "config",
  "--global",
  `user.email=actions@github.com`
]

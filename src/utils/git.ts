import * as exec from "@actions/exec"
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
  try {
    await exec.exec("git", ["add", filePath])
  } catch (error) {
    core.setFailed(`Failed to complete git add: ${(error as Error).message}`)
  }
}

export async function gitCommit(
  message: string,
  filePath: string
): Promise<void> {
  try {
    const statusOutput = await exec.getExecOutput("git", [
      "status",
      "--porcelain",
      filePath
    ])
    if (statusOutput.stdout.trim() === "") {
      core.notice(`No changes to commit for file ${filePath}`)
      return
    }
    await exec.exec("git", ["commit", "-m", message, filePath])
  } catch (error) {
    core.setFailed(`Failed to complete git commit: ${(error as Error).message}`)
  }
}

export async function gitPush(branch: string): Promise<void> {
  try {
    await exec.exec("git", ["push", "origin", `HEAD:${branch}`])
  } catch (error) {
    core.setFailed(`Failed to complete git push: ${(error as Error).message}`)
  }
}

export async function gitConfig(): Promise<void> {
  try {
    await exec.exec("git", [
      "config",
      "--global",
      "user.email",
      "actions@github.com"
    ])
    await exec.exec("git", [
      "config",
      "--global",
      "user.name",
      "GitHub Actions"
    ])
  } catch (error) {
    core.setFailed(
      `Failed to set up Git configuration: ${(error as Error).message}`
    )
  }
}

export async function gitPull(branch: string): Promise<void> {
  try {
    await exec.exec("git", ["pull", "origin", branch])
  } catch (error) {
    core.setFailed(
      `Failed to pull changes from ${branch}: ${(error as Error).message}`
    )
  }
}

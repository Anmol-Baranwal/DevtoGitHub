import * as core from "@actions/core"
import { gitAdd, gitCommit, gitConfig, gitPull, gitPush } from "./git"

interface GitActionsProps {
  commitMessage: string
  path: string
  branch: string
  noticeMessage?: string
}

export async function performGitActions({
  commitMessage,
  path,
  branch,
  noticeMessage
}: GitActionsProps): Promise<void> {
  try {
    await gitConfig()
    await gitAdd(path)
    await gitCommit(commitMessage, path)
    await gitPull(branch)
    await gitPush(branch)

    if (noticeMessage) core.notice(noticeMessage)
  } catch (error) {
    core.notice(
      `Failed to commit and push changes: ${(error as Error).message}`
    )
  }
}

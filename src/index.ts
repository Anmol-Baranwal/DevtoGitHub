import * as core from "@actions/core"
import * as github from "@actions/github"

async function DevSync() {
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

    const octokit = github.getOctokit(token)
    const context = github.context

    core.notice("step 1.")
  } catch (error: any) {
    core.notice("No Issue found!")
    core.notice("Workflow failed: " + error.message)
  }
}

DevSync()


# ✅ Get Started

> This is a step-by-step guide on how to set up your repository, get the API key from DEV, add it, and every other mandatory step before you can use the workflow.

## Generate DEV API key

The first step is to generate a `dev.to` API token.

Once you are logged into your DEV account, go to [dev.to/settings/extensions](https://dev.to/settings/extensions) 

In the `DEV API Keys` section, create a new key by adding a description and clicking on `Generate API Key`.

![DEV API KEY](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/014f0454-31c9-47d5-93b7-d5e80ad08a1d)

You'll see the newly generated key in the same view. 

![DEV API KEY](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/6f87b450-96e5-4e86-b077-0f36d12cafd5)

Store this key and proceed to the next step.

<br />

## Create a Repository

You can follow official documentation on [how to create a repository on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). I will explain, even if you don't want to.

Sign in to your [GitHub](https://github.com/), select `+` in the upper right corner, and then click `new repository`.

![new repository](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/351d3bd7-64ea-4918-ba3f-f74cfe0ae5a5)

Fill in details and type a name for your repository with an optional description.

You can choose `private` if you don't want others to access your posts or reading list saved in the repository. Other things like `LICENSE` are optional. It's up to you if you want to include it.

![details of new repository](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/c910cb73-56ab-4843-b75e-04b990248e2c)

<br />

## Setup Repository

You still need to provide `write` permissions to this token so that it can push changes to your repository.

To do this, go to repository `settings > Actions > General > Workflow` permissions and select `Read and Write Permissions`.

Here is a screenshot of how you can find it.

![actions for write permissions](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/e4779e30-8a23-4514-a40e-1099fe0f904c)

After you have granted your token the write permissions, you are all set to proceed to the next step.

To do this, go to `settings > Secrets and variables > Actions` and then click on `New Repository Secret`.

![repository secret](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/6418164e-49e6-4459-b79f-77ec2a5b982a)

Now you have to put the name as `DEV_TOKEN` (used in workflow) and `Secret` as the API key you generated earlier from DEV. 

![repository secret](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/9dc41a39-a8fe-44e2-859f-2d7eed0e9114)

Hooray 🎉 You're all set! You can now proceed to [creating a workflow file](https://github.com/Anmol-Baranwal/DevtoGitHub/tree/main?tab=readme-ov-file#-getting-started) mentioned in the README.
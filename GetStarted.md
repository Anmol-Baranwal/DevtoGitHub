
# ✅ Get Started

> This is a step-by-step guide on how to set up your repository, get the API key from DEV, add it, and every other mandatory step before you can use the workflow.

## Generate DEV API key

The first step is to generate a `dev.to` API token.

Once you are logged into your DEV account, go to [dev.to/settings/extensions](https://dev.to/settings/extensions) 

In the `DEV API Keys` section, create a new key by adding a description and clicking on `Generate API Key`.

![DEV API KEY](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/a654edc3-9a21-4737-93e2-3cb0f761c585)

You'll see the newly generated key in the same view. 

![DEV API KEY](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/db73ffe1-2a92-4390-a263-4170df63c540)

Store this key and proceed to the next step.

<br />

## Create a Repository

You can follow official documentation on [how to create a repository on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). I will explain, even if you don't want to.

Sign in to your [GitHub](https://github.com/), select `+` in the upper right corner, and then click `new repository`.

![new repository](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/5d977197-b461-4dee-b188-a63452ea2313)

Fill in details and type a name for your repository with an optional description.

You can choose `private` if you don't want others to access your posts or reading list saved in the repository. Other things like `LICENSE` are optional. It's up to you if you want to include it.

![details of new repository](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/cc6943ba-4ae6-4352-b8aa-4ee36708069b)

<br />

## Setup Repository

You still need to provide `write` permissions to this token so that it can push changes to your repository.

To do this, go to repository `settings > Actions > General > Workflow` permissions and select `Read and Write Permissions`.

Here is a screenshot of how you can find it.

![actions for write permissions](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/55efbd08-8b76-4dd9-9308-ad71d213f177)

After you have granted your token the write permissions, you are all set to proceed to the next step.

To do this, go to `settings > Secrets and variables > Actions` and then click on `New Repository Secret`.

![repository secret](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/56e39242-d6aa-4881-8176-86545b63c919)

Now you have to put the name as `DEV_TOKEN` (used in workflow) and `Secret` as the API key you generated earlier from DEV. 

![repository secret](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/0501cd47-c7c5-45e9-a9a3-3711159a32f6)

Hooray 🎉 You're all set! You can see [examples]() on what options you can choose from.

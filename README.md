![DevtoGitHub Banner](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/839a978c-cfa3-4977-a7a4-5656354642e0)

# DevtoGitHub
Save your DEV.to articles and reading list with a bunch of useful options.

## Use cases

> The problem is that there is no way to save the articles or reading list from DEV.to as a backup, and this solves that in an efficient way.

- The workflow can save your articles each in a different markdown file.
- The details like tags, cover image, URL, and published time is shown in a proper format.
- The best part is that you can create a table of contents in the readme to view and visit each of your articles in the saved repository.
- You can also save your reading lists with specified structures and URLs for easy access.
- You can display the reading time for each article in the reading list.
- You can customize the directory in which you want to save the articles and the reading list.
- I've added a custom logic based on tags to give you more flexibility in saving your reading list.

> The only drawback is that articles/readingList aren't going to update even if you update it on the DEV. I will handle this in the upcoming version.

---

## 🚀 Getting Started

- Before you continue, you should take a few steps to create a repository and generate an API token from DEV. Don't worry, you can use this [complete guide](./GetStarted.md), which has clear instructions and image examples for each step.

- Create a file in the repository at the following path: `.github/workflows/dev-sync.yml` and paste the following code into it.

```yml
name: DevtoGitHub

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed
  # The lines below will allow you to manually run the workflow with each commit
  workflow_dispatch:
  push:
    branches: ["main"]

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Run DevtoGitHub
        uses: Anmol-Baranwal/DevtoGitHub@v1
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          saveArticles: true # default
          outputDir: "articles" # this will save the articles in "articles" directory
          saveArticlesReadme: true # this will create a table of content for easy navigation
```

- For detailed instructions on custom configuration and visual samples, please refer to the [examples](./Examples.md). To get started, I've also mentioned some of the [common cron schedule](https://github.com/Anmol-Baranwal/DevtoGitHub/blob/main/Examples.md#other-options) for you to use in the workflow.

---

## Inputs

Various inputs are defined to let you configure the action:

| Name | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| `gh-token` | The GitHub token for authentication. | `'${{ github.token }}'` | `No` |
| `devApiKey` | The API key from your DEV. | `''` | `Yes` |
| `saveArticles` | This will save your articles in respective markdown file. | `'true'` | `No` |
| `outputDir` | The directory to save your articles. Default will save it under articles directory. | `'articles'` | `No` |
| `saveArticlesReadme` | To create a table of contents for your articles in readme (same directory). | `'false'` | `No` |
| `readingList` | To create a reading list from DEV. | `'false'` | `No` |
| `readTime` | To include the reading time for each article in the reading list. | `'false'` | `No` |
| `outputDirReading` | The output directory for saving the reading list (Readme.md). Default will save it under root directory. | `''` | `No` |
| `excludeTags` | To filter the reading list to avoid this tag. Use commas to separate if there are multiple tags. | `''` | `No` |
| `mustIncludeTags` | To create a reading list to include this tag prioritizing over excludeTags. Use commas to separate if there are multiple tags. | `''` | `No` |
| `branch` | The git branch to use for these process. | `'main'` | `No` |
| `conventionalCommits` | To use conventional commit message standards. | `'true'` | `No` |

<br>

## The concept of excludeTags and mustIncludeTags

The Combinations that you can use with `readingList`:

As you're aware, there are four tags (max) for each article.
So, I devised a way to give you some flexibility based on the tags.

Suppose you want to remove some articles with tag `#discuss` but want to include the post if that article with `#discuss` tag also has a `#programming` tag. So, you can include `#discuss` in `exlcudeTags` & `#programming` in `mustIncludeTags`.
In case you feel confused. Let's understand it with an example.

Suppose we have an article with tags: `['react', 'javascript', 'frontend', 'tutorial']`.

- If `excludeTags` is 'frontend' and `mustIncludeTags` is 'javascript'. The article is included because it has the `javascript` tag (even though it also has the `frontend` tag).
- If `excludeTags` is 'tutorial' and `mustIncludeTags` is empty (default), the article will be excluded because it has the `tutorial` tag.
- If `excludeTags` is 'backend' and `mustIncludeTags` is 'typescript'. The article is included because it does not have the `backend` tag.
- These cases will work for multiple tags, and `mustIncludeTags` will only work if `excludeTags` is provided.

> As I said earlier even if you remove a article from your reading list on DEV, it's isn't deleted from this repository. I'm going to solve this in the future release.

---

## 🤝 How to Contribute?

All changes are welcome. Please read our [contributing guidelines](Contributing.md)

Feel free to suggest any features or report bugs using these [issue templates](https://github.com/Anmol-Baranwal/DevtoGitHub/issues/new/choose).

---

## 📝 License

<table>
  <tr>
     <td>
       <p align="center"> <img src="https://github.com/rupali-codes/LinksHub/assets/66154908/65ae0c03-9cad-47a6-80b8-23c91cd2ac4e" width="80%"></img>
    </td>
    <td> 
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg"/> <br> 
The scripts and documentation in this project are released under the <a href="./LICENSE">MIT License</a>. <img width=2300/>
    </td>
  </tr>
</table>

---

## <img src="https://user-images.githubusercontent.com/74038190/221857984-5bf77e81-6f65-4502-a7c8-f29a978efb3f.png" alt="bullseye" width="25" /> Tech & Tools

> In case you want to run the action locally, without having to commit/push every time, you can use the [act](https://github.com/nektos/act) tool.

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />

---

## Author 

> Feel free to contact me if you need a custom workflow for your project. I'll be happy to build one.

<table>
<td align="center" width="200"><pre><a href="https://github.com/Anmol-Baranwal"><img src="https://avatars.githubusercontent.com/u/74038190?v=4" width="200" alt="GitHub Profile of Anmol Baranwal" /><br><sub>Anmol Baranwal</sub></a><br>@Anmol-Baranwal</pre></td>
</table>

I would appreciate if you could give this repository a star 🌟. It would help others to discover this. 
Thank you for your support 💜

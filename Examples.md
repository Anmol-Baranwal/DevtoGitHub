# Examples

> Welcome. Let's see the workflow samples along with the output it gives.
> You need to create a file in the repository at the following path: `.github/workflows/dev-sync.yml` and paste the code of your choice inside.

## Saving Articles

> Explanation

This will save your articles when `saveArticles` is set to `true` (default). You can change which directory you want using `outputDir`. For instance, the below workflow will save your articles in the `articles` directory. The file name of each markdown file would be using the title of the article.

> Workflow code

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
          outputDir: "articles" # this is default and it will save articles in "articles" directory
```

> Output
![saving articles](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/ad357618-6fda-4f9e-b90d-39962dce9e9f)

The structure of each article markdown file would be as follows:

- Cover Banner Image
- Article Title
- Tags of the Article
- Published Date
- URL of the Article
- Content of the Article

> Output
![structure of saved article](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/24fb6087-bec8-457f-8c3f-2205a08fd873)


## Table of Contents for Saved Articles

> Explanation

This will save your articles when `saveArticles` is set to `true` (default). You can change which directory you want using `outputDir`. For instance, the below workflow will save your articles in the `articles` directory. It will create a table of contents with a `README` in the same directory for easy navigation of your articles within your repository.

> Workflow code

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
          outputDir: "articles" # # this is default and it will save articles in "articles" directory
          saveArticlesReadme: true # this will create table of contents in "articles/README.md"
```

> Output
![saving articles with table of contents](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/6093c3ff-9ae9-43f6-b70f-96cda5dd0ce1)


## Reading List

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the root directory by adding your info in a `README`.

> Workflow code

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
          saveArticles: false # default is true
          readingList: true # default is false
          outputDirReading: "" # this is default and it will save reading list in Readme.md in root directory

```

> Output
![create reading list](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/d13f89a7-7999-4dab-9efb-12094918d078)


## Reading List with read time & synchronization with DEV.

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the `read` directory by adding your info in a `README`. It will add a reading time with the articles when `readTime` is set to `true` (default is `false`). Setting `synchronizeReadingList` to `true` will synchronize your reading list from DEV, removing any article from your reading list on DEV will also remove it from the readme here.

> Workflow code

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
          saveArticles: false # default is true
          readingList: true
          outputDirReading: "read" # this will save reading list in read/Readme.md
          readTime: true
          synchronizeReadingList: true
```

> Output
![create a reading list with a reading time of the article](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/f5f6926d-ff73-4ad1-98d6-30833d9cf4e5)


## Reading List with excludeTags & mustIncludeTags

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the root directory by adding your info in a `README`. You can read about excludeTags and mustIncludeTags in [detail with examples](https://github.com/Anmol-Baranwal/DevtoGitHub?tab=readme-ov-file#the-concept-of-excludetags-and-mustincludetags).

> Workflow code

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
          saveArticles: false # default is true
          readingList: true
          readTime: true
          excludeTags: `discuss` # default is empty
          mustIncludeTags: `programming, webdev, beginners, tutorial` # default is empty
```

### Other options

These options are not mandatory for everyone if you're not very familiar with Git & GitHub. I suggest ignoring these. Although, you're free to learn more about them if you want.

> Conventional commits

There are conventions for commit messages that make commits self-explanatory regarding their type. If `conventionalCommits` is set to `true` (default) then those conventions will be used. You can read more about [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

> Output
![conventional commits](https://github.com/Anmol-Baranwal/DevtoGitHub/assets/74038190/bfe6221b-cc5a-4eb7-92f8-32f33f3945e1)


> Git Branch

You can read more about the branch [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches). Branches will allow you to do those above process in a contained area of your repository. You can change it using `branch` whose default value is `main`.
Your text is mostly grammatically correct. Here's a slightly revised version for better clarity and correctness:

---

> Some examples of cron schedules (to use in workflow)

In case you are looking for cron schedules, here are some common ones that you can directly use:

- `0 0 * * *` - runs at midnight (0:00) every day.
- `0 */12 * * *` - runs at minute 0 of every 12th hour.
- `0 0 * * 0` - runs at midnight (0:00) every Sunday.
- `0 0 1 * *` - runs at midnight (0:00) on the first day of every month.
- `0 0 */15 * *` - runs at midnight (0:00) every 15 days.

<br />

You can see the list of [input options](https://github.com/Anmol-Baranwal/DevtoGitHub?tab=readme-ov-file#inputs) that you can use with the workflow.
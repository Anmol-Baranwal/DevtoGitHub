## Examples

> Welcome. Let's see the workflow samples along with the output it gives.
> You need to create a file in the repository at the following path: `.github/workflows/dev-sync.yml` and paste the code of your choice inside.

### Saving Articles

> Explanation

This will save your articles when `saveArticles` is set to `true` (default). You can change which directory you want using `outputDir`. For instance, the below workflow will save your articles in the `articles` directory.

> Workflow code

```yml
name: DevSync

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Run DevSync
        uses: Anmol-Baranwal/DevSync@main
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          saveArticles: true # default
          outputDir: "./articles" # default
```

> Output
![saving articles](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/a5c18795-c74b-4833-a38b-22c22c8e2c19)


### Table of Contents for Saved Articles

> Explanation

This will save your articles when `saveArticles` is set to `true` (default). You can change which directory you want using `outputDir`. For instance, the below workflow will save your articles in the `articles` directory. It will create a table of contents with a `README` in the same directory for easy navigation of your articles within your repository.

> Workflow code

```yml
name: DevSync

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Run DevSync
        uses: Anmol-Baranwal/DevSync@main
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          saveArticles: true # default
          outputDir: "./articles" # default
          saveArticlesReadme: true 
```

> Output
![saving articles with table of contents](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/3ef5c665-b42a-4e1d-b769-4146d8e82259)


### Reading List

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the root directory by adding your info in a `README`.

> Workflow code

```yml
name: DevSync

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Run DevSync
        uses: Anmol-Baranwal/DevSync@main
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          saveArticles: false # default is true
          readingList: true # default is false
          outputDirReading: ./read/ # default is ./

```

> Output
![create reading list](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/b45d1e49-0a8b-4dc7-a41e-82649baa7aff)


### Reading List with read time

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the `read` directory by adding your info in a `README`. It will also add a readTime with the articles when `readTime` is set to `true` (default is `false`).

> Workflow code

```yml
name: DevSync

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Run DevSync
        uses: Anmol-Baranwal/DevSync@main
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          saveArticles: false # default is true
          readingList: true
          outputDirReading: ./read/ # default is ./
          readTime: true
```

> Output
![create a reading list with a reading time of the article](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/820cb75f-58c2-46ef-8845-5565f3f1fc37)


### Reading List with excludeTags & mustIncludeTags

> Explanation

This will stop saving your articles since `saveArticles` is set to `false` (default is `true`). It will create your reading list with the articles in a structured way. You can change which directory you want using `outputDirReading`. For instance, the below workflow will save your articles in the root directory by adding your info in a `README`. You can read about excludeTags and mustIncludeTags in [detail with examples](https://github.com/Anmol-Baranwal/DevSync?tab=readme-ov-file#the-concept-of-excludetags-and-mustincludetags).

> Workflow code

```yml
name: DevSync

on:
  schedule:
    - cron: "0 0 * * *" # Run daily, adjust as needed

jobs:
  save-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Run DevSync
        uses: Anmol-Baranwal/DevSync@main
        with:
          devApiKey: ${{ secrets.DEV_TOKEN }}
          gh-token: ${{ secrets.GITHUB_TOKEN }}
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

![Screenshot 2024-02-24 174038](https://github.com/Anmol-Baranwal/DevSync/assets/74038190/4cd62814-6eb0-45c5-869b-20c624981c8c)


### Git Branch

You can read more about the branch [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches). Branches will allow you to do those above process in a contained area of your repository. You can change it using `branch` whose default value is `main`.

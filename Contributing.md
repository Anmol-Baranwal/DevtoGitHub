# Contributing Guidelines

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please take a moment to read the following guidelines before contributing:

> ⚠️IMPORTANT **Note**
>
> **Pull Requests _having no issue associated_ with them _will not be accepted_. Firstly get an issue assigned, whether it's already opened or raised by you, and then create a Pull Request.**

## Prerequisites ⚠️

- Open Source Etiquette: If you've never contributed to an open source project before, have a read of [Basic etiquette](https://developer.mozilla.org/en-US/docs/MDN/Community/Open_source_etiquette) for open source projects.

- Basic familiarity with Git and GitHub: If you are also new to these tools, visit [GitHub for complete beginners](https://developer.mozilla.org/en-US/docs/MDN/Contribute/GitHub_beginners) for a comprehensive introduction to them.

## Found a bug?

- **Ensure the bug was not already reported** by searching the existing [Issues](https://github.com/Anmol-Baranwal/DevSync/issues?q=is%3Aissue+).
- If you're unable to find an open issue addressing the problem, open a new one using this [bug template](https://github.com/Anmol-Baranwal/DevSync/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%5BBUG%5D+%3Cconcise+description%3E). Be sure to include a **title and clear description**, and as much relevant information as possible.

## What should I know before submitting a pull request or issue

> We adhere to [SemVer 2.0](https://semver.org/spec/v2.0.0.html) to the best of our ability.

This workflow is written in [TypeScript](https://www.typescriptlang.org/), a typed variant of JavaScript, and we use [Prettier](https://prettier.io/) to get a consistent code style.

Because of how GitHub Actions are run, the source code of this project is transpiled from TypeScript into JavaScript. The transpiled code (found in `lib/`) is subsequently compiled using [NCC](https://github.com/vercel/ncc/blob/master/readme.md) (found in `dist/`) to avoid having to include the `node_modules/` directory in the repository.

## Submitting a pull request

> ℹ️ Please keep your change as focused as possible.

1. Fork and clone the repository
1. Configure and install the dependencies: `npm install`
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your change, test it thoroughly. You can write tests to see if all the tests are passing.
1. Update `dist/index.js` using `npm run build`. This creates a single javascript file that is used as an entrypoint for the action
1. Push to your fork and submit a pull request.

## Remarks ✅

- If something is missing here, or you feel something is not well described, please [raise an issue](https://github.com/Anmol-Baranwal/DevSync/issues/new) with relevant template.
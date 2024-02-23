"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdownFile = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const git_1 = require("./git");
const parseMarkdownContent_1 = require("./parseMarkdownContent");
const conventionalCommits = core.getInput("conventional_commits") === "true" || true;
async function createMarkdownFile(articles, outputDir, branch) {
    // output directory must exist
    if (!fs.existsSync(outputDir)) {
        try {
            // Create the directory with necessary permissions
            fs.mkdirSync(outputDir);
        }
        catch (error) {
            core.setFailed(`Failed to create directory ${outputDir}: ${error.message}`);
            return;
        }
    }
    for (const article of articles) {
        const fileName = (0, git_1.getFileNameFromTitle)(article.title).trim();
        const filePath = `${outputDir}/${fileName}.md`;
        // Check if the markdown file already exists
        if (!fs.existsSync(filePath)) {
            let commitMessage = `add ${fileName} markdown file`;
            if (conventionalCommits) {
                commitMessage = `chore: ${commitMessage.toLowerCase()}`;
            }
            const markdownContent = (0, parseMarkdownContent_1.parseMarkdownContent)(article);
            // Write markdown content to file
            fs.writeFileSync(filePath, markdownContent);
            try {
                // await gitAdd(filePath)
                // await gitCommit(commitMessage, filePath)
                // await gitPush(branch)
                core.notice(`Markdown file created and committed: ${filePath}`);
            }
            catch (error) {
                core.setFailed(`Failed to commit and push changes: ${error.message}`);
            }
            core.notice(`Markdown file created: ${filePath}`);
        }
        else {
            core.notice(`Markdown file already exists for "${article.title}". Skipping.`);
        }
    }
    const tableOfContents = core.getInput("saveArticlesReadme") === "true" || false;
    if (tableOfContents) {
        await createArticlesReadme(articles, outputDir, branch);
    }
}
exports.createMarkdownFile = createMarkdownFile;
async function createArticlesReadme(articles, outputDir, branch) {
    // Create content for README.md
    let readmeContent = "";
    const readmePath = `${outputDir}/README.md`;
    if (fs.existsSync(readmePath)) {
        readmeContent = fs.readFileSync(readmePath, "utf8");
    }
    const hasTableOfContentsHeading = readmeContent.includes("# Table of Contents\n\n");
    // Set the commit message based on whether the heading exists
    let commitMessage = hasTableOfContentsHeading
        ? "update readme with table of contents"
        : "create readme with table of contents";
    if (!hasTableOfContentsHeading) {
        readmeContent = "# Table of Contents\n\n";
    }
    for (const article of articles) {
        const fileName = (0, git_1.getFileNameFromTitle)(article.title).trim();
        const fileLink = `./${fileName}.md`;
        // Add entry to README content
        readmeContent += `- [${article.title}](${fileLink.replace(/ /g, "%20")})\n`;
    }
    // Write README.md
    fs.writeFileSync(readmePath, readmeContent);
    if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`;
    }
    try {
        // await gitAdd(readmePath)
        // await gitCommit(commitMessage, readmePath)
        // await gitPush(branch)
        core.notice("README.md file created and committed");
    }
    catch (error) {
        ;
        `Failed to commit and push changes (readme articles): ${error}`;
    }
}

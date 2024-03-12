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
const fetchDevArticleUsingId_1 = require("./fetchDevArticleUsingId");
const performGitActions_1 = require("./performGitActions");
const createArticlesReadme_1 = require("./createArticlesReadme");
const conventionalCommits = core.getInput("conventionalCommits") === "true" || true;
async function createMarkdownFile(articles, outputDir, branch, apiKey) {
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
        const filePath = `./${outputDir}/${fileName}.md`;
        let commitMessage;
        // Check if the markdown file already exists
        if (!fs.existsSync(filePath)) {
            commitMessage = `add ${fileName} markdown file`;
            if (conventionalCommits) {
                commitMessage = `chore: ${commitMessage.toLowerCase()}`;
            }
            const markdownContent = (0, parseMarkdownContent_1.parseMarkdownContent)(article);
            // Write markdown content to file
            fs.writeFileSync(filePath, markdownContent);
            (0, performGitActions_1.performGitActions)({
                commitMessage,
                path: filePath,
                branch
                // noticeMessage: "Markdown file created and committed"
            });
            // core.notice(`Markdown file created: ${filePath}`)
        }
        else {
            const existingContent = fs.readFileSync(filePath, "utf8");
            const fetchedArticle = await (0, fetchDevArticleUsingId_1.fetchDevArticleUsingId)(article.id, apiKey);
            // Check if the article has been edited by comparing the existing content with the fetched article's content
            const newMarkdownContent = (0, parseMarkdownContent_1.parseMarkdownContent)(fetchedArticle, {
                option: "2"
            });
            if (existingContent !== newMarkdownContent) {
                core.notice(`Article has been edited, updating the Markdown file content.`);
                fs.writeFileSync(filePath, newMarkdownContent);
                commitMessage = `update ${fileName} markdown file with edited content`;
                if (conventionalCommits) {
                    commitMessage = `chore: ${commitMessage.toLowerCase()}`;
                }
                (0, performGitActions_1.performGitActions)({
                    commitMessage,
                    path: filePath,
                    branch,
                    noticeMessage: "Markdown file created and committed"
                });
            }
            else {
                core.notice(`Markdown file already exists for "${article.title}" and it is not edited. Skipping.`);
            }
        }
    }
    const tableOfContents = core.getInput("saveArticlesReadme") === "true" || false;
    if (tableOfContents) {
        await (0, createArticlesReadme_1.createArticlesReadme)(articles, outputDir, branch);
    }
}
exports.createMarkdownFile = createMarkdownFile;

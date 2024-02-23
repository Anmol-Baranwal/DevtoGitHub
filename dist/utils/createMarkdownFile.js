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
async function createMarkdownFile(articles, outputDir, branch) {
    const conventionalCommits = core.getInput("conventional_commits") === "true" || true;
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
                // Commit and push the new markdown file to the specified branch
                await (0, git_1.gitAdd)(filePath);
                core.notice(`commitMessageBefore`);
                await (0, git_1.gitCommit)(commitMessage, git_1.gitConfig);
                core.notice(`branchbefore`);
                await (0, git_1.gitPush)(branch, git_1.gitConfig);
                core.notice(`branchafter`);
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
}
exports.createMarkdownFile = createMarkdownFile;

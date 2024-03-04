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
exports.synchronizeReadingList = void 0;
const fs = __importStar(require("fs"));
const core = __importStar(require("@actions/core"));
const git_1 = require("./git");
async function synchronizeReadingList(readingList, outputDir, branch) {
    const readmePath = `./${outputDir}/README.md`;
    let commitMessage = "synchronize reading list";
    const conventionalCommits = core.getInput("conventionalCommits") === "true" || true;
    if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`;
    }
    try {
        const existingContent = fs.readFileSync(readmePath, "utf8");
        // For logging names of removed articles
        const removedArticles = [];
        // Iterate each line in the readme
        let updatedContent = existingContent
            .split("\n")
            .filter((line) => {
            // Extract the URL from the line
            const urlMatch = line.match(/\[.*\]\((.*)\)/);
            if (urlMatch) {
                const articleUrl = urlMatch[1];
                // Check if the article URL exists in the fetched reading list
                const existsInReadingList = readingList.some((article) => article.article.url === articleUrl);
                // If the article doesn't exist in the reading list, add it to removedArticles
                if (!existsInReadingList) {
                    const titleMatch = line.match(/\[(.*)\]/);
                    if (titleMatch) {
                        const articleTitle = titleMatch[1];
                        removedArticles.push(articleTitle);
                    }
                }
                return existsInReadingList;
            }
            // Preserve lines that are not article URLs
            return true;
        })
            .join("\n");
        // Log removed articles
        if (removedArticles.length > 0) {
            console.log(`Removed these articles from the reading list: ${removedArticles.join(", ")}`);
        }
        fs.writeFileSync(readmePath, updatedContent);
        try {
            await (0, git_1.gitConfig)();
            await (0, git_1.gitAdd)(readmePath);
            await (0, git_1.gitCommit)(commitMessage, readmePath);
            await (0, git_1.gitPull)(branch);
            await (0, git_1.gitPush)(branch);
        }
        catch (error) {
            core.setFailed(`Failed to commit and push changes: ${error.message}`);
        }
        core.notice(`Reading list synchronized successfully.`);
    }
    catch (error) {
        core.setFailed(`Failed to synchronize reading list: ${error.message}`);
    }
}
exports.synchronizeReadingList = synchronizeReadingList;

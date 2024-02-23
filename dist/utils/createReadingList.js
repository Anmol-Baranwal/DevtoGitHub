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
exports.createReadingList = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const git_1 = require("./git");
async function createReadingList(articles, outputDir, branch) {
    const readTime = core.getInput("readTime") === "true" || false;
    const conventionalCommits = core.getInput("conventional_commits") === "true" || true;
    // Read existing content of README
    let existingContent = "";
    const readmePath = `${outputDir}README.md`;
    if (fs.existsSync(readmePath)) {
        existingContent = fs.readFileSync(readmePath, "utf8");
    }
    let commitMessage = `update reading list`;
    if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`;
    }
    // Check if the reading list heading exists, if not add it
    if (!existingContent.includes("## Reading List")) {
        existingContent += "\n <hr/> \n\n## Reading List\n\n";
    }
    // Add bullet points for each article
    for (const articleItem of articles) {
        const articleUrl = articleItem.article.url;
        // url is used to avoid adding duplicate articles
        if (existingContent.includes(articleUrl)) {
            console.log(`Skipping article "${articleItem.article.title}" because it already exists in the reading list.`);
            continue;
        }
        if (readTime) {
            existingContent += `- [${articleItem.article.title}](${articleItem.article.url}) - ${articleItem.article.reading_time_minutes} minutes\n`;
        }
        else {
            existingContent += `- [${articleItem.article.title}](${articleItem.article.url})\n`;
        }
    }
    fs.writeFileSync(readmePath, existingContent);
    try {
        await (0, git_1.gitAdd)(readmePath);
        await (0, git_1.gitCommit)(commitMessage, readmePath);
        await (0, git_1.gitPush)(branch);
        core.notice(`reading list file created and committed`);
    }
    catch (error) {
        core.setFailed(`Failed to commit and push changes: ${error.message}`);
    }
    core.notice(`Reading list updated in README.md`);
}
exports.createReadingList = createReadingList;

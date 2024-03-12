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
exports.createArticlesReadme = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const git_1 = require("./git");
const performGitActions_1 = require("./performGitActions");
const conventionalCommits = core.getInput("conventionalCommits") === "true" || true;
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
        if (readmeContent.includes(`[${article.title}]`)) {
            console.log(`Skipping "${article.title}" because it already exists in the table of contents.`);
            continue;
        }
        // Add entry to README content
        readmeContent += `- [${article.title}](${fileLink.replace(/ /g, "%20")})\n`;
    }
    // Write README.md
    fs.writeFileSync(readmePath, readmeContent);
    if (conventionalCommits) {
        commitMessage = `chore: ${commitMessage.toLowerCase()}`;
    }
    (0, performGitActions_1.performGitActions)({
        commitMessage,
        path: readmePath,
        branch,
        noticeMessage: "README.md file created and committed"
    });
}
exports.createArticlesReadme = createArticlesReadme;

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
const fs = __importStar(require("fs"));
const core = __importStar(require("@actions/core"));
const git_1 = require("./git");
async function createMarkdownFile(articles, outputDir, branch, conventionalCommits) {
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
        const fileName = (0, git_1.getFileNameFromTitle)(article.title);
        const filePath = `${outputDir}/${fileName}.md`;
        // Check if the markdown file already exists
        if (!fs.existsSync(filePath)) {
            // Use predefined commit message
            const commitMessage = `chore: add ${fileName}`;
            const markdownContent = `---
title: "${article.title}"
description: "${article.description}"
cover_image: "${article.cover_image || ""}"
tags: [${article.tag_list.map((tag) => `"${tag}"`).join(", ")}]
url: "${article.url}"
created_at: "${article.published_timestamp}"
---

`;
            fs.writeFileSync(filePath, markdownContent);
            // Commit and push the new markdown file to the specified branch
            await (0, git_1.gitAdd)(filePath);
            await (0, git_1.gitCommit)(commitMessage, git_1.gitConfig);
            await (0, git_1.gitPush)(branch, git_1.gitConfig);
            core.notice(`Markdown file created and committed: ${filePath}`);
        }
        else {
            core.notice(`Markdown file already exists for "${article.title}". Skipping.`);
        }
    }
}
exports.createMarkdownFile = createMarkdownFile;

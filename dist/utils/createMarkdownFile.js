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
function createMarkdownFile(articles, outputDir) {
    // output directory must exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    articles.forEach((article) => {
        const fileName = getFileNameFromTitle(article.title);
        const filePath = `${outputDir}/${fileName}.md`;
        // Check if the markdown file already exists
        if (!fs.existsSync(filePath)) {
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
            console.log(`Markdown file created: ${filePath}`);
        }
        else {
            console.log(`Markdown file already exists for "${article.title}". Skipping.`);
        }
    });
}
exports.createMarkdownFile = createMarkdownFile;
// generate a valid file name from the article title
function getFileNameFromTitle(title) {
    // Replace spaces and special characters with underscores
    return title
        .replace(/[^\w\s]/gi, "_")
        .replace(/\s+/g, "_")
        .toLowerCase();
}

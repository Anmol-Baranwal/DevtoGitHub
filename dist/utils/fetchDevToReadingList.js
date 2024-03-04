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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDevToReadingList = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const core = __importStar(require("@actions/core"));
const filteredArticles = (articles, excludeTags, mustIncludeTags) => {
    if (excludeTags.length === 0) {
        // No filtering if excludeTags is empty
        return articles;
    }
    return articles.filter((articleItem) => {
        const articleTags = articleItem.article.tags;
        const hasExcludedTag = excludeTags.some((tag) => articleTags.includes(tag));
        const hasMustIncludeTag = mustIncludeTags.length !== 0 &&
            mustIncludeTags.some((tag) => articleTags.includes(tag));
        const shouldInclude = hasMustIncludeTag || !hasExcludedTag;
        return shouldInclude;
    });
};
async function fetchDevToReadingList(apiKey, per_page) {
    if (per_page === undefined)
        per_page = 30; // Default per page value is 30
    let page = 1;
    let readingList = [];
    while (true) {
        const apiUrl = `https://dev.to/api/readinglist?page=${page}&per_page=${per_page}`;
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };
        const response = await (0, node_fetch_1.default)(apiUrl, { headers });
        if (!response.ok) {
            throw new Error(`Failed to fetch reading list. Status: ${response.status}`);
        }
        const articles = (await response.json());
        if (articles.length === 0) {
            break; // break when no more articles left
        }
        readingList = readingList.concat(articles);
        page++;
    }
    core.notice("Reading list fetched successfully.");
    const excludeTags = core
        .getInput("excludeTags")
        .split(",")
        .map((tag) => tag.trim());
    const mustIncludeTags = core
        .getInput("mustIncludeTags")
        .split(",")
        .map((tag) => tag.trim());
    const filteredReadingList = filteredArticles(readingList, excludeTags, mustIncludeTags);
    return filteredReadingList;
}
exports.fetchDevToReadingList = fetchDevToReadingList;

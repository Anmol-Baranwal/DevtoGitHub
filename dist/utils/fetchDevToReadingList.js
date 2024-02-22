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
        per_page = 999; // default is 30
    const apiUrl = `https://dev.to/api/readinglist?per_page=${per_page}`;
    const headers = {
        "Content-Type": "application/json",
        "api-key": "Kk9yXar68C98KfsZokUDc5Ag"
    };
    // const excludeTags = core
    //   .getInput("excludeTags")
    //   .split(",")
    //   .map((tag) => tag.trim())
    // const mustIncludeTags = core
    //   .getInput("mustIncludeTags")
    //   .split(",")
    //   .map((tag) => tag.trim())
    const excludeTags = ["webdev", "react", "discuss"];
    const mustIncludeTags = ["startup", "programming", "beginners"];
    // const excludeTags = ["webdev, react, discuss"].flatMap(tagList => tagList.split(", "));
    console.log({ apiUrl });
    const response = await (0, node_fetch_1.default)(apiUrl, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch reading list. Status: ${response.status}`);
    }
    core.notice("Reading list fetched successfully.");
    const articles = (await response.json());
    const filteredReadingList = filteredArticles(articles, excludeTags, mustIncludeTags);
    return filteredReadingList;
}
exports.fetchDevToReadingList = fetchDevToReadingList;

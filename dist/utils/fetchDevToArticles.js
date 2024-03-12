"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDevToArticles = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function fetchDevToArticles(apiKey, per_page) {
    if (per_page === undefined)
        per_page = 999; // default is 30
    let page = 1;
    let articles = [];
    while (true) {
        const apiUrl = `https://dev.to/api/articles/me?page=${page}&per_page=${per_page}`;
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };
        const response = await (0, node_fetch_1.default)(apiUrl, { headers });
        if (!response.ok) {
            throw new Error(`Failed to fetch articles. Status: ${response.status}`);
        }
        const pageArticles = (await response.json());
        if (pageArticles.length === 0) {
            break; // No more articles left
        }
        articles = articles.concat(pageArticles);
        page++;
    }
    return articles;
}
exports.fetchDevToArticles = fetchDevToArticles;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDevToArticles = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function fetchDevToArticles(apiKey) {
    const apiUrl = `https://dev.to/api/articles/me`;
    const headers = {
        "Content-Type": "application/json",
        "api-key": apiKey
    };
    const response = await (0, node_fetch_1.default)(apiUrl, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch articles. Status: ${response.status}`);
    }
    const articles = await response.json();
    return articles;
}
exports.fetchDevToArticles = fetchDevToArticles;

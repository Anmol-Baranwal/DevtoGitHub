"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDevArticleUsingId = void 0;
async function fetchDevArticleUsingId(id, apiKey) {
    const apiUrl = `https://dev.to/api/articles/${id}`;
    const headers = {
        "Content-Type": "application/json",
        "api-key": apiKey
    };
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch article. Status: ${response.status}`);
    }
    const article = await response.json();
    return article;
}
exports.fetchDevArticleUsingId = fetchDevArticleUsingId;

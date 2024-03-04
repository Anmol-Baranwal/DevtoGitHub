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
exports.fetchDevToArticles = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const core = __importStar(require("@actions/core"));
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
    core.notice("Articles fetched and saved successfully.");
    return articles;
}
exports.fetchDevToArticles = fetchDevToArticles;

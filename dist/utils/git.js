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
exports.gitConfig = exports.gitPush = exports.gitCommit = exports.gitAdd = exports.getFileNameFromTitle = void 0;
const exec = __importStar(require("@actions/exec"));
// generate a valid file name using the title
function getFileNameFromTitle(title) {
    // Replace spaces and special characters with underscores
    return title
        .replace(/[^\w\s]/gi, "_")
        .replace(/\s+/g, "_")
        .toLowerCase();
}
exports.getFileNameFromTitle = getFileNameFromTitle;
async function gitAdd(filePath) {
    await exec.exec("git", ["add", filePath]);
}
exports.gitAdd = gitAdd;
async function gitCommit(message, config) {
    await exec.exec("git", ["commit", "-m", message, ...config]);
}
exports.gitCommit = gitCommit;
async function gitPush(branch, config) {
    await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config]);
}
exports.gitPush = gitPush;
exports.gitConfig = [
    "-c",
    `user.name="${process.env.GITHUB_ACTOR || "GitHub Actions"}"`,
    "-c",
    `user.email="${process.env.GITHUB_ACTOR}@users.noreply.github.com"`
];
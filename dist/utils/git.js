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
exports.gitPull = exports.gitConfig = exports.gitPush = exports.gitCommit = exports.gitAdd = exports.getFileNameFromTitle = void 0;
const exec = __importStar(require("@actions/exec"));
const core = __importStar(require("@actions/core"));
// generate a valid file name using the title
function getFileNameFromTitle(title) {
    // Replace special characters other than apostrophes and hyphens with spaces
    return title
        .replace(/[^\w\s'-]/gi, " ")
        .replace(/\s+/g, " ")
        .toLowerCase();
}
exports.getFileNameFromTitle = getFileNameFromTitle;
async function gitAdd(filePath) {
    try {
        await exec.exec("git", ["add", filePath]);
    }
    catch (error) {
        core.setFailed(`Failed to complete git add: ${error.message}`);
    }
}
exports.gitAdd = gitAdd;
async function gitCommit(message, filePath) {
    try {
        const statusOutput = await exec.getExecOutput("git", [
            "status",
            "--porcelain",
            filePath
        ]);
        if (statusOutput.stdout.trim() === "") {
            core.notice(`No changes to commit for file ${filePath}`);
            return;
        }
        await exec.exec("git", ["commit", "-m", message, filePath]);
    }
    catch (error) {
        core.setFailed(`Failed to complete git commit: ${error.message}`);
    }
}
exports.gitCommit = gitCommit;
async function gitPush(branch) {
    try {
        await exec.exec("git", ["push", "origin", `HEAD:${branch}`]);
    }
    catch (error) {
        core.setFailed(`Failed to complete git push: ${error.message}`);
    }
}
exports.gitPush = gitPush;
async function gitConfig() {
    try {
        await exec.exec("git", [
            "config",
            "--global",
            "user.email",
            "actions@github.com"
        ]);
        await exec.exec("git", [
            "config",
            "--global",
            "user.name",
            "GitHub Actions"
        ]);
    }
    catch (error) {
        core.setFailed(`Failed to set up Git configuration: ${error.message}`);
    }
}
exports.gitConfig = gitConfig;
async function gitPull(branch) {
    try {
        await exec.exec("git", ["pull", "origin", branch]);
    }
    catch (error) {
        core.setFailed(`Failed to pull changes from ${branch}: ${error.message}`);
    }
}
exports.gitPull = gitPull;

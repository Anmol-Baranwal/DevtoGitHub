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
exports.performGitActions = void 0;
const core = __importStar(require("@actions/core"));
const git_1 = require("./git");
async function performGitActions({ commitMessage, path, branch, noticeMessage }) {
    try {
        await (0, git_1.gitConfig)();
        await (0, git_1.gitAdd)(path);
        await (0, git_1.gitCommit)(commitMessage, path);
        await (0, git_1.gitPull)(branch);
        await (0, git_1.gitPush)(branch);
        if (noticeMessage)
            core.notice(noticeMessage);
    }
    catch (error) {
        core.notice(`Failed to commit and push changes: ${error.message}`);
    }
}
exports.performGitActions = performGitActions;

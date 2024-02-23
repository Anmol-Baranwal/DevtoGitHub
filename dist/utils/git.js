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
exports.gitConfig = exports.gitPush = exports.gitCommit = exports.gitAdd = exports.getFileNameFromTitle = void 0;
const exec = __importStar(require("@actions/exec"));
const node_process_1 = __importDefault(require("node:process"));
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
    core.notice(`inside gitAdd`);
    await exec.exec("git", ["add", filePath]);
}
exports.gitAdd = gitAdd;
// export async function gitCommit(
//   message: string,
//   config: string[]
// ): Promise<void> {
//   core.notice(`inside gitCommit`)
//   await exec.exec("git", [...config, "commit", "-m", message])
// }
// export async function gitPush(branch: string, config: string[]): Promise<void> {
//   core.notice(`inside gitPush`)
//   await exec.exec("git", ["push", "origin", `HEAD:${branch}`, ...config])
// }
async function gitCommit(message, filePath) {
    core.notice(`inside gitCommit`);
    await exec.exec("git", [
        "commit",
        "-m",
        message,
        filePath,
        `--author=Anmol Baranwal <anmolbaranwal119@gmail.com>`
    ]);
}
exports.gitCommit = gitCommit;
async function gitPush(branch) {
    core.notice(`inside gitPush`);
    await exec.exec("git", ["push", "origin", `HEAD:${branch}`]);
}
exports.gitPush = gitPush;
exports.gitConfig = [
    "config",
    "--global",
    "user.name",
    node_process_1.default.env.GITHUB_ACTOR || "GitHub Actions",
    "config",
    "--global",
    "user.email",
    `${node_process_1.default.env.GITHUB_ACTOR}@users.noreply.github.com`
];

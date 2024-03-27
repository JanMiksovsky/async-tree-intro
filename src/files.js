import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

class FileTree {
  constructor(dirname) {
    this.dirname = dirname;
  }

  async get(key) {
    if (typeof key !== "string") {
      return undefined;
    }

    const filePath = path.resolve(this.dirname, key);

    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }

    return stats.isDirectory()
      ? new FileTree(filePath) // Return subdirectory as a tree
      : fs.readFile(filePath); // Return file contents
  }

  async keys() {
    return fs.readdir(this.dirname);
  }
}

const markdownPath = fileURLToPath(new URL("markdown", import.meta.url));
export default new FileTree(markdownPath);

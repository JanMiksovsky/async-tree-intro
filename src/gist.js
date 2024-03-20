import {
  FileTree,
  FileTreeTransform,
  MapValuesTree,
} from "@weborigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const files = new FileTree(dirname);
const token = String(await files.get(".githubToken"));

export default async function gist(gistId) {
  const gistIdRegex = /[a-f0-9]{32}/;
  if (!gistIdRegex.test(gistId)) {
    return undefined;
  }
  const gistUrl = `https://api.github.com/gists/${gistId}`;
  const headers = new Headers({
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(gistUrl, { headers });
  if (response.ok) {
    const { files } = await response.json();
    // Top-level `files` has the actual file content in `content` properties.
    const tree = new (FileTreeTransform(MapValuesTree))(files, (file) =>
      file.get("content")
    );
    return tree;
  } else {
    return undefined;
  }
}

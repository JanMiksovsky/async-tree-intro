import { marked } from "marked";
import map from "./map.js";

export default function htmlTree(markdownTree) {
  return map(
    markdownTree,
    (htmlKey) => htmlKey.replace(/\.html$/, ".md"),
    (markdownKey) => markdownKey.replace(/\.md$/, ".html"),
    (markdownValue) => marked(markdownValue.toString())
  );
}

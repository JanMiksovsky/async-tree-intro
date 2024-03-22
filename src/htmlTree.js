import { marked } from "marked";
import transform from "./transformTree.js";

export default function htmlTree(markdownTree) {
  return transform(
    markdownTree,
    (htmlKey) => htmlKey.replace(/\.html$/, ".md"),
    (markdownKey) => markdownKey.replace(/\.md$/, ".html"),
    (markdownValue) => marked(markdownValue.toString())
  );
}

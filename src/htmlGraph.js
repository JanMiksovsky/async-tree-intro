import { marked } from "marked";
import transform from "./transformGraph.js";

export default function htmlGraph(markdownGraph) {
  return transform(
    markdownGraph,
    (htmlKey) => htmlKey.replace(/\.html$/, ".md"),
    (markdownKey) => markdownKey.replace(/\.md$/, ".html"),
    (markdownValue) => marked(markdownValue.toString())
  );
}

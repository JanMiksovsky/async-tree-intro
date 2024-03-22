import { cachedKeyFunctions, FileTree, map } from "@weborigami/async-tree";
import pagefind from "@weborigami/pagefind";
import path from "node:path";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

// Get this file's containing folder as a tree.
const dirname = path.dirname(new URL(import.meta.url).pathname);
const files = new FileTree(dirname);

// Get the images and the team data.
const images = await files.get("images");
const teamData = JSON.parse(await files.get("teamData.json"));

// Map array of people data to pages for each person.
const team = map({
  ...cachedKeyFunctions((index) => `${teamData[index].name}.html`),
  value: personPage,
})(teamData);

// Export the root of the site.
export default {
  assets: files.get("assets"),
  images,
  "index.html": indexPage(teamData),
  pagefind: pagefind({ team }),
  "search.html": files.get("search.html"),
  team,
  thumbnails: map(thumbnail)(images),
};

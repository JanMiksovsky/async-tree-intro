import {
  cachedKeyFunctions,
  FileTree,
  map,
  ObjectTree,
} from "@weborigami/async-tree";
import path from "node:path";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

// Get this file's containing folder as a tree.
const dirname = path.dirname(new URL(import.meta.url).pathname);
const files = new FileTree(dirname);

// Get the images folder and the team data.
const images = await files.get("images");
const teamData = JSON.parse(await files.get("teamData.json"));

// Map array of people data to pages for each person.
const teamDataToPages = map({
  // Use the person's name as the page file name. Cache the results in both
  // directions so we can also work backwards from the file name to the index.
  ...cachedKeyFunctions((index) => `${teamData[index].name}.html`),

  // Map a person's data to an HTML page.
  value: personPage,
});

// Export the root of the site.
export default new ObjectTree({
  assets: files.get("assets"),
  images,
  "index.html": indexPage(teamData),
  team: teamDataToPages(teamData),
  thumbnails: map(thumbnail)(images),
});

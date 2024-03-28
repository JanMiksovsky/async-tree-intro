import { FileTree, map } from "@weborigami/async-tree";
import path from "node:path";
import folder from "./folder.js";
import headerKeys from "./headerKeys.js";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

// Get this file's containing folder as a tree.
const dirname = path.dirname(new URL(import.meta.url).pathname);
const files = new FileTree(dirname);

// Get the images and the team data from the Google Drive folder.
const images = await folder.get("images");
const teamSheet = JSON.parse(await folder.get("Team.gsheet"));
const teamData = await headerKeys(teamSheet);

// Map array of people data to pages for each person.
const team = map({
  key: (index) => `${teamData[index].name}.html`,
  inverseKey: (key) =>
    teamData.findIndex((person) => person.name === key.slice(0, -5)),
  value: personPage,
})(teamData);

// Export the root of the site.
export default {
  assets: files.get("assets"),
  images,
  "index.html": indexPage(teamData),
  team,
  thumbnails: map(thumbnail)(images),
};

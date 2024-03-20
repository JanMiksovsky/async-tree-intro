import { FileTree, map, ObjectTree } from "@weborigami/async-tree";
import path from "node:path";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

// Get this folder as a tree.
const dirname = path.dirname(new URL(import.meta.url).pathname);
const files = new FileTree(dirname);

// Get the images folder and the team data.
const images = await files.get("images");
const teamData = JSON.parse(await files.get("teamData.json"));

// Map the team data to create team pages.
const mapDataToTeamPages = map({
  // Convert a team member index to an HTML file name.
  key: (index) => `${teamData[index].name}.html`,
  // Convert an HTML file name back to a team member index.
  inverseKey: (htmlKey) => {
    const name = htmlKey.slice(0, -5);
    return teamData.findIndex((person) => person.name === name);
  },
  // Map a person's data to an HTML page.
  value: personPage,
});

// Export the root of the site.
export default new ObjectTree({
  assets: files.get("assets"),
  images,
  "index.html": indexPage(teamData),
  team: mapDataToTeamPages(teamData),
  thumbnails: map({ value: thumbnail })(images),
});

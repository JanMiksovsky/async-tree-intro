import {
  FileTree,
  MapExtensionsTree,
  MapInnerKeysTree,
  MapValuesTree,
  ObjectTree,
  TreeHelpers,
} from "@weborigami/origami";
import headerKeys from "./headerKeys.js";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import resources from "./resources.js";
import thumbnail from "./thumbnail.js";

const files = new FileTree(import.meta.url);
const assets = await files.get("assets");

// const images = await files.get("images");
const images = await resources.get("images");

// const teamTree = fromYaml(await files.get("teamData.yaml"));
const teamSheet = JSON.parse(await resources.get("Team.gsheet"));
const teamTree = await headerKeys(teamSheet);

const siteName = "Our Amazing Team";
const teamByName = new MapInnerKeysTree(teamTree, (value) => value.get("name"));

const indexHtml = indexPage(await TreeHelpers.plain(teamByName), siteName);
const thumbnails = new MapValuesTree(images, thumbnail);
const team = new MapExtensionsTree(
  teamByName,
  async (person) => personPage(await TreeHelpers.plain(person), siteName),
  {
    extension: "->html",
  }
);

export default new ObjectTree({
  assets,
  images,
  "index.html": indexHtml,
  team,
  thumbnails,
});

import {
  FilesGraph,
  GraphHelpers,
  MapExtensionsGraph,
  MapInnerKeysGraph,
  MapValuesGraph,
  ObjectGraph,
  fromYaml,
} from "@graphorigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const files = new FilesGraph(dirname);
const assets = await files.get("assets");
const images = await files.get("images");
const teamFile = fromYaml(await files.get("teamData.yaml"));

const siteName = "Our Amazing Team";
const teamByName = new MapInnerKeysGraph(teamFile, (value) =>
  value.get("name")
);

const indexHtml = indexPage(await GraphHelpers.plain(teamByName), siteName);
const thumbnails = new MapValuesGraph(images, thumbnail);
const team = new MapExtensionsGraph(
  teamByName,
  async (person) => personPage(await GraphHelpers.plain(person), siteName),
  {
    extension: "->html",
  }
);

export default new ObjectGraph({
  assets,
  images,
  "index.html": indexHtml,
  team,
  thumbnails,
});

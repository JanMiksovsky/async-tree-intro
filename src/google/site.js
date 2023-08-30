import {
  FilesGraph,
  GraphHelpers,
  MapExtensionsGraph,
  MapInnerKeysGraph,
  MapValuesGraph,
  ObjectGraph,
} from "@graphorigami/origami";
import google from "./google.js";
import indexPage from "./indexPage.js";
import personPage from "./personPage.js";
import thumbnail from "./thumbnail.js";

const files = new FilesGraph(import.meta.url);
const assets = await files.get("assets");
// const images = await files.get("images");
const credsJson = JSON.parse(await files.get("creds.json"));
const googleApi = await google(credsJson);
const images = await googleApi.drive("images");
// const teamGraph = fromYaml(await files.get("teamData.yaml"));
const teamGraph = {};

const siteName = "Our Amazing Team";
const teamByName = new MapInnerKeysGraph(teamGraph, (value) =>
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

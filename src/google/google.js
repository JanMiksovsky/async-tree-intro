import {
  FunctionGraph,
  GraphHelpers,
  ObjectGraph,
} from "@graphorigami/origami";
import * as googleApis from "googleapis";
import GoogleDriveGraph from "./GoogleDriveGraph.js";
import gsheet from "./gsheet.js";

const scopes = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const mapKeyIdToGraph = new Map();

export default async function google(credentialsGraph) {
  const credentials = await GraphHelpers.plain(credentialsGraph);
  const keyId = credentials["private_key_id"];
  let graph = mapKeyIdToGraph.get(keyId);
  if (!graph) {
    const auth = new googleApis.google.auth.GoogleAuth({ credentials, scopes });
    graph = googleGraph(auth);
    mapKeyIdToGraph.set(keyId, graph);
  }
  return graph;
}

// A collection of entry points to Google services.
function googleGraph(auth) {
  let mapFolderIdToGraph = new Map();
  const drive = new FunctionGraph((folderId) => {
    let graph = mapFolderIdToGraph.get(folderId);
    if (!graph) {
      graph = new GoogleDriveGraph(auth, folderId);
      mapFolderIdToGraph.set(folderId, graph);
    }
    return graph;
  });
  const sheet = new FunctionGraph((sheetId, range) =>
    gsheet(auth, sheetId, range)
  );
  return new ObjectGraph({
    drive,
    sheet,
  });
}

import { GraphHelpers } from "@graphorigami/origami";
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
    graph = new GoogleGraph(auth);
    mapKeyIdToGraph.set(keyId, graph);
  }
  return graph;
}

// A collection of entry points to Google services.
class GoogleGraph {
  constructor(auth) {
    this.auth = auth;
    this.mapFolderIdToGraph = new Map();

    // The drive() method will get traversed as a FunctionGraph, which currently
    // means that the "this" context will be lost. As a workaround, we bind the
    // method to the GoogleGraph instance here.
    this.drive = this.drive.bind(this);
  }

  drive(folderId) {
    let graph = this.mapFolderIdToGraph.get(folderId);
    if (!graph) {
      graph = new GoogleDriveGraph(this.auth, folderId);
      this.mapFolderIdToGraph.set(folderId, graph);
    }
    return graph;
  }

  sheet(sheetId, range) {
    return gsheet(this.auth, sheetId, range);
  }
}

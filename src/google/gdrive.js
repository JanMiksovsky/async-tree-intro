import { TreeHelpers } from "@weborigami/origami";
import * as googleApis from "googleapis";
import GoogleDriveTree from "./GoogleDriveTree.js";

const scopes = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

export default async function gdrive(credentialsTree) {
  const credentials = await TreeHelpers.plain(credentialsTree);
  const auth = new googleApis.google.auth.GoogleAuth({ credentials, scopes });
  return (folderId) => new GoogleDriveTree(auth, folderId);
}

import { FilesGraph } from "@graphorigami/origami";
import gdrive from "./gdrive.js";

const files = new FilesGraph(import.meta.url);
const credsJson = JSON.parse(await files.get("creds.json"));
const drive = await gdrive(credsJson);

const folderId = "1X3MWPXwwYXWarhNiCBIxCvGTyiBqISAF";
const folder = drive(folderId);

export default folder;

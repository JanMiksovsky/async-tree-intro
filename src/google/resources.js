import { FilesGraph } from "@graphorigami/origami";
import gdrive from "./gdrive.js";

const folderId = "1X3MWPXwwYXWarhNiCBIxCvGTyiBqISAF";

const files = new FilesGraph(import.meta.url);
const credsJson = JSON.parse(await files.get("creds.json"));
const drive = await gdrive(credsJson);
const folder = drive(folderId);

export default folder;

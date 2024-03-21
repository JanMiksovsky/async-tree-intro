import { auth } from "@weborigami/gdrive";
import fs from "node:fs/promises";

const credsPath = new URL("creds.json", import.meta.url);
const credsJson = JSON.parse(await fs.readFile(credsPath));
const drive = await auth(credsJson);

// ID for demo folder on Google Drive.
const folderId = "1X3MWPXwwYXWarhNiCBIxCvGTyiBqISAF";
export default drive(folderId);

import { TreeHelpers } from "@weborigami/origami";

export default async function headerKeys(variant) {
  const tree = await TreeHelpers.from(variant);
  const table = await TreeHelpers.plain(tree);
  const rows = table.slice();
  const header = rows.shift();
  const result = [];
  for (const row of rows) {
    const obj = {};
    for (let column = 0; column < header.length; column++) {
      const key = String(header[column]);
      const value = row[column];
      obj[key] = value;
    }
    result.push(obj);
  }
  return result;
}

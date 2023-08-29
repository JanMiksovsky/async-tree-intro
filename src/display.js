// Display the values in a flat dictionary.
export default async function display(dictionary) {
  for (const key of await dictionary.keys()) {
    const value = await dictionary.get(key);
    console.log(`${key}: ${value}`);
  }
}

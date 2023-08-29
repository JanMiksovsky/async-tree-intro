export default async function display(graph) {
  // Display each of the values from the graph.
  for (const key of await graph.keys()) {
    const value = await graph.get(key);
    console.log(`${key}: ${value}`);
  }
}

export default function identity(inputGraph) {
  const outputGraph = {
    async get(key) {
      return inputGraph.get(key);
    },

    async keys() {
      return inputGraph.keys();
    },
  };

  return outputGraph;
}

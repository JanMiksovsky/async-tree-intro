export default function identity(innerGraph) {
  const outerGraph = {
    async get(key) {
      return innerGraph.get(key);
    },

    async keys() {
      return innerGraph.keys();
    },
  };

  return outerGraph;
}

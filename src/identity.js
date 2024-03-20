export default function identity(innerTree) {
  const outerTree = {
    async get(key) {
      return innerTree.get(key);
    },

    async keys() {
      return innerTree.keys();
    },
  };

  return outerTree;
}

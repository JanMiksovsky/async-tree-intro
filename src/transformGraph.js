export default function transformGraph(
  innerGraph,
  outerKeyToInnerKey,
  innerKeyToOuterKey,
  innerValueToOuterValue
) {
  const outerGraph = {
    async get(outerKey) {
      if (outerKey === "") {
        return this;
      }
      const innerKey = await outerKeyToInnerKey(outerKey);
      if (innerKey) {
        const innerValue = await innerGraph.get(innerKey);
        if (innerValue) {
          const isDictionary =
            typeof innerValue === "object" &&
            typeof innerValue.get === "function" &&
            typeof innerValue.keys === "function";
          const outerValue = isDictionary
            ? transformGraph(
                innerValue,
                outerKeyToInnerKey,
                innerKeyToOuterKey,
                innerValueToOuterValue
              )
            : innerValueToOuterValue(innerValue);
          return outerValue;
        }
      }
    },

    async keys() {
      const innerKeys = Array.from(await innerGraph.keys());
      const outerKeys = innerKeys.map((key) => innerKeyToOuterKey(key));
      return outerKeys;
    },
  };

  return outerGraph;
}

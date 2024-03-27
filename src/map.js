export default function map(
  innerTree,
  outerKeyToInnerKey,
  innerKeyToOuterKey,
  innerValueToOuterValue
) {
  const outerTree = {
    async get(outerKey) {
      if (outerKey === "") {
        return this;
      }
      const innerKey = await outerKeyToInnerKey(outerKey);
      if (innerKey) {
        const innerValue = await innerTree.get(innerKey);
        if (innerValue) {
          const isDictionary =
            typeof innerValue === "object" &&
            typeof innerValue.get === "function" &&
            typeof innerValue.keys === "function";
          const outerValue = isDictionary
            ? map(
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
      const innerKeys = Array.from(await innerTree.keys());
      const outerKeys = innerKeys.map((key) => innerKeyToOuterKey(key));
      return outerKeys;
    },
  };

  return outerTree;
}

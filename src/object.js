class ObjectGraph {
  constructor(obj) {
    this.obj = obj;
  }

  async get(key) {
    let value = this.obj[key];

    // Wrap a plain sub-object in a graph.
    if (value && Object.getPrototypeOf(value) === Object.prototype) {
      value = new ObjectGraph(value);
    }

    return value;
  }

  async keys() {
    return Object.keys(this.obj);
  }
}

export default new ObjectGraph({
  "Alice.md": "Hello, **Alice**.",
  "Bob.md": "Hello, **Bob**.",
  "Carol.md": "Hello, **Carol**.",
});

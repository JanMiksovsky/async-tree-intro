class ObjectTree {
  constructor(obj) {
    this.obj = obj;
  }

  async get(key) {
    let value = this.obj[key];

    // Wrap a plain sub-object in a tree.
    if (value && Object.getPrototypeOf(value) === Object.prototype) {
      value = new ObjectTree(value);
    }

    return value;
  }

  async keys() {
    return Object.keys(this.obj);
  }
}

export default new ObjectTree({
  "Alice.md": "Hello, **Alice**.",
  "Bob.md": "Hello, **Bob**.",
  "Carol.md": "Hello, **Carol**.",
});

class ObjectGraph {
  constructor(obj) {
    this.obj = obj;
  }

  async get(key) {
    if (key === undefined) {
      return this;
    }

    let value = this.obj[key];
    const isPlainObject =
      value && Object.getPrototypeOf(value) === Object.prototype;
    return isPlainObject ? new ObjectGraph(value) : value;
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

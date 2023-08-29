class ObjectGraph {
  constructor(obj) {
    this.obj = obj;
  }

  async get(key) {
    let value = this.obj[key];

    if (value === undefined && key === "") {
      value = this;
    }

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

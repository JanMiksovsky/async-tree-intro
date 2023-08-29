class ObjectDictionary {
  constructor(obj) {
    this.obj = obj;
  }

  async get(key) {
    return this.obj[key];
  }

  async keys() {
    return Object.keys(this.obj);
  }
}

export default new ObjectDictionary({
  "Alice.md": "Hello, **Alice**.",
  "Bob.md": "Hello, **Bob**.",
  "Carol.md": "Hello, **Carol**.",
});

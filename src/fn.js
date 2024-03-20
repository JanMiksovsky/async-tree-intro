class FunctionTree {
  constructor(fn, domain) {
    this.fn = fn;
    this.domain = domain;
  }

  async get(key) {
    return this.fn(key);
  }

  async keys() {
    return this.domain;
  }
}

const fn = (key) =>
  key?.endsWith?.(".md") ? `Hello, **${key.slice(0, -3)}**.` : undefined;

const domain = ["Alice.md", "Bob.md", "Carol.md"];

export default new FunctionTree(fn, domain);

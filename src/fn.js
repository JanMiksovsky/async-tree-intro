class FunctionGraph {
  constructor(fn, domain) {
    this.fn = fn;
    this.domain = domain;
  }

  async get(key) {
    let value = this.fn(key);
    if (value === undefined && key === "") {
      value = this;
    }
    return value;
  }

  async keys() {
    return this.domain;
  }
}

function fn(key) {
  if (key.endsWith(".md")) {
    const name = key.slice(0, -3);
    return `Hello, **${name}**.`;
  }
}

const domain = ["Alice.md", "Bob.md", "Carol.md"];

export default new FunctionGraph(fn, domain);

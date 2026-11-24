export class Component {
  constructor(root = document) {
    this.root = root;
  }

  qs(selector) {
    return this.root.querySelector(selector);
  }

  qsa(selector) {
    return Array.from(this.root.querySelectorAll(selector));
  }

  setState(element, value, attribute = "data-state") {
    if (!element) return;
    element.setAttribute(attribute, value);
  }

  clearState(element, attribute = "data-state") {
    if (!element) return;
    element.removeAttribute(attribute);
  }
}

export class RafTask {
  constructor(task) {
    this.task = task;
    this.frame = 0;
  }

  request() {
    if (this.frame) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = 0;
      this.task();
    });
  }
}

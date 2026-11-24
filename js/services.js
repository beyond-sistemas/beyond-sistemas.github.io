import { Component, RafTask } from "./core/component.js";

export class ServicesSpy extends Component {
  constructor() {
    super(document);
    this.section = document.getElementById("services");
    this.items = this.qsa(".services__item");
    this.active = 0;
    this.syncTask = new RafTask(() => this.sync());
  }

  init() {
    if (!this.section || !this.items.length) return this;
    window.addEventListener("scroll", () => this.syncTask.request(), { passive: true });
    window.addEventListener("resize", () => this.syncTask.request(), { passive: true });
    this.sync();
    return this;
  }

  setActive(index) {
    if (index < 0 || index >= this.items.length || index === this.active) return;
    this.active = index;
    this.items.forEach((item, i) => {
      if (i === index) this.setState(item, "active");
      else this.clearState(item);
    });
  }

  sync() {
    const rect = this.section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom <= 0 || rect.top >= vh) return;

    const focusY = vh * 0.42;
    let best = 0;
    let bestScore = Infinity;

    this.items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const mid = itemRect.top + itemRect.height * 0.5;
      const score = Math.abs(mid - focusY);
      if (score < bestScore) {
        bestScore = score;
        best = index;
      }
    });

    this.setActive(best);
  }
}

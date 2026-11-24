import { Component, RafTask } from "./core/component.js";

export class ApproachReveal extends Component {
  constructor() {
    super(document);
    this.section = document.getElementById("approach");
    this.items = this.qsa(".approach-flow__item");
    this.faq = document.getElementById("faq");
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.shown = 0;
    this.syncTask = new RafTask(() => this.sync());
  }

  init() {
    if (!this.section || !this.items.length) return this;
    window.addEventListener("scroll", () => this.syncTask.request(), { passive: true });
    window.addEventListener("resize", () => this.syncTask.request(), { passive: true });
    this.sync();
    return this;
  }

  show(index) {
    const item = this.items[index];
    if (!item || item.dataset.state === "shown") return;
    item.style.setProperty("--approach-delay", "0ms");
    this.setState(item, "shown");
    this.shown = Math.max(this.shown, index + 1);
  }

  sync() {
    if (this.reduceMotion) {
      this.items.forEach((item) => this.setState(item, "shown"));
      this.shown = this.items.length;
      return;
    }

    if (this.shown >= this.items.length) return;

    const vh = window.innerHeight;
    const faqTop = this.faq?.getBoundingClientRect().top ?? Infinity;
    const faqCovering = faqTop < vh * 0.92;

    for (let i = this.shown; i < this.items.length; i++) {
      const top = this.items[i].getBoundingClientRect().top;
      if (!faqCovering && top >= vh * 0.92) break;
      this.show(i);
    }
  }
}

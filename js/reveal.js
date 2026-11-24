import { Component } from "./core/component.js";

export class RevealOnScroll extends Component {
  constructor() {
    super(document);
    this.items = this.qsa(".reveal");
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  init() {
    if (!this.items.length) return this;

    if (this.reduceMotion || !("IntersectionObserver" in window)) {
      this.showAll();
      return this;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.setState(entry.target, "visible", "data-reveal");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    this.items.forEach((item) => observer.observe(item));
    return this;
  }

  showAll() {
    this.items.forEach((item) => this.setState(item, "visible", "data-reveal"));
  }
}

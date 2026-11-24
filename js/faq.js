import { Component } from "./core/component.js";

export class FaqAccordion extends Component {
  constructor() {
    super(document);
    this.items = this.qsa(".faq details");
  }

  init() {
    this.items.forEach((details) => this.bind(details));
    return this;
  }

  bind(details) {
    const summary = details.querySelector("summary");
    const panel = details.querySelector(".faq__panel");
    if (!summary || !panel) return;

    let animating = false;

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (animating) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (details.open) {
        if (reduceMotion) {
          details.open = false;
          return;
        }
        animating = true;
        panel.style.height = `${panel.scrollHeight}px`;
        void panel.offsetHeight;
        panel.style.height = "0px";
        this.onTransitionEnd(panel, () => {
          details.open = false;
          panel.style.height = "";
          animating = false;
        });
        return;
      }

      details.open = true;
      if (reduceMotion) return;

      animating = true;
      panel.style.height = "auto";
      const target = panel.scrollHeight;
      panel.style.height = "0px";
      void panel.offsetHeight;
      panel.style.height = `${target}px`;
      this.onTransitionEnd(panel, () => {
        panel.style.height = "";
        animating = false;
      });
    });
  }

  onTransitionEnd(panel, done) {
    const handler = (event) => {
      if (event.propertyName !== "height") return;
      panel.removeEventListener("transitionend", handler);
      done();
    };
    panel.addEventListener("transitionend", handler);
  }
}

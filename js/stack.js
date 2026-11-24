import { Component, RafTask } from "./core/component.js";

export class StackPanels extends Component {
  constructor() {
    super(document);
    this.stacks = this.qsa(".section-stack").flatMap((root) => {
      const sticky = root.querySelector(".section--approach");
      const panel = sticky?.querySelector(".stack-panel");
      const cover = sticky?.nextElementSibling;
      return sticky && panel && cover ? [{ panel, cover }] : [];
    });
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.desktop = window.matchMedia("(min-width: 860px)");
    this.syncTask = new RafTask(() => this.sync());
  }

  init() {
    if (this.reduceMotion || !this.stacks.length) return this;
    window.addEventListener("scroll", () => this.syncTask.request(), { passive: true });
    window.addEventListener("resize", () => this.syncTask.request(), { passive: true });
    this.desktop.addEventListener("change", () => this.syncTask.request());
    this.sync();
    return this;
  }

  sync() {
    if (!this.desktop.matches) {
      this.reset();
      return;
    }

    const range = Math.max(window.innerHeight * 0.85, 1);
    this.stacks.forEach(({ panel, cover }) => {
      const coverTop = cover.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, 1 - coverTop / range));
      panel.style.borderRadius = `${progress * 28}px`;
      panel.style.setProperty("--stack-shade", String(progress * 0.12));
    });
  }

  reset() {
    this.stacks.forEach(({ panel }) => {
      panel.style.borderRadius = "";
      panel.style.setProperty("--stack-shade", "0");
    });
  }
}

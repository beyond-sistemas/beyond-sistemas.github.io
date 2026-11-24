import { Component, RafTask } from "./core/component.js";

export class HeroGround extends Component {
  constructor() {
    super(document);
    this.hero = document.getElementById("hero");
    this.ground = document.getElementById("heroGround");
    this.brand = this.hero?.querySelector(".hero__brand");
    this.sticky = this.hero?.querySelector(".hero__sticky");
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.compact = window.matchMedia("(max-width: 859px)");
    this.syncTask = new RafTask(() => this.sync());
  }

  init() {
    if (!this.hero || !this.ground || !this.brand || !this.sticky) return this;

    window.addEventListener("scroll", () => this.syncTask.request(), { passive: true });
    window.addEventListener("resize", () => this.syncTask.request(), { passive: true });
    window.addEventListener("load", () => this.boot(), { passive: true });
    document.fonts?.ready.then(() => this.boot(), () => this.boot());
    this.boot();
    return this;
  }

  boot() {
    this.sync();
    this.syncTask.request();
  }

  sync() {
    if (this.compact.matches) {
      this.ground.style.height = "";
      return;
    }

    const stickyRect = this.sticky.getBoundingClientRect();
    const brandRect = this.brand.getBoundingClientRect();
    if (stickyRect.height <= 0) return;

    const bottomBleed = 0.08;
    const stopRatio = (brandRect.bottom - stickyRect.top) / stickyRect.height;
    const endHeight = (1 + bottomBleed - stopRatio) * 100 + 6;
    const targetEnd = Math.min(98, Math.max(62, endHeight));
    const startHeight = Math.max(40, targetEnd - 32);

    if (this.reduceMotion) {
      this.ground.style.height = `${targetEnd}%`;
      return;
    }

    const scrollable = Math.max(this.hero.offsetHeight - stickyRect.height, 1);
    const scrolled = Math.min(Math.max(-this.hero.getBoundingClientRect().top, 0), scrollable);
    const progress = Math.min(1, Math.max(0, scrolled / scrollable));
    const eased = 1 - (1 - progress) ** 1.7;
    this.ground.style.height = `${startHeight + (targetEnd - startHeight) * eased}%`;
  }
}

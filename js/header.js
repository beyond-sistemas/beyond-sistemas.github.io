import { Component } from "./core/component.js";

export class HeaderState extends Component {
  constructor() {
    super(document);
    this.header = document.getElementById("header");
  }

  init() {
    if (!this.header) return this;
    window.addEventListener("scroll", () => this.sync(), { passive: true });
    this.sync();
    return this;
  }

  sync() {
    this.setState(this.header, window.scrollY > 6 ? "scrolled" : "top");
  }
}

export class MobileNav extends Component {
  constructor() {
    super(document);
    this.toggle = document.getElementById("navToggle");
    this.panel = document.getElementById("mobileNav");
    this.desktop = window.matchMedia("(min-width: 860px)");
  }

  init() {
    if (!this.toggle || !this.panel) return this;

    this.panel.inert = true;

    this.toggle.addEventListener("click", () => {
      this.setOpen(this.panel.dataset.state !== "open");
    });

    this.panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.setOpen(false));
    });

    this.desktop.addEventListener("change", () => {
      if (this.desktop.matches) this.setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.panel.dataset.state === "open") {
        this.setOpen(false);
        this.toggle.focus();
      }
    });
    return this;
  }

  setOpen(open) {
    const isOpen = this.panel.dataset.state === "open";
    if (open === isOpen) return;

    const state = open ? "open" : "closed";
    this.setState(this.panel, state);
    this.setState(this.toggle, state);
    this.panel.setAttribute("aria-hidden", open ? "false" : "true");
    this.panel.inert = !open;
    this.toggle.setAttribute("aria-expanded", open ? "true" : "false");
    this.toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
}

export class ActiveNav extends Component {
  constructor() {
    super(document);
    this.sections = this.qsa("section[id]");
    this.links = this.qsa(".nav-links a");
  }

  init() {
    if (!this.links.length) return this;
    window.addEventListener("scroll", () => this.sync(), { passive: true });
    this.sync();
    return this;
  }

  sync() {
    const y = window.scrollY + 120;
    let current = "";
    for (const section of this.sections) {
      if (section.offsetTop <= y) current = section.id;
    }

    this.links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href === `#${current}`) this.setState(link, "active");
      else this.clearState(link);
    });
  }
}

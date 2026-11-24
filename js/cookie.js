import { Component } from "./core/component.js";

export class CookieConsent extends Component {
  constructor() {
    super(document);
    this.key = "beyond-cookie-consent";
    this.banner = document.getElementById("cookieBanner");
    this.accept = document.getElementById("cookieAccept");
    this.reject = document.getElementById("cookieReject");
  }

  init() {
    if (!this.banner) return this;

    if (this.read()) this.hide();
    else this.reveal();

    this.accept?.addEventListener("click", () => this.save("accepted"));
    this.reject?.addEventListener("click", () => this.save("rejected"));
    return this;
  }

  read() {
    try {
      return window.localStorage.getItem(this.key);
    } catch (_) {
      return null;
    }
  }

  save(value) {
    try {
      window.localStorage.setItem(this.key, value);
    } catch (_) {}
    this.hide();
  }

  hide() {
    this.banner?.setAttribute("hidden", "");
  }

  reveal() {
    const show = () => this.banner.removeAttribute("hidden");
    if (document.fonts?.ready) document.fonts.ready.then(show, show);
    else show();
  }
}

import { Component } from "./core/component.js";

export class ContactForm extends Component {
  constructor() {
    super(document);
    this.form = document.getElementById("contactForm");
    this.button = document.getElementById("formSubmit");
    this.status = document.getElementById("formStatus");
  }

  init() {
    this.showSuccess();
    this.form?.addEventListener("submit", () => this.setLoading());
    return this;
  }

  showSuccess() {
    if (!this.status) return;
    if (!new URLSearchParams(window.location.search).has("enviado")) return;
    this.status.textContent = "Mensagem enviada. Respondemos em breve.";
    this.status.hidden = false;
  }

  setLoading() {
    if (!this.button || this.button.disabled) return;
    this.button.disabled = true;
    this.setState(this.button, "loading");
    const label = this.button.querySelector(".btn__label");
    if (label) label.textContent = "Enviando...";
  }
}

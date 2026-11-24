import { HeroGround } from "./hero.js";
import { HeaderState, MobileNav, ActiveNav } from "./header.js";
import { ServicesSpy } from "./services.js";
import { RevealOnScroll } from "./reveal.js";
import { StackPanels } from "./stack.js";
import { ApproachReveal } from "./approach.js";
import { FaqAccordion } from "./faq.js";
import { ContactForm } from "./form.js";
import { CookieConsent } from "./cookie.js";

class App {
  boot() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const components = [
      new HeroGround(),
      new HeaderState(),
      new MobileNav(),
      new ActiveNav(),
      new ServicesSpy(),
      new RevealOnScroll(),
      new StackPanels(),
      new ApproachReveal(),
      new FaqAccordion(),
      new ContactForm(),
      new CookieConsent(),
    ];

    components.forEach((component) => component.init());
  }
}

new App().boot();

// js/src/core/component.js
var e = class {
	constructor(e = document) {
		this.root = e;
	}
	qs(e) {
		return this.root.querySelector(e);
	}
	qsa(e) {
		return Array.from(this.root.querySelectorAll(e));
	}
	setState(e, t, n = "data-state") {
		e && e.setAttribute(n, t);
	}
	clearState(e, t = "data-state") {
		e && e.removeAttribute(t);
	}
}, t = class {
	constructor(e) {
		this.task = e, this.frame = 0;
	}
	request() {
		this.frame || (this.frame = window.requestAnimationFrame(() => {
			this.frame = 0, this.task();
		}));
	}
}, n = class extends e {
	constructor() {
		super(document), this.hero = document.getElementById("hero"), this.ground = document.getElementById("heroGround"), this.brand = this.hero?.querySelector(".hero__brand"), this.sticky = this.hero?.querySelector(".hero__sticky"), this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches, this.compact = window.matchMedia("(max-width: 859px)"), this.syncTask = new t(() => this.sync());
	}
	init() {
		return this.hero && this.ground && this.brand && this.sticky && (window.addEventListener("scroll", () => this.syncTask.request(), { passive: !0 }), window.addEventListener("resize", () => this.syncTask.request(), { passive: !0 }), window.addEventListener("load", () => this.boot(), { passive: !0 }), document.fonts?.ready.then(() => this.boot(), () => this.boot()), this.boot()), this;
	}
	boot() {
		this.sync(), this.syncTask.request();
	}
	sync() {
		if (this.compact.matches) {
			this.ground.style.height = "";
			return;
		}
		let e = this.sticky.getBoundingClientRect(), t = this.brand.getBoundingClientRect();
		if (e.height <= 0) return;
		let n = (1.08 - (t.bottom - e.top) / e.height) * 100 + 6, r = Math.min(98, Math.max(62, n)), i = Math.max(40, r - 32);
		if (this.reduceMotion) {
			this.ground.style.height = `${r}%`;
			return;
		}
		let a = Math.max(this.hero.offsetHeight - e.height, 1), o = Math.min(Math.max(-this.hero.getBoundingClientRect().top, 0), a), s = 1 - (1 - Math.min(1, Math.max(0, o / a))) ** 1.7;
		this.ground.style.height = `${i + (r - i) * s}%`;
	}
}, r = class extends e {
	constructor() {
		super(document), this.header = document.getElementById("header");
	}
	init() {
		return this.header && (window.addEventListener("scroll", () => this.sync(), { passive: !0 }), this.sync()), this;
	}
	sync() {
		this.setState(this.header, window.scrollY > 6 ? "scrolled" : "top");
	}
}, i = class extends e {
	constructor() {
		super(document), this.toggle = document.getElementById("navToggle"), this.panel = document.getElementById("mobileNav"), this.desktop = window.matchMedia("(min-width: 860px)");
	}
	init() {
		return !this.toggle || !this.panel || (this.panel.inert = !0, this.toggle.addEventListener("click", () => {
			this.setOpen(this.panel.dataset.state !== "open");
		}), this.panel.querySelectorAll("a").forEach((e) => {
			e.addEventListener("click", () => this.setOpen(!1));
		}), this.desktop.addEventListener("change", () => {
			this.desktop.matches && this.setOpen(!1);
		}), document.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.panel.dataset.state === "open" && (this.setOpen(!1), this.toggle.focus());
		})), this;
	}
	setOpen(e) {
		if (e === (this.panel.dataset.state === "open")) return;
		let t = e ? "open" : "closed";
		this.setState(this.panel, t), this.setState(this.toggle, t), this.panel.setAttribute("aria-hidden", e ? "false" : "true"), this.panel.inert = !e, this.toggle.setAttribute("aria-expanded", e ? "true" : "false"), this.toggle.setAttribute("aria-label", e ? "Fechar menu" : "Abrir menu");
	}
}, a = class extends e {
	constructor() {
		super(document), this.sections = this.qsa("section[id]"), this.links = this.qsa(".nav-links a");
	}
	init() {
		return this.links.length && (window.addEventListener("scroll", () => this.sync(), { passive: !0 }), this.sync()), this;
	}
	sync() {
		let e = window.scrollY + 120, t = "";
		for (let n of this.sections) n.offsetTop <= e && (t = n.id);
		this.links.forEach((e) => {
			(e.getAttribute("href") || "") === `#${t}` ? this.setState(e, "active") : this.clearState(e);
		});
	}
}, o = class extends e {
	constructor() {
		super(document), this.section = document.getElementById("services"), this.items = this.qsa(".services__item"), this.active = 0, this.syncTask = new t(() => this.sync());
	}
	init() {
		return !this.section || !this.items.length || (window.addEventListener("scroll", () => this.syncTask.request(), { passive: !0 }), window.addEventListener("resize", () => this.syncTask.request(), { passive: !0 }), this.sync()), this;
	}
	setActive(e) {
		e < 0 || e >= this.items.length || e === this.active || (this.active = e, this.items.forEach((t, n) => {
			n === e ? this.setState(t, "active") : this.clearState(t);
		}));
	}
	sync() {
		let e = this.section.getBoundingClientRect(), t = window.innerHeight;
		if (e.bottom <= 0 || e.top >= t) return;
		let n = t * .42, r = 0, i = Infinity;
		this.items.forEach((e, t) => {
			let a = e.getBoundingClientRect(), o = a.top + a.height * .5, s = Math.abs(o - n);
			s < i && (i = s, r = t);
		}), this.setActive(r);
	}
}, s = class extends e {
	constructor() {
		super(document), this.items = this.qsa(".reveal"), this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	init() {
		if (!this.items.length) return this;
		if (this.reduceMotion || !("IntersectionObserver" in window)) return this.showAll(), this;
		let e = new IntersectionObserver((t) => {
			t.forEach((t) => {
				t.isIntersecting && (this.setState(t.target, "visible", "data-reveal"), e.unobserve(t.target));
			});
		}, {
			threshold: .12,
			rootMargin: "0px 0px -6% 0px"
		});
		return this.items.forEach((t) => e.observe(t)), this;
	}
	showAll() {
		this.items.forEach((e) => this.setState(e, "visible", "data-reveal"));
	}
}, c = class extends e {
	constructor() {
		super(document), this.stacks = this.qsa(".section-stack").flatMap((e) => {
			let t = e.querySelector(".section--approach"), n = t?.querySelector(".stack-panel"), r = t?.nextElementSibling;
			return t && n && r ? [{
				panel: n,
				cover: r
			}] : [];
		}), this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches, this.desktop = window.matchMedia("(min-width: 860px)"), this.syncTask = new t(() => this.sync());
	}
	init() {
		return this.reduceMotion || !this.stacks.length || (window.addEventListener("scroll", () => this.syncTask.request(), { passive: !0 }), window.addEventListener("resize", () => this.syncTask.request(), { passive: !0 }), this.desktop.addEventListener("change", () => this.syncTask.request()), this.sync()), this;
	}
	sync() {
		if (!this.desktop.matches) {
			this.reset();
			return;
		}
		let e = Math.max(window.innerHeight * .85, 1);
		this.stacks.forEach(({ panel: t, cover: n }) => {
			let r = n.getBoundingClientRect().top, i = Math.min(1, Math.max(0, 1 - r / e));
			t.style.borderRadius = `${i * 28}px`, t.style.setProperty("--stack-shade", String(i * .12));
		});
	}
	reset() {
		this.stacks.forEach(({ panel: e }) => {
			e.style.borderRadius = "", e.style.setProperty("--stack-shade", "0");
		});
	}
}, l = class extends e {
	constructor() {
		super(document), this.section = document.getElementById("approach"), this.items = this.qsa(".approach-flow__item"), this.faq = document.getElementById("faq"), this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches, this.shown = 0, this.syncTask = new t(() => this.sync());
	}
	init() {
		return !this.section || !this.items.length || (window.addEventListener("scroll", () => this.syncTask.request(), { passive: !0 }), window.addEventListener("resize", () => this.syncTask.request(), { passive: !0 }), this.sync()), this;
	}
	show(e) {
		let t = this.items[e];
		t && t.dataset.state !== "shown" && (t.style.setProperty("--approach-delay", "0ms"), this.setState(t, "shown"), this.shown = Math.max(this.shown, e + 1));
	}
	sync() {
		if (this.reduceMotion) {
			this.items.forEach((e) => this.setState(e, "shown")), this.shown = this.items.length;
			return;
		}
		if (this.shown >= this.items.length) return;
		let e = window.innerHeight, t = (this.faq?.getBoundingClientRect().top ?? Infinity) < e * .92;
		for (let n = this.shown; n < this.items.length; n++) {
			let r = this.items[n].getBoundingClientRect().top;
			if (!t && r >= e * .92) break;
			this.show(n);
		}
	}
}, u = class extends e {
	constructor() {
		super(document), this.items = this.qsa(".faq details");
	}
	init() {
		return this.items.forEach((e) => this.bind(e)), this;
	}
	bind(e) {
		let t = e.querySelector("summary"), n = e.querySelector(".faq__panel");
		if (!t || !n) return;
		let r = !1;
		t.addEventListener("click", (t) => {
			if (t.preventDefault(), r) return;
			let i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			if (e.open) {
				if (i) {
					e.open = !1;
					return;
				}
				r = !0, n.style.height = `${n.scrollHeight}px`, n.offsetHeight, n.style.height = "0px", this.onTransitionEnd(n, () => {
					e.open = !1, n.style.height = "", r = !1;
				});
				return;
			}
			if (e.open = !0, i) return;
			r = !0, n.style.height = "auto";
			let a = n.scrollHeight;
			n.style.height = "0px", n.offsetHeight, n.style.height = `${a}px`, this.onTransitionEnd(n, () => {
				n.style.height = "", r = !1;
			});
		});
	}
	onTransitionEnd(e, t) {
		let n = (r) => {
			r.propertyName === "height" && (e.removeEventListener("transitionend", n), t());
		};
		e.addEventListener("transitionend", n);
	}
}, d = class extends e {
	constructor() {
		super(document), this.form = document.getElementById("contactForm"), this.button = document.getElementById("formSubmit"), this.status = document.getElementById("formStatus");
	}
	init() {
		return this.showSuccess(), this.form?.addEventListener("submit", () => this.setLoading()), this;
	}
	showSuccess() {
		this.status && new URLSearchParams(window.location.search).has("enviado") && (this.status.textContent = "Mensagem enviada. Respondemos em breve.", this.status.hidden = !1);
	}
	setLoading() {
		if (!this.button || this.button.disabled) return;
		this.button.disabled = !0, this.setState(this.button, "loading");
		let e = this.button.querySelector(".btn__label");
		e && (e.textContent = "Enviando...");
	}
}, f = class extends e {
	constructor() {
		super(document), this.key = "beyond-cookie-consent", this.banner = document.getElementById("cookieBanner"), this.accept = document.getElementById("cookieAccept"), this.reject = document.getElementById("cookieReject");
	}
	init() {
		return this.banner && (this.read() ? this.hide() : this.reveal(), this.accept?.addEventListener("click", () => this.save("accepted")), this.reject?.addEventListener("click", () => this.save("rejected"))), this;
	}
	read() {
		try {
			return window.localStorage.getItem(this.key);
		} catch {
			return null;
		}
	}
	save(e) {
		try {
			window.localStorage.setItem(this.key, e);
		} catch {}
		this.hide();
	}
	hide() {
		this.banner?.setAttribute("hidden", "");
	}
	reveal() {
		let e = () => this.banner.removeAttribute("hidden");
		document.fonts?.ready ? document.fonts.ready.then(e, e) : e();
	}
};
new class {
	boot() {
		let e = document.getElementById("year");
		e && (e.textContent = String((/* @__PURE__ */ new Date()).getFullYear())), [
			new n(),
			new r(),
			new i(),
			new a(),
			new o(),
			new s(),
			new c(),
			new l(),
			new u(),
			new d(),
			new f()
		].forEach((e) => e.init());
	}
}().boot();

(() => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const hero = document.getElementById("hero");
  const heroGround = document.getElementById("heroGround");
  const heroBrand = hero?.querySelector(".hero__brand");
  const heroSticky = hero?.querySelector(".hero__sticky");
  let heroRaf = 0;
  const reduceHeroMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mqCompactHero = window.matchMedia("(max-width: 859px)");

  const syncHeroGround = () => {
    heroRaf = 0;
    if (!hero || !heroGround || !heroBrand || !heroSticky) return;

    if (mqCompactHero.matches) {
      heroGround.style.height = "";
      return;
    }

    const stickyRect = heroSticky.getBoundingClientRect();
    const brandRect = heroBrand.getBoundingClientRect();
    if (stickyRect.height <= 0) return;

    const bottomBleed = 0.08;
    const stopRatio = (brandRect.bottom - stickyRect.top) / stickyRect.height;
    const endHeight = (1 + bottomBleed - stopRatio) * 100 + 6;
    const targetEnd = Math.min(98, Math.max(62, endHeight));
    const startHeight = Math.max(40, targetEnd - 32);

    if (reduceHeroMotion) {
      heroGround.style.height = `${targetEnd}%`;
      return;
    }

    const scrollable = Math.max(hero.offsetHeight - stickyRect.height, 1);
    const scrolled = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), scrollable);
    const progress = Math.min(1, Math.max(0, scrolled / scrollable));
    const eased = 1 - (1 - progress) ** 1.7;
    const height = startHeight + (targetEnd - startHeight) * eased;
    heroGround.style.height = `${height}%`;
  };

  const requestHeroSync = () => {
    if (heroRaf) return;
    heroRaf = window.requestAnimationFrame(syncHeroGround);
  };

  const bootHeroGround = () => {
    syncHeroGround();
    requestAnimationFrame(syncHeroGround);
  };

  window.addEventListener("scroll", requestHeroSync, { passive: true });
  window.addEventListener("resize", requestHeroSync, { passive: true });
  window.addEventListener("load", bootHeroGround, { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(bootHeroGround);
  }
  bootHeroGround();

  const onScroll = () => {
    header?.setAttribute("data-state", window.scrollY > 6 ? "scrolled" : "top");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && mobileNav) {
    const mqNav = window.matchMedia("(min-width: 860px)");

    const setMobileNav = (open) => {
      const isOpen = mobileNav.dataset.state === "open";
      if (open === isOpen) return;

      const state = open ? "open" : "closed";
      mobileNav.dataset.state = state;
      navToggle.dataset.state = state;
      mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
      mobileNav.inert = !open;
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    mobileNav.inert = true;

    navToggle.addEventListener("click", () => {
      setMobileNav(mobileNav.dataset.state !== "open");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMobileNav(false));
    });

    mqNav.addEventListener("change", () => {
      if (mqNav.matches) setMobileNav(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileNav.dataset.state === "open") {
        setMobileNav(false);
        navToggle.focus();
      }
    });
  }

  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const syncActiveNav = () => {
    const y = window.scrollY + 120;
    let current = "";
    for (const section of sections) {
      if (section.offsetTop <= y) current = section.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href === `#${current}`) link.dataset.state = "active";
      else delete link.dataset.state;
    });
  };
  window.addEventListener("scroll", syncActiveNav, { passive: true });
  syncActiveNav();

  const serviceSection = document.getElementById("services");
  const serviceItems = [...document.querySelectorAll(".services__item")];
  let activeService = 0;
  let serviceRaf = 0;

  const setActiveService = (index) => {
    if (index < 0 || index >= serviceItems.length || index === activeService) return;
    activeService = index;
    serviceItems.forEach((item, i) => {
      if (i === index) item.dataset.state = "active";
      else delete item.dataset.state;
    });
  };

  const syncActiveService = () => {
    serviceRaf = 0;
    if (!serviceSection || !serviceItems.length) return;

    const sectionRect = serviceSection.getBoundingClientRect();
    const vh = window.innerHeight;
    if (sectionRect.bottom <= 0 || sectionRect.top >= vh) return;

    const focusY = vh * 0.42;
    let best = 0;
    let bestScore = Infinity;

    serviceItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5;
      const score = Math.abs(mid - focusY);
      if (score < bestScore) {
        bestScore = score;
        best = index;
      }
    });

    setActiveService(best);
  };

  const requestServiceSync = () => {
    if (serviceRaf) return;
    serviceRaf = window.requestAnimationFrame(syncActiveService);
  };

  window.addEventListener("scroll", requestServiceSync, { passive: true });
  window.addEventListener("resize", requestServiceSync, { passive: true });
  syncActiveService();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = [...document.querySelectorAll(".reveal")];

  if (reduceMotion) {
    reveals.forEach((el) => el.dataset.reveal = "visible");
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = "visible";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.dataset.reveal = "visible");
  }

  if (!reduceMotion) {
    const stacks = [...document.querySelectorAll(".section-stack")].flatMap((root) => {
      const sticky = root.querySelector(".section--approach");
      const panel = sticky?.querySelector(".stack-panel");
      const cover = sticky?.nextElementSibling;
      if (!sticky || !panel || !cover) return [];
      return [{ panel, cover }];
    });

    if (stacks.length) {
      let stackRaf = 0;
      const mqStack = window.matchMedia("(min-width: 860px)");

      const resetStacks = () => {
        stacks.forEach(({ panel }) => {
          panel.style.borderRadius = "";
          panel.style.setProperty("--stack-shade", "0");
        });
      };

      const updateStacks = () => {
        stackRaf = 0;
        if (!mqStack.matches) {
          resetStacks();
          return;
        }

        const range = Math.max(window.innerHeight * 0.85, 1);

        stacks.forEach(({ panel, cover }) => {
          const coverTop = cover.getBoundingClientRect().top;
          const progress = Math.min(1, Math.max(0, 1 - coverTop / range));
          const radius = progress * 28;
          const shade = progress * 0.12;

          panel.style.borderRadius = `${radius}px`;
          panel.style.setProperty("--stack-shade", String(shade));
        });
      };

      const onStackScroll = () => {
        if (stackRaf) return;
        stackRaf = requestAnimationFrame(updateStacks);
      };

      window.addEventListener("scroll", onStackScroll, { passive: true });
      window.addEventListener("resize", onStackScroll, { passive: true });
      mqStack.addEventListener("change", onStackScroll);
      updateStacks();
    }
  }

  const approachSection = document.getElementById("approach");
  const approachItems = [...document.querySelectorAll(".approach-flow__item")];
  const approachFaq = document.getElementById("faq");
  let approachShown = 0;
  let approachRaf = 0;

  const showApproachItem = (index) => {
    const item = approachItems[index];
    if (!item || item.dataset.state === "shown") return;
    item.style.setProperty("--approach-delay", "0ms");
    item.dataset.state = "shown";
    approachShown = Math.max(approachShown, index + 1);
  };

  const syncApproachReveal = () => {
    approachRaf = 0;
    if (!approachItems.length || !approachSection) return;

    if (reduceMotion) {
      approachItems.forEach((item) => { item.dataset.state = "shown"; });
      approachShown = approachItems.length;
      return;
    }

    if (approachShown >= approachItems.length) return;

    const vh = window.innerHeight;
    const faqTop = approachFaq?.getBoundingClientRect().top ?? Infinity;
    const faqCovering = faqTop < vh * 0.92;

    for (let i = approachShown; i < approachItems.length; i++) {
      const top = approachItems[i].getBoundingClientRect().top;
      if (faqCovering || top < vh * 0.92) {
        showApproachItem(i);
      } else {
        break;
      }
    }
  };

  const requestApproachReveal = () => {
    if (approachRaf) return;
    approachRaf = window.requestAnimationFrame(syncApproachReveal);
  };

  window.addEventListener("scroll", requestApproachReveal, { passive: true });
  window.addEventListener("resize", requestApproachReveal, { passive: true });
  syncApproachReveal();

  document.querySelectorAll(".faq details").forEach((details) => {
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
        const onEnd = (e) => {
          if (e.propertyName !== "height") return;
          panel.removeEventListener("transitionend", onEnd);
          details.open = false;
          panel.style.height = "";
          animating = false;
        };
        panel.addEventListener("transitionend", onEnd);
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
      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        panel.removeEventListener("transitionend", onEnd);
        panel.style.height = "";
        animating = false;
      };
      panel.addEventListener("transitionend", onEnd);
    });
  });

  const formStatus = document.getElementById("formStatus");
  if (formStatus && new URLSearchParams(window.location.search).has("enviado")) {
    formStatus.textContent = "Mensagem enviada. Respondemos em breve.";
    formStatus.hidden = false;
  }

  const contactForm = document.getElementById("contactForm");
  const formSubmit = document.getElementById("formSubmit");
  contactForm?.addEventListener("submit", () => {
    if (!formSubmit || formSubmit.disabled) return;
    formSubmit.disabled = true;
    formSubmit.dataset.state = "loading";
    const label = formSubmit.querySelector(".btn__label");
    if (label) label.textContent = "Enviando...";
  });

  const cookieKey = "beyond-cookie-consent";
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieReject = document.getElementById("cookieReject");

  const hideCookieBanner = (value) => {
    try {
      localStorage.setItem(cookieKey, value);
    } catch (_) {}
    cookieBanner?.setAttribute("hidden", "");
  };

  let consent = null;
  try {
    consent = localStorage.getItem(cookieKey);
  } catch (_) {}

  if (!consent && cookieBanner) {
    const revealCookieBanner = () => cookieBanner.removeAttribute("hidden");
    if (document.fonts?.ready) {
      document.fonts.ready.then(revealCookieBanner, revealCookieBanner);
    } else {
      revealCookieBanner();
    }
  }

  cookieAccept?.addEventListener("click", () => hideCookieBanner("accepted"));
  cookieReject?.addEventListener("click", () => hideCookieBanner("rejected"));
})();

/* =========================================================
   MEHUL VASAVA PORTFOLIO
   Premium Scroll Animation System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL REVEAL
     ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealElements.forEach((element, index) => {

    element.style.setProperty(
      "--reveal-delay",
      `${(index % 5) * 100}ms`
    );

    revealObserver.observe(element);

  });


  /* =========================
     STAGGERED PROJECT / SKILL
     ========================= */

  const staggerGroups = [
    ".skill-grid",
    ".project-list",
    ".timeline"
  ];

  staggerGroups.forEach((selector) => {

    const parent = document.querySelector(selector);

    if (!parent) return;

    const children = parent.children;

    Array.from(children).forEach((child, index) => {

      child.style.setProperty(
        "--stagger-delay",
        `${index * 130}ms`
      );

    });

  });


  /* =========================
     SMOOTH NAVIGATION
     ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = 76;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      /* Close mobile menu */

      const nav = document.querySelector(".navbar nav");

      if (nav) {
        nav.classList.remove("open");
      }

    });

  });


  /* =========================
     ACTIVE NAVIGATION
     ========================= */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar nav a");

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentId}`
          );

        });

      });

    },
    {
      threshold: 0.35
    }
  );

  sections.forEach((section) => {
    activeSectionObserver.observe(section);
  });


  /* =========================
     SCROLL PROGRESS BAR
     ========================= */

  const progress = document.querySelector(".progress");

  function updateProgress() {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width = `${percentage}%`;

  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =========================
     MOBILE MENU
     ========================= */

  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navbar nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      nav.classList.toggle("open");

      menuButton.classList.toggle("active");

    });

  }


  /* =========================
     SKILL METER ANIMATION
     ========================= */

  const meters = document.querySelectorAll(".meter i");

  const meterObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const meter = entry.target;

        const width = meter.style.getPropertyValue("--w");

        meter.style.setProperty("--target-width", width);

        meter.classList.add("meter-active");

        observer.unobserve(meter);

      });

    },
    {
      threshold: 0.5
    }
  );

  meters.forEach((meter) => {
    meterObserver.observe(meter);
  });


  /* =========================
     CURSOR GLOW
     ========================= */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener(
      "mousemove",
      (event) => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

      },
      { passive: true }
    );

  }


  /* =========================
     PARALLAX HERO
     ========================= */

  const heroOrbit = document.querySelector(".hero-orbit");
  const heroGrid = document.querySelector(".hero-grid");

  if (heroOrbit && window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener(
      "scroll",
      () => {

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {

          heroOrbit.style.transform =
            `translateY(${scrollY * 0.08}px)`;

          if (heroGrid) {
            heroGrid.style.transform =
              `translateY(${scrollY * 0.03}px)`;
          }

        }

      },
      { passive: true }
    );

  }


  /* =========================
     REDUCED MOTION SUPPORT
     ========================= */

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {

    document.documentElement.classList.add(
      "reduce-motion"
    );

  }

});

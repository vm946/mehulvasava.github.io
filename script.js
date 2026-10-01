/* =========================================================
   MEHUL VASAVA — ADVANCED PORTFOLIO ANIMATIONS
   Vanilla JavaScript — No external library required
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;
  const body = document.body;

  /* =======================================================
     1. SCROLL REVEAL ENGINE
     ======================================================= */

  const revealItems = document.querySelectorAll(
    ".reveal, .skill, .project, .timeline-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const element = entry.target;

        element.classList.add("show");
        element.classList.add("is-visible");

        observer.unobserve(element);
      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealItems.forEach((element, index) => {

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index % 6, 5) * 90}ms`
    );

    revealObserver.observe(element);

  });


  /* =======================================================
     2. STAGGER PROJECT / SKILL CARDS
     ======================================================= */

  document
    .querySelectorAll(".skill-grid, .project-list, .timeline")
    .forEach((group) => {

      [...group.children].forEach((child, index) => {

        child.style.setProperty(
          "--stagger-delay",
          `${index * 120}ms`
        );

      });

    });


  /* =======================================================
     3. SMOOTH ANCHOR SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const navHeight = 80;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     4. SCROLL PROGRESS
     ======================================================= */

  const progress = document.querySelector(".progress");

  function updateProgress() {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progress.style.width = `${percentage}%`;

  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =======================================================
     5. SMART NAVBAR
     ======================================================= */

  const navbar =
    document.querySelector(".navbar") ||
    document.querySelector("header");

  let lastScroll = window.scrollY;

  function navbarScroll() {

    const currentScroll = window.scrollY;

    if (!navbar) return;

    if (currentScroll > 60) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }

    if (currentScroll > lastScroll && currentScroll > 180) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }

    lastScroll = currentScroll;

  }

  window.addEventListener(
    "scroll",
    navbarScroll,
    { passive: true }
  );


  /* =======================================================
     6. ACTIVE SECTION NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(
      '.navbar a[href^="#"], nav a[href^="#"]'
    );

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );

          });

        });

      },
      {
        threshold: 0.35
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     7. SKILL BAR ANIMATION
     ======================================================= */

  const meters =
    document.querySelectorAll(".meter i");

  const meterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const meter = entry.target;

          const target =
            meter.style.getPropertyValue("--w") ||
            meter.getAttribute("data-width");

          if (target) {
            meter.style.setProperty(
              "--target-width",
              target
            );
          }

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


  /* =======================================================
     8. ANIMATED NUMBER COUNTERS
     ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-counter], .counter"
    );

  function animateCounter(element) {

    const target =
      parseFloat(
        element.dataset.counter ||
        element.dataset.target ||
        element.textContent
      );

    if (isNaN(target)) return;

    const duration = 1500;
    const start = performance.now();

    function update(time) {

      const progress =
        Math.min((time - start) / duration, 1);

      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        target * eased;

      element.textContent =
        Number.isInteger(target)
          ? Math.round(value)
          : value.toFixed(1);

      if (progress < 1) {
        requestAnimationFrame(update);
      }

    }

    requestAnimationFrame(update);

  }

  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          animateCounter(entry.target);

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.7
      }
    );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });


  /* =======================================================
     9. 3D PROJECT CARD TILT
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".project, .skill, .about-card"
    );

  if (
    window.matchMedia("(pointer: fine)").matches
  ) {

    cards.forEach((card) => {

      card.addEventListener("mousemove", (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -5;

        const rotateY =
          ((x - centerX) / centerX) * 5;

        card.style.setProperty(
          "--rotate-x",
          `${rotateX}deg`
        );

        card.style.setProperty(
          "--rotate-y",
          `${rotateY}deg`
        );

        card.classList.add("tilting");

      });

      card.addEventListener("mouseleave", () => {

        card.style.setProperty(
          "--rotate-x",
          "0deg"
        );

        card.style.setProperty(
          "--rotate-y",
          "0deg"
        );

        card.classList.remove("tilting");

      });

    });

  }


  /* =======================================================
     10. MOUSE FOLLOW SPOTLIGHT
     ======================================================= */

  let spotlight =
    document.querySelector(".cursor-glow");

  if (!spotlight) {

    spotlight =
      document.createElement("div");

    spotlight.className =
      "cursor-glow";

    body.appendChild(spotlight);

  }

  if (
    window.matchMedia("(pointer: fine)").matches
  ) {

    window.addEventListener(
      "mousemove",
      (event) => {

        root.style.setProperty(
          "--mouse-x",
          `${event.clientX}px`
        );

        root.style.setProperty(
          "--mouse-y",
          `${event.clientY}px`
        );

        spotlight.style.left =
          `${event.clientX}px`;

        spotlight.style.top =
          `${event.clientY}px`;

      },
      { passive: true }
    );

  }


  /* =======================================================
     11. HERO PARALLAX
     ======================================================= */

  const hero =
    document.querySelector(
      ".hero, #home"
    );

  const heroElements =
    document.querySelectorAll(
      ".hero-orbit, .hero-grid, .hero-glow, .hero-image"
    );

  if (hero && heroElements.length) {

    window.addEventListener(
      "scroll",
      () => {

        const scroll =
          window.scrollY;

        if (
          scroll > window.innerHeight * 1.2
        ) return;

        heroElements.forEach(
          (element, index) => {

            const speed =
              0.02 + index * 0.025;

            element.style.transform =
              `translate3d(0, ${scroll * speed}px, 0)`;

          }
        );

      },
      { passive: true }
    );

  }


  /* =======================================================
     12. SECTION PARALLAX
     ======================================================= */

  const parallaxElements =
    document.querySelectorAll(
      "[data-parallax]"
    );

  function updateParallax() {

    const viewport =
      window.innerHeight;

    parallaxElements.forEach((element) => {

      const rect =
        element.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > viewport
      ) return;

      const speed =
        parseFloat(
          element.dataset.parallax
        ) || 0.15;

      const center =
        rect.top + rect.height / 2;

      const offset =
        (viewport / 2 - center) * speed;

      element.style.transform =
        `translate3d(0, ${offset}px, 0)`;

    });

  }

  window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
  );


  /* =======================================================
     13. TIMELINE SCROLL PROGRESS
     ======================================================= */

  const timeline =
    document.querySelector(".timeline");

  if (timeline) {

    function updateTimeline() {

      const rect =
        timeline.getBoundingClientRect();

      const viewport =
        window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            (viewport - rect.top) /
            (viewport + rect.height),
            0
          ),
          1
        );

      timeline.style.setProperty(
        "--timeline-progress",
        `${progress * 100}%`
      );

    }

    window.addEventListener(
      "scroll",
      updateTimeline,
      { passive: true }
    );

    updateTimeline();

  }


  /* =======================================================
     14. SCROLL VELOCITY
     ======================================================= */

  let previousScroll =
    window.scrollY;

  let velocity = 0;

  window.addEventListener(
    "scroll",
    () => {

      const current =
        window.scrollY;

      velocity =
        current - previousScroll;

      previousScroll =
        current;

      root.style.setProperty(
        "--scroll-velocity",
        Math.min(
          Math.abs(velocity),
          15
        )
      );

    },
    { passive: true }
  );


  /* =======================================================
     15. IMAGE REVEAL
     ======================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );

  const imageObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "image-loaded"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.15
      }
    );

  images.forEach((image) => {
    imageObserver.observe(image);
  });


  /* =======================================================
     16. MOBILE MENU
     ======================================================= */

  const menuButton =
    document.querySelector(
      ".menu-btn"
    );

  const nav =
    document.querySelector(
      ".navbar nav"
    );

  if (menuButton && nav) {

    menuButton.addEventListener(
      "click",
      () => {

        nav.classList.toggle(
          "open"
        );

        menuButton.classList.toggle(
          "active"
        );

      }
    );

    nav.querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove(
              "open"
            );

            menuButton.classList.remove(
              "active"
            );

          }
        );

      });

  }


  /* =======================================================
     17. REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (reducedMotion.matches) {

    root.classList.add(
      "reduce-motion"
    );

  }

});

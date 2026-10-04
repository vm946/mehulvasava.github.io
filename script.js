/* =========================================================
   MEHUL VASAVA — LUXURY PORTFOLIO
   ========================================================= */

"use strict";


/* =========================================================
   HELPERS
   ========================================================= */

const select = (selector, parent = document) =>
  parent.querySelector(selector);

const selectAll = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   PRELOADER
   ========================================================= */

window.addEventListener("load", () => {

  const preloader =
    select("#preloader");

  setTimeout(() => {

    if (preloader) {
      preloader.classList.add("hide");
    }

  }, 1400);

});


/* =========================================================
   DOM
   ========================================================= */

const header =
  select("#siteHeader");

const menuToggle =
  select("#menuToggle");

const navMenu =
  select("#navMenu");

const navLinks =
  selectAll(".nav-link");

const progress =
  select("#scrollProgress");

const backTop =
  select("#backTop");


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const opened =
      navMenu.classList.toggle("open");

    document.body.classList.toggle(
      "menu-open",
      opened
    );

    menuToggle.setAttribute(
      "aria-expanded",
      opened
    );

  });

}


navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navMenu?.classList.remove("open");

    document.body.classList.remove(
      "menu-open"
    );

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

selectAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetID =
      link.getAttribute("href");

    if (
      !targetID ||
      targetID === "#"
    ) {
      return;
    }

    const target =
      select(targetID);

    if (!target) {
      return;
    }

    event.preventDefault();

    const offset = 75;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: targetPosition,
      behavior: reducedMotion
        ? "auto"
        : "smooth"
    });

  });

});


/* =========================================================
   SCROLL STATE
   ========================================================= */

let ticking = false;

function updateScroll() {

  const scrollY =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    documentHeight > 0
      ? (scrollY / documentHeight) * 100
      : 0;

  if (progress) {

    progress.style.width =
      `${percentage}%`;

  }


  /* Header */

  if (header) {

    header.classList.toggle(
      "scrolled",
      scrollY > 50
    );

  }


  /* Back to top */

  if (backTop) {

    backTop.classList.toggle(
      "show",
      scrollY > window.innerHeight
    );

  }


  /* Hero parallax */

  if (!reducedMotion) {

    updateHeroParallax();

    updateGlobalParallax();

  }

  ticking = false;
}


window.addEventListener(
  "scroll",
  () => {

    if (!ticking) {

      requestAnimationFrame(
        updateScroll
      );

      ticking = true;

    }

  },
  { passive: true }
);


/* =========================================================
   HERO PARALLAX
   ========================================================= */

function updateHeroParallax() {

  const hero =
    select(".hero-section");

  if (!hero) {
    return;
  }

  const scroll =
    window.scrollY;

  const height =
    hero.offsetHeight;

  if (scroll > height) {
    return;
  }

  const progress =
    Math.min(scroll / height, 1);


  /* Main title */

  selectAll(
    ".hero-title-line"
  ).forEach(line => {

    const speed =
      parseFloat(
        line.dataset.speed || 0
      );

    line.style.transform =
      `translate3d(
        0,
        ${scroll * speed * 1.5}px,
        0
      )`;

    line.style.opacity =
      `${1 - progress * .55}`;

  });


  /* Intro */

  const intro =
    select(".hero-intro");

  if (intro) {

    intro.style.transform =
      `translate3d(
        ${-progress * 70}px,
        ${progress * -20}px,
        0
      )`;

    intro.style.opacity =
      `${1 - progress}`;
  }


  /* Description */

  const description =
    select(".hero-bottom");

  if (description) {

    description.style.transform =
      `translate3d(
        0,
        ${progress * 80}px,
        0
      )`;

    description.style.opacity =
      `${1 - progress * .8}`;
  }


  /* Hero visual */

  const visual =
    select(".hero-visual");

  if (visual) {

    const scale =
      1 - progress * .08;

    visual.style.transform =
      `translate3d(
        0,
        calc(-43% + ${scroll * .08}px),
        0
      )
      scale(${scale})`;

  }

}


/* =========================================================
   GLOBAL PARALLAX
   ========================================================= */

function updateGlobalParallax() {

  selectAll(
    "[data-parallax]"
  ).forEach(element => {

    const rect =
      element.getBoundingClientRect();

    const speed =
      parseFloat(
        element.dataset.parallax || 0
      );

    const center =
      window.innerHeight / 2;

    const distance =
      rect.top -
      center;

    const movement =
      distance * speed;

    element.style.transform =
      `translate3d(
        0,
        ${movement}px,
        0
      )`;

  });

}


/* =========================================================
   REVEAL OBSERVER
   ========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: .12,
      rootMargin: "0px 0px -60px 0px"
    }
  );


selectAll(".reveal").forEach(
  element => {

    if (reducedMotion) {

      element.classList.add(
        "visible"
      );

    } else {

      revealObserver.observe(
        element
      );

    }

  }
);


/* =========================================================
   SKILL METERS
   ========================================================= */

const skillCards =
  selectAll(".skill-card");

const skillObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const card =
          entry.target;

        const meter =
          select(
            ".skill-line span",
            card
          );

        if (meter) {

          const width =
            meter.dataset.width ||
            "80%";

          meter.style.setProperty(
            "--skill-width",
            width
          );

        }

        card.classList.add(
          "visible"
        );

        skillObserver.unobserve(
          card
        );

      });

    },
    {
      threshold: .3
    }
  );


skillCards.forEach(card => {

  if (reducedMotion) {

    const meter =
      select(
        ".skill-line span",
        card
      );

    if (meter) {

      meter.style.setProperty(
        "--skill-width",
        meter.dataset.width || "80%"
      );

    }

    card.classList.add("visible");

  } else {

    skillObserver.observe(card);

  }

});


/* =========================================================
   TIMELINE
   ========================================================= */

const timeline =
  select(".timeline");

if (timeline) {

  const timelineObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            timeline.classList.add(
              "active"
            );

          }

        });

      },
      {
        threshold: .15
      }
    );

  timelineObserver.observe(
    timeline
  );

}


/* =========================================================
   TIMELINE ITEM OBSERVER
   ========================================================= */

selectAll(
  ".timeline-item"
).forEach(item => {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            item.classList.add(
              "visible"
            );

            observer.unobserve(item);

          }

        });

      },
      {
        threshold: .3
      }
    );

  observer.observe(item);

});


/* =========================================================
   3D TILT CARDS
   ========================================================= */

if (!reducedMotion) {

  selectAll(
    ".tilt-card"
  ).forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) /
            centerY) *
          -4;

        const rotateY =
          ((x - centerX) /
            centerX) *
          4;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}


/* =========================================================
   PROJECT 3D EFFECT
   ========================================================= */

if (!reducedMotion) {

  selectAll(
    ".project-card"
  ).forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateY =
          ((x / rect.width) - .5) * 2;

        const rotateX =
          ((y / rect.height) - .5) * -2;

        card.style.transform =
          `perspective(1600px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}


/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */

if (!reducedMotion) {

  selectAll(
    ".magnetic"
  ).forEach(button => {

    button.addEventListener(
      "mousemove",
      event => {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(
            ${x * .13}px,
            ${y * .13}px
          )`;

      }
    );

    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform = "";

      }
    );

  });

}


/* =========================================================
   CURSOR
   ========================================================= */

if (
  !reducedMotion &&
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  const cursorDot =
    select(".cursor-dot");

  const cursorRing =
    select(".cursor-ring");

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  window.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      if (cursorDot) {

        cursorDot.style.left =
          `${mouseX}px`;

        cursorDot.style.top =
          `${mouseY}px`;

      }

    }
  );


  function animateCursor() {

    ringX +=
      (mouseX - ringX) * .13;

    ringY +=
      (mouseY - ringY) * .13;

    if (cursorRing) {

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

    }

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  selectAll(
    "a, button, .skill-card, .project-card"
  ).forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "cursor-hover"
        );

      }
    );

    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "cursor-hover"
        );

      }
    );

  });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
  selectAll("main section[id]");

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const id =
          entry.target.id;

        navLinks.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") ===
            `#${id}`
          );

        });

      });

    },
    {
      threshold: .35
    }
  );


sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: reducedMotion
          ? "auto"
          : "smooth"
      });

    }
  );

}


/* =========================================================
   HERO MOUSE PARALLAX
   ========================================================= */

if (
  !reducedMotion &&
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  const hero =
    select(".hero-section");

  const visual =
    select(".hero-visual");

  if (hero && visual) {

    hero.addEventListener(
      "mousemove",
      event => {

        const x =
          event.clientX /
          window.innerWidth -
          .5;

        const y =
          event.clientY /
          window.innerHeight -
          .5;

        const base =
          window.scrollY;

        visual.style.marginLeft =
          `${x * 18}px`;

        visual.style.marginTop =
          `${y * 18}px`;

        visual.dataset.mouseX =
          x;

        visual.dataset.mouseY =
          y;

      }
    );

    hero.addEventListener(
      "mouseleave",
      () => {

        visual.style.marginLeft = "";
        visual.style.marginTop = "";

      }
    );

  }

}


/* =========================================================
   PROJECT SCROLL REVEAL
   ========================================================= */

const projectObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const visual =
          select(
            ".project-visual",
            entry.target
          );

        if (visual) {

          visual.classList.add(
            "project-visible"
          );

        }

      });

    },
    {
      threshold: .25
    }
  );


selectAll(
  ".project-card"
).forEach(card => {

  projectObserver.observe(card);

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      navMenu?.classList.remove(
        "open"
      );

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

updateScroll();

console.log(
  "Mehul Vasava — Luxury Portfolio initialized."
);

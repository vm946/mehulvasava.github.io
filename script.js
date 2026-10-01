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
/* =========================================================
   LIVE HERO EXPERIENCE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".hero");
  const orbit = document.querySelector(".hero-orbit");
  const particleContainer = document.querySelector(".hero-particles");

  if (!hero) return;


  /* =======================================================
     PARTICLE SYSTEM
     ======================================================= */

  if (particleContainer) {

    const particleCount =
      window.innerWidth <= 600 ? 28 : 55;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "hero-particle";

      const startX =
        Math.random() * 100;

      const endX =
        startX +
        (Math.random() * 30 - 15);

      const duration =
        8 + Math.random() * 14;

      const delay =
        -(Math.random() * duration);

      particle.style.left =
        `${startX}%`;

      particle.style.setProperty(
        "--x-start",
        `${(Math.random() * 30 - 15)}px`
      );

      particle.style.setProperty(
        "--x-end",
        `${endX - startX}vw`
      );

      particle.style.setProperty(
        "--duration",
        `${duration}s`
      );

      particle.style.animationDelay =
        `${delay}s`;

      /*
       * Different particle sizes create
       * a more natural depth effect.
       */

      const size =
        Math.random() * 3 + 1;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      /*
       * Purple / blue / neutral live particles.
       */

      const hue =
        Math.random() > .5
          ? "rgb(123 97 255)"
          : "rgb(60 150 255)";

      particle.style.color = hue;

      fragment.appendChild(particle);
    }

    particleContainer.appendChild(fragment);
  }


  /* =======================================================
     MOUSE 3D PARALLAX
     ======================================================= */

  if (
    orbit &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    let rafId = null;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const animateParallax = () => {

      currentX +=
        (mouseX - currentX) * .08;

      currentY +=
        (mouseY - currentY) * .08;

      const rotateY =
        currentX * 10;

      const rotateX =
        currentY * -8;

      orbit.style.transform =
        `
        translate3d(
          ${currentX * 10}px,
          ${currentY * 10}px,
          0
        )
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;

      rafId =
        requestAnimationFrame(
          animateParallax
        );
    };

    const handleMouseMove = (event) => {

      const rect =
        hero.getBoundingClientRect();

      mouseX =
        (event.clientX -
          (rect.left + rect.width / 2))
        / rect.width;

      mouseY =
        (event.clientY -
          (rect.top + rect.height / 2))
        / rect.height;

      orbit.classList.add(
        "mouse-active"
      );

      if (!rafId) {
        rafId =
          requestAnimationFrame(
            animateParallax
          );
      }
    };

    const resetParallax = () => {

      mouseX = 0;
      mouseY = 0;

      orbit.style.transform =
        "";

      orbit.classList.remove(
        "mouse-active"
      );
    };

    hero.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    hero.addEventListener(
      "mouseleave",
      resetParallax
    );
  }


  /* =======================================================
     HERO GRID PARALLAX
     ======================================================= */

  const grid =
    document.querySelector(".hero-grid");

  if (
    grid &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX -
            rect.left) /
          rect.width -
          .5;

        const y =
          (event.clientY -
            rect.top) /
          rect.height -
          .5;

        grid.style.transform =
          `
          translate(
            ${x * -14}px,
            ${y * -10}px
          )
          `;
      },
      { passive: true }
    );

    hero.addEventListener(
      "mouseleave",
      () => {
        grid.style.transform = "";
      }
    );
  }


  /* =======================================================
     HERO VISIBILITY BOOST
     ======================================================= */

  const heroElements =
    document.querySelectorAll(
      ".hero .float-card, .hero .core"
    );

  heroElements.forEach(
    (element, index) => {

      element.style.animationDelay =
        `${index * .18}s`;
    }
  );


  /* =======================================================
     SMART MOBILE PARTICLE REDUCTION
     ======================================================= */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (reduceMotion.matches) {

    if (particleContainer) {
      particleContainer.innerHTML = "";
    }

    if (orbit) {
      orbit.style.transform = "";
    }
  }

});
/* =========================================================
   CINEMATIC AI / ML NEURAL NETWORK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas =
        document.getElementById("neuralCanvas");

    const scene =
        document.querySelector(".ai-scene");

    const hero =
        document.querySelector(".hero");

    const cursor =
        document.getElementById("cursorTrail");


    if (!canvas || !scene || !hero) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    let width = 0;
    let height = 0;

    let nodes = [];

    let mouse = {
        x: 0,
        y: 0,
        active: false
    };


    let targetRotationX = 0;
    let targetRotationY = 0;

    let rotationX = 0;
    let rotationY = 0;


    /* =====================================================
       CONFIG
       ===================================================== */

    const isMobile =
        window.innerWidth < 700;

    const NODE_COUNT =
        isMobile ? 28 : 48;

    const CONNECTION_DISTANCE =
        isMobile ? 110 : 145;


    /* =====================================================
       RESIZE
       ===================================================== */

    function resizeCanvas() {

        const rect =
            scene.getBoundingClientRect();

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        width = rect.width;
        height = rect.height;

        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;

        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );


    resizeCanvas();


    /* =====================================================
       CREATE 3D NODES
       ===================================================== */

    function createNodes() {

        nodes = [];

        for (
            let i = 0;
            i < NODE_COUNT;
            i++
        ) {

            const theta =
                Math.random() *
                Math.PI *
                2;

            const phi =
                Math.acos(
                    2 * Math.random() - 1
                );

            const radius =
                .28 +
                Math.random() * .65;


            nodes.push({

                theta,

                phi,

                radius,

                size:
                    1.2 +
                    Math.random() * 2.3,

                pulse:
                    Math.random() *
                    Math.PI * 2,

                speed:
                    .005 +
                    Math.random() * .01

            });
        }
    }


    createNodes();


    /* =====================================================
       PROJECT 3D SPHERE
       ===================================================== */

    function projectNode(node) {

        let x =
            Math.sin(node.phi) *
            Math.cos(node.theta) *
            node.radius;

        let y =
            Math.cos(node.phi) *
            node.radius;

        let z =
            Math.sin(node.phi) *
            Math.sin(node.theta) *
            node.radius;


        /* Mouse rotation */

        const cosY =
            Math.cos(rotationY);

        const sinY =
            Math.sin(rotationY);


        const rotatedX =
            x * cosY -
            z * sinY;


        const rotatedZ =
            x * sinY +
            z * cosY;


        const cosX =
            Math.cos(rotationX);

        const sinX =
            Math.sin(rotationX);


        const rotatedY =
            y * cosX -
            rotatedZ * sinX;


        const finalZ =
            y * sinX +
            rotatedZ * cosX;


        const scale =
            1 /
            (1 + finalZ * .55);


        return {

            x:
                width / 2 +
                rotatedX *
                width *
                .48 *
                scale,

            y:
                height / 2 +
                rotatedY *
                height *
                .48 *
                scale,

            z:
                finalZ,

            scale

        };
    }


    /* =====================================================
       DRAW
       ===================================================== */

    function drawNetwork(time) {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        const projected =
            nodes.map(
                projectNode
            );


        /* =================================================
           CONNECTIONS
           ================================================= */

        for (
            let i = 0;
            i < projected.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < projected.length;
                j++
            ) {

                const a =
                    projected[i];

                const b =
                    projected[j];


                const dx =
                    a.x - b.x;

                const dy =
                    a.y - b.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance >
                    CONNECTION_DISTANCE
                ) {
                    continue;
                }


                const depth =
                    Math.max(
                        0,
                        (a.z + b.z + 2) / 4
                    );


                const alpha =
                    (
                        1 -
                        distance /
                        CONNECTION_DISTANCE
                    ) *
                    depth *
                    .65;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(123,105,255,${alpha})`;

                ctx.lineWidth =
                    .6 +
                    depth * .7;

                ctx.stroke();


                /* =========================================
                   DATA PACKET
                   ========================================= */

                if (
                    (i + j) % 7 === 0
                ) {

                    const progress =
                        (
                            time * .0003 +
                            i * .17 +
                            j * .11
                        ) % 1;


                    const px =
                        a.x +
                        (b.x - a.x) *
                        progress;


                    const py =
                        a.y +
                        (b.y - a.y) *
                        progress;


                    ctx.beginPath();

                    ctx.arc(
                        px,
                        py,
                        1.5,
                        0,
                        Math.PI * 2
                    );


                    ctx.fillStyle =
                        `rgba(255,255,255,${alpha + .25})`;

                    ctx.shadowBlur = 10;

                    ctx.shadowColor =
                        "rgba(120,100,255,.9)";

                    ctx.fill();

                    ctx.shadowBlur = 0;
                }
            }
        }


        /* =================================================
           NODES
           ================================================= */

        projected.forEach(
            (point, index) => {

                const original =
                    nodes[index];


                const pulse =
                    Math.sin(
                        time * .002 +
                        original.pulse
                    );


                const size =
                    original.size *
                    point.scale *
                    (1 + pulse * .25);


                const alpha =
                    .25 +
                    point.scale *
                    .75;


                ctx.beginPath();

                ctx.arc(
                    point.x,
                    point.y,
                    size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(225,220,255,${alpha})`;


                ctx.shadowBlur =
                    12;


                ctx.shadowColor =
                    "rgba(110,90,255,.9)";


                ctx.fill();


                ctx.shadowBlur = 0;
            }
        );


        /* =================================================
           CENTRAL ENERGY
           ================================================= */

        const gradient =
            ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                width * .28
            );


        gradient.addColorStop(
            0,
            "rgba(120,100,255,.18)"
        );

        gradient.addColorStop(
            .5,
            "rgba(80,100,255,.06)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
            gradient;


        ctx.beginPath();

        ctx.arc(
            width / 2,
            height / 2,
            width * .28,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    /* =====================================================
       ANIMATION LOOP
       ===================================================== */

    let animationFrame;


    function animate(time) {

        rotationX +=
            (targetRotationX -
             rotationX) *
            .035;


        rotationY +=
            (targetRotationY -
             rotationY) *
            .035;


        /* Automatic slow rotation */

        targetRotationY += .0008;


        drawNetwork(time);


        animationFrame =
            requestAnimationFrame(
                animate
            );
    }


    animate(0);


    /* =====================================================
       MOUSE INTERACTION
       ===================================================== */

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                .5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                .5;


            mouse.x = x;
            mouse.y = y;
            mouse.active = true;


            targetRotationY =
                x * .75;


            targetRotationX =
                y * .55;


            /* Move AI scene */

            scene.style.transform =
                `
                translateY(-50%)
                translate(
                    ${x * -18}px,
                    ${y * -12}px
                )
                rotateX(${y * -3}deg)
                rotateY(${x * 5}deg)
                `;
        },
        { passive: true }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            mouse.active = false;

            targetRotationX = 0;
            targetRotationY = 0;

            scene.style.transform =
                "translateY(-50%)";
        }
    );


    /* =====================================================
       GLOWING CURSOR
       ===================================================== */

    if (
        cursor &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        let cursorX = 0;
        let cursorY = 0;

        let currentCursorX = 0;
        let currentCursorY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                cursorX =
                    event.clientX;

                cursorY =
                    event.clientY;

                document.body.classList
                    .add("cursor-active");
            },
            { passive: true }
        );


        function animateCursor() {

            currentCursorX +=
                (
                    cursorX -
                    currentCursorX
                ) * .18;


            currentCursorY +=
                (
                    cursorY -
                    currentCursorY
                ) * .18;


            cursor.style.left =
                `${currentCursorX}px`;


            cursor.style.top =
                `${currentCursorY}px`;


            requestAnimationFrame(
                animateCursor
            );
        }


        animateCursor();
    }


    /* =====================================================
       INTERACTIVE PARTICLE PUSH
       ===================================================== */

    const particles =
        document.querySelectorAll(
            ".hero-particle"
        );


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            const mouseY =
                event.clientY -
                rect.top;


            particles.forEach(
                particle => {

                    const pRect =
                        particle.getBoundingClientRect();


                    const px =
                        pRect.left -
                        rect.left +
                        pRect.width / 2;


                    const py =
                        pRect.top -
                        rect.top +
                        pRect.height / 2;


                    const dx =
                        px - mouseX;


                    const dy =
                        py - mouseY;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance < 140
                    ) {

                        const force =
                            (
                                140 -
                                distance
                            ) / 140;


                        const moveX =
                            (
                                dx /
                                Math.max(distance, 1)
                            ) *
                            force *
                            35;


                        const moveY =
                            (
                                dy /
                                Math.max(distance, 1)
                            ) *
                            force *
                            35;


                        particle.style.transform =
                            `
                            translate(
                                ${moveX}px,
                                ${moveY}px
                            )
                            scale(
                                ${1 + force}
                            )
                            `;

                    } else {

                        particle.style.transform =
                            "";
                    }
                }
            );
        },
        { passive: true }
    );


    /* =====================================================
       CLEANUP FOR REDUCED MOTION
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches
    ) {

        cancelAnimationFrame(
            animationFrame
        );

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        scene.style.transform =
            "translateY(-50%)";
    }

});

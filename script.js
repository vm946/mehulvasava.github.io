/* =========================================================
   MEHUL VASAVA
   ADVANCED ANIMATION SYSTEM
   ========================================================= */

(() => {

  "use strict";


  /* =====================================================
     BASIC SELECTORS
     ===================================================== */

  const $ = (selector) =>
    document.querySelector(selector);


  const $$ = (selector) =>
    [...document.querySelectorAll(selector)];


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =====================================================
     NAVIGATION
     ===================================================== */

  const navbar =
    $(".navbar");

  const menuBtn =
    $(".menu-btn");


  if (menuBtn) {

    menuBtn.addEventListener(
      "click",
      () => {

        const open =
          navbar.classList.toggle(
            "nav-open"
          );

        menuBtn.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );

  }


  $$(".navbar nav a").forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          navbar.classList.remove(
            "nav-open"
          );

          menuBtn?.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );


  /* =====================================================
     SCROLL PROGRESS
     ===================================================== */

  const progress =
    $(".progress");


  const sections =
    $$("main section[id]");


  const navLinks =
    $$(".navbar nav a");


  function updateScroll() {

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percentage =
      maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;


    if (progress) {

      progress.style.width =
        `${percentage}%`;

    }


    if (navbar) {

      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

    }


    let current =
      "home";


    sections.forEach(
      (section) => {

        if (
          window.scrollY >=
          section.offsetTop -
          window.innerHeight * .35
        ) {

          current =
            section.id;

        }

      }
    );


    navLinks.forEach(
      (link) => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
          `#${current}`
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
  );


  updateScroll();


  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  const revealElements =
    $$(".reveal");


  if (reduceMotion) {

    revealElements.forEach(
      element =>
        element.classList.add(
          "is-visible"
        )
    );

  }

  else {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: .12,

          rootMargin:
            "0px 0px -40px"
        }
      );


    revealElements.forEach(
      element =>
        observer.observe(element)
    );

  }


  /* =====================================================
     SKILL BAR ANIMATION
     ===================================================== */

  const meters =
    $$(".meter i");


  const meterObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const width =
              entry.target.dataset.width ||
              "0";


            entry.target.style.width =
              `${width}%`;


            meterObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: .5
      }
    );


  meters.forEach(
    meter =>
      meterObserver.observe(meter)
  );


  /* =====================================================
     SMOOTH SCROLL
     ===================================================== */

  $$('a[href^="#"]').forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const target =
            $(link.getAttribute("href"));


          if (!target) {

            return;

          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              reduceMotion
                ? "auto"
                : "smooth",

            block:
              "start"

          });

        }
      );

    }
  );


  /* =====================================================
     CURSOR
     ===================================================== */

  const cursorGlow =
    $(".cursor-glow");


  const cursorTrail =
    $("#cursorTrail");


  let mouseX =
    window.innerWidth / 2;


  let mouseY =
    window.innerHeight / 2;


  let trailX =
    mouseX;


  let trailY =
    mouseY;


  if (
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {


    window.addEventListener(
      "pointermove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        if (cursorGlow) {

          cursorGlow.style.opacity =
            "1";

        }

      },
      { passive: true }
    );


    function cursorAnimation() {

      trailX +=
        (mouseX - trailX) *
        .16;


      trailY +=
        (mouseY - trailY) *
        .16;


      if (cursorGlow) {

        cursorGlow.style.left =
          `${mouseX}px`;

        cursorGlow.style.top =
          `${mouseY}px`;

      }


      if (cursorTrail) {

        cursorTrail.style.left =
          `${trailX}px`;

        cursorTrail.style.top =
          `${trailY}px`;

      }


      requestAnimationFrame(
        cursorAnimation
      );

    }


    cursorAnimation();

  }


  /* =====================================================
     3D CARD TILT
     ===================================================== */

  if (
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {


    $$(".tilt").forEach(
      (card) => {


        card.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              card.getBoundingClientRect();


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


            const rotateX =
              -y * 7;


            const rotateY =
              x * 9;


            card.style.transform =
              `perspective(900px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-6px)`;

          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =====================================================
     MAGNETIC BUTTONS
     ===================================================== */

  if (
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {


    $$(".magnetic").forEach(
      (button) => {


        button.addEventListener(
          "pointermove",
          (event) => {

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
                ${x * .08}px,
                ${y * .08}px
              )`;

          }
        );


        button.addEventListener(
          "pointerleave",
          () => {

            button.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =====================================================
     HERO PARALLAX
     ===================================================== */

  const hero =
    $(".hero");


  const heroContent =
    $(".hero-content");


  const heroOrbit =
    $(".hero-orbit");


  if (
    hero &&
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {


    window.addEventListener(
      "pointermove",
      (event) => {

        const x =
          event.clientX /
          window.innerWidth -
          .5;


        const y =
          event.clientY /
          window.innerHeight -
          .5;


        if (heroContent) {

          heroContent.style.transform =
            `translate3d(
              ${x * -8}px,
              ${y * -6}px,
              0
            )`;

        }


        if (heroOrbit) {

          heroOrbit.style.transform =
            `translate3d(
              ${x * 14}px,
              ${y * 10}px,
              0
            )`;

        }

      },
      { passive: true }
    );

  }


  /* =====================================================
     FLOATING PARTICLES
     ===================================================== */

  const particleContainer =
    $(".hero-particles");


  if (
    particleContainer &&
    !reduceMotion
  ) {


    const amount =
      window.innerWidth < 700
        ? 20
        : 40;


    for (
      let i = 0;
      i < amount;
      i++
    ) {


      const particle =
        document.createElement(
          "span"
        );


      const size =
        Math.random() * 3 + 2;


      particle.style.position =
        "absolute";


      particle.style.width =
        `${size}px`;


      particle.style.height =
        `${size}px`;


      particle.style.left =
        `${Math.random() * 100}%`;


      particle.style.top =
        `${Math.random() * 100}%`;


      particle.style.borderRadius =
        "50%";


      particle.style.background =
        "#5F6F52";


      particle.style.opacity =
        Math.random() * .35 + .12;


      particle.style.animation =
        `particleFloat
         ${Math.random() * 8 + 8}s
         ease-in-out
         ${Math.random() * -8}s
         infinite
         alternate`;


      particleContainer.appendChild(
        particle
      );

    }


    const particleStyle =
      document.createElement(
        "style"
      );


    particleStyle.textContent = `

      @keyframes particleFloat {

        from {

          transform:
            translate3d(0,0,0)
            scale(.7);

        }

        to {

          transform:
            translate3d(
              40px,
              -90px,
              0
            )
            scale(1.3);

        }

      }

    `;


    document.head.appendChild(
      particleStyle
    );

  }


  /* =====================================================
     NEURAL NETWORK CANVAS
     ===================================================== */

  const canvas =
    $("#neuralCanvas");


  const ctx =
    canvas?.getContext("2d");


  if (
    canvas &&
    ctx &&
    !reduceMotion
  ) {


    let nodes = [];

    let width = 0;

    let height = 0;


    function resizeCanvas() {

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      width =
        canvas.clientWidth;


      height =
        canvas.clientHeight;


      canvas.width =
        width * dpr;


      canvas.height =
        height * dpr;


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      const count =
        width < 700
          ? 24
          : 50;


      nodes =
        Array.from(
          { length: count },
          () => ({

            x:
              Math.random() *
              width,

            y:
              Math.random() *
              height,

            vx:
              (Math.random() - .5)
              * .25,

            vy:
              (Math.random() - .5)
              * .25,

            r:
              Math.random() * 1.8
              + .8

          })
        );

    }


    resizeCanvas();


    window.addEventListener(
      "resize",
      resizeCanvas,
      { passive: true }
    );


    function drawNetwork() {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      nodes.forEach(
        (node) => {

          node.x += node.vx;

          node.y += node.vy;


          if (
            node.x < 0 ||
            node.x > width
          ) {

            node.vx *= -1;

          }


          if (
            node.y < 0 ||
            node.y > height
          ) {

            node.vy *= -1;

          }


          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            node.r,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            "rgba(6,78,59,.42)";


          ctx.fill();

        }
      );


      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {


        for (
          let j = i + 1;
          j < nodes.length;
          j++
        ) {


          const a =
            nodes[i];


          const b =
            nodes[j];


          const dx =
            a.x - b.x;


          const dy =
            a.y - b.y;


          const distance =
            Math.hypot(
              dx,
              dy
            );


          if (
            distance < 125
          ) {


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
              `rgba(
                95,
                111,
                82,
                ${(1 - distance / 125) * .16}
              )`;


            ctx.lineWidth =
              .7;


            ctx.stroke();

          }

        }

      }


      requestAnimationFrame(
        drawNetwork
      );

    }


    drawNetwork();

  }


  /* =====================================================
     ESCAPE CLOSE MENU
     ===================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        navbar?.classList.remove(
          "nav-open"
        );

        menuBtn?.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


})();

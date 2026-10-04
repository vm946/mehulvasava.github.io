/* =========================================================
   MEHUL VASAVA PORTFOLIO
   ALABASTER + MOSS GREEN + SLATE GREEN + DARK EMERALD
   ========================================================= */

:root {

  --alabaster: #F2F0E6;
  --moss-green: #5F6F52;
  --slate-green: #708A6A;
  --dark-emerald: #064E3B;

  --emerald-light: #0A5B44;

  --text: #17372C;
  --muted: #5B6B62;

  --border: rgba(6, 78, 59, 0.16);

  --transition:
    cubic-bezier(.22, 1, .36, 1);

}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html {
  scroll-behavior: smooth;
}


body {

  min-height: 100vh;

  overflow-x: hidden;

  background: var(--alabaster);

  color: var(--text);

  font-family:
    Inter,
    Arial,
    sans-serif;

  line-height: 1.6;

}


::selection {

  background: var(--moss-green);

  color: var(--alabaster);

}


a {
  text-decoration: none;
  color: inherit;
}


/* =========================================================
   BACKGROUND
   ========================================================= */

.ambient {

  position: fixed;

  width: 45vw;
  height: 45vw;

  border-radius: 50%;

  filter: blur(100px);

  pointer-events: none;

  z-index: -2;

  opacity: .12;

  animation:
    ambientMove
    12s
    ease-in-out
    infinite
    alternate;

}


.ambient-one {

  background: var(--moss-green);

  left: -20vw;

  top: 10vh;

}


.ambient-two {

  background: var(--dark-emerald);

  right: -20vw;

  bottom: 0;

  animation-delay: -5s;

}


@keyframes ambientMove {

  from {

    transform:
      translate3d(0, 0, 0)
      scale(1);

  }

  to {

    transform:
      translate3d(70px, -50px, 0)
      scale(1.15);

  }

}


/* =========================================================
   CURSOR
   ========================================================= */

.cursor-glow {

  position: fixed;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  pointer-events: none;

  z-index: 9998;

  transform:
    translate(-50%, -50%);

  background:

    radial-gradient(
      circle,
      rgba(95, 111, 82, .18),
      transparent 68%
    );

  opacity: 0;

}


#cursorTrail {

  position: fixed;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  border:
    1px solid var(--dark-emerald);

  pointer-events: none;

  z-index: 9999;

  transform:
    translate(-50%, -50%);

}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

.progress {

  position: fixed;

  left: 0;
  top: 0;

  width: 0;

  height: 4px;

  z-index: 10000;

  background:

    linear-gradient(
      90deg,
      var(--slate-green),
      var(--dark-emerald)
    );

  box-shadow:
    0 0 18px
    rgba(6, 78, 59, .3);

}


/* =========================================================
   NAVBAR
   ========================================================= */

.navbar {

  position: fixed;

  left: 0;
  top: 0;

  width: 100%;

  height: 78px;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding:
    0
    clamp(20px, 5vw, 80px);

  background:
    rgba(242, 240, 230, .68);

  backdrop-filter:
    blur(18px);

  -webkit-backdrop-filter:
    blur(18px);

  border-bottom:
    1px solid transparent;

  transition:
    .45s var(--transition);

}


.navbar.scrolled {

  height: 68px;

  background:
    rgba(242, 240, 230, .94);

  border-bottom-color:
    var(--border);

  box-shadow:
    0 12px 35px
    rgba(6, 78, 59, .08);

}


.logo {

  font-family:
    "Space Grotesk",
    sans-serif;

  font-size: 1.5rem;

  font-weight: 700;

  letter-spacing: -.06em;

  color:
    var(--dark-emerald);

}


.logo span {

  color:
    var(--moss-green);

}


.navbar nav {

  display: flex;

  gap:
    clamp(15px, 2.3vw, 34px);

}


.navbar nav a {

  position: relative;

  padding: 8px 0;

  color:
    var(--muted);

  font-size: .8rem;

  font-weight: 700;

  letter-spacing: .05em;

  text-transform: uppercase;

}


.navbar nav a::after {

  content: "";

  position: absolute;

  left: 0;

  bottom: 0;

  width: 100%;

  height: 2px;

  background:
    var(--dark-emerald);

  transform:
    scaleX(0);

  transform-origin:
    right;

  transition:
    .35s var(--transition);

}


.navbar nav a:hover,
.navbar nav a.active {

  color:
    var(--dark-emerald);

}


.navbar nav a:hover::after,
.navbar nav a.active::after {

  transform:
    scaleX(1);

  transform-origin:
    left;

}


.menu-btn {

  display: none;

  border: 0;

  background: transparent;

  cursor: pointer;

}


.menu-btn span {

  display: block;

  width: 25px;

  height: 2px;

  margin: 5px;

  background:
    var(--dark-emerald);

}


/* =========================================================
   HERO
   ========================================================= */

.hero {

  position: relative;

  min-height: 100vh;

  overflow: hidden;

  display: grid;

  grid-template-columns:
    minmax(0, 1.05fr)
    minmax(360px, .95fr);

  align-items: center;

  padding:
    130px
    clamp(20px, 7vw, 110px)
    70px;

  background:
    var(--alabaster);

}


.hero-grid {

  position: absolute;

  inset: 0;

  opacity: .45;

  background-image:

    linear-gradient(
      rgba(95,111,82,.09) 1px,
      transparent 1px
    ),

    linear-gradient(
      90deg,
      rgba(95,111,82,.09) 1px,
      transparent 1px
    );

  background-size:
    58px 58px;

  mask-image:
    radial-gradient(
      circle at 65% 50%,
      black,
      transparent 78%
    );

  animation:
    gridMove
    18s
    linear
    infinite;

}


@keyframes gridMove {

  to {

    background-position:
      58px 58px;

  }

}


.hero-content {

  position: relative;

  z-index: 10;

  max-width: 760px;

}


.eyebrow {

  color:
    var(--moss-green);

  font-size: .74rem;

  font-weight: 800;

  letter-spacing: .16em;

  text-transform: uppercase;

}


.hero-title {

  margin:
    22px 0 28px;

  font-family:
    "Space Grotesk",
    sans-serif;

  font-size:
    clamp(3.2rem, 7vw, 7.4rem);

  line-height: .88;

  letter-spacing: -.07em;

}


.title-line {

  display: block;

}


.outline-line {

  color: transparent;

  -webkit-text-stroke:
    1.5px var(--dark-emerald);

}


.hero-text {

  max-width: 650px;

  color:
    var(--muted);

  font-size: 1.05rem;

}


.hero-text strong {

  color:
    var(--dark-emerald);

}


.quick-stats {

  display: flex;

  gap: 40px;

  margin:
    35px 0;

}


.quick-stats div {

  display: grid;

  gap: 2px;

}


.quick-stats strong {

  color:
    var(--dark-emerald);

  font-family:
    "Space Grotesk";

}


.quick-stats small {

  color:
    var(--muted);

  font-size: .7rem;

  text-transform: uppercase;

  letter-spacing: .1em;

}


/* =========================================================
   BUTTONS
   ========================================================= */

.hero-actions {

  display: flex;

  gap: 12px;

  flex-wrap: wrap;

}


.btn {

  position: relative;

  overflow: hidden;

  display: inline-flex;

  align-items: center;

  gap: 14px;

  padding:
    14px 20px;

  border:
    1px solid transparent;

  font-size: .78rem;

  font-weight: 800;

  letter-spacing: .06em;

  text-transform: uppercase;

  transition:
    .4s var(--transition);

}


.primary {

  background:
    var(--dark-emerald);

  color:
    var(--alabaster);

  box-shadow:
    0 12px 30px
    rgba(6,78,59,.18);

}


.primary:hover {

  background:
    var(--moss-green);

}


.ghost {

  border-color:
    var(--slate-green);

  color:
    var(--dark-emerald);

}


.ghost:hover {

  background:
    var(--slate-green);

  color:
    var(--alabaster);

}


/* =========================================================
   AI SPHERE
   ========================================================= */

.ai-scene {

  position: absolute;

  inset: 0;

  z-index: 3;

  pointer-events: none;

}


#neuralCanvas {

  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

}


.ai-sphere {

  position: absolute;

  right: 12%;

  top: 50%;

  width: 290px;

  height: 290px;

  transform:
    translate(50%, -50%);

}


.sphere-core {

  position: absolute;

  inset: 26%;

  border-radius: 50%;

  display: grid;

  place-content: center;

  text-align: center;

  background:

    radial-gradient(
      circle at 35% 30%,
      var(--slate-green),
      var(--dark-emerald) 62%,
      #032C22
    );

  color:
    var(--alabaster);

  box-shadow:

    inset -20px -20px 35px
    rgba(0,0,0,.18),

    0 0 55px
    rgba(6,78,59,.25);

  animation:
    spherePulse
    3.5s
    ease-in-out
    infinite;

}


.sphere-core span {

  font:
    800 2.2rem
    "Space Grotesk";

  line-height: 1;

}


.sphere-core small {

  font-size: .62rem;

  letter-spacing: .2em;

  opacity: .7;

}


@keyframes spherePulse {

  50% {

    transform:
      scale(1.06);

  }

}


.sphere-ring {

  position: absolute;

  border:
    1px solid
    rgba(6,78,59,.35);

  border-radius: 50%;

}


.sphere-ring-1 {

  inset: 10%;

  animation:
    rotateSphere
    9s
    linear
    infinite;

}


.sphere-ring-2 {

  inset: 2%;

  transform:
    rotateX(65deg);

  animation:
    rotateX
    13s
    linear
    infinite;

}


.sphere-ring-3 {

  inset: 18%;

  transform:
    rotateY(65deg);

  animation:
    rotateY
    7s
    linear
    infinite;

}


@keyframes rotateSphere {

  to {
    transform:
      rotate(360deg);
  }

}


@keyframes rotateX {

  to {
    transform:
      rotateX(65deg)
      rotateZ(360deg);
  }

}


@keyframes rotateY {

  to {
    transform:
      rotateY(65deg)
      rotateZ(-360deg);
  }

}


.ai-node {

  position: absolute;

  width: 9px;

  height: 9px;

  border-radius: 50%;

  background:
    var(--slate-green);

  box-shadow:
    0 0 18px
    rgba(6,78,59,.4);

  animation:
    nodePulse
    2.4s
    ease-in-out
    infinite;

}


.node-1 { left: 4%; top: 34%; }
.node-2 { right: 2%; top: 24%; }
.node-3 { right: 0; bottom: 30%; }
.node-4 { left: 17%; bottom: 12%; }
.node-5 { left: 44%; top: 0; }
.node-6 { right: 28%; top: 8%; }
.node-7 { left: 0; top: 62%; }
.node-8 { right: 15%; bottom: 4%; }


@keyframes nodePulse {

  50% {

    transform:
      scale(1.8);

    opacity: .55;

  }

}


.data-label {

  position: absolute;

  color:
    var(--dark-emerald);

  font:
    700 .6rem
    "Space Grotesk";

  letter-spacing: .12em;

  opacity: .65;

}


.data-label span {

  display: inline-block;

  width: 6px;

  height: 6px;

  border-radius: 50%;

  background:
    var(--moss-green);

  margin-right: 7px;

  animation:
    blink
    1.5s
    infinite;

}


.label-1 {

  right: 18%;
  top: 30%;

}


.label-2 {

  right: 5%;
  bottom: 34%;

}


.label-3 {

  right: 26%;
  bottom: 15%;

}


@keyframes blink {

  50% {
    opacity: .15;
  }

}


/* =========================================================
   HERO GLOW
   ========================================================= */

.hero-glow {

  position: absolute;

  border-radius: 50%;

  filter:
    blur(50px);

  pointer-events: none;

}


.hero-glow-1 {

  width: 340px;

  height: 340px;

  right: 7%;

  top: 24%;

  background:
    rgba(95,111,82,.17);

}


.hero-glow-2 {

  width: 260px;

  height: 260px;

  left: 35%;

  bottom: 5%;

  background:
    rgba(6,78,59,.12);

}


.hero-glow-3 {

  width: 200px;

  height: 200px;

  left: 5%;

  top: 15%;

  background:
    rgba(112,138,106,.13);

}


/* =========================================================
   ORBITS
   ========================================================= */

.hero-ring {

  position: absolute;

  border:
    1px solid
    rgba(95,111,82,.13);

  border-radius: 50%;

}


.ring-1 {

  width: 65vw;

  height: 65vw;

  right: -32vw;

  top: 10%;

  animation:
    rotateSphere
    35s
    linear
    infinite;

}


.ring-2 {

  width: 45vw;

  height: 45vw;

  right: -22vw;

  top: 20%;

  animation:
    rotateSphere
    23s
    linear
    infinite reverse;

}


.ring-3 {

  width: 25vw;

  height: 25vw;

  right: -12vw;

  top: 31%;

  animation:
    rotateSphere
    15s
    linear
    infinite;

}


.hero-scanline {

  position: absolute;

  left: 0;

  right: 0;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--slate-green),
      transparent
    );

  opacity: .22;

  animation:
    scanLine
    8s
    linear
    infinite;

}


@keyframes scanLine {

  from {
    top: 20%;
  }

  to {
    top: 82%;
  }

}


/* =========================================================
   HERO ORBIT
   ========================================================= */

.hero-orbit {

  position: relative;

  z-index: 6;

  justify-self: center;

  width:
    min(36vw,430px);

  aspect-ratio: 1;

}


.orbit {

  position: absolute;

  inset: 12%;

  border:
    1px solid
    rgba(95,111,82,.4);

  border-radius: 50%;

}


.orbit1 {

  animation:
    rotateSphere
    16s
    linear
    infinite;

}


.orbit2 {

  inset: 3%;

  transform:
    rotateX(68deg);

  animation:
    rotateX
    12s
    linear
    infinite reverse;

}


.core {

  position: absolute;

  left: 50%;

  top: 50%;

  width: 105px;

  height: 105px;

  transform:
    translate(-50%,-50%);

  border-radius: 50%;

  display: grid;

  place-items: center;

  background:
    var(--dark-emerald);

  color:
    var(--alabaster);

  font:
    800 2rem
    "Space Grotesk";

  box-shadow:
    0 0 60px
    rgba(6,78,59,.28);

  animation:
    coreFloat
    4s
    ease-in-out
    infinite;

}


@keyframes coreFloat {

  50% {

    transform:
      translate(-50%,-56%)
      scale(1.04);

  }

}


.float-card {

  position: absolute;

  padding:
    12px 15px;

  border:
    1px solid var(--border);

  background:
    rgba(242,240,230,.88);

  backdrop-filter:
    blur(12px);

  box-shadow:
    0 16px 35px
    rgba(6,78,59,.1);

  font-size: .72rem;

  font-weight: 700;

  color:
    var(--dark-emerald);

}


.float-card b {

  display: block;

  color:
    var(--moss-green);

  font-size: .55rem;

}


.c1 {

  left: -2%;
  top: 22%;

  animation:
    floatCard
    5s
    ease-in-out
    infinite;

}


.c2 {

  right: -8%;
  top: 43%;

  animation:
    floatCard
    6s
    ease-in-out
    infinite;

  animation-delay: -1s;

}


.c3 {

  left: 13%;
  bottom: 5%;

  animation:
    floatCard
    5.5s
    ease-in-out
    infinite;

  animation-delay: -2s;

}


@keyframes floatCard {

  50% {

    transform:
      translateY(-13px)
      rotate(1deg);

  }

}


.scroll-cue {

  position: absolute;

  bottom: 25px;

  left: 50%;

  transform:
    translateX(-50%);

  color:
    var(--muted);

  font-size: .62rem;

  letter-spacing: .2em;

}


.scroll-cue span {

  color:
    var(--dark-emerald);

  font-size: 1.2rem;

}


/* =========================================================
   SECTIONS
   ========================================================= */

.section {

  position: relative;

  padding:
    130px
    clamp(20px,7vw,110px);

  overflow: hidden;

}


.section.dark {

  background:
    linear-gradient(
      135deg,
      var(--dark-emerald),
      #07392C
    );

  color:
    var(--alabaster);

}


.section-head {

  max-width: 780px;

  margin-bottom: 65px;

}


.section-head > span {

  color:
    var(--moss-green);

  font-size: .74rem;

  font-weight: 800;

  letter-spacing: .16em;

}


.section-head h2 {

  margin-top: 18px;

  font-family:
    "Space Grotesk";

  font-size:
    clamp(2.6rem,5.4vw,5.8rem);

  line-height: .92;

  letter-spacing: -.065em;

}


.section h2 em {

  font-style: normal;

  color: transparent;

  -webkit-text-stroke:
    1.5px var(--dark-emerald);

}


.section.dark h2 em {

  -webkit-text-stroke:
    1.5px var(--slate-green);

}


.section-head::after {

  content: "";

  display: block;

  width: 140px;

  height: 2px;

  margin-top: 28px;

  background:
    linear-gradient(
      90deg,
      var(--moss-green),
      transparent
    );

}


/* =========================================================
   ABOUT
   ========================================================= */

.about-grid {

  display: grid;

  grid-template-columns:
    1.2fr .8fr;

  gap:
    clamp(40px,9vw,130px);

}


.about-copy {

  max-width: 720px;

  color:
    var(--muted);

}


.about-copy p {

  margin-bottom: 18px;

}


.about-copy .lead {

  font-size: 1.3rem;

  color:
    var(--dark-emerald);

  font-weight: 600;

}


.about-card {

  padding: 38px;

  background:
    linear-gradient(
      145deg,
      rgba(112,138,106,.15),
      rgba(242,240,230,.75)
    );

  border:
    1px solid var(--border);

  box-shadow:
    0 25px 70px
    rgba(6,78,59,.08);

}


.card-number {

  color:
    var(--moss-green);

  font:
    700 2.8rem
    "Space Grotesk";

}


.about-card h3 {

  margin:
    15px 0 25px;

  color:
    var(--dark-emerald);

  font:
    700 1.7rem
    "Space Grotesk";

}


.about-card ul {

  list-style: none;

}


.about-card li {

  padding:
    13px 0;

  border-bottom:
    1px solid var(--border);

}


/* =========================================================
   SKILLS
   ========================================================= */

.skill-grid {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 1px;

  background:
    rgba(242,240,230,.15);

}


.skill {

  min-height: 270px;

  padding: 30px;

  background:
    rgba(4,51,39,.72);

  border:
    1px solid
    rgba(112,138,106,.14);

  transition:
    .5s var(--transition);

}


.skill:hover {

  background:
    rgba(10,91,68,.72);

}


.skill > span {

  color:
    var(--slate-green);

  font:
    700 .7rem
    "Space Grotesk";

}


.skill h3 {

  margin:
    35px 0 15px;

  color:
    var(--alabaster);

  font:
    700 1.45rem
    "Space Grotesk";

}


.skill p {

  min-height: 70px;

  color:
    rgba(242,240,230,.66);

  font-size: .82rem;

}


.meter {

  height: 3px;

  margin-top: 25px;

  overflow: hidden;

  background:
    rgba(112,138,106,.2);

}


.meter i {

  display: block;

  width: 0;

  height: 100%;

  background:
    var(--slate-green);

  transition:
    width 1.3s var(--transition);

}


.tech-cloud {

  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 30px;

}


.tech-cloud span,
.chips span {

  padding:
    7px 11px;

  border:
    1px solid
    rgba(112,138,106,.35);

  color:
    var(--slate-green);

  font-size: .68rem;

  transition:
    .35s var(--transition);

}


.tech-cloud span:hover {

  background:
    var(--slate-green);

  color:
    var(--dark-emerald);

  transform:
    translateY(-3px);

}


/* =========================================================
   PROJECTS
   ========================================================= */

.project-list {

  border-top:
    1px solid var(--border);

}


.project {

  display: grid;

  grid-template-columns:
    70px 1fr 55px;

  gap: 30px;

  padding:
    42px 10px;

  border-bottom:
    1px solid var(--border);

  transition:
    .5s var(--transition);

}


.project:hover {

  padding-left: 25px;

  background:
    rgba(112,138,106,.06);

}


.project-no {

  color:
    var(--slate-green);

  font:
    700 .85rem
    "Space Grotesk";

}


.project h3 {

  margin:
    10px 0;

  color:
    var(--dark-emerald);

  font:
    700 clamp(1.6rem,3vw,2.7rem)
    "Space Grotesk";

}


.project p:not(.tag) {

  max-width: 800px;

  color:
    var(--muted);

  font-size: .9rem;

}


.chips {

  display: flex;

  flex-wrap: wrap;

  gap: 7px;

  margin-top: 20px;

}


.chips span {

  color:
    var(--moss-green);

  border-color:
    var(--border);

}


.chips span:hover {

  background:
    var(--dark-emerald);

  color:
    var(--alabaster);

}


.arrow {

  color:
    var(--dark-emerald);

  font-size: 2rem;

  transition:
    .4s var(--transition);

}


.project:hover .arrow {

  transform:
    translate(5px,-5px)
    rotate(8deg);

}


/* =========================================================
   TIMELINE
   ========================================================= */

.timeline {

  max-width: 1000px;

  margin: auto;

  position: relative;

}


.timeline::before {

  content: "";

  position: absolute;

  left: 120px;

  top: 0;

  bottom: 0;

  width: 1px;

  background:
    rgba(112,138,106,.22);

}


.timeline-item {

  position: relative;

  display: grid;

  grid-template-columns:
    180px 1fr;

  gap: 50px;

  padding:
    35px 0;

  border-top:
    1px solid
    rgba(112,138,106,.16);

}


.timeline-item::before {

  content: "";

  position: absolute;

  left: 115px;

  top: 42px;

  width: 11px;

  height: 11px;

  border:
    2px solid
    var(--slate-green);

  background:
    var(--dark-emerald);

  border-radius: 50%;

}


.timeline-item > span {

  color:
    var(--slate-green);

  font:
    700 .7rem
    "Space Grotesk";

  text-transform: uppercase;

}


.timeline-item h3 {

  font:
    700 1.55rem
    "Space Grotesk";

}


.timeline-item p {

  margin-top: 10px;

  color:
    rgba(242,240,230,.66);

}


/* =========================================================
   CONTACT
   ========================================================= */

.contact {

  text-align: center;

}


.contact-box {

  max-width: 850px;

  margin: auto;

}


.contact-box h2 {

  margin:
    18px 0 25px;

  color:
    var(--dark-emerald);

  font:
    700 clamp(3rem,7vw,7rem)
    "Space Grotesk";

  line-height: .9;

  letter-spacing: -.07em;

}


.contact-box h2 em {

  color: transparent;

  font-style: normal;

  -webkit-text-stroke:
    1.5px var(--moss-green);

}


.contact-box > p:not(.eyebrow) {

  max-width: 620px;

  margin: auto;

  color:
    var(--muted);

}


.social-icons {

  display: flex;

  justify-content: center;

  gap: 12px;

  margin-top: 35px;

}


.social-icons a {

  width: 48px;

  height: 48px;

  display: grid;

  place-items: center;

  border:
    1px solid var(--border);

  color:
    var(--dark-emerald);

  transition:
    .4s var(--transition);

}


.social-icons a:hover {

  background:
    var(--dark-emerald);

  color:
    var(--alabaster);

  transform:
    translateY(-7px)
    rotate(-5deg);

}


/* =========================================================
   FOOTER
   ========================================================= */

.visitor-counter {

  padding: 25px;

  text-align: center;

  color:
    var(--muted);

  font-size: .75rem;

  border-top:
    1px solid var(--border);

}


footer {

  padding: 25px;

  text-align: center;

  color:
    var(--muted);

  font-size: .7rem;

  border-top:
    1px solid var(--border);

}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

.reveal {

  opacity: 0;

  transform:
    translateY(45px)
    scale(.98);

  transition:
    opacity .9s var(--transition),
    transform .9s var(--transition);

}


.reveal.is-visible {

  opacity: 1;

  transform:
    translateY(0)
    scale(1);

}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media(max-width:1000px) {

  .hero {

    grid-template-columns: 1fr;

  }

  .hero-orbit {

    position: absolute;

    right: 2%;

    top: 52%;

    width: 360px;

    opacity: .45;

  }

  .ai-sphere {

    right: 5%;

    opacity: .55;

  }

  .skill-grid {

    grid-template-columns:
      repeat(2,1fr);

  }

}


@media(max-width:720px) {

  .navbar {

    height: 68px;

  }

  .menu-btn {

    display: block;

  }

  .navbar nav {

    position: absolute;

    top: 68px;

    left: 12px;

    right: 12px;

    display: grid;

    gap: 0;

    padding: 10px;

    background:
      rgba(242,240,230,.98);

    border:
      1px solid var(--border);

    transform:
      translateY(-15px);

    opacity: 0;

    pointer-events: none;

    transition:
      .35s var(--transition);

  }


  .navbar.nav-open nav {

    transform:
      translateY(0);

    opacity: 1;

    pointer-events: auto;

  }


  .navbar nav a {

    padding: 14px;

  }


  .hero {

    display: block;

    padding:
      125px 22px 70px;

  }


  .hero-title {

    font-size:
      clamp(3rem,15vw,5.2rem);

  }


  .hero-text {

    font-size: .92rem;

  }


  .quick-stats {

    gap: 22px;

  }


  .hero-orbit {

    width: 290px;

    right: -20px;

    top: auto;

    bottom: 50px;

    opacity: .35;

  }


  .ai-sphere {

    width: 220px;

    height: 220px;

    right: 5%;

    top: 28%;

    opacity: .25;

  }


  .data-label {

    display: none;

  }


  .section {

    padding:
      95px 22px;

  }


  .section-head {

    margin-bottom: 45px;

  }


  .section h2 {

    font-size:
      clamp(2.5rem,12vw,4rem);

  }


  .about-grid {

    grid-template-columns: 1fr;

  }


  .skill-grid {

    grid-template-columns: 1fr;

  }


  .project {

    grid-template-columns:
      38px 1fr 30px;

    gap: 12px;

    padding:
      32px 0;

  }


  .project h3 {

    font-size: 1.45rem;

  }


  .timeline::before {

    left: 8px;

  }


  .timeline-item {

    grid-template-columns: 1fr;

    gap: 12px;

    padding-left: 35px;

  }


  .timeline-item::before {

    left: 3px;

  }


  .cursor-glow,
  #cursorTrail {

    display: none;

  }

}


@media(prefers-reduced-motion:reduce) {

  * {

    animation-duration:
      .01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      .01ms !important;

    scroll-behavior:
      auto !important;

  }


  .reveal {

    opacity: 1;

    transform: none;

  }

}

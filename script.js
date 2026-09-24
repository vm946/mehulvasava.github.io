const nav=document.querySelector("nav"), menu=document.querySelector(".menu-btn");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/h*100)+"%";
  const sections=[...document.querySelectorAll("section[id]")];
  let current="";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180) current=s.id});
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
});

/* Dany Bless — comportamento do site */
const LOCALES = {pt:"pt-BR",en:"en-US",es:"es-ES"};
let LANG = "pt";
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const t = k => (I18N[LANG] && I18N[LANG][k]) || I18N.pt[k] || k;

function waLink(text){ return "https://wa.me/"+CONFIG.whatsapp+(text?"?text="+encodeURIComponent(text):""); }

function applyLang(l, persist){
  if(!I18N[l]) l = "pt";
  LANG = l;
  document.documentElement.lang = LOCALES[l];
  $$("[data-i18n]").forEach(el=>{ const v=I18N[l][el.dataset.i18n]; if(v!==undefined) el.textContent=v; });
  $$("[data-i18n-html]").forEach(el=>{ const v=I18N[l][el.dataset.i18nHtml]; if(v!==undefined) el.innerHTML=v; });
  $$("[data-i18n-ph]").forEach(el=>{ const v=I18N[l][el.dataset.i18nPh]; if(v!==undefined) el.placeholder=v; });
  $$(".lang button").forEach(b=>b.setAttribute("aria-pressed", String(b.dataset.lang===l)));
  if(typeof renderProjects==="function") renderProjects();
  if(typeof renderTestimonials==="function") renderTestimonials();
  $$("[data-wa]").forEach(a=>{ a.href = waLink(t(a.dataset.wa)); a.target="_blank"; a.rel="noopener"; });
  const mq = I18N[l]; document.title = "Dany Bless | " + mq["brand.sub"] + " — Daniella Arraes";
  runCounters();
  if(persist){ try{ localStorage.setItem("danybless.lang", l); }catch(e){} }
}
$$(".lang button").forEach(b=>b.addEventListener("click",()=>applyLang(b.dataset.lang,true)));

/* =====================================================================
   FOTO (opcional)
   ===================================================================== */
if(CONFIG.photo){
  const mk = (src,cls) => { const i=new Image(); i.src=src; i.alt="Daniella Arraes"; i.className=cls; i.loading="lazy"; return i; };
  const v=$("#visual1"); if(v){ v.querySelector(".logo").style.display="none"; v.querySelector(".glow").style.display="none"; v.prepend(mk(CONFIG.photo,"photo")); }
  const p=$("#phSlot"); if(p){ p.innerHTML=""; p.append(mk(CONFIG.photo2||CONFIG.photo,"photo")); }
}

/* =====================================================================
   HEADER: sticky, progress bar, mobile nav
   ===================================================================== */
const header = $("#header"), prog = $("#progress");
function onScroll(){
  const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle("scrolled", y>20);
  prog.style.width = (h>0 ? (y/h)*100 : 0) + "%";
  const hp = $("#heroPhoto"); if(hp && y<innerHeight) hp.style.transform = "translateY("+(y*0.08)+"px)";
}
addEventListener("scroll", onScroll, {passive:true}); onScroll();

const burger = $("#burger"), nav = $("#nav");
function closeNav(){ nav.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }
burger.addEventListener("click",()=>{ const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); });
$$("nav.primary > ul > li").forEach(li=>{
  const a = li.querySelector(":scope > a"), dd = li.querySelector(":scope > .dd");
  if(!dd) return;
  a.addEventListener("click", e=>{
    if(matchMedia("(max-width:1060px)").matches && !li.classList.contains("open")){ e.preventDefault(); $$("nav.primary > ul > li.open").forEach(x=>x.classList.remove("open")); li.classList.add("open"); }
  });
});
$$("nav.primary a[href^='#'], nav.primary a[target]").forEach(a=>a.addEventListener("click",()=>{ if(!a.parentElement.classList.contains("open") || a.closest(".dd")) closeNav(); }));
addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeNav(); closeSearch(); } });

/* =====================================================================
   HERO: slider
   ===================================================================== */
const hero = $("#hero"), slides = $$(".slide"), dotBtns = $$("#dots button");
let cur = 0, timer = null; const DUR = 7000;
hero.style.setProperty("--dur", DUR+"ms");
function go(n){
  cur = (n+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle("active", i===cur));
  dotBtns.forEach((d,i)=>{ d.classList.remove("active"); d.classList.toggle("done", i<cur); void d.offsetWidth; if(i===cur) d.classList.add("active"); });
  clearTimeout(timer); timer = setTimeout(()=>go(cur+1), DUR);
}
$("#next").addEventListener("click",()=>go(cur+1));
$("#prev").addEventListener("click",()=>go(cur-1));
dotBtns.forEach((d,i)=>d.addEventListener("click",()=>go(i)));
hero.addEventListener("mouseenter",()=>{ hero.classList.add("paused"); clearTimeout(timer); });
hero.addEventListener("mouseleave",()=>{ hero.classList.remove("paused"); go(cur); });
let tx=null; hero.addEventListener("touchstart",e=>{ tx=e.touches[0].clientX; },{passive:true});
hero.addEventListener("touchend",e=>{ if(tx===null) return; const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>50) go(cur+(dx<0?1:-1)); tx=null; });
go(0);

/* =====================================================================
   HERO: gold dust canvas (reativo ao mouse)
   ===================================================================== */
(function(){
  const cv = $("#dust"), ctx = cv.getContext("2d");
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let W,H,DPR,parts=[],mouse={x:-999,y:-999},run=true;
  function size(){ DPR=Math.min(devicePixelRatio||1,2); W=cv.clientWidth; H=cv.clientHeight; cv.width=W*DPR; cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
    const n=Math.round(Math.min(110,W*H/16000)); parts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.25,vy:-Math.random()*.35-.05,a:Math.random()*.6+.2,p:Math.random()*6.28})); }
  size(); addEventListener("resize",size);
  hero.addEventListener("pointermove",e=>{ const r=cv.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; });
  hero.addEventListener("pointerleave",()=>{ mouse.x=mouse.y=-999; });
  new IntersectionObserver(es=>{ run = es[0].isIntersecting; if(run) frame(); }).observe(hero);
  function frame(){
    if(!run) return;
    ctx.clearRect(0,0,W,H);
    for(const p of parts){
      const dx=p.x-mouse.x, dy=p.y-mouse.y, d=Math.hypot(dx,dy);
      if(d<140){ const f=(140-d)/140; p.x+=dx/d*f*2.2; p.y+=dy/d*f*2.2; }
      p.x+=p.vx; p.y+=p.vy; p.p+=.02;
      if(p.y<-10){ p.y=H+10; p.x=Math.random()*W; } if(p.x<-10)p.x=W+10; if(p.x>W+10)p.x=-10;
      const tw = p.a*(.6+.4*Math.sin(p.p));
      ctx.beginPath(); ctx.fillStyle="rgba(226,199,127,"+tw+")"; ctx.shadowColor="rgba(201,162,74,.8)"; ctx.shadowBlur=8; ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fill();
    }
    ctx.shadowBlur=0;
    for(let i=0;i<parts.length;i++){ for(let j=i+1;j<parts.length;j++){ const a=parts[i],b=parts[j],d=Math.hypot(a.x-b.x,a.y-b.y); if(d<90){ ctx.strokeStyle="rgba(201,162,74,"+(.12*(1-d/90))+")"; ctx.lineWidth=.6; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } } }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* =====================================================================
   Reveal on scroll + contadores
   ===================================================================== */
const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{threshold:.14,rootMargin:"0px 0px -6% 0px"});
$$(".rv").forEach(el=>io.observe(el));

let countersStarted=false;
function fmt(n){ try{ return new Intl.NumberFormat(LOCALES[LANG]).format(n); }catch(e){ return String(n); } }
function statText(s,n){ return (s.prefix||"")+fmt(n)+(s.suffix||""); }
function runCounters(){
  const els=$$("#stats b");
  els.forEach((el,i)=>{ const s=STATS[i]; if(!s) return; el.textContent = statText(s, countersStarted ? s.n : 0); });
}
new IntersectionObserver((es,ob)=>{ if(!es[0].isIntersecting) return; ob.disconnect(); countersStarted=true;
  $$("#stats b").forEach((el,i)=>{ const s=STATS[i]; if(!s) return; const t0=performance.now(), dur=1900;
    (function step(now){ const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,4); el.textContent=statText(s,Math.round(s.n*e)); if(p<1) requestAnimationFrame(step); })(t0); });
},{threshold:.4}).observe($("#stats"));

/* =====================================================================
   Cartões de serviço: tilt 3D + spotlight
   ===================================================================== */
if(matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches){
  $$(".card").forEach(c=>{
    c.addEventListener("pointermove",e=>{ const r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      c.style.setProperty("--mx",(x*100)+"%"); c.style.setProperty("--my",(y*100)+"%");
      c.style.transform="rotateY("+((x-.5)*8)+"deg) rotateX("+((.5-y)*8)+"deg) translateY(-4px)"; });
    c.addEventListener("pointerleave",()=>{ c.style.transform=""; });
  });
}

/* =====================================================================
   Abas Missão / Visão / Valores
   ===================================================================== */
$$(".tabs button").forEach(b=>b.addEventListener("click",()=>{
  $$(".tabs button").forEach(x=>x.setAttribute("aria-selected","false")); b.setAttribute("aria-selected","true");
  $$(".panel").forEach(p=>p.classList.toggle("active", p.id===b.dataset.tab));
}));

/* =====================================================================
   Newsletter (abre WhatsApp com o e-mail — sem backend)
   ===================================================================== */
$("#nl").addEventListener("submit",e=>{
  e.preventDefault();
  const em=$("#nlEmail").value.trim(), ok=$("#nlOk").checked, msg=$("#nlMsg");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) || !ok){ msg.textContent=t("news.err"); return; }
  msg.textContent=t("news.ok");
  window.open(waLink(t("news.wa")+em),"_blank","noopener");
  e.target.reset();
});

/* =====================================================================
   Busca "Filtrar por"
   ===================================================================== */
const modal=$("#modal"), q=$("#q"), grp=$("#grp"), results=$("#results");
const labels={projects:"srch.projects",services:"srch.services",articles:"srch.articles",about:"srch.about",join:"srch.join"};
function openSearch(){ modal.classList.add("open"); q.value=""; render(); setTimeout(()=>q.focus(),50); document.body.style.overflow="hidden"; }
function closeSearch(){ if(!modal.classList.contains("open")) return; modal.classList.remove("open"); document.body.style.overflow=""; }
function norm(s){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function render(){
  const term=norm(q.value.trim()), g=grp.value; results.innerHTML="";
  const items=$$(".s-item").filter(el=>(g==="all"||el.dataset.group===g));
  const hits=items.filter(el=>!term || norm(el.textContent+" "+(el.dataset.title||"")).includes(term));
  if(!hits.length){ const li=document.createElement("li"); li.className="none"; li.textContent=t("srch.none"); results.append(li); return; }
  hits.slice(0,12).forEach(el=>{
    const li=document.createElement("li"), b=document.createElement("button"), sm=document.createElement("small"), tt=document.createElement("span");
    sm.textContent=t(labels[el.dataset.group]||"srch.all");
    const h=el.querySelector("h2,h3,h4"); tt.textContent=(h?h.textContent:el.textContent).trim().slice(0,90);
    b.append(sm,tt); li.append(b); results.append(li);
    b.addEventListener("click",()=>{ closeSearch(); el.scrollIntoView({behavior:"smooth",block:"center"}); el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); });
  });
}
$("#openSearch").addEventListener("click",openSearch); $("#closeSearch").addEventListener("click",closeSearch);
modal.addEventListener("click",e=>{ if(e.target===modal) closeSearch(); });
q.addEventListener("input",render); grp.addEventListener("change",render);


/* =====================================================================
   PROJETOS: grade, filtros e janela de detalhes
   ===================================================================== */
const L = (o) => (o && typeof o==="object") ? (o[LANG] || o.pt || "") : (o||"");
let projFilter = "all";
function renderProjects(){
  const grid=$("#projGrid"), filt=$("#projFilters"), empty=$("#projEmpty");
  if(!grid) return;
  grid.innerHTML=""; filt.innerHTML="";
  if(!PROJECTS.length){ empty.hidden=false; filt.hidden=true; return; }
  empty.hidden=true; filt.hidden=false;
  const cats=[...new Set(PROJECTS.map(p=>L(p.category)).filter(Boolean))];
  if(!cats.includes(projFilter)) projFilter="all";
  if(cats.length>1){
    ["all",...cats].forEach(c=>{ const b=document.createElement("button"); b.textContent = c==="all"?t("proj.all"):c; b.setAttribute("aria-pressed",String(c===projFilter)); b.addEventListener("click",()=>{ projFilter=c; renderProjects(); }); filt.append(b); });
  } else filt.hidden=true;
  PROJECTS.forEach((p,idx)=>{
    if(projFilter!=="all" && L(p.category)!==projFilter) return;
    const el=document.createElement("button"); el.type="button"; el.className="proj s-item in rv"; el.dataset.group="projects"; el.dataset.title=L(p.title)+" "+L(p.category);
    el.innerHTML='<div class="im"></div><div class="bd"><span class="cat"></span><h3></h3><em class="role"></em><p></p><span class="more"></span></div>';
    const im=new Image(); im.src=p.image||(p.gallery&&p.gallery[0])||"assets/logo-mono.png"; im.alt=L(p.title); im.loading="lazy"; im.onerror=()=>{ im.src="assets/logo-mono.png"; im.style.objectFit="contain"; im.style.padding="24%"; };
    el.querySelector(".im").append(im);
    if(p.year){ const y=document.createElement("span"); y.className="yr"; y.textContent=p.year; el.querySelector(".im").append(y); }
    el.querySelector(".cat").textContent=L(p.category); el.querySelector("h3").textContent=L(p.title); el.querySelector(".role").textContent=L(p.subtitle)||L(p.role);
    el.querySelector("p").textContent=L(p.summary).split("\n")[0]; el.querySelector(".more").textContent=t("proj.details");
    el.addEventListener("click",()=>openProject(p));
    grid.append(el);
  });
}
const pm=$("#pmodal");
function openProject(p){
  const imgs=(p.gallery&&p.gallery.length?p.gallery:[p.image]).filter(Boolean);
  const main=$("#pmImg"), th=$("#pmThumbs");
  const show=(i)=>{ main.src=imgs[i]; main.alt=L(p.title); [...th.children].forEach((b,j)=>b.setAttribute("aria-current",String(i===j))); };
  th.innerHTML=""; if(imgs.length>1) imgs.forEach((s,i)=>{ const b=document.createElement("button"); const im=new Image(); im.src=s; im.alt=""; b.append(im); b.addEventListener("click",()=>show(i)); th.append(b); });
  show(0);
  $("#pmCat").textContent=L(p.category); $("#pmYear").textContent=p.year||""; $("#pmTitle").textContent=L(p.title); $("#pmText").textContent=L(p.summary);
  $("#pmRole").textContent=[L(p.subtitle),L(p.role)].filter(Boolean).join(" · ");
  const ex=$("#pmExtra"); ex.innerHTML="";
  if(p.stats&&p.stats.length){ const w=document.createElement("div"); w.className="pm-stats"; p.stats.forEach(s=>{ const c=document.createElement("div"); const b=document.createElement("b"); b.textContent=s.value; const sp=document.createElement("span"); sp.textContent=L(s.label); c.append(b,sp); w.append(c); }); ex.append(w); }
  if(p.tags&&p.tags.length){ const u=document.createElement("ul"); u.className="pm-tags"; p.tags.forEach(x=>{ const li=document.createElement("li"); li.textContent=L(x); u.append(li); }); ex.append(u); }
  if(p.partners&&p.partners.length){ const h5=document.createElement("h5"); h5.textContent=t("proj.partners"); const u=document.createElement("ul"); u.className="pm-partners"; p.partners.forEach(x=>{ const li=document.createElement("li"); li.textContent=x; u.append(li); }); ex.append(h5,u); }
  const lk=$("#pmLink"); if(p.link){ lk.href=p.link; lk.hidden=false; } else lk.hidden=true;
  pm.hidden=false; document.body.style.overflow="hidden";
}
function closeProject(){ if(pm.hidden) return; pm.hidden=true; document.body.style.overflow=""; }
$("#pmClose").addEventListener("click",closeProject);
pm.addEventListener("click",e=>{ if(e.target===pm) closeProject(); });
addEventListener("keydown",e=>{ if(e.key==="Escape") closeProject(); });

function renderTestimonials(){
  const g=$("#testGrid"); if(!g||typeof TESTIMONIALS==="undefined") return;
  g.innerHTML="";
  TESTIMONIALS.forEach((x,i)=>{
    const f=document.createElement("figure"); f.className="tcard rv in"; f.style.setProperty("--d",(i*0.1)+"s");
    const q=document.createElement("blockquote"); q.textContent=L(x.text);
    const c=document.createElement("figcaption"); c.textContent=x.name;
    f.append(q,c); g.append(f);
  });
}

/* =====================================================================
   Init
   ===================================================================== */
$("#yr").textContent = new Date().getFullYear();
let saved = null; try{ saved = localStorage.getItem("danybless.lang"); }catch(e){}
applyLang(saved && I18N[saved] ? saved : "pt", false);

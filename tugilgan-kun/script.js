/* =========================================================
   SOZLAMALAR — shu yerni o'zgartiring
   ========================================================= */
const SOZLAMA = {
  ism: "Kumush",                         // Opaning ismi
  imzo: "Seni cheksiz yaxshi ko'radigan jigaring 💕",
  yosh: 21,                              // Necha yoshga kirdi (tortda raqamli shamlar)

  // Rasmlar: fayllarni "images" papkasiga qo'ying va nomlarini shu yerda yozing.
  // Rasm topilmasa, uning o'rnida chiroyli bo'sh ramka chiqadi.
  rasmlar: [
    { fayl: "images/rasm1.jpg", izoh: "Eng shirin tabassum" },
    { fayl: "images/rasm2.jpg", izoh: "Bolaligimiz" },
    { fayl: "images/rasm3.jpg", izoh: "Birga o'tgan kunlar" },
    { fayl: "images/rasm4.jpg", izoh: "Go'zalligim" },
    { fayl: "images/rasm5.jpg", izoh: "Baxtli lahza" },
    { fayl: "images/rasm6.jpg", izoh: "Doim shunday kul!" },
  ],
};

/* =========================================================
   Tilaklar
   ========================================================= */
const TILAKLAR = [
  { e: "🌷", t: "Sog'liq", m: "Tanang hech qachon og'rimasin, ko'nglingga hech qachon g'ubor qo'nmasin. Har tonging tetiklik bilan, har kecha xotirjamlik bilan o'tsin." },
  { e: "😊", t: "Tabassum", m: "Yuzingdagi tabassum — uyimizning quyoshi. U hech qachon so'nmasin, faqat quvonchdan yoshlansin ko'zlaring." },
  { e: "🏡", t: "Oila baxti", m: "Xonadoning doim fayzli, dasturxoning doim to'kin bo'lsin. Yoningdagilar seni men qanchalik qadrlasam, shunchalik qadrlasin." },
  { e: "✨", t: "Orzular", m: "Yuragingda yashirib yurgan har bir orzu birma-bir ro'yobga chiqsin. Bugun qilgan niyating esa eng birinchi bo'lib ijobat bo'lsin." },
  { e: "💪", t: "Kuch va sabr", m: "Hayot sinovlarida doim mana shunday mard, aqlli va kuchli bo'l. Lekin bilib qo'y — har qiyin damda men yoningdaman." },
  { e: "💰", t: "Farovonlik", m: "Rizqing ariq suvidek oqib kelsin, barakang hech qachon kamaymasin. Mehnating doim munosib qadrlansin." },
  { e: "🕊️", t: "Xotirjamlik", m: "Ko'nglingga tinchlik, uyingga osoyishtalik tilayman. Tashvishlaring kam, quvonchlaring esa sanoqsiz bo'lsin." },
  { e: "💖", t: "Mehr", m: "Sen bergan mehringning har bir zarrasi senga ming barobar bo'lib qaytsin. Chunki sendek mehribon inson kam topiladi." },
];

const TYPED_MATNLAR = [
  "Bugun dunyodagi eng ajoyib insonning kuni!",
  "Sen — mening faxrim, suyanchig'im va eng yaqin do'stim.",
  "21 yosh — eng go'zal, eng yorqin yosh muborak bo'lsin!",
  "Yana bir yil go'zallik, aql va mehr bilan to'ldi.",
];

/* ========================================================= */
const $ = (s) => document.querySelector(s);

// Ism va imzoni joylash
$("#heroName").textContent = SOZLAMA.ism;
$("#signature").textContent = SOZLAMA.imzo;
document.title = `Tug'ilgan kuning muborak, ${SOZLAMA.ism}!`;

// Rasm topilmasa — placeholder
function attachFallback(img, emoji = "📷") {
  const swap = () => {
    if (!img.isConnected) return;
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = img.dataset.fallback || emoji;
    img.replaceWith(ph);
  };
  img.addEventListener("error", swap);
  // Skript yuklanguncha xato allaqachon yuz bergan bo'lishi mumkin
  if (img.loading !== "lazy" && img.complete && img.naturalWidth === 0) swap();
}
document.querySelectorAll("img[data-fallback]").forEach((i) => attachFallback(i));

/* ---------- Galereya ---------- */
const grid = $("#galleryGrid");
const okImages = [];
SOZLAMA.rasmlar.forEach((r, idx) => {
  const card = document.createElement("div");
  card.className = "polaroid reveal";
  card.style.setProperty("--r", `${(idx % 2 ? 1 : -1) * (1.5 + Math.random() * 2.5)}deg`);
  const img = document.createElement("img");
  img.src = r.fayl;
  img.alt = r.izoh;
  img.loading = "lazy";
  img.dataset.fallback = ["🌸", "💕", "🎀", "🌟", "🦋", "🌺"][idx % 6];
  attachFallback(img);
  const cap = document.createElement("p");
  cap.textContent = r.izoh;
  card.append(img, cap);
  card.addEventListener("click", () => {
    if (!card.querySelector("img")) return;
    openLightbox(r);
  });
  grid.append(card);
  okImages.push(r);
});

/* ---------- Lightbox ---------- */
const lb = $("#lightbox");
let lbIndex = 0;
function openLightbox(r) {
  lbIndex = okImages.indexOf(r);
  showLb();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}
function showLb() {
  const r = okImages[lbIndex];
  $("#lbImg").src = r.fayl;
  $("#lbCap").textContent = r.izoh;
}
function stepLb(d) {
  lbIndex = (lbIndex + d + okImages.length) % okImages.length;
  showLb();
}
$(".lb-close").onclick = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
$(".lb-prev").onclick = (e) => { e.stopPropagation(); stepLb(-1); };
$(".lb-next").onclick = (e) => { e.stopPropagation(); stepLb(1); };
lb.addEventListener("click", (e) => { if (e.target === lb) $(".lb-close").click(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") $(".lb-close").click();
  if (e.key === "ArrowLeft") stepLb(-1);
  if (e.key === "ArrowRight") stepLb(1);
});
// Lightboxdagi rasm ham topilmasa, galereyadan olib tashlaymiz
$("#lbImg").addEventListener("error", () => {
  okImages.splice(lbIndex, 1);
  if (!okImages.length) return $(".lb-close").click();
  lbIndex %= okImages.length;
  showLb();
});

/* ---------- Tilak kartochkalari ---------- */
const wishesEl = $("#wishes");
TILAKLAR.forEach((w) => {
  const el = document.createElement("div");
  el.className = "wish reveal";
  el.innerHTML = `
    <div class="wish-inner">
      <div class="wish-front"><span class="emoji">${w.e}</span><h4>${w.t}</h4></div>
      <div class="wish-back"><p>${w.m}</p></div>
    </div>`;
  el.addEventListener("click", () => {
    el.classList.toggle("flip");
    if (el.classList.contains("flip")) burst(20);
  });
  wishesEl.append(el);
});

/* ---------- Typing effekti ---------- */
function typeLoop() {
  const out = $("#typed");
  let i = 0, ch = 0, del = false;
  (function tick() {
    const txt = TYPED_MATNLAR[i];
    out.textContent = txt.slice(0, ch);
    if (!del && ch < txt.length) { ch++; setTimeout(tick, 55); }
    else if (!del) { del = true; setTimeout(tick, 2200); }
    else if (ch > 0) { ch--; setTimeout(tick, 25); }
    else { del = false; i = (i + 1) % TYPED_MATNLAR.length; setTimeout(tick, 400); }
  })();
}

/* ---------- Yulduzchalar ---------- */
const sp = $(".sparkles");
for (let i = 0; i < 26; i++) {
  const s = document.createElement("span");
  s.textContent = ["✦", "✧", "★", "·"][i % 4];
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.fontSize = 8 + Math.random() * 18 + "px";
  s.style.animationDelay = Math.random() * 3 + "s";
  sp.append(s);
}

/* ---------- Sharlar ---------- */
const balloonColors = ["#ff6fa5", "#ffd27a", "#8e6bff", "#6fe0ff", "#ff9cc2", "#7dffb3"];
function spawnBalloon() {
  const b = document.createElement("div");
  b.className = "balloon";
  const c = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  b.style.background = `radial-gradient(circle at 35% 30%, #fff8, ${c} 45%)`;
  b.style.left = Math.random() * 95 + "vw";
  const scale = 0.6 + Math.random() * 0.7;
  b.style.width = 56 * scale + "px";
  b.style.height = 70 * scale + "px";
  b.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");
  b.style.setProperty("--rot", (Math.random() * 40 - 20) + "deg");
  b.style.animationDuration = 9 + Math.random() * 8 + "s";
  $("#balloons").append(b);
  b.addEventListener("animationend", () => b.remove());
}

/* ---------- Konfetti ---------- */
const cv = $("#confetti");
const ctx = cv.getContext("2d");
let parts = [];
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", resize); resize();
const confColors = ["#ff6fa5", "#ffd27a", "#8e6bff", "#6fe0ff", "#ffffff", "#7dffb3"];
function burst(n = 160, x = innerWidth / 2, y = innerHeight / 3) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      c: confColors[(Math.random() * confColors.length) | 0],
      r: Math.random() * 6, vr: Math.random() * 0.3 - 0.15, life: 160 + Math.random() * 60,
    });
  }
}
function confettiLoop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter((p) => p.life > 0 && p.y < cv.height + 40);
  for (const p of parts) {
    p.vy += 0.18; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.globalAlpha = Math.min(1, p.life / 40);
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.cos(p.r * 2));
    ctx.restore();
  }
  requestAnimationFrame(confettiLoop);
}
confettiLoop();
function bigCelebration() {
  burst(180, innerWidth * 0.25, innerHeight * 0.4);
  setTimeout(() => burst(180, innerWidth * 0.75, innerHeight * 0.4), 300);
  setTimeout(() => burst(200, innerWidth * 0.5, innerHeight * 0.25), 650);
  for (let i = 0; i < 14; i++) setTimeout(spawnBalloon, i * 180);
}

/* ---------- Musiqa (Happy Birthday, WebAudio) ---------- */
let audioCtx = null, musicOn = false, musicTimer = null;
const N = { G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, F5: 698.5, G5: 784 };
const MELODY = [
  ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", .75], ["G4", .25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", .75], ["F5", .25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3],
];
const BEAT = 0.42;
function playMelody() {
  if (!musicOn) return;
  let t = audioCtx.currentTime + 0.05;
  for (const [n, d] of MELODY) {
    const dur = d * BEAT;
    [1, 2].forEach((mult, k) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = k ? "sine" : "triangle";
      o.frequency.value = N[n] * mult;
      const peak = k ? 0.04 : 0.16;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
      o.connect(g).connect(audioCtx.destination);
      o.start(t); o.stop(t + dur);
    });
    t += dur;
  }
  const total = MELODY.reduce((s, [, d]) => s + d, 0) * BEAT;
  musicTimer = setTimeout(playMelody, (total + 1.5) * 1000);
}
function toggleMusic(force) {
  musicOn = typeof force === "boolean" ? force : !musicOn;
  const btn = $("#musicBtn");
  btn.classList.add("show");
  btn.classList.toggle("on", musicOn);
  if (musicOn) {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
    playMelody();
  } else {
    clearTimeout(musicTimer);
    if (audioCtx) audioCtx.suspend();
  }
}
$("#musicBtn").onclick = () => {
  if (musicOn) { toggleMusic(false); }
  else { if (audioCtx) audioCtx.resume(); toggleMusic(true); }
};

/* ---------- Tort shamlari ---------- */
const candlesEl = $("#candles");
const digits = String(SOZLAMA.yosh).split("");
let lit = digits.length;
for (const d of digits) {
  const c = document.createElement("div");
  c.className = "candle digit";
  c.innerHTML = `<div class="flame"></div><span>${d}</span>`;
  c.title = "Puflash uchun bos";
  c.addEventListener("click", () => {
    if (c.classList.contains("out")) return;
    c.classList.add("out");
    lit--;
    if (lit === 0) {
      $("#cakeMsg").textContent = `${SOZLAMA.yosh} yoshing muborak, ${SOZLAMA.ism}! Niyating albatta ijobat bo'ladi! 🌟`;
      bigCelebration();
    }
  });
  candlesEl.append(c);
}

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Kirish (sovg'a) ---------- */
$("#giftBtn").addEventListener("click", () => {
  $("#giftBtn").classList.add("open");
  toggleMusic(true);
  setTimeout(() => {
    $("#intro").classList.add("gone");
    $("#main").classList.remove("hidden");
    bigCelebration();
    typeLoop();
    setInterval(spawnBalloon, 1800);
  }, 900);
});

$("#againBtn").addEventListener("click", bigCelebration);

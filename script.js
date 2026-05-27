/* ═══════════════════════════════════════════
   La Dolce Vita Luxury Experience
   script.js — SPA routing, animations, UI
═══════════════════════════════════════════ */

/* ─── Per-page SEO ─── */
const pageSEO = {
  home: {
    title: 'La Dolce Vita Luxury Experience | Private Concierge Italy',
    desc:  "Italy's most exclusive luxury concierge. Private after-hours museum access, Michelin-starred dining, Milan Fashion Week front row, master artisan ateliers and bespoke journeys for ultra-high-net-worth travellers."
  },
  about: {
    title: 'Who We Are | La Dolce Vita Luxury Experience',
    desc:  "Meet the team behind Italy's most discreet luxury concierge — curators of culture, taste and access for the world's most discerning clients."
  },
  services: {
    title: 'Our Services | La Dolce Vita Luxury Experience',
    desc:  'From private villa stays to Michelin-starred chef dinners, discover the full spectrum of bespoke services crafted exclusively for you.'
  },
  experiences: {
    title: 'Experiences | La Dolce Vita Luxury Experience',
    desc:  'Explore six pillars of Italian luxury: City of Arts, Culinary & Wine, Sports, Events, Craftmanship and Personalisation.'
  },
  city: {
    title: 'City of Arts | La Dolce Vita Luxury Experience',
    desc:  "Private after-hours access to Italy's greatest cultural institutions — museums, galleries and architectural masterpieces, curated just for you."
  },
  culinary: {
    title: 'Culinary & Wine | La Dolce Vita Luxury Experience',
    desc:  "Truffle hunts in Umbria, private vineyard dinners, Michelin chef takeovers — Italy's finest flavours experienced without compromise."
  },
  sports: {
    title: 'Sports | La Dolce Vita Luxury Experience',
    desc:  'Formula 1 paddock access at Monza, private yacht charters, polo on Tuscan estates — extraordinary sporting moments crafted exclusively for you.'
  },
  events: {
    title: 'Events | La Dolce Vita Luxury Experience',
    desc:  "Front-row access to Milan Fashion Week, exclusive Venice Carnival masquerade balls and private invitations to Italy's most coveted cultural events."
  },
  craftmanship: {
    title: 'Craftmanship | La Dolce Vita Luxury Experience',
    desc:  "Private ateliers with Italy's master artisans — bespoke leather goods, Murano glass, Ferrari factory visits and the finest made-in-Italy experiences."
  },
  personalisation: {
    title: 'Personalisation | La Dolce Vita Luxury Experience',
    desc:  'Every detail tailored to you. From private jet transfers to curated gift curation, your vision becomes our mission.'
  },
  contact: {
    title: 'Contact | La Dolce Vita Luxury Experience',
    desc:  'Begin your bespoke Italian journey. Reach our concierge team to discuss your vision and start planning your exclusive experience.'
  }
};

function updateSEO(id) {
  const seo = pageSEO[id] || pageSEO.home;
  document.title = seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', seo.desc);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.desc);
}

/* ─── Page routing ─── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  if (!pg) return;
  pg.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  updateSEO(id);
  initReveal();
  updateNav(id);
  initCursorTargets();
}

function nav_go(id) { showPage(id); closeMob(); }

function updateNav(id) {
  handleScroll(); // transparent on all pages at top; scrolled only when user scrolls
  document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
  const map = {
    home: 'home', about: 'about', services: 'services',
    experiences: 'experiences', city: 'experiences', culinary: 'experiences',
    sports: 'experiences', events: 'experiences', craftmanship: 'experiences',
    personalisation: 'experiences', contact: 'contact'
  };
  const target = map[id];
  document.querySelectorAll('.nav__link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + target + "'")) {
      l.classList.add('active');
    }
  });
}

/* ─── Nav scroll ─── */
const mainNav = document.getElementById('mainNav');

function handleScroll() {
  mainNav.classList.toggle('scrolled', window.scrollY >= 60);
}
window.addEventListener('scroll', handleScroll, { passive: true });

/* ─── Mobile menu ─── */
document.getElementById('hamBtn').onclick = () => {
  document.getElementById('mobMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
};
document.getElementById('mobClose').onclick = closeMob;

function closeMob() {
  document.getElementById('mobMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Scroll reveal ─── */
function initReveal() {
  const isHome = document.querySelector('.page.active')?.id === 'page-home';
  const els = document.querySelectorAll('.page.active .reveal');
  els.forEach(el => el.classList.remove('visible'));

  if (isHome) {
    /* Home: scroll-triggered reveal */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    setTimeout(() => {
      els.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('visible');
      });
    }, 80);
  } else {
    /* Inner pages: reveal everything immediately after paint */
    const arr = Array.from(els);
    requestAnimationFrame(() => requestAnimationFrame(() => arr.forEach(el => el.classList.add('visible'))));
  }
}
initReveal();

/* ─── GR8-style experience slider — infinite loop ─── */
(function () {
  const track = document.getElementById('gr8Track');
  const prev  = document.getElementById('gr8Prev');
  const next  = document.getElementById('gr8Next');
  if (!track) return;

  /* Build infinite track: [2×clones][originals][2×clones] */
  const originals = Array.from(track.querySelectorAll('.gr8-slide'));
  const N = originals.length;
  if (N < 2) return;

  const CLONES = 2; // sets of clones on each side

  // Append clones at end
  for (let c = 0; c < CLONES; c++) {
    originals.forEach(s => {
      const cl = s.cloneNode(true);
      cl.setAttribute('aria-hidden', 'true');
      track.appendChild(cl);
    });
  }
  // Prepend clones at start (insert as fragment before first child)
  const frag = document.createDocumentFragment();
  for (let c = 0; c < CLONES; c++) {
    originals.forEach(s => {
      const cl = s.cloneNode(true);
      cl.setAttribute('aria-hidden', 'true');
      frag.appendChild(cl);
    });
  }
  track.insertBefore(frag, track.firstChild);

  // Re-register events on clones
  track.querySelectorAll('.gr8-slide').forEach(s => {
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') s.click(); });
  });
  initCursorTargets();

  function slideW() {
    const s = track.querySelector('.gr8-slide');
    return s ? s.offsetWidth + 24 : 400; // 24px = gap
  }
  function padL() {
    return parseFloat(getComputedStyle(track).paddingLeft) || 0;
  }

  // Scroll to the start of the original slides (past CLONES×N prepended)
  function goToOrigin() {
    track.scrollLeft = padL() + CLONES * N * slideW();
  }
  requestAnimationFrame(goToOrigin);

  // Smooth navigation via prev/next buttons
  prev.addEventListener('click', () => track.scrollBy({ left: -slideW(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left:  slideW(), behavior: 'smooth' }));

  // Infinite loop: silently jump when entering outer clone territory
  let busy = false;
  function loopCheck() {
    if (busy) return;
    const pL   = padL();
    const sw   = slideW();
    const bW   = N * sw;               // one full block width
    const lo   = pL + bW;              // lower guard: if < this, jump forward
    const hi   = pL + (CLONES + 1) * bW; // upper guard: if > this, jump back

    if (track.scrollLeft < lo) {
      busy = true;
      track.scrollLeft += bW;
      busy = false;
    } else if (track.scrollLeft > hi) {
      busy = true;
      track.scrollLeft -= bW;
      busy = false;
    }
  }
  track.addEventListener('scroll', loopCheck, { passive: true });

  /* Active slide highlight */
  function setActive() {
    const wc = track.getBoundingClientRect().left + track.getBoundingClientRect().width / 2;
    track.querySelectorAll('.gr8-slide').forEach(s => {
      const sc = s.getBoundingClientRect().left + s.getBoundingClientRect().width / 2;
      s.style.opacity = Math.abs(sc - wc) < s.offsetWidth * 0.6 ? '1' : '0.72';
    });
  }
  track.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', () => { goToOrigin(); setTimeout(setActive, 50); });
  setTimeout(setActive, 150);
})();

/* ─── Custom cursor ─── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

function initCursorTargets() {
  document.querySelectorAll('a, button, .exp-card, .gr8-slide, .svc-card').forEach(el => {
    if (el._cursorInit) return;
    el._cursorInit = true;
    el.addEventListener('mouseenter', () => {
      cur.style.width  = '13px'; cur.style.height  = '13px';
      ring.style.width = '48px'; ring.style.height = '48px';
      ring.style.borderColor = 'rgba(201,169,110,0.65)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width  = '7px';  cur.style.height  = '7px';
      ring.style.width = '30px'; ring.style.height = '30px';
      ring.style.borderColor = 'rgba(201,169,110,0.38)';
    });
  });
}
initCursorTargets();

/* ─── Contact form → Formspree ───
   1. Go to https://formspree.io → New Form → enter info@ladolcevitaluxuryexperience.com
   2. Copy your Form ID (looks like: xyzabcde)
   3. Replace YOUR_FORMSPREE_ID below with it
─────────────────────────────────── */
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

async function handleForm(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  // Basic validation
  if (!form.checkValidity()) { form.reportValidity(); return; }

  // Loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const res  = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      success.style.display = 'block';
      form.style.display    = 'none';
    } else {
      const json = await res.json();
      const msg  = json?.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
      btn.textContent = 'Try again';
      btn.disabled    = false;
      alert(`Sorry — ${msg} Please email us directly at info@ladolcevitaluxuryexperience.com`);
    }
  } catch {
    btn.textContent = 'Try again';
    btn.disabled    = false;
    alert('Network error. Please email us directly at info@ladolcevitaluxuryexperience.com');
  }
}

/* ─── Cookie placeholder ─── */
document.getElementById('cookieBtn')?.addEventListener('click', ev => {
  ev.preventDefault();
  alert('Cookie preference settings will be connected once a consent platform is installed.');
});

/* ─── Keyboard: slide cards — registered inside slider IIFE (includes clones) ─── */

/* ============================================================
   VØID — Luxury Landing Page Scripts
   assets/void-landing.js
   ============================================================ */

(function () {
  'use strict';

  // ── CURSOR ───────────────────────────────────────────────────────────
  const dot   = document.getElementById('void-cursor-dot');
  const ring  = document.getElementById('void-cursor-ring');
  const light = document.getElementById('void-reactive-light');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      if (light) {
        light.style.background =
          `radial-gradient(600px circle at ${mx}px ${my}px, rgba(201,168,76,0.08), transparent 70%)`;
      }
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
  }

  // ── PARTICLES ─────────────────────────────────────────────────────────
  const canvas = document.getElementById('void-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x       = Math.random() * W;
        this.y       = Math.random() * H;
        this.vx      = (Math.random() - 0.5) * 0.3;
        this.vy      = -Math.random() * 0.5 - 0.1;
        this.life    = 0;
        this.maxLife = Math.random() * 400 + 200;
        this.size    = Math.random() * 1.5 + 0.3;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.maxLife || this.y < -10) this.reset();
      }
      draw() {
        const p = this.life / this.maxLife;
        const a = p < 0.2 ? p / 0.2 : p > 0.8 ? (1 - p) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a * 0.25})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    // Respect reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      (function animParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animParticles);
      })();
    }
  }

  // ── LIQUID WAVE ───────────────────────────────────────────────────────
  const liquidPath = document.getElementById('void-liquid-path');
  if (liquidPath && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let waveT = 0;
    (function animWave() {
      waveT += 0.008;
      const A1 = 30 + Math.sin(waveT * 0.7) * 15;
      const A2 = 30 + Math.cos(waveT * 0.9) * 12;
      const A3 = 30 + Math.sin(waveT * 1.1 + 1) * 18;
      liquidPath.setAttribute('d',
        `M0,${60+A1} C240,${120-A1} 480,${A2} 720,${60+A3} ` +
        `C960,${120-A3} 1200,${A2} 1440,${60+A1} L1440,120 L0,120 Z`
      );
      requestAnimationFrame(animWave);
    })();
  }

  // ── MARQUEE ──────────────────────────────────────────────────────────
  const track = document.getElementById('void-marquee-track');
  if (track) {
    const words = [
      'Luxury Redefined', 'Artisan Crafted', 'Tokyo Atelier',
      'SS 2040', 'Nano Fibers', 'Void Maison', 'Future Wear', 'Dark Elegance'
    ];
    let html = '';
    for (let i = 0; i < 3; i++) {
      words.forEach(w => { html += `<span class="void-marquee-item">${w}</span>`; });
    }
    track.innerHTML = html;
  }

  // ── SCROLL REVEALS ────────────────────────────────────────────────────
  const revealSelectors = [
    '.void-section-label', '.void-section-title',
    '.void-card', '.void-statement__line', '.void-divider',
    '.void-metrics', '.void-feature-heading', '.void-feature-body'
  ];
  const reveals = document.querySelectorAll(revealSelectors.join(','));
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('void-visible');
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObs.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────────────────────────────
  const counters = document.querySelectorAll('.void-metric__val[data-target]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.target;
      let cur      = 0;
      const step   = target / 50;
      const tick   = () => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur);
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  // ── PARALLAX ─────────────────────────────────────────────────────────
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroTitle = document.querySelector('.void-hero__title');
    const gridBg    = document.getElementById('void-grid-bg');
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      if (heroTitle) heroTitle.style.transform = `translateY(${s * 0.3}px)`;
      if (gridBg)    gridBg.style.transform    = `translateY(${s * 0.15}px)`;
    }, { passive: true });
  }

  // ── CARD TILT ─────────────────────────────────────────────────────────
  document.querySelectorAll('.void-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transition = 'transform 0.1s, opacity 0.8s';
      card.style.transform =
        `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1), opacity 0.8s';
      card.style.transform  = '';
    });
  });

  // ── LOGO GLITCH ───────────────────────────────────────────────────────
  const logo = document.querySelector('.void-nav__logo');
  if (logo) {
    function glitch() {
      logo.style.textShadow =
        `${(Math.random()-0.5)*6}px 0 rgba(255,0,60,0.4), ` +
        `${(Math.random()-0.5)*6}px 0 rgba(0,200,255,0.4), ` +
        `0 0 40px #c9a84c, 0 0 80px rgba(201,168,76,0.3)`;
      setTimeout(() => {
        logo.style.textShadow = '0 0 40px #c9a84c, 0 0 80px rgba(201,168,76,0.3)';
      }, 80);
      setTimeout(glitch, 4000 + Math.random() * 4000);
    }
    setTimeout(glitch, 4000 + Math.random() * 4000);
  }

})();

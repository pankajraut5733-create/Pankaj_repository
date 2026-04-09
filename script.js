/* =========================================================
   PANKAJ RAUT PORTFOLIO – script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HAMBURGER MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── SKILL BAR ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate');
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── TYPEWRITER in hero tag ── */
  const tagEl = document.querySelector('.hero-tag-text');
  if (tagEl) {
    const words = ['Python Enthusiast', 'AI Explorer', 'Problem Solver', 'Lifelong Learner'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      tagEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length)      { deleting = true; setTimeout(type, 1200); return; }
      if (deleting && ci < 0)                 { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
      setTimeout(type, deleting ? 55 : 90);
    };
    type();
  }

  /* ── CERT CARD TILT ── */
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) scale(1.02) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── SMOOTH NAV HIDE ON SCROLL DOWN ── */
  let lastY = 0;
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 100) {
      navEl.style.transform = 'translateY(-100%)';
    } else {
      navEl.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, { passive: true });
  navEl.style.transition = 'transform .35s ease';

});

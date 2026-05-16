document.addEventListener('DOMContentLoaded', function () {

  // ---- REVEAL: erst verstecken, dann beim Scrollen einblenden ----
  const revealEls = document.querySelectorAll('#main-page .reveal');

  // Alle Elemente erst verstecken (nur wenn JS aktiv ist)
  revealEls.forEach(el => el.classList.add('hidden'));

  // Sofort sichtbare Elemente (Hero, Viewport-Start) direkt einblenden
  function checkVisible() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.remove('hidden');
        el.classList.add('visible');
      }
    });
  }

  checkVisible(); // einmal sofort

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('hidden');
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ---- NAVIGATION ----
  const navbar    = document.getElementById('navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      if (document.querySelector('.project-page.active')) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    });
  });

  // ---- AKTIVE NAV LINKS ----
  document.querySelectorAll('section[id]').forEach(sec => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('#navbar .nav-links a').forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + sec.id ? 'var(--gold)' : '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(sec);
  });

  // ---- PROJEKTSEITEN ----
  let savedScroll = 0;

  window.openProject = function (id) {
    savedScroll = window.scrollY;
    document.querySelectorAll('.project-page').forEach(p => p.classList.remove('active', 'visible'));
    const page = document.getElementById('project-' + id);
    if (!page) return;
    page.classList.add('active');
    page.scrollTop = 0;
    // Alle Inhalte auf Projektseite direkt sichtbar machen
    page.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('visible');
    });
    requestAnimationFrame(() => requestAnimationFrame(() => page.classList.add('visible')));
  };

  window.closeProject = function () {
    const page = document.querySelector('.project-page.active');
    if (!page) return;
    page.classList.remove('visible');
    setTimeout(() => {
      page.classList.remove('active');
      window.scrollTo(0, savedScroll);
    }, 400);
  };

  // Links im Projekt-Footer schliessen die Seite und scrollen
  document.querySelectorAll('.project-footer a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      window.closeProject();
      setTimeout(() => {
        const t = document.querySelector(href);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      }, 450);
    });
  });

});

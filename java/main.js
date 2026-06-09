// ---- PROJEKTE SLIDER ----
let projekteOffset = 0;

function verschiebeGrid(direction) {
  const outer = document.querySelector('.projekte-slider-outer');
  const grid  = document.getElementById('projekteGrid');
  if (!grid || !outer) return;

  const cards   = grid.querySelectorAll('.projekt-karte');
  const total   = cards.length;   // 4
  const visible = 3;
  const maxOffset = total - visible; // 1

  projekteOffset = Math.max(0, Math.min(projekteOffset + direction, maxOffset));

  // Kartenbreite direkt aus dem ersten Element lesen
  // (erst NACH dem ersten Klick ist layout fertig — daher clientWidth nutzen)
  const outerInner = outer.clientWidth - 96; // 96 = 2 × 3rem padding in px
  const gap        = 24; // 1.5rem
  const cardWidth  = (outerInner - gap * (visible - 1)) / visible;

  grid.style.transform = `translateX(-${projekteOffset * (cardWidth + gap)}px)`;
}

// ---- PROJEKTSEITEN ----
let savedScroll = 0;

function openProject(id) {
  savedScroll = window.scrollY;
  document.querySelectorAll('.project-page').forEach(p => {
    p.classList.remove('active', 'visible');
  });
  const page = document.getElementById('project-' + id);
  if (!page) return;
  page.classList.add('active');
  page.scrollTop = 0;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      page.classList.add('visible');
    });
  });
}

function closeProject() {
  const page = document.querySelector('.project-page.active');
  if (!page) return;
  page.classList.remove('visible');
  setTimeout(() => {
    page.classList.remove('active');
    window.scrollTo(0, savedScroll);
  }, 400);
}

document.addEventListener('DOMContentLoaded', function () {

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      if (document.querySelector('.project-page.active')) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 70,
        behavior: 'smooth'
      });
    });
  });

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

});

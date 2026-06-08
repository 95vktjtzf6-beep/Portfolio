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
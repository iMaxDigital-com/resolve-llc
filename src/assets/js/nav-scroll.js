document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  if (!nav || !hero) return;

  function updateNav() {
    const heroBottom = hero.offsetHeight;

    if (window.scrollY > heroBottom - 80) {
      nav.classList.remove('nav--dark');
      nav.classList.add('nav--light');
    } else {
      nav.classList.remove('nav--light');
      nav.classList.add('nav--dark');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
});

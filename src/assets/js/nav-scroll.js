document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav');

  if (!nav) return;

  const topThemeIsDark = nav.classList.contains('nav--dark');

  function updateNav() {
    const isDark = topThemeIsDark && window.scrollY <= 0;
    nav.classList.toggle('nav--dark', isDark);
    nav.classList.toggle('nav--light', !isDark);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
});

// Scripts for the participation guide page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos-f]');
  setupPageTopButton(100);
  showTab('circle');
  document.querySelectorAll('.fade-up').forEach(el => el.classList.remove('show'));
});

window.addEventListener('load', () => {
  fadeImage(document.getElementById('circle-image'));
});
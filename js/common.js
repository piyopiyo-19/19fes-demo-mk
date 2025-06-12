(function(global){
  function fadeImage(imageEl) {
    if (!imageEl) return;
    imageEl.classList.remove('show');
    void imageEl.offsetWidth;
    setTimeout(() => imageEl.classList.add('show'), 10);
  }

  function showTab(tab) {
    const circle = document.getElementById('circle');
    const general = document.getElementById('general');
    const circleImage = document.getElementById('circle-image');
    const generalImage = document.getElementById('general-image');

    if (circle && general) {
      circle.style.display = tab === 'circle' ? 'block' : 'none';
      general.style.display = tab === 'general' ? 'block' : 'none';
    }

    if (tab === 'circle') {
      fadeImage(circleImage);
    } else {
      fadeImage(generalImage);
    }

    const buttons = document.querySelectorAll('.tab-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    const clicked = tab === 'circle'
      ? document.querySelector('.tab-buttons button:nth-child(1)')
      : document.querySelector('.tab-buttons button:nth-child(2)');
    if (clicked) clicked.classList.add('active');
  }

  function setupAosAnimations(selector = '[data-aos-f]', options = {}) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, options);

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  function setupPageTopButton(threshold = 300) {
    const pageTop = document.getElementById('pageTop');
    if (!pageTop) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > threshold) {
        pageTop.classList.add('show');
      } else {
        pageTop.classList.remove('show');
      }
    });
    pageTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initHamburgerMenu() {
    const toggle = document.getElementById('menu-toggle');
    const body = document.body;
    const mask = document.getElementById('mask');
    if (!toggle || !mask) return;
    toggle.addEventListener('click', () => {
      body.classList.toggle('open');
    });
    mask.addEventListener('click', () => {
      body.classList.remove('open');
      mask.style.display = 'none';
    });
    }

  function loadHeader() {
    const ph = document.getElementById('header-placeholder');
    if (ph) {
      fetch('includes/header.html')
        .then(res => res.text())
        .then(html => {
          ph.innerHTML = html;
          initHamburgerMenu();
        });
    }
  }




  function loadFooter() {
    const ph = document.getElementById('footer-placeholder');
    if (ph) {
      const src = ph.dataset.src || 'includes/footer.html';
      fetch(src)
        .then(res => res.text())
        .then(html => { ph.innerHTML = html; });
    }
  }

  global.fadeImage = fadeImage;
  global.showTab = showTab;
  global.setupAosAnimations = setupAosAnimations;
  global.setupPageTopButton = setupPageTopButton;
  global.initHamburgerMenu = initHamburgerMenu;
  global.loadHeader = loadHeader;
  global.loadFooter = loadFooter;
})(window);
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});
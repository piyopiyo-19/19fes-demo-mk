// Initialization for the top page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos]', { rootMargin: '0px 0px -250px 0px' });
  setupPageTopButton(300);

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const items = carousel.querySelectorAll('.item');
    const leftBtn = document.querySelector('.carousel-button.left');
    const rightBtn = document.querySelector('.carousel-button.right');
    const dots = document.querySelectorAll('.dot');
    const itemCount = 3;

    function getItemWidth() {
      const gap = parseInt(getComputedStyle(carousel).gap);
      return items[0].getBoundingClientRect().width + gap;
    }

    let currentIndex = 1;
    let scrollTimeout;

    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function slideTo(index, smooth = true) {
      if (!smooth) carousel.style.scrollBehavior = 'auto';
      const width = getItemWidth();
      carousel.scrollTo({ left: width * index, behavior: smooth ? 'smooth' : 'auto' });
      currentIndex = index;
      updateDots((index - 1 + itemCount) % itemCount);
      if (!smooth) {
        requestAnimationFrame(() => { carousel.style.scrollBehavior = 'smooth'; });
      }
    }

    function checkLoop() {
      if (currentIndex === 0) {
        currentIndex = itemCount;
        slideTo(currentIndex, false);
      } else if (currentIndex === itemCount + 1) {
        currentIndex = 1;
        slideTo(currentIndex, false);
      }
    }

    carousel.addEventListener('scroll', () => {
      const width = getItemWidth();
      const index = Math.round(carousel.scrollLeft / width);
      if (index !== currentIndex) {
        currentIndex = index;
        updateDots((currentIndex - 1 + itemCount) % itemCount);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkLoop, 60);
    });

    leftBtn.addEventListener('click', () => slideTo(currentIndex - 1));
    rightBtn.addEventListener('click', () => slideTo(currentIndex + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => slideTo(i + 1)));
    setInterval(() => slideTo(currentIndex + 1), 5000);
    window.addEventListener('resize', () => slideTo(currentIndex, false));
    window.addEventListener('load', () => slideTo(currentIndex, false));
  }

  // zoom + fade for icons
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.slide-icon-button').forEach(el => {
    observer.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('animate-in');
    }
  });
});

// logo animations after load
window.addEventListener('load', () => {
  const logo = document.querySelector('.top-logo');
  const main2 = document.querySelector('.top-main2');
  const subLogo = document.querySelector('.top-logo-ske');

  setTimeout(() => logo && logo.classList.add('visible'), 30);
  setTimeout(() => main2 && main2.classList.add('visible'), 200);
  setTimeout(() => subLogo && subLogo.classList.add('visible'), 1800);
});
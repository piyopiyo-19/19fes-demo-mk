// Scripts for the contact page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupPageTopButton(300);
  attachFooterDangos();
  attachFormsDangos();
});

var submitted = false; // used by form iframe callback

function createParticles() {
  const container = document.getElementById('floating-particles');
  if (!container) return;
  const symbols = ['heart', 'star', 'ball', 'shoes', 'pto', 'hand', 'piano', 'p8-p', 'p-ina-g','p-ina-g'];
  const total = 25;
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let i = 0; i < total; i++) {
    const particle = document.createElement('div');
    const type = symbols[Math.floor(Math.random() * symbols.length)];
    particle.classList.add('particle', type);

    const col = i % cols;
    const row = Math.floor(i / cols);
    particle.style.left = (col * cellW + Math.random() * (cellW - 5)) + 'vw';
    particle.style.bottom = (row * cellH + Math.random() * (cellH - 5)) + 'vh';

    const baseRotate = Math.random() * 360;
    particle.style.setProperty('--rotate-base', `${baseRotate}deg`);
    particle.style.transform = `translate(0, 0) rotate(${baseRotate}deg)`;

    const duration = 15 + Math.random() * 10;
    const offset = Math.random() * duration;
    particle.style.animation = `fadeInParticle 1.2s ease-out forwards, floatParticle ${duration}s linear infinite`;
    particle.style.animationDelay = `0s, -${offset}s`;

    container.appendChild(particle);
  }
}

if (document.readyState !== 'loading') {
  createParticles();
} else {
  document.addEventListener('DOMContentLoaded', createParticles);
}

function attachFooterDangos() {
  const dangos = document.querySelector('.footer-dangos');
  if (!dangos) return;

  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const images = dangos.querySelectorAll('img');
  let loaded = 0;

  const startAnim = () => {
    loaded++;
    if (loaded === images.length) {
      dangos.classList.add('animate');
    }
  };

  images.forEach(img => {
    if (img.complete) {
      startAnim();
    } else {
      img.addEventListener('load', startAnim);
    }
  });

  const insert = () => {
    if (placeholder.firstElementChild) {
      placeholder.style.position = 'relative';
      placeholder.appendChild(dangos);
    } else {
      setTimeout(insert, 100);
    }
  };
  insert();
}

function attachFormsDangos() {
  const dangos = document.querySelector('.forms-dangos');
  if (!dangos) return;

  const images = dangos.querySelectorAll('img');
  let loaded = 0;

  const startAnim = () => {
    loaded++;
    if (loaded === images.length) {
      dangos.classList.add('animate');
    }
  };

  images.forEach(img => {
    if (img.complete) {
      startAnim();
    } else {
      img.addEventListener('load', startAnim);
    }
  });
}

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  const header = document.getElementById('page-title');
  const formsAttention = document.getElementById('forms-attention');
  const contents = document.querySelectorAll(
    '.scrolldown, #formdayo, #scr-banner, .footer-dangos'
  );
  const introImg = document.querySelector('.forms-white-box .forms-intro-img');
  const introText = document.querySelector('.forms-intro-text');

  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  };

  const showHeader = () => {
    if (header) header.classList.add('aos-animate');
  };

  const showFormsAttention = () => {
    if (formsAttention) formsAttention.classList.add('zoom-in');
  };

  const showContents = () => {
    contents.forEach((el, i) => {
      setTimeout(() => el.classList.add('aos-animate'), i * 200);
    });
  };

  const showIntroImg = () => {
    if (introImg) introImg.classList.add('pop');
  };

  const showIntroText = () => {
    if (introText) introText.classList.add('zoom-in');
  };

  hideLoader();
  setTimeout(() => {
    showHeader();
    // after header appears, show forms attention with delay
    setTimeout(() => {
      showFormsAttention();
      // slide in the intro text shortly after the white box zooms in
      setTimeout(() => {
        showIntroText();
        // then pop the intro image a bit later
        setTimeout(() => {
          showIntroImg();
          // show remaining contents␊
          setTimeout(showContents, 400);
        }, 200);
      }, 200);
    }, 500);
    // Apply default observer to all elements except form section, forms attention
    // and the dangos around the form which will be triggered manually
    setupAosAnimations('[data-aos-f]:not(#formdayo):not(#forms-attention):not(.forms-dangos)');
    // Delay animation trigger for the form section
      setupAosAnimations('#formdayo', {
      threshold: 1.0,
      rootMargin: '0px 0px 50px 0px'
    });

    // Zoom in the form title shortly after the form box appears
    // and then slide in the dangos surrounding the form
    const formsbox = document.querySelector('.formsbox');
    const formTitle = document.querySelector('.form-title');
    const formsDangos = document.querySelector('.forms-dangos');
    if (formsbox && formTitle) {
      const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // trigger form title slightly after the form box zooms in
            setTimeout(() => {
              formTitle.classList.add('zoom-in');
              // then slide in the dangos a bit later
              if (formsDangos) {
                setTimeout(() => formsDangos.classList.add('slide-in'), 200);
              }
            }, 200);
            titleObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      titleObserver.observe(formsbox);
    }
  }, 400);
});
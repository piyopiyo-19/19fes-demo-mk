// Particle animation for the thanks page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos-f]');
  setupPageTopButton(300);
});

function createParticles() {
  const container = document.getElementById('floating-particles');
  if (!container) return;
  const symbols = ['heart', 'star', 'ball', 'shoes', 'pto', 'p-ina-g'];
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
// ---------- Reveal on scroll ----------
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ---------- Side thread nav: click to scroll + highlight active ----------
const buttons = document.querySelectorAll('.thread button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      buttons.forEach(b => b.classList.remove('active'));
      const match = document.querySelector(`.thread button[data-target="${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(s => navObserver.observe(s));

// ---------- Cuenta atrás hasta 26 Dic 2026, 00:00 (hora local) ----------
const weddingDate = new Date('2026-12-26T00:00:00');

function updateCountdown() {
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

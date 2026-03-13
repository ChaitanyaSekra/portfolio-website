// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .card, .btn, .filter-btn, .exp-nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.marginLeft = '-9px';
      cursor.style.marginTop = '-9px';
      cursorRing.style.width = '56px';
      cursorRing.style.height = '56px';
      cursorRing.style.marginLeft = '-28px';
      cursorRing.style.marginTop = '-28px';
      cursorRing.style.borderColor = 'rgba(0,245,255,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.marginLeft = '-5px';
      cursor.style.marginTop = '-5px';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.marginLeft = '-18px';
      cursorRing.style.marginTop = '-18px';
      cursorRing.style.borderColor = 'rgba(0,245,255,0.5)';
    });
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.observe').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// Typewriter effect
function typewriter(element, text, speed = 60) {
  if (!element) return;
  element.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// HUD time display
function updateTime() {
  const el = document.querySelector('.hud-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateTime, 1000);
updateTime();

// Particle canvas
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,255,${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles('particles');
});
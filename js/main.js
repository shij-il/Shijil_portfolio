/* ═══════════════════════════════════════════════════════════
   THEME: DARK / LIGHT
═══════════════════════════════════════════════════════════ */
(function () {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  // Set icon immediately (before DOM ready) to avoid flash
  document.addEventListener('DOMContentLoaded', () => updateThemeIcon(saved));
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    // Ripple animation on button
    btn.style.animation = 'none';
    btn.offsetHeight;
    btn.style.animation = '';
  });
});

/* ═══════════════════════════════════════════════════════════
   ACTIVE NAV LINK
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

/* ═══════════════════════════════════════════════════════════
   MOBILE: Close menu on nav-link tap
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('menu');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
      bsCollapse.hide();
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   MOBILE NAV HINT
   Shows once to first-time mobile visitors, auto-dismisses.
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const isMobile  = window.innerWidth < 992;
  const dismissed = localStorage.getItem('navHintDismissed');
  const hint      = document.getElementById('navHint');
  if (!hint || !isMobile || dismissed) return;

  // Also add pulse ring to hamburger
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) toggler.classList.add('hamburger-pulse');

  setTimeout(() => hint.classList.add('show'), 1200);
  setTimeout(() => dismissNavHint(), 6000);
});

function dismissNavHint() {
  const hint    = document.getElementById('navHint');
  const toggler = document.querySelector('.navbar-toggler');
  if (hint)    hint.classList.remove('show');
  if (toggler) toggler.classList.remove('hamburger-pulse');
  localStorage.setItem('navHintDismissed', '1');
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS (IntersectionObserver)
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
});

/* ═══════════════════════════════════════════════════════════
   NAVBAR SCROLL SHADOW
═══════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 10
    ? 'var(--navbar-shadow)'
    : 'none';
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   EMAILJS INIT
═══════════════════════════════════════════════════════════ */
if (typeof emailjs !== 'undefined') {
  emailjs.init('FlvZvtQsWj-gqlGvs');
}

/* ═══════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════ */
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const btn    = this.querySelector('.btn-send');

  status.textContent = 'Sending…';
  status.style.color = 'var(--primary)';
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending…';

  emailjs.sendForm('service_2uy9ffc', 'template_8r3hj6j', this)
    .then(() => {
      status.textContent = '✅ Message sent successfully!';
      status.style.color = '#16a34a';
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
      this.reset();
    })
    .catch(() => {
      status.textContent = '❌ Failed to send. Please try again.';
      status.style.color = '#dc2626';
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
    });
});

/* ═══════════════════════════════════════════════════════════
   CERTIFICATE TOGGLES
═══════════════════════════════════════════════════════════ */
function toggleCertificate() {
  const cert    = document.getElementById('certificateBox');
  const btnText = document.getElementById('certBtnText');
  if (!cert) return;
  const isOpen = cert.classList.toggle('show-certificate');
  if (btnText) btnText.textContent = isOpen ? 'Hide Certificate' : 'View Certificate';
}

function toggleCert(id, btn) {
  const box = document.getElementById(id);
  if (!box) return;
  const isOpen = box.classList.toggle('show-certificate');
  btn.innerHTML = isOpen
    ? '<i class="fas fa-eye-slash"></i> Hide Certificate'
    : '<i class="fas fa-eye"></i> View Certificate';
  if (isOpen) {
    setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }
}

/* ═══════════════════════════════════════════════════════════
   OPEN PROJECT
═══════════════════════════════════════════════════════════ */
function openProject(url) {
  window.open(url, '_blank');
}
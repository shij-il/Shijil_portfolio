/* ═══════════════════════════════════════════════════════════════
   ACTIVE NAV LINK
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
 
/* ═══════════════════════════════════════════════════════════════
   MOBILE: Close menu when a nav-link is tapped
   (Bootstrap doesn't do this by default for multi-page sites)
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('menu');
    if (collapse && collapse.classList.contains('show')) {
      // Use Bootstrap's Collapse API to close it smoothly
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
      bsCollapse.hide();
    }
  });
});
 
/* ═══════════════════════════════════════════════════════════════
   NAVBAR SCROLL SHADOW
═══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.09)'
    : 'none';
}, { passive: true });
 
/* ═══════════════════════════════════════════════════════════════
   EMAILJS INIT
═══════════════════════════════════════════════════════════════ */
if (typeof emailjs !== 'undefined') {
  emailjs.init("FlvZvtQsWj-gqlGvs");
}
 
/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════════ */
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
 
  const status = document.getElementById("formStatus");
  const btn    = this.querySelector(".btn-send");
 
  status.textContent = "Sending…";
  status.style.color = "var(--primary)";
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending…';
 
  emailjs.sendForm("service_2uy9ffc", "template_8r3hj6j", this)
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#16a34a";
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
      this.reset();
    })
    .catch(() => {
      status.textContent = "❌ Failed to send. Please try again.";
      status.style.color = "#dc2626";
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
    });
});
 
/* ═══════════════════════════════════════════════════════════════
   INTERNSHIP PAGE – single toggle
═══════════════════════════════════════════════════════════════ */
function toggleCertificate() {
  const cert    = document.getElementById("certificateBox");
  const btnText = document.getElementById("certBtnText");
  if (!cert) return;
  const isOpen = cert.classList.toggle("show-certificate");
  if (btnText) btnText.textContent = isOpen ? "Hide Certificate" : "View Certificate";
}
 
/* ═══════════════════════════════════════════════════════════════
   CERTIFICATES PAGE – individual toggles
═══════════════════════════════════════════════════════════════ */
function toggleCert(id, btn) {
  const box    = document.getElementById(id);
  if (!box) return;
  const isOpen = box.classList.toggle("show-certificate");
  btn.innerHTML = isOpen
    ? '<i class="fas fa-eye-slash"></i> Hide Certificate'
    : '<i class="fas fa-eye"></i> View Certificate';
  if (isOpen) {
    // Smooth scroll to the revealed certificate
    setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }
}
 
/* ═══════════════════════════════════════════════════════════════
   OPEN PROJECT IN NEW TAB
═══════════════════════════════════════════════════════════════ */
function openProject(url) {
  window.open(url, '_blank');
}
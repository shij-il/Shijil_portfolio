/* ─── Active Nav Link ───────────────────────────────────────── */
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

/* ─── EmailJS Init ──────────────────────────────────────────── */
(function () {
  emailjs.init("FlvZvtQsWj-gqlGvs");
})();

/* ─── Contact Form ──────────────────────────────────────────── */
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("formStatus");
  const btn    = this.querySelector(".btn-send");

  status.textContent = "Sending…";
  status.style.color = "var(--primary)";
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending…';

  emailjs.sendForm(
    "service_2uy9ffc",
    "template_8r3hj6j",
    this
  ).then(
    () => {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#16a34a";
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
      this.reset();
    },
    () => {
      status.textContent = "❌ Failed to send. Please try again.";
      status.style.color = "#dc2626";
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
    }
  );
});

/* ─── Internship Single Toggle ──────────────────────────────── */
function toggleCertificate() {
  const cert    = document.getElementById("certificateBox");
  const btnText = document.getElementById("certBtnText");
  const isOpen  = cert.classList.toggle("show-certificate");
  if (btnText) btnText.textContent = isOpen ? "Hide Certificate" : "View Certificate";
}

/* ─── Certificates Page – Individual Toggles ───────────────── */
function toggleCert(id, btn) {
  const box    = document.getElementById(id);
  const isOpen = box.classList.toggle("show-certificate");
  const icon   = btn.querySelector("i");

  if (isOpen) {
    btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Certificate';
  } else {
    btn.innerHTML = '<i class="fas fa-eye"></i> View Certificate';
  }
}

/* ─── Open Project in New Tab ───────────────────────────────── */
function openProject(url) {
  window.open(url, '_blank');
}

/* ─── Navbar Scroll Effect ──────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

document.querySelectorAll(".nav-link").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

(function () {
  emailjs.init("FlvZvtQsWj-gqlGvs");
})();

document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("formStatus");
  status.textContent = "Sending message...";
  status.style.color = "#4f46e5";

  emailjs.sendForm(
    "service_2uy9ffc",
    "template_8r3hj6j",
    this
  ).then(
    () => {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "green";
      this.reset();
    },
    () => {
      status.textContent = "❌ Failed to send message. Try again!";
      status.style.color = "red";
    }
  );
});

function toggleCertificate() {
  const cert = document.getElementById("certificateBox");
  cert.classList.toggle("show-certificate");
}


function openResume() {
  const resumeModal = new bootstrap.Modal(
    document.getElementById('resumeModal')
  );
  resumeModal.show();
}

function openProject(url) {
window.open(url, '_blank');
}
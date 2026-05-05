// ============================================
// PORTFOLIO SCRIPT (ALIGNED VERSION)
// ============================================

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("✅ App initialized");

  const form = document.getElementById("contact-form");
  const navLinks = document.querySelectorAll(".navbar a");

  // Defensive check
  if (!form) {
    console.warn("⚠️ Contact form not found on this page");
  }

  attachFormHandler(form);
  attachNavigation(navLinks);
}

// ============================================
// NAVIGATION (SMART HANDLING)
// ============================================

function attachNavigation(links) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // CASE 1: SAME PAGE SCROLL (#section)
      if (href.startsWith("#")) {
        e.preventDefault();

        const target = document.getElementById(href.substring(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // CASE 2: index.html#section
      if (href.includes("#") && href.includes("index.html")) {
        const [file, hash] = href.split("#");

        if (
          window.location.pathname.includes("index.html") ||
          window.location.pathname === "/"
        ) {
          e.preventDefault();

          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
        return;
      }

      // CASE 3: normal navigation → do nothing
    });
  });
}

// ============================================
// FORM HANDLING
// ============================================

function attachFormHandler(form) {
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getFormData();
    console.log("📩 Form Data:", data);

    const validation = validateForm(data);

    if (!validation.isValid) {
      showMessage(validation.message, "error");
      return;
    }

    simulateSubmit(data);
  });
}

// ============================================
// DATA EXTRACTION (FIXED)
// ============================================

function getFormData() {
  const form = document.getElementById("contact-form");

  return {
    name: form.elements["name"].value.trim(),
    email: form.elements["email"].value.trim(),
    subject: form.elements["subject"].value.trim(),
    message: form.elements["message"].value.trim(),
  };
}

// ============================================
// VALIDATION (IMPROVED)
// ============================================

function validateForm({ name, email, subject, message }) {
  if (!name || !email || !subject || !message) {
    return {
      isValid: false,
      message: "All fields are required.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      message: "Invalid email format.",
    };
  }

  return {
    isValid: true,
    message: "Validation passed.",
  };
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================
// SIMULATED SUBMISSION
// ============================================

function simulateSubmit(data) {
  showMessage("Submitting...", "info");

  setTimeout(() => {
    console.log("✅ Submitted:", data);

    showMessage("Form submitted successfully!", "success");
    resetForm();
  }, 1000);
}

// ============================================
// UI FEEDBACK
// ============================================

function showMessage(message, type) {
  const existing = document.querySelector(".form-message");
  if (existing) existing.remove();

  const msg = document.createElement("div");
  msg.className = `form-message ${type}`;
  msg.textContent = message;

  const form = document.getElementById("contact-form");
  if (form) form.appendChild(msg);
}

// ============================================
// RESET FORM
// ============================================

function resetForm() {
  const form = document.getElementById("contact-form");
  if (form) form.reset();
}
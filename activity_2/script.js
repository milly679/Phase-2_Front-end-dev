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

      // ============================================
      // CASE 1: SAME PAGE SCROLL (e.g. #contact)
      // ============================================
      if (href.startsWith("#")) {
        e.preventDefault();

        const target = document.getElementById(href.substring(1));

        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // ============================================
      // CASE 2: SAME PAGE WITH FILE (index.html#home)
      // ============================================
      if (href.includes("#") && href.includes("index.html")) {
        const [file, hash] = href.split("#");

        // If already on index.html → smooth scroll
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

        // Otherwise allow normal navigation
        return;
      }

      // ============================================
      // CASE 3: EXTERNAL PAGE (about.html, contact.html)
      // ============================================
      // Do NOT prevent default → allow navigation
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
// DATA EXTRACTION
// ============================================

function getFormData() {
  return {
    name: document.getElementById("name")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
  };
}

// ============================================
// EXPORT FOR TESTING
// ============================================

module.exports = { validateForm };
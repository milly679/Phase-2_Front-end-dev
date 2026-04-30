document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM fully loaded and parsed");

  const form = document.getElementById("contact-form");
  const navLinks = document.querySelectorAll(".navbar a");

  //Defensive check
  if (!form) {
    console.warn("Form element not found");
    return;
  }
}

function attachNavigation(links) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);

      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Target element with id ${targetId} not found`);
      }
    });
  });
}
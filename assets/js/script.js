const SITE_CONFIG = {
  contactEmail: "hello@crestodigital.com" // Replace here if your real address is different.
};

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-contact-email]").forEach((link) => {
  link.textContent = SITE_CONFIG.contactEmail;
  link.href = `mailto:${SITE_CONFIG.contactEmail}`;
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const form = document.getElementById("contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`SEO consultation request from ${data.get("name") || "website visitor"}`);
  const body = encodeURIComponent([
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Website: ${data.get("website") || ""}`,
    `Service: ${data.get("service") || ""}`,
    "",
    "Message:",
    data.get("message") || ""
  ].join("\n"));
  window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
});

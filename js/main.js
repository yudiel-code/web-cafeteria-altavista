const body = document.body;
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const yearTarget = document.getElementById("currentYear");
const hoursToggle = document.getElementById("hoursToggle");
const hoursDropdown = document.getElementById("hoursDropdown");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (hoursToggle && hoursDropdown) {
  const closeHours = () => {
    hoursDropdown.classList.remove("is-open");
    hoursToggle.setAttribute("aria-expanded", "false");
  };

  const openHours = () => {
    hoursDropdown.classList.add("is-open");
    hoursToggle.setAttribute("aria-expanded", "true");
  };

  hoursToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = hoursDropdown.classList.contains("is-open");

    if (isOpen) {
      closeHours();
    } else {
      openHours();
    }
  });

  hoursDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    closeHours();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHours();
    }
  });
}

function closeNav() {
  body.classList.remove("nav-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
}

function openNav() {
  body.classList.add("nav-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.contains("nav-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-10% 0px -35% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

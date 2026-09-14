const cursor = document.querySelector(".cursor");
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
}

applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (window.innerWidth > 700) {
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll("a, button, .project");

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });
}

/* ==============================
   MOBILE MENU
============================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

/* ==============================
   PORTFOLIO FILTER
============================== */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    /* Remove active state */
    filters.forEach((button) => {
      button.classList.remove("active");
    });

    /* Activate selected category */
    filter.classList.add("active");

    const category = filter.dataset.filter;

    projects.forEach((project) => {
      const projectCategory = project.dataset.category;

      if (category === "all" || projectCategory === category) {
        project.style.display = "";

        /*
          Small delay makes filtered projects
          feel less abrupt.
        */

        requestAnimationFrame(() => {
          project.classList.add("visible");
        });
      } else {
        project.style.display = "none";
      }
    });
  });
});

/* ==============================
   SCROLL REVEAL
============================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

/* ==============================
   PROJECT MODAL
============================== */

const modal = document.querySelector(".modal");

const modalClose = document.querySelector(".modal-close");

const modalTitle = document.querySelector(".modal-title");

const modalDescription = document.querySelector(".modal-description");

const modalNumber = document.querySelector(".modal-number");

projects.forEach((project, index) => {
  project.addEventListener("click", () => {
    const title = project.dataset.title;

    const description = project.dataset.description;

    modalTitle.textContent = title;

    modalDescription.textContent = description;

    modalNumber.textContent = String(index + 1).padStart(2, "0");

    modal.classList.add("open");

    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");

  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* ==============================
   SMOOTH ANCHOR SCROLL
============================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

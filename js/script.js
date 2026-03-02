// =====================
// DARK / LIGHT MODE AUTOMATIQUE
// =====================

const toggleBtn = document.getElementById("theme-toggle");

// Fonction pour appliquer le mode
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    toggleBtn.textContent = "🌙";
  }
}

// Vérifie le thème stocké dans localStorage
let savedTheme = localStorage.getItem("theme");

if (!savedTheme) {
  // Pas de thème enregistré → vérifie l'heure
  const hour = new Date().getHours();
  if (hour >= 18 || hour < 6) {
    savedTheme = "dark";
  } else {
    savedTheme = "light";
  }
}

// Applique le thème initial
applyTheme(savedTheme);

// Écoute le clic sur le bouton pour basculer
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});

// =====================
// MOBILE MENU
// =====================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// =====================
// SCROLL REVEAL ANIMATION
// =====================

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Déclenche au chargement
revealOnScroll();

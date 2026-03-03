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
// =====================
// LIGHTBOX IMAGE VIEWER
// =====================

document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".gallery-grid img, .dish img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (images && lightbox && lightboxImg) {

    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

  }

});
// =====================
// LIGHTBOX PREMIUM
// =====================

document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".gallery-grid img, .dish img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = "flex";
    lightbox.style.opacity = 1;
  }

  function closeLightbox() {
    lightbox.style.opacity = 0;
    setTimeout(() => lightbox.style.display = "none", 300);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Navigation clavier
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeLightbox();
    }
  });

  // Swipe mobile (simple)
  let startX = 0;
  lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  lightbox.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) showPrev();
    if (startX - endX > 50) showNext();
  });
});
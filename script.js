// ========== DARK/LIGHT MODE TOGGLE ==========
const html = document.documentElement;
const toggle = document.querySelector(".toggle-btn");

// Cargar tema guardado
if (localStorage.getItem("theme") === "dark") {
  html.setAttribute("data-theme", "dark");
  toggle.textContent = "☀️ Light Mode";
}

// Función para cambiar tema
function toggleTheme() {
  const current = html.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========== MODAL GALERÍA ==========
const allGalleryItem = document.querySelectorAll(".gallery-item"); // Selecciona todos los elementos con la clase "gallery-item" que son las imagenes 
const modal = document.getElementById("modalGaleria");
// Selecciona el elemento con el ID "modalGaleria" que es el contenedor del modal
const modalImage = document.getElementById("imagenModal");
// Selecciona el elemento con el ID "imagenModal" que es la imagen que se muestra en el modal dentro de el
const closeBtn = document.querySelector(".close-modal-galeria");
// Selecciona el elemento con la clase "close-modal-galeria" que es el botón que cierra el modal

function cerrarModal() {
  modal.style.display = "none";
}

allGalleryItem.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    modal.style.display = "block";
    modalImage.src = img.src;
  });
});

closeBtn.addEventListener("click", cerrarModal);

modal.addEventListener("click", (e) => {
  if (e.target !== modalImage) {
    cerrarModal();
  }
});

// ========== HAMBURGER MENU MOBILE ==========
if (window.innerWidth <= 768) {
  const hamburger = document.querySelector(".nav-hamburger");
  const nav = document.querySelector("nav");
  const button = document.querySelector(".toggle-btn");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    button.classList.toggle("active");
  });
}
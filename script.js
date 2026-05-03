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


function abrirModal(src) {
  modal.style.display = "block";
  modalImage.src = src;
  // se obtiene la src actualizada para mostrar en el modal onclick="abrirModal(this.src)" es la clave aqui ya que con esto se obtiene la src y en esta funcion la actualizamos
}

allGalleryItem.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    abrirModal(img.src);
    //obtenemos la img de cada item y le agregamos el evento que hara que le pasemos la img o mejor dicho la src de la imagen para actualizarla en el abrirModal
  });
});

closeBtn.addEventListener("click", cerrarModal);

modal.addEventListener("click", (e) => {
  if (e.target !== modalImage) {
    cerrarModal();
    // si le das click a la imagen no hace nada si no cierra el modal
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

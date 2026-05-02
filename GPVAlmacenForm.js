// Dark/Light Mode Toggle
const html = document.documentElement;
const toggle = document.querySelector(".toggle-btn");

if (localStorage.getItem("theme") === "dark") {
  html.setAttribute("data-theme", "dark");
  toggle.textContent = "☀️ Light Mode";
}

function toggleTheme() {
  const current = html.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Modal functions
function mostrarModal(tipo, titulo, mensaje) {
  const modal = document.getElementById("modal");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");

  modalIcon.textContent =
    tipo === "error"
      ? "⚠️"
      : "✓"; /* Si el tipo es error, muestra el icono de error, si no, muestra el icono de éxito */
  modalIcon.className = `modal-icon ${tipo}`;
  /* agrega la clase modal-icon segun el tipo  rojo o verde dependiendo el tipo*/
  modalTitle.textContent = titulo;
  /* asigna el titulo al modal */
  modalMessage.textContent = mensaje;
  /* asigna el mensaje al modal */
  modal.style.display = "block";
  /* muestra el modal */
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  //cierra el modal
}

// Cerrar modal al hacer click fuera
window.onclick = function (event) {
  // esto es un addeventlistener escrito de otra forma
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    cerrarModal();
    // si se hace click fuera del modal se cierra
  }
};

// Enviar por WhatsApp
function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value;
  const empresa = document.getElementById("empresa").value;
  const telefono = document.getElementById("telefono").value;
  const maquina = document.getElementById("maquina").value;
  const descripcion = document.getElementById("descripcion").value;
  const email = document.getElementById("email").value;

  const limpiarTel = telefono.replace(/\D/g, "");
  const telRegex = /^[0-9]{10}$/;
  let telFinal = telRegex.test(limpiarTel.trim());
  /* emiliano@gmail.com */
  const gmailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  let gmailLimpio = gmailRegex.test(email.trim());
  // Validar campos obligatorios
  if (!nombre || !empresa || !telefono || !maquina || !descripcion) {
    mostrarModal(
      "error",
      "Campos incompletos",
      "Por favor completa todos los campos obligatorios",
    );
    return;
  }
  console.log(gmailLimpio);
  if (!telFinal) {
    mostrarModal(
      "error",
      "Teléfono Inválido",
      "Por favor ingresa un teléfono válido, este contiene letras o no es de 10 dígitos",
    );
    return;
  }

  if (!gmailLimpio) {
    mostrarModal(
      "error",
      "Correo Invalido",
      "Porfavor ingresa un correo valido como en el ejemplo",
    );
    return;
  }

  // Armar el mensaje
  const mensaje = `
📋 *NUEVA SOLICITUD DE COTIZACIÓN*

👤 *Nombre:* ${nombre}
🏢 *Empresa:* ${empresa}
📞 *Teléfono:* ${telefono}
🔧 *Máquina preferida:* ${maquina}
📝 *Descripción del trabajo:*
${descripcion}
${email ? `\n📧 *Email:* ${email}` : ""}

---
*Generado desde: Servicios Industriales GPV*
`;

  // Codificar mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Abrir WhatsApp con los números registrados
  const numeroWhatsApp = "4499061873";
  const numeroWhatsAppKiko = "4495681101";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp || numeroWhatsAppKiko}?text=${mensajeCodificado}`;

  // Abrir en nueva pestaña
  window.open(urlWhatsApp, "_blank");

  // Mostrar modal de éxito
  mostrarModal(
    "success",
    "¡Perfecto!",
    "Tu cotización se enviará a WhatsApp. ¡Gracias por contactarnos!",
  );

  // Limpiar formulario después de 6 segundos
  setTimeout(() => {
    cerrarModal();
    document.getElementById("cotizacionForm").reset();
  }, 10000);
}

// Permitir Enter para enviar
document
  .getElementById("cotizacionForm")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      enviarWhatsApp();
    }
  });

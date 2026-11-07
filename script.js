

const productos = [
  {
    id: 1,
    nombre: "Bululu tradicional por porcion ",
    descripcion: "Preparación tradicional a base de plátano.",
    precio: 5,
    unidad: "por porción",
    imagen: "250g.png"
  },
  {
    id: 2,
    nombre: "Bululu tradicional por kilo",
    descripcion: "Harina elaborada a partir de plátano.",
    precio: 20,
    unidad: "por kilo",
    imagen: "porkilo.png"
  },
  {
    id: 3,
    nombre: "Bululu tradicional por arroba",
    descripcion: "Plátanos para preparar recetas tradicionales.",
    precio: 200,
    unidad: "por arroba",
    imagen: "arroba.png"
  }
];

const WHATSAPP = "59173908374";

let carrito = [];

const catalogo = document.getElementById("catalogo");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const contador = document.getElementById("contador");

// Mostrar los productos
function mostrarProductos() {
  catalogo.innerHTML = productos.map(producto => `
    <article class="producto">
      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        loading="lazy"
        style="width:100%; height:220px; object-fit:contain;"
        onerror="console.log('No se encontró la imagen:', this.src)"
      >
      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="precio">
          Bs ${producto.precio.toFixed(2)}
        </span>
        <p>${producto.unidad}</p>
        <button
          class="boton"
          type="button"
          onclick="agregarAlCarrito(${producto.id})"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  `).join("");
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarCarrito();
}

// Cambiar la cantidad
function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);

  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  mostrarCarrito();
}

// Quitar un producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  mostrarCarrito();
}

// Mostrar el carrito y calcular el total
function mostrarCarrito() {
  const cantidadTotal = carrito.reduce(
    (suma, p) => suma + p.cantidad, 0
  );

  const total = carrito.reduce(
    (suma, p) => suma + p.precio * p.cantidad, 0
  );

  contador.textContent = cantidadTotal;
  totalElemento.textContent = `Bs ${total.toFixed(2)}`;

  if (carrito.length === 0) {
    listaCarrito.innerHTML =
      '<p class="vacio">Todavía no agregaste productos.</p>';
    return;
  }

  listaCarrito.innerHTML = carrito.map(p => `
    <div class="item-carrito">
      <div>
        <h4>${p.nombre}</h4>
        <p>Bs ${p.precio.toFixed(2)} por unidad</p>
        <strong>
          Subtotal: Bs ${(p.precio * p.cantidad).toFixed(2)}
        </strong>
      </div>

      <div class="controles">
        <button
          type="button"
          onclick="cambiarCantidad(${p.id}, -1)"
          aria-label="Disminuir cantidad"
        >−</button>

        <span>${p.cantidad}</span>

        <button
          type="button"
          onclick="cambiarCantidad(${p.id}, 1)"
          aria-label="Aumentar cantidad"
        >+</button>

        <button
          type="button"
          class="eliminar"
          onclick="eliminarProducto(${p.id})"
        >Eliminar</button>
      </div>
    </div>
  `).join("");
}

// Vaciar el carrito
document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

// Preparar el pedido para WhatsApp
document.getElementById("formulario-pedido")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    if (carrito.length === 0) {
      alert("Agrega al menos un producto al carrito.");
      return;
    }

    if (!/^\d{10,15}$/.test(WHATSAPP)) {
      alert(
        "Primero configura el número real de WhatsApp del vendedor " +
        "en el archivo script.js."
      );
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const observaciones =
      document.getElementById("observaciones").value.trim();

    const total = carrito.reduce(
      (suma, p) => suma + p.precio * p.cantidad, 0
    );

    let mensaje = "¡Hola! Quiero realizar un pedido de Bululú Mágico.\n\n";
    mensaje += `Cliente: ${nombre}\n`;
    mensaje += `Teléfono: ${telefono}\n`;
    mensaje += `Lugar de entrega: ${direccion}\n\n`;
    mensaje += "MI PEDIDO:\n";

    carrito.forEach(p => {
      mensaje += `- ${p.nombre} x ${p.cantidad}: Bs `;
      mensaje += `${(p.precio * p.cantidad).toFixed(2)}\n`;
    });

    mensaje += `\nTOTAL: Bs ${total.toFixed(2)}\n`;

    if (observaciones) {
      mensaje += `\nObservaciones: ${observaciones}\n`;
    }

    mensaje += "\nPor favor, confirmen la disponibilidad y entrega.";

    const url = "https://wa.me/" + WHATSAPP +
      "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank", "noopener,noreferrer");
  });

// Iniciar la página
mostrarProductos();
mostrarCarrito();
// Preparar el pedido para WhatsApp
document.getElementById("formulario-pedido")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    if (carrito.length === 0) {
      alert("Primero agrega productos al carrito.");
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const observaciones = document.getElementById("observaciones").value.trim();

    const total = carrito.reduce(
      (suma, p) => suma + p.precio * p.cantidad, 0
    );

    let mensaje = "🍌 *PEDIDO - BULULÚ MÁGICO* 🍌\n\n";

    mensaje += "👤 Cliente: " + nombre + "\n";
    mensaje += "📞 Teléfono: " + telefono + "\n";
    mensaje += "📍 Dirección: " + direccion + "\n\n";

    mensaje += "🛒 *PRODUCTOS SOLICITADOS:*\n";

    carrito.forEach(p => {
      mensaje += "\n• " + p.nombre;
      mensaje += "\n  Cantidad: " + p.cantidad;
      mensaje += "\n  Subtotal: Bs " +
        (p.precio * p.cantidad).toFixed(2) + "\n";
    });

    mensaje += "\n💰 *TOTAL: Bs " + total.toFixed(2) + "*\n";

    if (observaciones) {
      mensaje += "\n📝 Observaciones: " + observaciones + "\n";
    }

    mensaje += "\n¡Gracias por elegir Bululú Mágico!";

    const url = "https://wa.me/" + WHATSAPP +
      "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank");
  });

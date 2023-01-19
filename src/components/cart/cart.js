let carrito = [];
let numeroCuota = 1;
let nombreStore = '';

const productoContenedor = document.getElementById('producto-contenedor');
const finCompra = document.getElementById('finCompra');

/* funcion click en boton para agregar producto a carrito */
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id);
        Toastify({
            text: "Producto agregado a tu carrito de compras",
            duration: 1300,
            position: "left",
            style: {
                background: "rgb(225, 76, 65)",
            }
        }).showToast();
    }
});

/* valida producto repetido de carrito */
const validarProductoRepetido = async (productoId) => {
    const productos = await indexController();
    const productoRepetido = carrito.find(producto => producto.id == productoId);

    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        guardarCarritoStorage(carrito);
        actualizarTotalesCarrito(carrito);
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito);
    }
};

/* pinta producto seleccionado en carrito */
const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p><b>Precio:</b> $${producto.precio}</p>
        <p id=cantidad${producto.id}><b>Cantidad:</b> ${producto.cantidad}</p>
        <button class="boton-eliminar" value="${producto.id}">-</button>
        <button class="boton-agregar" value="${producto.id}">+</button>
    `
    contenedor.appendChild(div);
};

/* elimina producto de carrito */
const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.find(producto => producto.id == productoId);
    if (productoIndex.cantidad > 1) {
        productoIndex.cantidad--
    } else {
        carrito.splice(productoIndex, 1);
    }
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

/* actualiza el carrito con los datos obtenidos de local storage */
const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');
    contenedor.innerHTML = '';
    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML += `
            <p>${producto.nombre}</p>
            <p><b>Precio:</b> $${producto.precio}</p>
            <p id=cantidad ${producto.id}><b>Cantidad:</b> ${producto.cantidad}</p>
            <button class="boton-eliminar" value="${producto.id}">-</button>
            <button class="boton-agregar" value="${producto.id}">+</button>
        `
        contenedor.appendChild(div);
    });
};

/* funcion que obtiene el nombre de cliente desde local storage */
const obtieneNombre = () => {
    nombreStore = localStorage.getItem('nombre');
    const nombreContenedor = document.getElementById('nombre-contenedor');
    nombreContenedor.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('nombre-cliente');
    div.innerHTML = `
        <p>Bienvenido, <b>${nombreStore.toUpperCase()}</b></p>
        `
    nombreContenedor?.appendChild(div);
}

/* funcion que calcula cuotas */
const cuotasContenedor = () => {
    const contenedorCuotas = document.getElementById('cuotas-contenedor');
    contenedorCuotas.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('precio-cuotas');
    div.innerHTML = `
        <p><b>Seleccione el número de cuotas (1 a 48)</b></p>
        <p class="cuota" id=idCuotas>${numeroCuota}</p>
        <button class="cuota-eliminar">-</button>
        <button class="cuota-agregar">+</button>
        `
    contenedorCuotas?.appendChild(div);
};

/* funcion que agrega numero de cuotas hasta cero */
const numeroCuotasEliminar = () => {
    numeroCuota--
    if (numeroCuota === 0) {
        numeroCuota = 1;
    }
    cuotasContenedor();
    calculaIntereses(numeroCuota);
};

/* funcion que elimina numero de cuotas hasta 48 */
const numeroCuotasAgregar = () => {
    numeroCuota++
    if (numeroCuota >= 48) {
        numeroCuota = 48;
    }
    cuotasContenedor();
    calculaIntereses(numeroCuota);
};

/* funcion que calcula el interes de la cuota */
const calculaIntereses = (numeroCuota) => {
    let tasa = 12.3;
    let intereses = 0;
    let tasaTotal = 0;

    if (numeroCuota === 1) {
        intereses = 0;
    } else {
        tasaTotal = tasa + numeroCuota * 0.2;
        intereses = tasaTotal * numeroCuota;
    }
    actualizarTotalesCarrito(carrito, numeroCuota, intereses);
};

/* funcion que actualiza el total de productos en el carrito */
const actualizarTotalesCarrito = (carrito, numeroCuota, intereses) => {
    if (numeroCuota === undefined) {
        numeroCuota = 1;
        intereses = 0;
    }

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompras = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const totalCompraInteres = (totalCompras + intereses);
    const totalCompra = totalCompraInteres / numeroCuota;

    pintarTotalesCarrito(totalCantidad, totalCompra, totalCompras);
    guardarCarritoStorage(carrito);
};

/* funcion que pinta cantidad de productos agregados al carrito */
const pintarTotalesCarrito = (totalCantidad, totalCompra, totalSinCuota) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');
    const precioTotalSinCuotas = document.getElementById('precioTotalSinCuotas');
    
    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra.toFixed();
    precioTotalSinCuotas.innerText = totalSinCuota.toFixed();
};

/* almacena productos en local storage */
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

/* obtiene datos de local storage */
const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};

/* funcion que finaliza la compra */
finCompra.addEventListener('click', () => {
    carrito = [];
    cerrarCarrito.click();
    localStorage.removeItem('carrito');
    Swal.fire({
        title: '¿Deseas finalizar tu compra?',
        text: "Si aceptas, la compra de tus productos se realizará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, finalizar mi compra',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: '¡Compra Realizada!',
                text: 'Muchas gracias por preferirnos, estamos preparando tus productos.',
                showConfirmButton: false,
                timer: 3300,
                timerProgressBar: true,
                willClose: () => {
                    location.reload();
                }
            })
        }
    })
});


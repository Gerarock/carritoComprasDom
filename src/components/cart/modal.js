const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');
const modalConfirm = document.querySelector('.modal-confirm');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click();
});

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoCarrito(e.target.value);
    } else if (e.target.classList.contains('boton-agregar')){
        validarProductoRepetido(e.target.value);
    } else if (e.target.classList.contains('cuota-agregar')){
        numeroCuotasAgregar();
    } else if (e.target.classList.contains('cuota-eliminar')){
        numeroCuotasEliminar();
    }
});
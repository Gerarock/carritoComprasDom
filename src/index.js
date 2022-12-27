document.addEventListener('DOMContentLoaded', () => {
    pintarProductos();
    cuotasContenedor();
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito(carrito);
    };

    if (localStorage.getItem('nombre')) {
        obtieneNombre();
    }
});
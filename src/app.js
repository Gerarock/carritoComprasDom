const pintarProductos = async () => {

    const contenedor = document.getElementById("producto-contenedor");

    const productos = await indexController();

    productos.map(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML += `<div class="card-image">
                          <img src=${producto.img}>
                          <span class="card-title">${producto.nombre}</span>
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <br>
                            <p><b>Precio:</b> $${producto.precio}</p>
                            <button id=${producto.id} class="btn-add agregar">Añadir al carrito</button>
                        </div>
                       `
        contenedor.appendChild(div);
    });
};
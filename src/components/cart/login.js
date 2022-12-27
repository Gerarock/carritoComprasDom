const nombreBoton = document.getElementById('nombre-boton');
nombreBoton.addEventListener('click', () => {
    let nombre = document.getElementById("nombre").value;
    localStorage.setItem("nombre", nombre);
});
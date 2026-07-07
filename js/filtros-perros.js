const checkboxes = document.querySelectorAll('.filtro-grupo input[type="checkbox"]');

const tarjetas = document.querySelectorAll('#lista-perros article');

function filtrar() {

    const edades = obtenerSeleccionados('edad');
    const generos = obtenerSeleccionados('genero');
    const personalidades = obtenerSeleccionados('personalidad');

    tarjetas.forEach(tarjeta => {
        const edadTarjeta = tarjeta.dataset.edad;
        const generoTarjeta = tarjeta.dataset.genero;
        const personalidadTarjeta = tarjeta.dataset.personalidad;

        const pasaEdad = edades.length === 0 || edades.includes(edadTarjeta);
        const pasaGenero = generos.length === 0 || generos.includes(generoTarjeta);
        const pasaPersonalidad = personalidades.length === 0 || personalidades.includes(personalidadTarjeta);
        
        if (pasaEdad && pasaGenero && pasaPersonalidad) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

function obtenerSeleccionados(categoria) {
    return Array.from(
        document.querySelectorAll(`.filtro-grupo input[data-categoria="${categoria}"]:checked`)
    ).map(cb => cb.value);
}

checkboxes.forEach(cb => {
    cb.addEventListener('change', filtrar);
});
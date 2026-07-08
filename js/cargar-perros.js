const contenedor = document.getElementById('lista-perros');

fetch('data/perros.json')
    .then(response => response.json())
    .then(perros => {
        perros.forEach(perro => {
            const tarjeta = document.createElement('article');
            tarjeta.dataset.edad = perro.edad;
            tarjeta.dataset.genero = perro.genero;
            tarjeta.dataset.personalidad = perro.personalidad;

            tarjeta.innerHTML = `
                <span class="etiqueta">Disponible</span>
                <img src="${perro.imagen}" alt="${perro.alt}">
                <div class="tarjeta-contenido">
                    <h3>${perro.nombre}</h3>
                    <p>${perro.descripcion}</p>
                    <a href="adopta-perros.html" class="btn">Conocer más</a>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

        inicializarFiltros();
    })
    .catch(error => {
        console.error('Error cargando los perros:', error);
        contenedor.innerHTML = '<p>Error cargando las mascotas.</p>';
    });

function inicializarFiltros() {
    const checkboxes = document.querySelectorAll('.filtro-grupo input[type="checkbox"]');
    const tarjetas = document.querySelectorAll('#lista-perros article');

    function filtrar() {
        const edades = obtenerSeleccionados('edad');
        const generos = obtenerSeleccionados('genero');
        const personalidades = obtenerSeleccionados('personalidad');

        tarjetas.forEach(tarjeta => {
            const pasaEdad = edades.length === 0 || edades.includes(tarjeta.dataset.edad);
            const pasaGenero = generos.length === 0 || generos.includes(tarjeta.dataset.genero);
            const pasaPersonalidad = personalidades.length === 0 || personalidades.includes(tarjeta.dataset.personalidad);

            tarjeta.style.display = (pasaEdad && pasaGenero && pasaPersonalidad) ? 'block' : 'none';
        });
    }

    function obtenerSeleccionados(categoria) {
        return Array.from(
            document.querySelectorAll(`.filtro-grupo input[data-categoria="${categoria}"]:checked`)
        ).map(cb => cb.value);
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filtrar));
}
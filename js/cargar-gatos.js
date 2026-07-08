const contenedor = document.getElementById('lista-gatos');

fetch('data/gatos.json')
    .then(response => response.json())
    .then(gatos => {
        gatos.forEach(gato => {
            const tarjeta = document.createElement('article');
            tarjeta.dataset.edad = gato.edad;
            tarjeta.dataset.genero = gato.genero;
            tarjeta.dataset.personalidad = gato.personalidad;

            tarjeta.innerHTML = `
                <span class="etiqueta">Disponible</span>
                <img src="${gato.imagen}" alt="${gato.alt}">
                <div class="tarjeta-contenido">
                    <h3>${gato.nombre}</h3>
                    <p>${gato.descripcion}</p>
                    <a href="adopta-gatos.html" class="btn">Conocer más</a>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

        inicializarFiltros();
    })
    .catch(error => {
        console.error('Error cargando los gatos:', error);
        contenedor.innerHTML = '<p>Error cargando las mascotas.</p>';
    });

function inicializarFiltros() {
    const checkboxes = document.querySelectorAll('.filtro-grupo input[type="checkbox"]');
    const tarjetas = document.querySelectorAll('#lista-gatos article');

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
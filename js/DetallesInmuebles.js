document.addEventListener('DOMContentLoaded', function() {
    const detallesInmueble = document.getElementById('detallesInmueble');
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    // Aquí deberías hacer una llamada a tu API o base de datos para obtener los detalles del inmueble
    const inmueble = {
        id: propertyId,
        tipo: 'Casa',
        gestion: 'Venta',
        ciudad: 'Bogotá',
        barrio: 'Chapinero',
        precio: 500000000,
        habitaciones: 3,
        banos: 2,
        parqueaderos: 1,
        area: 120,
        direccion: 'Calle 53 #25-30'
    };

    // <img src="https://via.placeholder.com/500x300.png?text=Inmueble+${inmueble.id}" alt="Inmueble ${inmueble.id}"></img>//
    detallesInmueble.innerHTML = `
        <h2>Detalles del Inmueble</h2>
        <div class="inmueble-card">
            
            <div class="inmueble-info">
                <h3>ID: ${inmueble.id}</h3>
                <p>${inmueble.tipo} en ${inmueble.gestion}</p>
                <p>Ubicación: ${inmueble.ciudad}, ${inmueble.barrio}</p>
                <p>Habitaciones: ${inmueble.habitaciones} | Baños: ${inmueble.banos} | Parqueaderos: ${inmueble.parqueaderos}</p>
                <p>Área: ${inmueble.area} m²</p>
                <p>Dirección: ${inmueble.direccion}</p>
                <p>Precio: $${inmueble.precio.toLocaleString()}</p>
            </div>
        </div>
    `;

    const rentButton = document.getElementById('rentButton');
    const buyButton = document.getElementById('buyButton');

    rentButton.addEventListener('click', () => {
        window.location.href = `portal-pagos.html?id=${propertyId}&action=rent`;
    });

    buyButton.addEventListener('click', () => {
        window.location.href = `portal-pagos.html?id=${propertyId}&action=buy`;
    });
});
function displayProperties(property) {
    const content = document.querySelector("#inmueble-data")

    if (!content) return

    content.innerHTML = `
        <h3>ID :${property.id} - ${property.title}</h3>
        <p>${property.description}</p>
        <p>${property.propertyEstate}</p>
        <p>Precio: $${property.price.toLocaleString()}</p>
        <p>Habitaciones: ${property.bedrooms} | Baños: ${property.bathrooms}</p>
        <p>Área: ${property.area} m²</p>
        <p>Tipo: ${property.propertyType}</p>
        <p>Dirección: ${property.address.street}, ${property.address.city}, ${property.address.state}, ${property.address.zipCode}, ${property.address.country}</p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const detallesInmueble = document.getElementById('detallesInmueble');
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    

    async function loadProperties() {
        try {
            const response = await fetch(`http://localhost:8081/property/${propertyId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const properties = await response.json();
            console.log(properties)
            displayProperties(properties);
        } catch (error) {
            console.error('Error:', error);
            propertyList.innerHTML = '<p>Error al cargar los inmuebles. Por favor, intente de nuevo más tarde.</p>';
        }
    }


    detallesInmueble.innerHTML = `
        <h2>Detalles del Inmueble</h2>
        <div class="inmueble-card">
            
            <div class="inmueble-info" id="inmueble-data">
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

    loadProperties();
});
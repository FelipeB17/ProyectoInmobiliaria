document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    const propertyList = document.getElementById('propertyList');

    // Ejemplo de datos de propiedades (en una aplicación real, estos vendrían de una API o base de datos)
    //lo hice asi pa tener una idea 
    const properties = [
        { id: 1, type: 'casa', management: 'venta', city: 'Bogotá', neighborhood: 'Chapinero', price: 500000000, bedrooms: 3, bathrooms: 2, parking: 1, area: 120, address: 'Calle 53 #25-30' },
        { id: 2, type: 'apartamento', management: 'arriendo', city: 'Medellín', neighborhood: 'El Poblado', price: 2000000, bedrooms: 2, bathrooms: 2, parking: 1, area: 80, address: 'Carrera 43A #1-50' },
        // Añade más propiedades aquí
    ];

    function renderProperties(props) {
        propertyList.innerHTML = '';
        props.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <img src="https://via.placeholder.com/300x200.png?text=Propiedad+${property.id}" alt="Propiedad ${property.id}">
                <div class="property-info">
                    <h3>ID: ${property.id}</h3>
                    <p>${property.type} en ${property.management}</p>
                    <p>Ubicación: ${property.city}, ${property.neighborhood}</p>
                    <p>Habitaciones: ${property.bedrooms} | Baños: ${property.bathrooms} | Parqueaderos: ${property.parking}</p>
                    <p>Área: ${property.area} m²</p>
                    <p>Dirección: ${property.address}</p>
                    <p>Precio: $${property.price.toLocaleString()}</p>
                    <button onclick="viewProperty(${property.id})">Ver Inmueble</button>
                </div>
            `;
            propertyList.appendChild(propertyCard);
        });
    }

    function filterProperties(filters) {
        return properties.filter(property => {
            return (
                (!filters.city || property.city.toLowerCase().includes(filters.city.toLowerCase())) &&
                (!filters.neighborhood || property.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) &&
                (!filters.type || property.type === filters.type) &&
                (!filters.management || property.management === filters.management) &&
                (!filters.id || property.id.toString() === filters.id) &&
                (!filters.minPrice || property.price >= filters.minPrice) &&
                (!filters.maxPrice || property.price <= filters.maxPrice)
            );
        });
    }

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const filters = {
            city: this.querySelector('input[placeholder="Ciudad"]').value,
            neighborhood: this.querySelector('input[placeholder="Barrio"]').value,
            type: this.querySelector('select[aria-label="Tipo de Inmueble"]').value,
            management: this.querySelector('select[aria-label="Tipo de Gestión"]').value,
            id: this.querySelector('input[placeholder="ID del Inmueble"]').value,
            minPrice: this.querySelector('input[placeholder="Precio Mínimo"]').value,
            maxPrice: this.querySelector('input[placeholder="Precio Máximo"]').value
        };
        const filteredProperties = filterProperties(filters);
        renderProperties(filteredProperties);
    });

    // Inicialmente, mostrar todas las propiedades
    renderProperties(properties);
});

function viewProperty(id) {
    // Aquí iría la lógica para ver los detalles de una propiedad específica
    console.log(`Ver detalles de la propiedad con ID: ${id}`);
    // En una aplicación real, esto podría abrir una nueva página o un modal con más detalles
}
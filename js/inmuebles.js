document.addEventListener('DOMContentLoaded', function () {
    const propertyList = document.querySelector('.property-list');
    const filterForm = document.getElementById('filterForm');

    // Función para cargar y mostrar los inmuebles
    async function loadProperties() {
        try {
            const response = await fetch('http://localhost:8081/property');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const properties = await response.json();
            displayProperties(properties);
        } catch (error) {
            console.error('Error:', error);
            propertyList.innerHTML = '<p>Error al cargar los inmuebles. Por favor, intente de nuevo más tarde.</p>';
        }
    }

    // Función para mostrar los inmuebles en la página
    function displayProperties(properties) {
        propertyList.innerHTML = '';
        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            const imageUrl = property.images && property.images.length > 0 ? property.images[0].path : 'Fotos/placeholder-property.jpg';
            propertyCard.innerHTML = `
                <img src="${imageUrl}" alt="${property.title}">
                <h3>${property.title}</h3>
                <p>${property.description}</p>
                <p>Precio: $${property.price.toLocaleString()}</p>
                <p>Habitaciones: ${property.bedrooms} | Baños: ${property.bathrooms}</p>
                <p>Área: ${property.area} m²</p>
                <p>Tipo: ${property.propertyType}</p>
                <p>Dirección: ${property.address}</p>
                <button onclick="verDetalles(${property.id})">Ver Detalles</button>
            `;
            propertyList.appendChild(propertyCard);
        });
    }

    // Función para ver detalles de un inmueble específico
    window.verDetalles = function (id) {
        console.log('Ver detalles del inmueble con ID:', id);
        // Aquí podrías implementar la lógica para mostrar detalles del inmueble
        // Por ejemplo, redirigir a una página de detalles o mostrar un modal
    }

    // Manejar el envío del formulario de filtro
    filterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Aquí implementarías la lógica de filtrado
        console.log('Filtro aplicado');
        // Por ahora, solo recargamos los inmuebles
        loadProperties();
    });

    // Cargar los inmuebles al iniciar la página
    loadProperties();
});
function displayProperties(property, actionText) {
    const content = document.querySelector("#detallesTransaccion")

    if (!content) return

    content.innerHTML = `
        <h3>Detalles de la Transacción</h3>
        <p>Inmueble ID: ${property.id}</p>
        <p>Tipo: ${property.propertyType}</p>
        <p>Acción: ${actionText}</p>
        <p>Monto a pagar: $${property.price.toLocaleString()}</p>
    `;
}

function renderInmueble(actionText) {
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
            displayProperties(properties, actionText);
        } catch (error) {
            console.error('Error:', error);
            propertyList.innerHTML = '<p>Error al cargar los inmuebles. Por favor, intente de nuevo más tarde.</p>';
        }
    }

    loadProperties()
}


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    const action = urlParams.get('action');

    const detallesTransaccion = document.getElementById('detallesTransaccion');
    const compraForm = document.getElementById('compraForm');
    const arriendoForm = document.getElementById('arriendoForm');

    // Aquí deberías obtener los detalles del inmueble basado en el ID
    const inmueble = {
        id: propertyId,
        tipo: 'Casa',
        precio: 500000000,
    };

    const actionText = action === 'rent' ? 'Arrendar' : 'Comprar';
    const precio = action === 'rent' ? inmueble.precio / 100 : inmueble.precio; // Asumimos que el arriendo es 1% del valor de venta

    detallesTransaccion.innerHTML = `
        <h3>Detalles de la Transacción</h3>
        <p>Inmueble ID: ${inmueble.id}</p>
        <p>Tipo: ${inmueble.tipo}</p>
        <p>Acción: ${actionText}</p>
        <p>Monto a pagar: $${precio.toLocaleString()}</p>
    `;

    renderInmueble(actionText)
    

    if (action === 'rent') {
        compraForm.style.display = 'none';
        arriendoForm.style.display = 'block';
    } else {
        compraForm.style.display = 'block';
        arriendoForm.style.display = 'none';
    }



    compraForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para procesar la compra
        alert('Compra procesada con éxito!');
    });

    arriendoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para procesar la solicitud de arriendo
        alert('Solicitud de arriendo enviada con éxito!');
    });
});
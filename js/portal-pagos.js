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
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    // Lógica para manejar el envío del formulario (esto toca revisarlo pa que funcione jsjsj)
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });

    // Inicializar el mapa con Leaflet
    const map = L.map('map').setView([7.898338360365316, -72.48865462470792], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar un marcador a la ubicación especificada
    L.marker([7.898338360365316, -72.48865462470792]).addTo(map)
        .bindPopup('WebInmobiliaria')
        .openPopup();
});

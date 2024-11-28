document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    // Inicializar EmailJS
    // Reemplaza 'YOUR_USER_ID' con tu User ID de EmailJS
    emailjs.init('Renta Bien');

    // Lógica para manejar el envío del formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mostrar un indicador de carga
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Preparar los parámetros para el correo electrónico
        const params = {
            from_name: this.querySelector('input[placeholder="Nombre"]').value,
            from_email: this.querySelector('input[placeholder="Correo electrónico"]').value,
            phone: this.querySelector('input[placeholder="Teléfono"]').value,
            message: this.querySelector('textarea[placeholder="Mensaje"]').value
        };

        // Enviar el correo electrónico
        // Reemplaza 'YOUR_SERVICE_ID' y 'YOUR_TEMPLATE_ID' con tus IDs de EmailJS
        emailjs.send("service_adnze6i", "template_f73s1rr", params, "n36Z97RrHwTy3LbwJ")
        
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            alert('Error al enviar el mensaje: ' + error.text);
        })
        .finally(function() {
            // Restaurar el botón a su estado original
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
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
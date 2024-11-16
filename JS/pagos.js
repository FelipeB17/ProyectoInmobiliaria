document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.querySelector('.payment-button');

    paymentButton.addEventListener('click', function(e) {
        // Aquí puedes agregar lógica adicional antes de redirigir al usuario
        console.log('Usuario redirigido a la plataforma de pagos');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('imageCarousel');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 5000); // Cambia la imagen cada 5 segundos
});
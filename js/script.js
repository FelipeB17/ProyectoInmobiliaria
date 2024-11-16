document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const loginForm = document.getElementById('loginForm');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    closeBtn.onclick = function() {
        loginModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    }

    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        // Aquí normalmente harías una llamada a tu backend para autenticar al usuario
        // Por ahora, simularemos un inicio de sesión exitoso
        simulateLogin(email);
    }

    function simulateLogin(email) {
        // Simula un inicio de sesión exitoso
        const user = email.split('@')[0]; // Usa la parte antes del @ como nombre de usuario
        userName.textContent = user;
        userInfo.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        loginModal.style.display = "none";
    }
});
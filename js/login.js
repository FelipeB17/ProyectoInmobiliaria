document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Obtenemos los valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Preparamos el objeto de login
        const loginData = {
            email: email,
            password: password
        };

        // Deshabilitar el botón mientras hacemos la solicitud
        loginButton.disabled = true;
        loginButton.innerText = 'Cargando...';

        try {
            // Hacemos el POST a la API de login
            const response = await fetch('http://localhost:8081/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            // Verificamos si la respuesta es exitosa
            if (response.ok) {
                const result = await response.json();

                // Si el login es exitoso, redirigimos o mostramos un mensaje
                if (result) {
                    // Aquí puedes redirigir a otra página, como el dashboard o la página principal
                    window.location.href = 'index.html'; // o cualquier otra URL
                } else {
                    throw new Error('Credenciales incorrectas');
                }
            } else {
                throw new Error('Error al iniciar sesión');
            }

        } catch (error) {
            // Si ocurre un error, mostramos el mensaje
            errorMessage.textContent = error.message;
        } finally {
            // Restauramos el botón de login
            loginButton.disabled = false;
            loginButton.innerText = 'Entrar';
        }
    });
});
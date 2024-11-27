document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const signupButton = document.getElementById('signupButton');
    const errorMessage = document.getElementById('errorMessage');

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Obtenemos los valores del formulario
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Preparamos el objeto de usuario
        const userData = {
            name: name,
            lastName: lastName,
            email: email,
            password: password
        };

        // Deshabilitar el botón mientras hacemos la solicitud
        signupButton.disabled = true;
        signupButton.innerText = 'Registrando...';

        try {
            // Hacemos el POST a la API de signup
            const response = await fetch('http://localhost:8081/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify(userData)
            });
            //http://localhost:8081/user/email asi obtengo el nombre del usuario 
            // Verificamos si la respuesta es exitosa
            if (response.ok) {
                const result = await response.text(); // El backend devuelve un mensaje de texto

                // Si el registro es exitoso, mostramos un mensaje de éxito
                alert(result);
                window.location.href = 'login.html';  // Redirigimos al login
            } else {
                throw new Error('No se pudo registrar el usuario');
            }

        } catch (error) {
            // Si ocurre un error, mostramos el mensaje
            errorMessage.textContent = error.message;
        } finally {
            // Restauramos el botón de registro
            signupButton.disabled = false;
            signupButton.innerText = 'Registrarse';
        }
    });
});
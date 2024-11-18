document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Cambiar entre pestañas
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.getAttribute('data-tab');
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${targetForm}Section`).classList.add('active');
        });
    });

    // Enviar formularios con animación
    function handleFormSubmit(form, endpoint) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Mostrar animación de carga
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            submitButton.disabled = true;

            try {
                const response = await fetch(`http://localhost:8082/user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // En vez de parsear como JSON, leer la respuesta como texto
                    const result = await response.text();  // Leer la respuesta como texto

                    if (endpoint === 'login') {
                        // Si es login, redirigir con algún dato adicional si es necesario
                        // En este caso no parece que recibas un objeto de usuario, así que no guardamos 'result.user'
                        localStorage.setItem('message', result);  // Guardar mensaje de éxito o error
                        window.location.href = 'index.html';  // Redirigir
                    } else {
                        alert(result);  // Mostrar el mensaje recibido (string) en la alerta
                        authTabs[0].click(); // Cambiar a pestaña de login
                    }
                } else {
                    const errorDetails = await response.text();  // Leer respuesta de error como texto
                    alert(`Error: ${errorDetails || 'Operación fallida'}`);
                    throw new Error(`HTTP ${response.status}: ${errorDetails}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error en la operación. Por favor, intenta de nuevo.');
            } finally {
                // Restaurar botón
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    handleFormSubmit(loginForm, 'login');
    handleFormSubmit(registerForm, 'signup');

    // Animación de inputs
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});

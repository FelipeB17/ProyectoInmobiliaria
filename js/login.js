document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = {
            email: email,
            password: password
        };

        loginButton.disabled = true;
        loginButton.innerText = 'Cargando...';

        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const result = await response.json();

                if (result) {
                    // Obtener el nombre del usuario
                    const userResponse = await fetch(`http://localhost:8081/user/email/${loginData.email}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${result.token}`,
                        }
                    });

                        
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        const {name,role} = userData ; 
                        console.log(`Nombre: ${name}, Rol: ${role}`);
                        localStorage.setItem("userName", name);
                        localStorage.setItem("userRole",role);
                      

                    } else {
                        throw new Error('Error al obtener información del usuario');
                    }

                    window.location.href = 'index.html';
                } else {
                    throw new Error('Credenciales incorrectas');
                }
            } else {
                throw new Error('Error al iniciar sesión');
            }

        } catch (error) {
            errorMessage.textContent = error.message;
        } finally {
            loginButton.disabled = false;
            loginButton.innerText = 'Entrar';
        }
    });
})
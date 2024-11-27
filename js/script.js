document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    function updateUIForLoggedInUser(name) {
        userInfo.classList.remove('hidden');
        userName.textContent = name;
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    }

    function updateUIForLoggedOutUser() {
        userInfo.classList.add('hidden');
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }

    // Check if there's a stored user name
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserName) {
        updateUIForLoggedInUser(storedUserName);
    } else {
        updateUIForLoggedOutUser();
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        updateUIForLoggedOutUser();
    });
});
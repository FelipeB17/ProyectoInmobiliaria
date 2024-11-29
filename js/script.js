document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminBtn = document.getElementById('adminBtn');

    // Helper functions to update UI
    function updateUIForLoggedInUser(name, role) {
        userInfo.classList.remove('hidden');
        userName.textContent = name;
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        adminBtn.classList.toggle('hidden', role == 0);  
    }

    function updateUIForLoggedOutUser() {
        userInfo.classList.add('hidden');
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        adminBtn.classList.add('hidden');
    }

    // Check if user is logged in
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserName) {
        updateUIForLoggedInUser(storedUserName, parseInt(storedUserRole));
    } else {
        updateUIForLoggedOutUser();
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        updateUIForLoggedOutUser();
    });
});


async function signInWithUsernameOrEmail(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.style.display = 'block'; // Show loading spinner
    }

    const formData = new URLSearchParams();
    formData.append('usernameOrEmail', usernameOrEmail);
    formData.append('password', password);

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (loadingElement) {
            loadingElement.style.display = 'none'; // Hide loading spinner
        }

       // Change visibility after login or logout
if (result.status === 'success') {
    alert(result.message); // Success message
    window.location.reload()
} else {
    alert(result.message); // Show error message
}

    } catch (error) {
        if (loadingElement) {
            loadingElement.style.display = 'none'; // Hide loading spinner
        }
        alert('An error occurred. Please try again later.');
    }
}

// Add event listener to handle form submission
document.getElementById('loginForm').addEventListener('submit', signInWithUsernameOrEmail);

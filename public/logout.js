 // Add an event listener to the "Logout" button
 document.getElementById('logoutButton').addEventListener('click', function() {
    // Send a POST request to the PHP logout script
    fetch('logout.php', {
        method: 'POST', // Send a POST request
        
    })
    .then(response => response.json()) // Expect JSON response from PHP
    .then(data => {
        // Check if the response status is success
        if (data.status === 'success') {
            alert(data.message); // Show success message
            window.location.reload()
        } else {
            alert(data.message); // Show error if no session is found
        }
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
});
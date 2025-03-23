<?php
session_start(); // Start the session

// Check if the user is logged in by verifying session variables
if (isset($_SESSION['user_id'])) {  // Assuming 'user_id' is set when the user logs in
    // Destroy the session and log the user out
    session_unset(); // Remove all session variables
    session_destroy(); // Destroy the session

    // Return success message as JSON
    echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
} else {
    // If no session is found, the user is not logged in
    echo json_encode(['status' => 'error', 'message' => 'No active session found.']);
}
?>

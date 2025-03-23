<?php
session_start(); // Start the session

// Check if the user is already logged in
if (isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'You are already logged in.']);
    exit;
}

// Database connection details
$servername = "localhost";
$db_username = "sportera_user_admin";
$db_password = "Messenger31299"; // Change with your password
$dbname = "sportera_user_database"; // Change with your database name

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$usernameOrEmail = trim($_POST['usernameOrEmail']);
$password = trim($_POST['password']);

// Validate if input is empty
if (empty($usernameOrEmail) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Username or email and password are required.']);
    exit;
}

// Prepare the query to check if the username or email exists
$sql = "SELECT id, email, password, username FROM users WHERE email = ? OR username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $row['password'])) {
        // Login success
        $_SESSION['user_id'] = $row['id']; // Store user ID in session
        $_SESSION['username'] = $row['username']; // Store username in session
        $_SESSION['email'] = $row['email']; // Store email in session
        echo json_encode(['status' => 'success', 'message' => 'Login successful.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password.']);
    }
} else {
    // User not found
    echo json_encode(['status' => 'error', 'message' => 'User not found. Please check your username or email and password.']);
}

$conn->close();
?>

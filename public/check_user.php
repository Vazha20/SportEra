<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];

    $servername = "localhost";
    $db_username = "sportera_user_admin";
    $db_password = "Messenger31299";
    $database = "sportera_user_database";

    $conn = new mysqli($servername, $db_username, $db_password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // მომხმარებლის სახელის შემოწმება
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo 'This username is already taken.';
        exit;
    }

    // ელ.ფოსტის შემოწმება
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo 'This email is already registered.';
        exit;
    }

    $stmt->close();
    $conn->close();
}
?>

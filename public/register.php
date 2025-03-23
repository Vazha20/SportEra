
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // ელ.ფოსტის ვალიდაცია
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email format';
        exit;
    }

    // პაროლის ვალიდაცია
    if (strlen($password) < 6 || !preg_match('/[A-Z]/', $password)) {
        echo 'Invalid password format';
        exit;
    }

    // პაროლების შეუსაბამობა
    if ($password !== $confirmPassword) {
        echo 'Passwords do not match';
        exit;
    }

    // MySQL მონაცემთა ბაზაში შეიყვანეთ მონაცემები
    $servername = "localhost";
    $db_username = "sportera_user_admin";
    $db_password = "Messenger31299";
    $database = "sportera_user_database";

    // MySQL კავშირი
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

    // პაროლის ჰეშირება და მონაცემების ჩაწერა
    $password_hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $username, $password_hashed);

    if ($stmt->execute()) {
        echo 'User created successfully';
    } else {
        echo 'Error: ' . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

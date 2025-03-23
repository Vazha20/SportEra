<?php
// MySQL პარამეტრები
$servername = "localhost";
$db_username = "sportera_articles";  // შეიყვანეთ თქვენი მონაცემები
$db_password = "Messenger31299";    // თქვენი პაროლი
$dbname = "sportera_articles";      // მონაცემთა ბაზის სახელი

// კავშირი MySQL-სთან
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// თუ კავშირი ვერ შედგა
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// თუ ფორმა გამოიგზავნა
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];  // სათაური
    $content = $_POST['content'];  // შინაარსი

    // სურათის ატვირთვა
    $image = $_FILES['image'];
    $imageName = $image['name'];  // სურათის სახელი
    $imageTmpName = $image['tmp_name'];  // დროებითი ფაილი
    $imageError = $image['error'];  // შეცდომა
    $imageSize = $image['size'];  // სურათის ზომა

    if ($imageError === 0) {
        // ფაილის გაფართოება
        $imageExt = pathinfo($imageName, PATHINFO_EXTENSION);
        $imageExt = strtolower($imageExt);

        // დასაშვები გაფართოებები
        $allowedExt = array('jpg', 'jpeg', 'png', 'gif');

        if (in_array($imageExt, $allowedExt)) {
            if ($imageSize < 5000000) { // მაქსიმალური ზომა 5MB
                // უნიკალური სახელი სურათისთვის
                $newImageName = uniqid('', true) . '.' . $imageExt;
                $imageUploadPath = 'uploads/' . $newImageName;

                // სურათის ატვირთვა
                if (move_uploaded_file($imageTmpName, $imageUploadPath)) {
                    // Prepared statement
                    $stmt = $conn->prepare("INSERT INTO articles (title, content, image) VALUES (?, ?, ?)");
                    $stmt->bind_param("sss", $title, $content, $newImageName);
                    
                    if ($stmt->execute()) {
                        echo "<p>სტატია წარმატებით დაემატა!</p>";
                    } else {
                        echo "Ошибка: " . $stmt->error;
                    }

                    $stmt->close();
                } else {
                    echo "შეცდომა სურათის ატვირთვისას!";
                }
            } else {
                echo "სურათი ძალიან დიდი ზომისაა!";
            }
        } else {
            echo "არასწორი სურათის ფორმატი!";
        }
    } else {
        echo "შეცდომა სურათის ატვირთვისას!";
    }
}

$conn->close();
?>

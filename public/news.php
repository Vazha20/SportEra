<?php
// MySQL პარამეტრები
$servername = "localhost";
$db_username = "sportera_articles";
$db_password = "Messenger31299";
$dbname = "sportera_articles";

// კავშირი MySQL-სთან
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// თუ კავშირი ვერ შედგა
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// სტატიების ამოღება ბაზიდან
$sql = "SELECT * FROM articles ORDER BY id DESC"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Loop through each article
    while ($row = $result->fetch_assoc()) {
        echo "<div class='article'>";
        
        // Article Content and Image Container
        echo "<div class='article-content-container'>";
        
        // If there is an image, display it
        if (!empty($row['image'])) {
            echo "<div class='article-image'>";
            echo "<img src='uploads/" . htmlspecialchars($row['image']) . "' alt='Image' class='image'>";
            echo "</div>";
        }

        // Article Title
        echo "<div class='article-text'>";
        echo "<h2 class='article-title'>" . htmlspecialchars($row['title']) . "</h2>"; 
        
        // Article Content
        echo "<p class='article-content'>" . nl2br(htmlspecialchars($row['content'])) . "</p>"; 
        echo "</div>";
        
        echo "</div>"; // Close article-content-container
        
        // Separator between articles
       
        echo "</div>";
    }
}
$conn->close();
?>


<?php
session_start();

$databaseFile = "database.db";

try {
    $pdo = new PDO("sqlite:" . $databaseFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error connecting to database: " . $e->getMessage();
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION['user_id'])) {
        echo "User not logged in";
        exit();
    }
    $user_id = $_SESSION['user_id'];
    
    try {
        $sql = "DELETE FROM users WHERE user_id = ?";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$user_id])) {
            session_destroy();
            echo "Success";
        } else {
            echo "Error deleting user";
        }
    } catch (PDOException $e) {
        echo "Error executing query: " . $e->getMessage();
    }
}
?>
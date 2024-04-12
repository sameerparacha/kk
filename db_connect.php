<?php
$host = 'localhost'; 
$dbname = 'kknewdb';
$username = 'kknew';
$password = '123456789';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Set error mode to throw exceptions
} catch (PDOException $e) {
    die("Error connecting to database: " . $e->getMessage());
}
?>

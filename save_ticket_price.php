<?php
header('Content-Type: application/json');
require_once('db_connect.php'); // Replace with the path to your db_connect.php file

// Get data from the request
$priceDescription = $_POST['priceDescription'] ?? '';
$price = $_POST['price'] ?? 0;
$active = isset($_POST['active']) ? 1 : 0; 
$priceId = isset($_POST['ticketPriceId']) ? $_POST['ticketPriceId'] : 0; 

// Input Validation (You should implement robust validation here)
// ... Add checks for valid price, description, etc. ...

// Determine if it's an insert or update
if ($priceId) {
    // It's an UPDATE
    $sql = "UPDATE Ticket_Prices SET price_description = :description, price = :price, active = :active WHERE ticket_price_id = :id";
    $statement = $pdo->prepare($sql);
    $result = $statement->execute([
        ':description' => $priceDescription, 
        ':price' => $price,
        ':active' => $active,
        ':id' => $priceId
    ]);

    if ($result) {
        echo json_encode([
            'success' => true, 
            'updatedPrice' => [
                'ticket_price_id' => $priceId, 
                'price_description' => $priceDescription,
                'price' => $price,
                'active' => $active
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database update failed']);
    }

} else {
    // It's an INSERT 
    $sql = "INSERT INTO Ticket_Prices (price_description, price, active) VALUES (:description, :price, :active)";
    $statement = $pdo->prepare($sql);
    $result = $statement->execute([
        ':description' => $priceDescription, 
        ':price' => $price,
        ':active' => $active
    ]);

    if ($result) {
        $newPriceId = $pdo->lastInsertId(); 
        echo json_encode([
            'success' => true, 
            'newPrice' => [
                'ticket_price_id' => $newPriceId,
                'price_description' => $priceDescription,
                'price' => $price,
                'active' => $active 
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database insert failed']);
    }
}

<?php
session_start();

include 'dbconnect.php';

if($_GET['clients'] == 'all'){
    $stmt = $objDb->prepare('SELECT * FROM clients');
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $clients = $stmt->fetchAll();

    echo json_encode(array(
        'error' => false,
        'clients' => $clients
    ), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
}
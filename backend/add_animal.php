<?php

require_once __DIR__ . "/rest/services/AnimalService.class.php";

$payload = $_REQUEST;

// TODO Implement error handling 
if($payload["name"] == NULL || $payload["name"] == ""){
    header("HTTP/1.1.500 Bad Request");
    die(json_encode(["error" => "First name field is missing"]));
}
//note to future riki: ovjde bi trebao postaviti boolean za vaccinated i chipped i tako te stcari
$payload["userId"] = (int)$payload["userId"]; //ovdje radi. tamo ne

$value = $payload["userId"];
echo "Data Type: " . gettype($value) . ", Value: " . $value;

$animal_service = new AnimalService();
$animal = $animal_service -> add_animal($payload);

echo json_encode(["message" => "You have succesfully added the patient", "data" => $animal]);
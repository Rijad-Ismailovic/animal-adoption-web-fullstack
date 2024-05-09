<?php

require_once __DIR__ . "/../services/AnimalService.class.php";

Flight::set("animal_service", new AnimalService());

Flight::group("/animals", function(){
    Flight::route("GET /paginated", function(){
        // $payload  = $_REQUEST;
        $payload = Flight::request()->query;

        // $animal_service = new AnimalService();

        $params = [
            "start" => (int)$payload["start"],
            "search" => $payload["search"]["value"],
            "draw" => $payload["draw"],
            "limit" => (int)$payload["length"],
            "order_column" => $payload["order"][0]["name"],
            "order_direction" => $payload["order"][0]["dir"] ,
        ];

        $data = Flight::get("animal_service")->get_animals_paginated($params["start"], $params["limit"], $params["search"], $params["order_column"], $params["order_direction"]);

        foreach($data["data"] as $id => $animal){
            $data["data"][$id]["action"] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                                '<button type="button" class="btn btn-warning" onClick = "AdminService.open_edit_animal_modal('. $animal["id"] .')">Edit</button>' .
                                                '<button type="button" class="btn btn-danger" onClick = "AdminService.delete_animal('. $animal["id"] .')">Delete</button>' .
                                            '</div>';
        }

        // Response
        // echo json_encode([
        //     "draw" => $params["draw"],
        //     "data" => $data["data"],
        //     "recordsFiltered" => $data["count"],
        //     "recordTotal" => $data["count"],
        //     "end" => $data["count"],
        // ]); 

        Flight::json([
            "draw" => $params["draw"],
            "data" => $data["data"],
            "recordsFiltered" => $data["count"],
            "recordTotal" => $data["count"],
            "end" => $data["count"],
        ]); 
    });

    Flight::route("POST /add", function(){
        echo("RUTA");
        // $payload = $_REQUEST;
        $payload = Flight::request()->data->getData();

        // Flight.halt() is used to say that and error has occured (code, message)

        if($payload["id"] != null && $payload["id"] != ""){
            $animal = Flight::get("animal_service")->edit_animal($payload);
        } else {
            unset($payload["id"]);
            $animal = Flight::get("animal_service")-> add_animal($payload); 
        }

        // echo json_encode(["message" => "You have succesfully added the patient", "data" => $animal]);
        Flight::json(["message" => "You have succesfully added the patient", "data" => $animal]);
    });

    Flight::route("DELETE /delete/@animal_id", function($animal_id){;
        if($animal_id == NULL || $animal_id == ""){
            Flight::halt(500, "You have to provide a valid animal id");
        }

        Flight::get("animal_service")->delete_animal_by_id($animal_id);
        Flight::json(["message" => "You have succesfully deleted the animal!"]);
    }); 

    Flight::route("GET /id/@animal_id", function($animal_id){
        $animal = Flight::get("animal_service")->get_animal_by_id($animal_id);

        Flight::json($animal);
    }); 

    Flight::route("GET /json/json", function(){
        // -- NE RADI --
        $animal_service = Flight::get("animal_service");

        $data = $animal_service->get_animals();

        Flight::json($data);
    });
});



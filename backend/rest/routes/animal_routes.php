<?php

require_once __DIR__ . "/../services/AnimalService.class.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set("animal_service", new AnimalService());

Flight::group("/animals", function(){
    /**
     * @OA\Get(
     *      path="/animals/all",
     *      tags={"animals"},
     *      summary="Get all users",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all users in the databases"
     *      )
     * )
     */
    Flight::route("GET /all", function(){
        $data = Flight::get("animal_service")->get_animals();

        Flight::json($data);
    });

    /**
     * @OA\Get(
     *      path="/animals/all/profile",
     *      tags={"animals"},
     *      summary="Get all animals corresponding to the user",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all users in the databases"
     *      )
     * )
     */
    Flight::route("GET /all_profile", function(){
        $data = Flight::get("animal_service")->get_animals();

        Flight::json($data);
    });

    /**
     * @OA\Post(
     *     path="/animals/add",
     *      tags={"animals"},
     *      summary="Add animal data to database",
     *      @OA\Response(
     *           response=200,
     *           description="Animal data or exception if animal is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="Animal data payload", 
     *          @OA\JsonContent(
     *              required={"listing_title", "name", "location", "name", "gender"},
     *              @OA\Property(property="id", type="string", example="", description="Listing ID"),
     *              @OA\Property(property="user_id", type="string", example="Some user_id", description="Listing user ID"),
     *              @OA\Property(property="listing_title", type="string", example="Some listing title", description="Animal listing title"),
     *              @OA\Property(property="name", type="string", example="Some animal name", description="Animal name"),
     *              @OA\Property(property="location", type="string", example="Some animal location", description="Animal location"),
     *              @OA\Property(property="type", type="string", example="Some animal type", description="Animal type"),
     *              @OA\Property(property="breed", breed="string", example="Some animal breed", description="Animal breed"),
     *              @OA\Property(property="age", type="int", example="99", description="Animal age"),
     *              @OA\Property(property="weight", type="int", example="99", description="Animal weight"),
     *              @OA\Property(property="gender", type="string", example="Some animal gender", description="Animal gender"),
     *              @OA\Property(property="vaccinated", type="string", example="1", description="Is animal vaccinated"),
     *              @OA\Property(property="chipped", type="string", example="0", description="Is animal chipped"),
     *              @OA\Property(property="additional_info", type="string", example="Some animal additional information", description="Animal additional information"),
     *          )
     *      )
     * )
     */ 
    Flight::route("POST /add", function(){ 
        $payload = Flight::request()->data->getData();
    
        if($payload["id"] != null && $payload["id"] != ""){
            $animal = Flight::get("animal_service")->edit_animal($payload);
        } else {
            unset($payload["id"]);
            $animal = Flight::get("animal_service")-> add_animal($payload); 
        }

        Flight::json(["message" => "You have succesfully added the patient", "data" => $animal]);
    });
    
    Flight::route("GET /paginated", function(){
        $payload = Flight::request()->query;

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

        Flight::json([
            "draw" => $params["draw"],
            "data" => $data["data"],
            "recordsFiltered" => $data["count"],
            "recordTotal" => $data["count"],
            "end" => $data["count"],
        ]); 
    });

    /**
     * @OA\Delete(
     *      path="/animals/delete/{animal_id}",
     *      tags={"animals"},
     *      summary="Delete animal by id",
     *      @OA\Response(
     *           response=200,
     *           description="Deleted animal data"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="animal_id", example="1", description="Animal ID")
     * )
     */
    Flight::route("DELETE /delete/@animal_id", function($animal_id){
        if($animal_id == NULL || $animal_id == ""){
            Flight::halt(500, "You have to provide a valid animal id");
        }

        Flight::get("animal_service")->delete_animal_by_id($animal_id);
        Flight::json(["message" => "You have succesfully deleted the animal!"]);
    }); 

    /**
     * @OA\Get(
     *      path="/animals/id/{animal_id}",
     *      tags={"animals"},
     *      summary="Get animal by id",
     *      @OA\Response(
     *           response=200,
     *           description="Animal data or false otherwise if animal does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="animal_id", example="1", description="Animal ID")
     * )
     */
    Flight::route("GET /id/@animal_id", function($animal_id){ //rijade omiatj ovaj jer ovo se moze vidjeti i kad nisi log in-an
        $animal = Flight::get("animal_service")->get_animal_by_id($animal_id);

        Flight::json($animal);
    }); 

    /**
     * @OA\Get(
     *      path="/animals/animal",
     *      tags={"animals"},
     *      summary="Get animal by id",
     *      @OA\Response(
     *           response=200,
     *           description="Animal data or false otherwise if animal does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="animal_id", example="1", description="Animal ID")
     * )
     */
    Flight::route("GET /animal", function(){
        $params = Flight::request()->query;

        $animal = Flight::get("animal_service")->get_animal_by_id($params["animal_id"]);
        Flight::json($animal);
    });

});



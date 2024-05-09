<?php

require_once __DIR__ . "/../services/UserService.class.php";

Flight::set("user_service", new UserService());

Flight::group("/users", function(){
    Flight::route("GET /paginated", function(){
        $payload  = Flight::request()->query;

        $user_service = Flight::get("user_service");

        $params = [
            "start" => (int)$payload["start"],
            "search" => $payload["search"]["value"],
            "draw" => $payload["draw"],
            "limit" => (int)$payload["length"],
            "order_column" => $payload["order"][0]["name"],
            "order_direction" => $payload["order"][0]["dir"],
        ];

        $data = $user_service->get_users_paginated($params["start"], $params["limit"], $params["search"], $params["order_column"], $params["order_direction"]);

        foreach($data["data"] as $id => $user){
            $data["data"][$id]["action"] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                                '<button type="button" class="btn btn-warning" onClick = "AdminService.open_edit_user_modal('. $user["id"] .')">Edit</button>' .
                                                '<button type="button" class="btn btn-danger" onClick = "AdminService.delete_user('. $user["id"] .')">Delete</button>' .
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

    Flight::route("POST /add", function(){
        $payload = Flight::request()->data->getData();

        $user_service = Flight::get("user_service");

        if($payload["users_pk"] != null && $payload["users_pk"] != ""){
            $user = $user_service->edit_user($payload);
        } else {
            unset($payload["users_pk"]);
            unset($payload["repeat_password"]);
            $user = $user_service -> add_user($payload); 
        }

        Flight::json(["message" => "You have succesfully added the patient", "data" => $user]);
    });

    Flight::route("DELETE /delete/@user_id", function($user_id){
        //$user_id = $user_id;
        if($user_id == NULL || $user_id == ""){
            Flight::halt(500, "You have to provide a valid user id");
        }

        Flight::get("user_service")->delete_user_by_id($user_id);
        Flight::json(["message" => "You have succesfully deleted the user!"]);
    });

    Flight::route("GET /id/@user_id", function($user_id){
        $user = Flight::get("user_service")->get_user_by_id($user_id);

        Flight::json($user);
    });

    Flight::route("POST /login", function(){
        $payload = Flight::request()->data->getData();
        print_r($payload);

        $user = Flight::get("user_service")->get_user_login($payload);

        Flight::json($user);
    });
});
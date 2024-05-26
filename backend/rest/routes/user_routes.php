<?php

require_once __DIR__ . "/../services/UserService.class.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set("user_service", new UserService());

Flight::group("/users", function(){
    /**
     * @OA\Get(
     *      path="/users/all",
     *      tags={"users"},
     *      summary="Get all users",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all users in the databases"
     *      )
     * )
     */
    Flight::route("GET /all", function(){        
        $data = Flight::get("user_service")->get_users();

        Flight::json($data);
    });

    /**
     * @OA\Post(
     *     path="/users/add",
     *      tags={"users"},
     *      summary="Add user data to database",
     *      @OA\Response(
     *           response=200,
     *           description="User data or exception if user is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="User data payload", 
     *          @OA\JsonContent(
     *              required={"username", "email", "password", "repeat_password"},
     *              @OA\Property(property="users_pk", type="string", example="", description="User ID"),
     *              @OA\Property(property="username", type="string", example="Some username", description="User username"),
     *              @OA\Property(property="email", type="string", example="Some user email", description="User email"),
     *              @OA\Property(property="name", type="string", example="Some user first name", description="User name"),
     *              @OA\Property(property="surname", type="string", example="Some animal surname", description="Animal surname"),
     *              @OA\Property(property="password", type="string", example="Some password", description="User password"),
     *              @OA\Property(property="repeat_password", type="string", example="Some password", description="User repeat password"),
     *          )
     *      )
     * )
     */ 
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

        foreach($data["data"] as $id  => $user){
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

    /**
     * @OA\Delete(
     *      path="/users/delete/{user_id}",
     *      tags={"users"},
     *      summary="Delete user by id",
     *      @OA\Response(
     *           response=200,
     *           description="Deleted user data"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="user_id", example="1", description="User ID")
     * )
     */
    Flight::route("DELETE /delete/@user_id", function($user_id){
        //$user_id = $user_id;
        if($user_id == NULL || $user_id == ""){
            Flight::halt(500, "You have to provide a valid user id");
        }

        Flight::get("user_service")->delete_user_by_id($user_id);
        Flight::json(["message" => "You have succesfully deleted the user!"]);
    });

    /**
     * @OA\Get(
     *      path="/users/id/{user_id}",
     *      tags={"users"},
     *      summary="Get user by id",
     *      @OA\Response(
     *           response=200,
     *           description="User data or false otherwise if user does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="user_id", example="1", description="User ID")
     * )
     */
    Flight::route("GET /id/@user_id", function($user_id){
        $user = Flight::get("user_service")->get_user_by_id($user_id);

        Flight::json($user);
    });

    /**
     * @OA\Get(
     *      path="/users/info",
     *      tags={"users"},
     *      summary="Get logged in user info",
     *      security={
     *          {"ApiKey": {}}   
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="User details"
     *      )
     * )
     */
    Flight::route('GET /info', function() {
        Flight::json(Flight::get('user_service')->get_user_by_id(Flight::get('user')->id));
    });

    /**
     * @OA\Post(
     *     path="/users/login",
     *      tags={"users"},
     *      summary="Login user",
     *      @OA\Response(
     *           response=200,
     *           description="User data retrieved when logging in. Otherwise return false"
     *      ),
     *      @OA\RequestBody(
     *          description="User data payload", 
     *          @OA\JsonContent(
     *              required={"usernameOrEmail", "password"},
     *              @OA\Property(property="usernameOrEmail", type="string", example="Some username", description="Username or Email"),
     *              @OA\Property(property="password", type="string", example="Some password", description="User password"),
     *          )
     *      )
     * )
     */ 
    Flight::route("POST /login", function(){
        $payload = Flight::request()->data->getData();

        $user = Flight::get("user_service")->get_user_login($payload);

        Flight::json($user);
    });
});
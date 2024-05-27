<?php

require_once __DIR__ . "/../services/AuthService.class.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set("auth_service", new AuthService());

Flight::group("/auth", function(){
    /**
     * @OA\Post(
     *     path="/auth/login",
     *      tags={"auth"},
     *      summary="Login to system using email and password",
     *      @OA\Response(
     *           response=200,
     *           description="User data and JWT"
     *      ),
     *      @OA\RequestBody(
     *          description="Credentials", 
     *          @OA\JsonContent(
     *              required={"email", "password"},
     *              @OA\Property(property="email", type="string", example="example@example.com", description="User email"),
     *              @OA\Property(property="password", type="string", example="Some password", description="User password"),
     *          )
     *      )
     * )
     */ 
    Flight::route("POST /login", function(){
        $payload = Flight::request()->data->getData();

        $user = Flight::get("auth_service")->get_user_by_email($payload["email"]);

        // Password 
        if(!$user || !password_verify($payload["password"], $user["password"])) 
            Flight::halt(500, "Invalid username or password");
        
        unset($user["password"]);
        $jwt_payload = [
            "user" => $user,
            "iat" => time(), // issued at. time at which token was created
            "exp" => time() + (60 * 30), // expiration time of token [s]
        ];

        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            "HS256"
        );

        Flight::json(
            array_merge($user, ["token" => $token])
        );
    });

    /**
     * @OA\Post(
     *     path="/auth/logout",
     *      tags={"auth"},
     *      summary="Logout form the system",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Success response or exception if unable to verify jwt token"
     *      ),
     * )
     */ 
    Flight::route("POST /logout", function(){
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(!$token)
                Flight::halt(401, "Missing authentication header");

            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

            Flight::json([
                'jwt_decoded' => $decoded_token,
                'user' => $decoded_token->user
            ]);
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    });

});
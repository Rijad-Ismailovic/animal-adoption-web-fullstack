<?php


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route("/*", function(){
    if(
        strpos(Flight::request()->url, "/auth/login") === 0 ||
        strpos(Flight::request()->url, "/users/add") === 0 ||
        strpos(Flight::request()->url, "/animals/all") === 0
    ){
        return TRUE;
    } else if(
        strpos(Flight::request()->url, "/animals/paginated") === 0 ||
        strpos(Flight::request()->url, "/users/paginated") === 0
    ){
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(!$token)
                Flight::halt(401, "Missing authentication header");

            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

            Flight::set("user", $decoded_token->user);
            Flight::set("jwt_token", $token);
            if(Flight::get("user")->admin == 1){
                return TRUE;
            }
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    } else{
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(!$token)
                Flight::halt(401, "Missing authentication header");

            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

            Flight::set("user", $decoded_token->user);
            Flight::set("jwt_token", $token);
            return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});

Flight::map("error", function($e){
    file_put_contents("logs.txt", $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);

    Flight::halt($e->getCode(), $e->getMessage());
    Flight::stop($e->getCode());
});
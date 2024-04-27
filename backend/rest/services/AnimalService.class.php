<?php

require_once __DIR__ . "/../dao/AnimalDao.class.php";

class AnimalService {
    private $animal_dao;
    public function __construct(){
        $this -> animal_dao = new AnimalDao();
    }

    public function add_animal($animal){
    // Check if user_id exists in the users table
    $userExists = $this->animal_dao->checkUserExists($animal["userId"]);
     if (!$userExists) {
         throw new Exception("User ID does not exist in the users table.");
     } else echo "User does exist, sve ok";

        return $this -> animal_dao -> add_animal($animal);
    }

    public function get_animals_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->animal_dao->count_animals_paginated($search)["count"];
        $rows = $this->animal_dao->get_animals_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            "count" => $count,
            "data" => $rows
        ];
    }
}
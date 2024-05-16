<?php

require_once __DIR__ . "/BaseDao.class.php";

class AnimalDao extends BaseDao {
    public function __construct()
    {
        parent::__construct("animals");
    }
    public function add_animal($animal){
        return $this -> insert("animals", $animal);
    }

    public function count_animals_paginated($search){
        $query = "SELECT COUNT(*) AS count
                  FROM animals
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') ";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_animals_paginated($offset, $limit, $search, $order_column, $order_direction){
        $query = "SELECT *
                  FROM animals
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit};";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_animal_by_id($id){
        $query = "DELETE FROM animals WHERE id = :id";
        $this->execute($query, [
            "id" => $id
        ]);
    }

    public function get_animal_by_id($id){
        return $this->query_unique(
            "SELECT * FROM animals WHERE id = :id", 
            [
                "id" => $id
            ]
        );
    }

    public function edit_animal($id, $animal){
        $query = "UPDATE animals SET user_id = :user_id, listing_title = :listing_title, name = :name, type = :type, location = :location, breed = :breed, age = :age, weight = :weight, gender = :gender, vaccinated = :vaccinated, chipped = :chipped, additional_info = :additional_info
                  WHERE id = :id";
        $this->execute($query, [
            "id" => $id,
            "user_id" => $animal["user_id"],
            "listing_title" => $animal["listing_title"],
            "name" => $animal["name"],
            "type" => $animal["type"],
            "location" => $animal["location"],
            "breed" => $animal["breed"],
            "age" => $animal["age"],
            "weight" => $animal["weight"],
            "gender" => $animal["gender"],
            "vaccinated" => $animal["vaccinated"],
            "chipped" => $animal["chipped"],
            "additional_info" => $animal["additional_info"],
        ]);
    }

    public function get_animals(){
        $query = "SELECT * FROM animals";
        return $this->query($query, []); 
    }
}
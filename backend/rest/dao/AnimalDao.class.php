<?php

require_once __DIR__ . "/BaseDao.class.php";

class AnimalDao extends BaseDao {
    public function __construct()
    {
        parent::__construct("animals");
    }
    public function add_animal($animal){
        /* $query = "INSERT INTO animals (userId, listingName, name, animalType, breed, location, age, weight, vaccinated, chipped, additionalDetails, gender)
                  VALUES(:userId, :listingName, :name, :animalType, :breed, :location, :age, :weight, :vaccinated, :chipped, :additionalDetails, :gender)"; 
        $statement = $this -> connection -> prepare($query);
        $statement -> execute ($animal);
        $animal["id"] = $this -> connection -> lastInsertId();
        return $animal; */

        return $this -> insert("animals", $animal);
    }

    public function checkUserExists($userId){
        $query = "SELECT COUNT(id) FROM users WHERE id = :userId";
        $stmt = $this->connection->prepare($query);
        $stmt->execute(['userId' => $userId]);
        return $stmt->fetchColumn() > 0;
    }

    public function count_animals_paginated($search){
        $query = "SELECT COUNT(*) AS count
                  FROM animals
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') OR
                        LOWER(email) LIKE CONCAT ('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_animals_paginated($offset, $limit, $search, $order_column, $order_direction){
        $query = "SELECT COUNT(*)
                  FROM animals
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') OR
                        LOWER(email) LIKE CONCAT ('%', :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit};";
    }
}
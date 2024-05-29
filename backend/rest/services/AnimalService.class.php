<?php

require_once __DIR__ . "/../dao/AnimalDao.class.php";

class AnimalService {
    private $animal_dao;
    public function __construct(){
        $this -> animal_dao = new AnimalDao();
    }

    // Animals
    public function add_animal($animal){
        $animal['user_id'] = intval($animal['user_id']);
        $animal["name"] = ($animal["name"] != "") ? $animal["name"] : null;
        $animal["breed"] = ($animal["breed"] != "") ? $animal["breed"] : null;
        $animal["age"] = ($animal["age"] != "") ? intval($animal['age']) : null;
        $animal["weight"] = ($animal["weight"] != "") ? intval($animal['weight']) : null;
        if(isset($animal["vaccinated"])){
            $animal['vaccinated'] = ($animal['vaccinated'] === 'on') ? 1 : 0;
        } else{
            $animal['vaccinated'] = 0; 
        }
        if(isset($animal["chipped"])){
            $animal['chipped'] = ($animal['chipped'] === 'on') ? 1 : 0;
        } else{
            $animal['chipped'] = 0;
        }
        $animal["image_path"] = 0;

        return $this->animal_dao->add_animal($animal); 
    }

    public function get_animals_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->animal_dao->count_animals_paginated($search)["count"];
        $rows =  $this->animal_dao->get_animals_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            "count" => $count,
            "data" => $rows
        ];
    }

    public function delete_animal_by_id($animal_id){
        $this->animal_dao->delete_animal_by_id($animal_id);
    }

    public function get_animal_by_id($animal_id){
        return $this->animal_dao->get_animal_by_id($animal_id);
    }

    public function edit_animal($animal){
        $animal['user_id'] = intval($animal['user_id']);
        $animal["name"] = ($animal["name"] != "") ? $animal["name"] : null;
        $animal["breed"] = ($animal["breed"] != "") ? $animal["breed"] : null;
        $animal["age"] = ($animal["age"] != "") ? intval($animal['age']) : null;
        $animal["weight"] = ($animal["weight"] != "") ? intval($animal['weight']) : null;
        if(isset($animal["vaccinated"])){
            $animal['vaccinated'] = ($animal['vaccinated'] === 'on') ? 1 : 0;
        } else{
            $animal['vaccinated'] = 0; 
        }
        if(isset($animal["chipped"])){
            $animal['chipped'] = ($animal['chipped'] === 'on') ? 1 : 0;
        } else{
            $animal['chipped'] = 0;
        }
        $animal["image_path"] = null;

        $id = $animal["id"];
        unset($animal["id"]);
        
        $this->animal_dao->edit_animal($id, $animal);
    }

    public function get_animals(){
        return $this->animal_dao->get_animals();
    }

  
}
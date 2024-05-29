<?php

require_once __DIR__ . "/BaseDao.class.php";

class UserDao extends BaseDao {
    public function __construct()
    {
        parent::__construct("users");
    }
    public function add_user($user){
        return $this -> insert("users", $user);
    }

    public function count_users_paginated($search){
        $query = "SELECT COUNT(*) AS count
                  FROM users
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') ";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_users_paginated($offset, $limit, $search, $order_column, $order_direction){
        $query = "SELECT *
                  FROM users
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit};";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_user_by_id($id){
        $query = "DELETE FROM animals WHERE user_id = :user_id";
        $this->execute($query, [
            ":user_id" => $id
        ]);
        
        $query = "DELETE FROM users WHERE id = :id";
        $this->execute($query, [
            ":id" => $id
        ]);
    }

    public function get_user_by_id($id){
        return $this->query_unique(
            "SELECT * FROM users WHERE id = :id", 
            [
                "id" => $id
            ]
        );
    }

    public function edit_user($id, $user){
        $query = "UPDATE users SET username = :username, email = :email, password = :password, name = :name, surname = :surname
                  WHERE id = :id";
        $this->execute($query, [
            "id" => $id,
            "username" => $user["username"],
            "email" => $user["email"],
            "password" => $user["password"],
            "name" => $user["name"],
            "surname" => $user["surname"],
        ]);
    }

    public function get_user_by_username($payload){
        return $this->query_unique(
            "SELECT * FROM users WHERE username = :username AND password = :password", 
            [
                "username" => $payload["usernameOrEmail"],
                "password" => $payload["password"],
            ]
        );
    }

    public function get_user_by_email($payload){
        return $this->query_unique(
            "SELECT * FROM users WHERE email = :email AND password = :password", 
            [
                "email" => $payload["usernameOrEmail"],
                "password" => $payload["password"],
            ]
        );
    }

    public function get_users_json(){
        $query = "SELECT * FROM users";
        return $this->query($query, []);
    }

    public function get_users(){
        $query = "SELECT * FROM users";
        return $this->query($query, []); 
    }
}
<?php

// Set the reporting
ini_set("display_error", 1); // Display all errors
ini_set("display_startup_errors", 1); // Display startup errors
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED)); // Display all errors execpt notice and depricated

class Config{
    public static function DB_NAME(){
        return Config::get_env("DB_NAME", "web");
    }

    public static function DB_PORT(){
        return Config::get_env("DB_PORT", "3306");
    }

    public static function DB_USER(){
        return Config::get_env("DB_USER", "root");
    }

    public static function DB_PASSWORD(){
        return Config::get_env("DB_PASSWORD", "");
    }

    public static function DB_HOST(){
        return Config::get_env("DB_HOST", "localhost");
    }

    public static function JWT_SECRET(){
        return Config::get_env("JWT_SECRET", "@=p:f;C6)ppx[E659H75MeFDbn]-c9");
    }

    public static function get_env($name, $default) {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}

// // Database access credentials
// define("DB_NAME", "web");
// define("DB_PORT", "3306");
// define("DB_USER", "root");
// define("DB_PASSWORD", "");
// define("DB_HOST", "localhost"); //127.0.0.1


// // JWT Secret
// define("JWT_SECRET", "@=p:f;C6)ppx[E659H75MeFDbn]-c9");
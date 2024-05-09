<?php

// Set the reporting
ini_set("display_error", 1); // Display all errors
ini_set("display_startup_errors", 1); // Display startup errors
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED)); // Display all errors execpt notice and depricated

// Database access credentials
define("DB_NAME", "web");
define("DB_PORT", "3306");
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_HOST", "localhost"); //127.0.0.1
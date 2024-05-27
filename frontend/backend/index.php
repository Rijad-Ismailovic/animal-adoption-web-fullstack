<?php

require "./vendor/autoload.php";
require __DIR__."/rest/routes/middleware_routes.php";
require __DIR__."/rest/routes/animal_routes.php";
require __DIR__."/rest/routes/user_routes.php";
require __DIR__."/rest/routes/auth_routes.php";

Flight::start();
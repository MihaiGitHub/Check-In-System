<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$user->username = $data->username;
$user->password = $data->password;

// generate json web token
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

if($user->login()){
    
    $key = "XXXX";

    $token = array(
       "data" => array(
           "id" => $user->id,
           "username" => $user->username,
           "role" => $user->role
       )
     );

     // set response code
     http_response_code(200);

     // generate jwt
     $jwt = JWT::encode($token, $key);

    echo json_encode(
         array(
             "message" => "Successfully logged in!",
             "jwt" => $jwt
         )
     );
}
else {
    echo json_encode(
         array(
             "message" => "Invalid username or password!",
             "jwt" => $jwt
         )
    );
}
?>
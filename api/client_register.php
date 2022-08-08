<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/clients.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate client object
$client = new Clients($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if($jwt){

    // if decode succeed, update client info
    try {
        $key = "XXXX";
        
        // decode jwt, if it was a fake jwt it would not be able to decode it using this key
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        
        // set client property values
        $client->fname = $data->client->fname;
        $client->lname = $data->client->lname;
        $client->address = $data->client->address;
        $client->inhouse = $data->client->inhouse;
        $client->city = $data->client->city;
        $client->state = $data->client->state;
        $client->zip = $data->client->postalCode;
        $client->phone = $data->client->phone;
        $client->email = $data->client->email;

        if($client->registerClient()){
            
            // set response code
            http_response_code(200);
            
            // response in json format
            echo json_encode(
                    array(
                        "success" => "Client registered successfully."
                    )
                );
        }
        else {
    
            // set response code
            http_response_code(200);
        
            // display message: unable to update client info
            echo json_encode(array("error" => "Unable to register client info!"));
        }
    }

    // if decode fails, it means jwt is invalid
    catch (Exception $e){
    
        // set response code
        http_response_code(401);
    
        // show error message
        echo json_encode(array(
            "error" => $e->getMessage()
        ));
    }
}
else {
            // set response code
        http_response_code(200);
    
        // show error message
        echo json_encode(array(
            "error" => "No json web token"
        ));
}
?>
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/client.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate client object
$client = new Client($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";

// if jwt and email are not empty proceed
if($jwt && $data->client->email){

    // if decode succeed, show client details
    try {
        $key = "XXXX";

        // decode jwt, if it was a fake jwt it would not be able to decode it using this key
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        
        // set client property values
        $client->fname = $data->client->fname;
        $client->lname = $data->client->lname;
        $client->address = $data->client->address;
        $client->city = $data->client->city;
        $client->state = $data->client->state;
        $client->zip = $data->client->zip;
        $client->email = $data->client->email;
        $client->familyNumber = $data->client->familyNumber;
        $client->specificRequest = $data->client->specificRequest;

        
        if($client->save()){
            // set response code
            http_response_code(200);
            
            // response in json format
            echo json_encode(
                    array(
                        "success" => "Client updated and saved successfully!"
                    )
                );
        }
        else {
    
            // set response code
            http_response_code(200);
        
            // display message: unable to create user
            echo json_encode(array("error" => "Email address not found. Please update email address at front desk."));
        }
    }
    catch (Exception $e){

        // set response code
        http_response_code(200);
    
        // show error message
        echo json_encode(array(
            "error" => $e->getMessage()
        ));
    }
}
else {
    // show error message
    echo json_encode(array(
        "error" => "Missing email or jwt token!"
    ));
}
?>
<?php
date_default_timezone_set('America/Phoenix');

// 'client' object
class Client{

	// database connection and table name
	private $conn;
	private $table_name = "clients_checkin";

	// object properties
	public $id;
	public $c_id;
	public $fname;
	public $lname;
	public $address;
	public $city;
	public $state;
	public $zip;
	public $email;
	public $status;
	public $familyNumber;
	public $placeOfService;
	public $specificRequest;
	public $error;

	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
	
	// save client checkin
    function save(){
        // select query
        $selectQuery = "SELECT * FROM clients WHERE email = :email";
        
        // prepare the query
    	$selectStmt = $this->conn->prepare($selectQuery);
        
        // sanitize
    	$this->email=htmlspecialchars(strip_tags($this->email));
    
    	// bind the value
    	$selectStmt->bindParam(':email', $this->email);
    	
    	// execute the query, also check if query was successful
    	$resultSelect = $selectStmt->execute();
    	
        $selectStmt->setFetchMode(PDO::FETCH_ASSOC);
    	$client = $selectStmt->fetch();
    	
    	if($client){
        	
    	    // check if client is not checked in already
            $selectQueryCheckin = "SELECT * FROM " . $this->table_name . " WHERE c_id = :c_id";

            // prepare the query
        	$selectStmtCheckin = $this->conn->prepare($selectQueryCheckin);
        	
        	// bind the value
        	$selectStmtCheckin->bindParam(':c_id', $client['id']);
        	
        	// execute the query, also check if query was successful
        	$resultSelectCheckin = $selectStmtCheckin->execute();
        	
            $selectStmtCheckin->setFetchMode(PDO::FETCH_ASSOC);
        	$clientCheckedIn = $selectStmtCheckin->fetch();
    	
    	if(!$clientCheckedIn){
	    
    	    // insert without the email
        	$query = "INSERT INTO " . $this->table_name . "
        	        (c_id, fname, lname, status, familyNumber, specificRequest, placeOfService)
                        VALUES 
                    (:c_id, :fname, :lname, :status, :familyNumber, :specificRequest, :placeOfService)";
        
        	// prepare the query
        	$stmt = $this->conn->prepare($query);
        
        	// sanitize
        	$this->fname=htmlspecialchars(strip_tags($this->fname));
        	$this->lname=htmlspecialchars(strip_tags($this->lname));
        	$this->familyNumber=htmlspecialchars(strip_tags($this->familyNumber));
        	$this->specificRequest=htmlspecialchars(strip_tags($this->specificRequest));
        	$this->placeOfService=htmlspecialchars(strip_tags($this->placeOfService));

        	// bind the values
        	$stmt->bindParam(':c_id', $client['id']);
        	$stmt->bindParam(':fname', $this->fname);
        	$stmt->bindParam(':lname', $this->lname);
        	$stmt->bindParam(':status', $this->status);
        	$stmt->bindParam(':familyNumber', $this->familyNumber);
        	$stmt->bindParam(':specificRequest', $this->specificRequest);
        	$stmt->bindParam(':placeOfService', $this->placeOfService);
        
        	// execute the query, also check if query was successful
        	if($stmt->execute()){
        		return true;
        	}
        	
        	return false;
    	}
    	else {
    	    // client has been checked in before
    	    // Find date range needed for sql
    	    $today = date("w", strtotime('today'));

            $days = 0;
            switch($today){
                case 1:
                    $days = 0;
                break;
                case 2:
                    $days = -1;
                break;
                case 3:
                    $days = -2;
                break;
                case 4:
                    $days = -3;
                break;
                case 5:
                    $days = -4;
                break;
                case 6:
                    $days = -5;
                break;
            }
            
            $minDate = date('Y-m-d 01:00:00', strtotime("$days days"));
            $maxDate = date("Y-m-d H:i:s");
            
    	    // check if client is in since Monday
    	    $selectQueryLast7days = "SELECT * FROM `clients_checkin` WHERE timestamp >= :minDate AND timestamp <= :maxDate AND c_id = :c_id AND placeOfService = :placeOfService";

            // prepare the query
        	$selectStmtLast7days = $this->conn->prepare($selectQueryLast7days);
        	
        	// bind the value
        	$selectStmtLast7days->bindParam(':minDate', $minDate);
        	$selectStmtLast7days->bindParam(':maxDate', $maxDate);
        	$selectStmtLast7days->bindParam(':c_id', $client['id']);
        	$selectStmtLast7days->bindParam(':placeOfService', $this->placeOfService);
        	
        	// execute the query, also check if query was successful
        	$resultSelectLast7days = $selectStmtLast7days->execute();
        	
            $selectStmtLast7days->setFetchMode(PDO::FETCH_ASSOC);
        	$clientCheckedInLast7days = $selectStmtLast7days->fetch();
    	
        	if($clientCheckedInLast7days){
        	    $this->error = "Weekly limit exceeded.";
    	        return false; 
        	}
        	else {
        	    // insert without the email
            	$query = "INSERT INTO " . $this->table_name . "
            	        (c_id, fname, lname, status, familyNumber, specificRequest, placeOfService)
                            VALUES 
                        (:c_id, :fname, :lname, :status, :familyNumber, :specificRequest, :placeOfService)";
            
            	// prepare the query
            	$stmt = $this->conn->prepare($query);
            
            	// sanitize
            	$this->fname=htmlspecialchars(strip_tags($this->fname));
            	$this->lname=htmlspecialchars(strip_tags($this->lname));
            	$this->familyNumber=htmlspecialchars(strip_tags($this->familyNumber));
            	$this->specificRequest=htmlspecialchars(strip_tags($this->specificRequest));
            	$this->placeOfService=htmlspecialchars(strip_tags($this->placeOfService));
    
            	// bind the values
            	$stmt->bindParam(':c_id', $client['id']);
            	$stmt->bindParam(':fname', $this->fname);
            	$stmt->bindParam(':lname', $this->lname);
            	$stmt->bindParam(':status', $this->status);
            	$stmt->bindParam(':familyNumber', $this->familyNumber);
            	$stmt->bindParam(':specificRequest', $this->specificRequest);
            	$stmt->bindParam(':placeOfService', $this->placeOfService);
            
            	// execute the query, also check if query was successful
            	if($stmt->execute()){
            		return true;
            	}
            	
            	return false;
        	}
    	}
    	}
    	else {
    	    $this->error = "Client not found";
    	   return false;
    	}
    }
    
    // get client
    function detail(){
    
    	// insert query
    	$query = "SELECT * FROM clients WHERE email = '" . $this->email . "' OR phone = '" . $this->email . "'";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// sanitize
        $this->fname=htmlspecialchars(strip_tags($this->email));

        // bind the values
        $stmt->bindParam(':email', $this->email);
    	
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    	    $client = $stmt->fetch();
    	    
    		return $client;
    	}
    	
    	return false;
    }
    
    // get clients
    function all(){
    	    	
     	$query = "SELECT * FROM " . $this->table_name . " WHERE placeOfService = :placeOfService";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind the values
        $stmt->bindParam(':placeOfService', $this->placeOfService);
    	 
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    	    $clients = $stmt->fetchAll();
    	    
    		return $clients;
    	}
    	
    	return false;
    }
    
    // update client status
    function updateStatus(){
    
    	// update query
    	$query = "UPDATE " . $this->table_name . "
            		SET status = :status, notes = :notes
            		WHERE id = :id";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind the value
    	$stmt->bindParam(':status', $this->status);
    	$stmt->bindParam(':notes', $this->visit->notes);
    	$stmt->bindParam(':id', $this->id);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    return true;
    	}
    	
    	return false;
    }
    
    // clear checked out clients
    function clearCheckout(){
    
    	// delete query
    	$query = "DELETE FROM " . $this->table_name . " WHERE status = 'checkout' AND placeOfService = :placeOfService";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind the value
    	$stmt->bindParam(':placeOfService', $this->placeOfService);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    // select the remaining clients
        	$query = "SELECT * FROM " . $this->table_name . " WHERE placeOfService = :placeOfService";
        
        	// prepare the query
        	$stmt = $this->conn->prepare($query);
        	
        	// bind the value
    	    $stmt->bindParam(':placeOfService', $this->placeOfService);
            
         	// execute the query, also check if query was successful
        	$result = $stmt->execute();
    	
    	    if($result){
        	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
        	    $clients = $stmt->fetchAll();
        	    
        		return $clients;
        	}
    	}
    	
    	return false;
    }
    
    // update clients
    function updateClientInfo(){
    
        	// update query
    	$query = "UPDATE clients
            		SET fname = :fname, lname = :lname, address = :address, city = :city, state = :state, postalCode = :zip, phone = :phone, email = :email
            		WHERE id = :id";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// sanitize
    	$this->fname=htmlspecialchars(strip_tags($this->fname));
    	$this->lname=htmlspecialchars(strip_tags($this->lname));
    	$this->address=htmlspecialchars(strip_tags($this->address));
    	$this->city=htmlspecialchars(strip_tags($this->city));
    	$this->state=htmlspecialchars(strip_tags($this->state));
    	$this->zip=htmlspecialchars(strip_tags($this->zip));
    	$this->phone=htmlspecialchars(strip_tags($this->phone));
    	$this->email=htmlspecialchars(strip_tags($this->email));

    	// bind the values
    	$stmt->bindParam(':fname', $this->fname);
    	$stmt->bindParam(':lname', $this->lname);
    	$stmt->bindParam(':address', $this->address);
    	$stmt->bindParam(':city', $this->city);
    	$stmt->bindParam(':state', $this->state);
    	$stmt->bindParam(':zip', $this->zip);
    	$stmt->bindParam(':phone', $this->phone);
    	$stmt->bindParam(':email', $this->email);
    	$stmt->bindParam(':id', $this->id);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    return true;
    	}
    	
    	return false;
    }
}
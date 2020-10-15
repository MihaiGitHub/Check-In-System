<?php
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
	public $specificRequest;

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
	    
    	    // insert query
        	$query = "INSERT INTO " . $this->table_name . "
        	        (c_id, fname, lname, status, familyNumber, specificRequest)
                        VALUES 
                    (:c_id, :fname, :lname, :status, :familyNumber, :specificRequest)";
        
        	// prepare the query
        	$stmt = $this->conn->prepare($query);
        
        	// sanitize
        	$this->fname=htmlspecialchars(strip_tags($this->fname));
        	$this->lname=htmlspecialchars(strip_tags($this->lname));
        	$this->familyNumber=htmlspecialchars(strip_tags($this->familyNumber));
        	$this->specificRequest=htmlspecialchars(strip_tags($this->specificRequest));

        	// bind the values
        	$stmt->bindParam(':c_id', $client['id']);
        	$stmt->bindParam(':fname', $this->fname);
        	$stmt->bindParam(':lname', $this->lname);
        	$stmt->bindParam(':status', $this->status);
        	$stmt->bindParam(':familyNumber', $this->familyNumber);
        	$stmt->bindParam(':specificRequest', $this->specificRequest);
        
        	// execute the query, also check if query was successful
        	if($stmt->execute()){
        		return true;
        	}
        	
        	return false;
    	}
    	else {
    	   return false;
    	}
    }
    
    // get client
    function detail(){
    
    	// insert query
    	$query = "SELECT * FROM clients WHERE email = '" . $this->email . "'";
    
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
    
    	// insert query
    	$query = "SELECT * FROM " . $this->table_name;
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    	    $clients = $stmt->fetchAll();
    	    
    		return $clients;
    	}
    	
    	return false;
    }
    
    // update clients
    function update(){
    
    	// update query
    	$query = "UPDATE " . $this->table_name . "
            		SET status = :status
            		WHERE id = :id";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind the value
    	$stmt->bindParam(':status', $this->status);
    	$stmt->bindParam(':id', $this->id);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    return true;
    	}
    	
    	return false;
    }
}
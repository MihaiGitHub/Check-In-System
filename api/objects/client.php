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
    	    
    	    // update query
        	$updateQuery = "UPDATE clients
                		SET address = :address, 
                		    city = :city, 
                		    state = :state,
                		    postalCode = :zip
                		WHERE id = :id";
        
        	// prepare the query
        	$updateStmt = $this->conn->prepare($updateQuery);
        	
        	// bind the value
        	$updateStmt->bindParam(':address', $this->address);
            $updateStmt->bindParam(':city', $this->city);
            $updateStmt->bindParam(':state', $this->state);
            $updateStmt->bindParam(':zip', $this->zip);
        	$updateStmt->bindParam(':id', $client['id']);
            
         	// execute the query, also check if query was successful
        	$updateResult = $updateStmt->execute();
        	
        	if($updateResult){
        	    // insert query
            	$query = "INSERT INTO " . $this->table_name . "
            	        (c_id, fname, lname, address, city, state, zip, email)
                            VALUES 
                        (:c_id, :fname, :lname, :address, :city, :state, :zip, :email)";
            
            	// prepare the query
            	$stmt = $this->conn->prepare($query);
            
            	// sanitize
            	$this->fname=htmlspecialchars(strip_tags($this->fname));
            	$this->lname=htmlspecialchars(strip_tags($this->lname));
            	$this->address=htmlspecialchars(strip_tags($this->address));
            	$this->city=htmlspecialchars(strip_tags($this->city));
            	$this->state=htmlspecialchars(strip_tags($this->state));
            	$this->zip=htmlspecialchars(strip_tags($this->zip));
            	$this->email=htmlspecialchars(strip_tags($this->email));
            
            	// bind the values
            	$stmt->bindParam(':c_id', $client['id']);
            	$stmt->bindParam(':fname', $this->fname);
            	$stmt->bindParam(':lname', $this->lname);
            	$stmt->bindParam(':address', $this->address);
            	$stmt->bindParam(':city', $this->city);
            	$stmt->bindParam(':state', $this->state);
            	$stmt->bindParam(':zip', $this->zip);
            	$stmt->bindParam(':email', $this->email);
            
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
    	else {
    	   return false;
    	}
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
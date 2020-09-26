<?php
// 'user' object
class User{

	// database connection and table name
	private $conn;
	private $table_name = "users";

	// object properties
	public $id;
	public $username;
	public $password;
	public $role;

	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
	
	function login(){
	    
	    // select query
        $query = "SELECT id, username, password, role FROM " . $this->table_name . " WHERE username = :username";

        // prepare the query
    	$stmt = $this->conn->prepare($query);

    	// sanitize
     	$this->username=htmlspecialchars(strip_tags($this->username));

    	// bind the values
     	$stmt->bindParam(':username', $this->username);
    
        // execute the query, also check if query was successful
    	$result = $stmt->execute();

    	while($users = $stmt->fetch()){
    	    if(md5(trim($this->password)) == $users['password']){
    	        $this->id = $users['id'];
    	        $this->username = $users['username'];
    	        $this->role = $users['role'];
    	        
    	        return true;
    	    }
    	};
    	
    	return false;
    }
}
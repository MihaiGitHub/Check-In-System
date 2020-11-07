<?php
// 'item' object
class Item{

	// database connection and table name
	private $conn;
	private $table_name = "items";

	// object properties
	public $id;
	public $name;
	public $sortOrder;
	public $itemType;
	public $place_of_service;
    
	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
    
    // get place of service
    function getPlaceOfService(){
    
        // select query
    	$query = "SELECT place_of_service FROM " . $this->table_name . " GROUP BY place_of_service";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    	    $item = $stmt->fetchAll();
    	    
    		return $item;
    	}
    	
    	return false;
    }
    
    // get items
    function getItems(){
    
        // select query
    	$query = "SELECT name FROM " . $this->table_name . " WHERE place_of_service = '" . $this->place_of_service . "'";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    	    $items = $stmt->fetchAll();
    	    
    		return $items;
    	}
    	
    	return false;
    }
}
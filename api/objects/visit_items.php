<?php
// 'visit' object
class VisitItems{

	// database connection and table name
	private $conn;
	private $table_name = "visit_items";

	// object properties
	public $id;
	public $c_id;
	public $item;
	public $notes;
    
	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
    
    // save visit item
    function saveVisitItem(){
    
        // insert query
    	$query = "INSERT INTO ". $this->table_name . " (c_id, item, notes) VALUES (:c_id, :item, :notes)";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// sanitize
    	$this->c_id=htmlspecialchars(strip_tags($this->c_id));
    	$this->notes=htmlspecialchars(strip_tags($this->notes));

    	// bind the values
    	$stmt->bindParam(':c_id', $this->c_id);
    	$stmt->bindParam(':item', $this->item);
    	$stmt->bindParam(':notes', $this->notes);

     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    return true;
    	}
    	
    	return false;
    }
    
    function getVisitItems(){
        // select query
    	$query = "SELECT item, notes FROM ". $this->table_name . " WHERE c_id = :c_id";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind the values
    	$stmt->bindParam(':c_id', $this->c_id);

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
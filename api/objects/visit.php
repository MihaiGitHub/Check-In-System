<?php
// 'visit' object
class Visit{

	// database connection and table name
	private $conn;
	private $table_name = "visits";

	// object properties
	public $id;
	public $c_id;
	public $place_of_service;
	public $date_of_visit;
	public $item;
	public $notes;
    public $weight;
    public $numOfItems;
    
	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
    
    // update visits
    function saveVisit(){
    
        // update query
    	$query = "INSERT INTO ". $this->table_name . " (client_id, place_of_service, date_of_visit, program, visitNotes, weight, numOfItems) VALUES (:c_id, :place_of_service, :date_of_visit, :item, :notes, :weight, :numOfItems)";
    
    	// prepare the query
    	$stmt = $this->conn->prepare($query);
    	
    	// sanitize
    	$this->c_id=htmlspecialchars(strip_tags($this->c_id));
    	$this->place_of_service=htmlspecialchars(strip_tags($this->place_of_service));
    	$this->date_of_visit=htmlspecialchars(strip_tags($this->date_of_visit));
    	$this->item=htmlspecialchars(strip_tags($this->item));
    	$this->notes=htmlspecialchars(strip_tags($this->notes));
    	$this->weight=htmlspecialchars(strip_tags($this->weight));
    	$this->numOfItems=htmlspecialchars(strip_tags($this->numOfItems));

    	// bind the values
    	$stmt->bindParam(':c_id', $this->c_id);
    	$stmt->bindParam(':place_of_service', $this->place_of_service);
    	$stmt->bindParam(':date_of_visit', $this->date_of_visit);
    	$stmt->bindParam(':item', $this->item);
    	$stmt->bindParam(':notes', $this->notes);
    	$stmt->bindParam(':weight', $this->weight);
    	$stmt->bindParam(':numOfItems', $this->numOfItems);
        
     	// execute the query, also check if query was successful
    	$result = $stmt->execute();
    	
    	if($result){
    	    return true;
    	}
    	
    	return false;
    }
}
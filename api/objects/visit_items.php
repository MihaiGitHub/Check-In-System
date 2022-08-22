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
	public $numOfItems;
	public $weight;
	public $notes;
	public $place_of_service;
	public $methodOfPickup;
	public $items;
    
	// constructor
	public function __construct($db){
		$this->conn = $db;
	}
    
    // save visit item
    function saveVisitItem(){
        $quantity = "";
        if($this->numOfItems == ""){
            $quantity = $this->weight;
        }
        else {
            $quantity = $this->numOfItems;
        }
        
         // delete query for checked in items
    	$query1 = "DELETE FROM ". $this->table_name . " WHERE c_id = :c_id AND place_of_service = :place_of_service AND quantity = ''";
    
    	// prepare the query
    	$stmt1 = $this->conn->prepare($query1);
    	
    	// sanitize
    	$this->c_id=htmlspecialchars(strip_tags($this->c_id));

    	// bind the values
    	$stmt1->bindParam(':c_id', $this->c_id);
    	$stmt1->bindParam(':place_of_service', $this->place_of_service);

     	// execute the query, also check if query was successful
    	$result1 = $stmt1->execute();
  
   	
    	// if items exists, update item, else insert
    	// select query
    	$query2 = "SELECT item FROM ". $this->table_name . " WHERE c_id = :c_id AND place_of_service = :place_of_service AND item = :item";
    
    	// prepare the query
    	$stmt2 = $this->conn->prepare($query2);
    	
    	// bind the values
    	$stmt2->bindParam(':c_id', $this->c_id);
    	$stmt2->bindParam(':place_of_service', $this->place_of_service);
    	$stmt2->bindParam(':item', $this->item);

     	// execute the query, also check if query was successful
    	$result2 = $stmt2->execute();
    	
    	if($result2){
            $stmt2->setFetchMode(PDO::FETCH_ASSOC);
    	    $itemExists = $stmt2->fetchAll();
    	    
    	    if(count($itemExists) > 0){
    	        
    	        // update
    	        // update query item
            	$query3 = "UPDATE ". $this->table_name . " SET quantity = :quantity, notes = :notes WHERE c_id = :c_id AND place_of_service = :place_of_service AND item = :item";
            
            	// prepare the query
            	$stmt3 = $this->conn->prepare($query3);
            	
            	// sanitize
            	$this->c_id=htmlspecialchars(strip_tags($this->c_id));
            	$this->notes=htmlspecialchars(strip_tags($this->notes));
        
            	// bind the values
            	$stmt3->bindParam(':c_id', $this->c_id);
            	$stmt3->bindParam(':item', $this->item);
            	$stmt3->bindParam(':quantity', $quantity);
            	$stmt3->bindParam(':notes', $this->notes);
            	$stmt3->bindParam(':place_of_service', $this->place_of_service);
        
             	// execute the query, also check if query was successful
            	$result3 = $stmt3->execute();
            	
            	if($result3){
            	    return true;
            	}  
    	    }
    	    else {
    	     // insert query item
            	$query = "INSERT INTO ". $this->table_name . " (c_id, item, quantity, notes, place_of_service) VALUES (:c_id, :item, :quantity, :notes, :place_of_service)";
            
            	// prepare the query
            	$stmt = $this->conn->prepare($query);
            	
            	// sanitize
            	$this->c_id=htmlspecialchars(strip_tags($this->c_id));
            	$this->notes=htmlspecialchars(strip_tags($this->notes));
        
            	// bind the values
            	$stmt->bindParam(':c_id', $this->c_id);
            	$stmt->bindParam(':item', $this->item);
            	$stmt->bindParam(':quantity', $quantity);
            	$stmt->bindParam(':notes', $this->notes);
            	$stmt->bindParam(':place_of_service', $this->place_of_service);
        
             	// execute the query, also check if query was successful
            	$result = $stmt->execute();
            	
            	if($result){
            	    return true;
            	}   
    	    }
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
    
    function updateVisitItems(){
        // update query item
            	$query = "DELETE FROM ".$this->table_name . " WHERE c_id = :c_id AND place_of_service = :place_of_service";
            
            	// prepare the query
            	$stmt = $this->conn->prepare($query);
            	
            	// bind the values
            	$stmt->bindParam(':c_id', $this->c_id);
            	$stmt->bindParam(':place_of_service', $this->place_of_service);
        
             	// execute the query, also check if query was successful
            	$result = $stmt->execute();
            	
            	if($result){
            	    
            	    // insert items in items table
            	    foreach ($this->items as $item) {
            	        $query = "INSERT INTO visit_items
            	        (c_id, item, place_of_service)
                            VALUES 
                        (:c_id, :item, :placeOfService)";
                        
                        // prepare the query
            	        $stmt = $this->conn->prepare($query);
            	        
            	        // bind the values
            	        $stmt->bindParam(':c_id', $this->c_id);
            	        $stmt->bindParam(':item', $item);
            	        $stmt->bindParam(':placeOfService', $this->place_of_service);
            	        
            	        // execute the query
            	        $stmt->execute();
                    }
                    
                    $query2 = "UPDATE clients_checkin SET methodOfPickup = :methodOfPickup WHERE c_id = :c_id AND placeOfService = :place_of_service";
            
                	// prepare the query
                	$stmt2 = $this->conn->prepare($query2);
                	
                	// bind the values
                	$stmt2->bindParam(':methodOfPickup', $this->methodOfPickup);
                	$stmt2->bindParam(':c_id', $this->c_id);
                	$stmt2->bindParam(':place_of_service', $this->place_of_service);
            
                 	// execute the query, also check if query was successful
                	$result2 = $stmt2->execute();
                	
                	if($result2){
                	   return true;
                	}
            	    
            	} 
        
    }
}
<?php

require 'db.php';
// Connect to MySQL database
$con = mysql_connect($host,$user,$password);
$dbs = mysql_select_db($databaseName,$con);

// Query database for data
$items = array("hrcas", "hrcen", "hrchi", "hrcol", "hrcry", "hrgol", "hrmh", "hrnbr", "hrnug", "hrste", "hrtet", "hrwil");
$index = 0;
$arraytotal = array();
class itemRecord { 
 public $item_no;  
 public $description;
 public $price;
 public $quantity_on_hand;
 public $quantity_on_order;
 public $specialorder;
}
foreach ($items as $item) {
 $result = mysql_query("SELECT item.item_no,item.description,item.price,item.quantity_on_hand,item.quantity_on_order,sum(specialorder.quantity) FROM item,specialorder WHERE item.item_no='$item' AND specialorder.item_no='$item';");
 $array = mysql_fetch_row($result);
 $myItem = new itemRecord;
 $myItem->item_no = $array[0];
 $myItem->description = $array[1];
 $myItem->price = $array[2];
 $myItem->quantity_on_hand = $array[3];
 $myItem->quantity_on_order = $array[4];
 $myItem->specialorder = $array[5];
 $arraytotal[$index] = $myItem;
 $index++;
}

echo json_encode($arraytotal);

?>

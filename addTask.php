<?php
session_start();
$databaseFile = "database.db";
try{
  $pdo = new PDO("sqlite: ".$databaseFile);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
  echo "Error: ".$e->getMessage();
}

if ($_SERVER["REQUEST_METHOD"] == "POST"){
  $task = $_POST["task"];
  $due = $_POST["due"];
  $pdo->prepare("INSERT INTO tasks(user_id,task_name,due_date) VALUES(?,?,?,?)")
}

?>

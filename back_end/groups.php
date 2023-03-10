<?php require_once("config.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");
$object = new crud;
$conn = $object->connect();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $text = $_POST["text"];
    $group_description = $_POST["group_description"];
    $user_id = $_POST['user_id'];
    $file = $_FILES["file"];

    print_r($_POST);
    print_r($text);
    print_r($user_id);
    print_r($file);
  
    $targetDir = "../src/components/image/";
    $fileName = basename($file["name"]);
    $targetPath = $targetDir . $fileName;
  
    if (move_uploaded_file($file["tmp_name"], $targetPath)) {
      echo "File uploaded successfully";
        $sql = "INSERT INTO groups (user_id , group_name , group_description ,group_image)
                VALUES ( ? , ? , ? , ?)" ;
        $query = $conn->prepare($sql);
        $query->execute([ $user_id , $text , $group_description ,$fileName]);
    } else {
      echo "Error uploading file";
    }
  
  } elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * 
            FROM groups
            INNER JOIN users WHERE groups.user_id = users.id" ;
    $query = $conn->prepare($sql);
    $query->execute();
    $users = $query->fetchAll(PDO::FETCH_ASSOC);
    // print_r($users);
        echo json_encode($users);
  } elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $sql = "DELETE FROM groups WHERE group_id = ?" ;
    $path = explode('/' , $_SERVER['REQUEST_URI']);
    if(isset($path[4]) && is_numeric($path[4])){
        $query = $conn->prepare($sql);
        $query->execute([$path[4]]);
    }
  }
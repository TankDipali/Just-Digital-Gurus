<?php

include 'db.php';

header("content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['Id'])) {
            $Id = $_GET['Id'];
            $result = $conn->query("SELECT * FROM users WHERE Id=$Id");
            $data = $result->fetch_assoc();
            echo json_decode($data);
        }else{
            $result = $conn->query("SELECT * FROM users");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
              }
            echo json_encode($users);
        }
        break;

    case "POST":
       $name = $input['name'];
       $email = $input['email'];
       $dob = $input['dob'];
       $conn->query("INSERT INTO users (name, email, age) VALUES ('$name', '$email', '$dob')");
       echo json_encode(["message" => "User Added Successfully"]);
       break;
    
    case "PUT":
        $Id = $_GET['Id'];
        $name = $input['name'];
        $email = $input['email'];
        $dob = $input['dob'];
        $conn->query("UPDATE users SET name='$name', email='$email', dob='$dob' WHERE Id=$Id");
        echo json_encode(["message"=> "User Updated Successfully"]);
        break;
    
    case "DELETE":
        $Id = $_GET["Id"];
        $conn->query("DELETE FROM users WHERE Id=$Id");
        echo json_encode(["message"=> "User Deleted Succesfully"]);
        break;

    default:
        echo json_encode(["message"=> "Invalid request"]);
        break;
}

$conn->close();
?>
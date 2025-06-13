<?php
// Récupération des données JSON
$data = json_decode(file_get_contents('php://input'), true);

$nom = $data['nom'];
$email = $data['email'];
$tel = $data['tel'];
$service = $data['service'];
$details = $data['details'];

$to = "joemariebetyna@gmail.com"; // Ton adresse email
$subject = "Nouvelle demande de devis";
$message = "Nom: $nom\nEmail: $email\nTéléphone: $tel\nService: $service\nDétails:\n$details";

$headers = "From: no-reply@votresite.com";

if (mail($to, $subject, $message, $headers)) {
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false]);
}
?>

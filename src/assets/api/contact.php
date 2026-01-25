<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$config = require 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);

$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$fullName = trim($data['fullName'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (!$email || !$fullName || !$message) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Please fill in all required fields"]);
  exit;
}

try {
  // =====================
  // Email to YOU
  // =====================
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = $config['gmail_user'];
  $mail->Password = $config['gmail_pass'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->setFrom($config['gmail_user'], $config['site_name']);
  $mail->addAddress($config['owner_email']);
  $mail->addReplyTo($email, $fullName);

  $mail->Subject = "VISTA Contact Form - $subject";
  $mail->Body = "
Name: $fullName
Email: $email
Phone: $phone
Subject: $subject

Message:
$message
";

  $mail->send();

  // =====================
  // Auto-reply to CUSTOMER
  // =====================
  $reply = new PHPMailer(true);
  $reply->isSMTP();
  $reply->Host = 'smtp.gmail.com';
  $reply->SMTPAuth = true;
  $reply->Username = $config['gmail_user'];
  $reply->Password = $config['gmail_pass'];
  $reply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $reply->Port = 587;

  $reply->setFrom($config['gmail_user'], $config['site_name']);
  $reply->addAddress($email, $fullName);

  $reply->Subject = 'We received your message';
  $reply->Body = "
Hi $fullName,

Thank you for contacting VISTA.
We have received your message and will get back to you as soon as possible.

This is an automatic reply — no need to respond.

Best regards,
{$config['site_name']}
";

  $reply->send();

  echo json_encode(["success" => true, "message" => "Message sent successfully"]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "Failed to send message. Please try again later."]);
}

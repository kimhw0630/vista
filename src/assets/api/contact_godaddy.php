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

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user
ini_set('log_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);

$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$fullName = trim($data['fullName'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

// Validate required fields (message is optional)
if (!$email || !$fullName || !$phone || !$subject) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Please fill in all required fields"]);
  exit;
}

try {
  // =====================
  // Email to YOU (using PHP mail function)
  // =====================
  $to = $config['owner_email'];
  $emailSubject = "VISTA Contact Form - $subject";
  $emailBody = "Name: $fullName\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message";
  
  // Use a noreply address from your domain
  $fromEmail = "noreply@{$config['domain']}";
  
  $headers = "From: VISTA Contact Form <$fromEmail>\r\n";
  $headers .= "Reply-To: $fullName <$email>\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  
  $mailSent = mail($to, $emailSubject, $emailBody, $headers);
  
  if (!$mailSent) {
    throw new Exception("Failed to send email");
  }

  // =====================
  // Auto-reply to CUSTOMER
  // =====================
  $customerSubject = "We received your message - {$config['site_name']}";
  $customerBody = "Hi $fullName,\n\nThank you for contacting {$config['site_name']}.\nWe have received your message and will get back to you within 24 hours.\n\nThis is an automatic reply — no need to respond.\n\nBest regards,\n{$config['site_name']}";
  
  $customerHeaders = "From: {$config['site_name']} <$fromEmail>\r\n";
  $customerHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
  $customerHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
  
  mail($email, $customerSubject, $customerBody, $customerHeaders);

  echo json_encode(["success" => true, "message" => "Message sent successfully"]);

} catch (Exception $e) {
  // Log the actual error for debugging
  error_log("Contact form error: " . $e->getMessage());
  
  http_response_code(500);
  echo json_encode([
    "success" => false, 
    "message" => "Failed to send message. Please try again later.",
    "error" => $e->getMessage() // Include error for debugging (remove in production)
  ]);
}

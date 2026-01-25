<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Load configuration
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Configuration file not found']);
    exit();
}

$config = require $configPath;
if (!$config || !is_array($config)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Invalid configuration file']);
    exit();
}

// Get and validate input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$required = ['fullName', 'email', 'phone'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        exit();
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// Sanitize inputs
$fullName = htmlspecialchars(trim($data['fullName']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8');
$subject = isset($data['subject']) ? htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8') : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8') : '';
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';

$dbSaved = false;
$emailSent = false;
$errors = [];

// Save to database if enabled
if ($config['contactForm']['saveToDatabase']) {
    try {
        $db = new mysqli(
            $config['database']['host'],
            $config['database']['username'],
            $config['database']['password'],
            $config['database']['database']
        );

        if ($db->connect_error) {
            throw new Exception('Database connection failed: ' . $db->connect_error);
        }

        $db->set_charset('utf8mb4');

        $stmt = $db->prepare(
            "INSERT INTO " . $config['database']['table'] . " 
            (full_name, email, phone, subject, message, ip_address, privacy_accepted, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, 1, NOW())"
        );

        if (!$stmt) {
            throw new Exception('Prepare failed: ' . $db->error);
        }

        $stmt->bind_param('ssssss', $fullName, $email, $phone, $subject, $message, $ipAddress);
        
        if ($stmt->execute()) {
            $dbSaved = true;
        } else {
            throw new Exception('Execute failed: ' . $stmt->error);
        }

        $stmt->close();
        $db->close();
    } catch (Exception $e) {
        $errors[] = 'Database error: ' . $e->getMessage();
        error_log('VISTA Contact Form DB Error: ' . $e->getMessage());
    }
}

// Send email if enabled
if ($config['contactForm']['sendEmail']) {
    try {
        $to = $config['contactForm']['emailRecipient'];
        $emailSubject = $config['contactForm']['emailSubjectPrefix'] . ' - ' . $subject;
        
        // Create email body
        $emailBody = "New contact form submission:\n\n";
        $emailBody .= "Name: $fullName\n";
        $emailBody .= "Email: $email\n";
        $emailBody .= "Phone: $phone\n";
        $emailBody .= "Subject: $subject\n";
        $emailBody .= "Message:\n$message\n\n";
        $emailBody .= "---\n";
        $emailBody .= "IP Address: $ipAddress\n";
        $emailBody .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

        // ============================================================
        // IMPORTANT: Email Configuration for GoDaddy/Shared Hosting
        // ============================================================
        // 1. Use "noreply@yourdomain.com" for From address
        //    - Must be an email from your domain (not Gmail/external)
        //    - "noreply@" prefix works well with shared hosting
        //
        // 2. Reply-To format: "$fullName <$email>"
        //    - Include sender's name for better compatibility
        //    - Some mail servers require RFC-compliant format
        //
        // 3. DO NOT use 5th parameter in mail() function
        //    - GoDaddy and many shared hosts block "-f" parameter
        //    - Keep mail() with only 4 parameters: (to, subject, body, headers)
        //
        // When migrating to production:
        // - Change "noreply@vistalaw.ca" to "noreply@newdomain.com"
        // - Update config.php emailRecipient to actual business email
        // - Keep this exact email header format (it's tested and working)
        // ============================================================
        
        $fromEmail = "noreply@vistalaw.ca";
        $headers = "From: VISTA Contact Form <$fromEmail>\r\n";
        $headers .= "Reply-To: $fullName <$email>\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        if (mail($to, $emailSubject, $emailBody, $headers)) {
            $emailSent = true;
            
            // Send auto-reply to customer
            $customerSubject = "We received your message - VISTA Law";
            $customerBody = "Hi $fullName,\n\n";
            $customerBody .= "Thank you for contacting VISTA Law.\n";
            $customerBody .= "We have received your message and will get back to you as soon as possible.\n\n";
            $customerBody .= "This is an automatic reply — no need to respond.\n\n";
            $customerBody .= "Best regards,\n";
            $customerBody .= "VISTA Law Team";
            
            $customerHeaders = "From: VISTA Law <$fromEmail>\r\n";
            $customerHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $customerHeaders .= "X-Mailer: PHP/" . phpversion();
            
            // Send auto-reply (don't fail if this fails)
            mail($email, $customerSubject, $customerBody, $customerHeaders);
        } else {
            throw new Exception('Failed to send email');
        }
    } catch (Exception $e) {
        $errors[] = 'Email error: ' . $e->getMessage();
        error_log('VISTA Contact Form Email Error: ' . $e->getMessage());
    }
}

// Determine response based on configuration and results
$success = false;
$responseMessage = '';

if ($config['contactForm']['saveToDatabase'] && $config['contactForm']['sendEmail']) {
    // Both enabled
    if ($dbSaved && $emailSent) {
        $success = true;
        $responseMessage = 'Thank you for contacting us. Your message has been received and we will get back to you soon!';
    } elseif ($dbSaved) {
        $success = true;
        $responseMessage = 'Your message has been saved. We will contact you soon. (Email notification failed)';
    } elseif ($emailSent) {
        $success = true;
        $responseMessage = 'Your message has been sent. We will contact you soon. (Database save failed)';
    } else {
        $success = false;
        $responseMessage = 'Failed to process your request. Please try again or call us at (905) 886-3339.';
    }
} elseif ($config['contactForm']['saveToDatabase']) {
    // Only database
    if ($dbSaved) {
        $success = true;
        $responseMessage = 'Thank you for contacting us. Your message has been saved and we will get back to you soon!';
    } else {
        $success = false;
        $responseMessage = 'Failed to save your message. Please try again.';
    }
} elseif ($config['contactForm']['sendEmail']) {
    // Only email
    if ($emailSent) {
        $success = true;
        $responseMessage = 'Thank you for contacting us. Your message has been sent and we will get back to you soon!';
    } else {
        $success = false;
        $responseMessage = 'Failed to send your message. Please try again.';
    }
} else {
    $success = false;
    $responseMessage = 'Contact form is not properly configured.';
}

// Return response
http_response_code($success ? 200 : 500);
echo json_encode([
    'success' => $success,
    'message' => $responseMessage,
    'debug' => [
        'dbSaved' => $dbSaved,
        'emailSent' => $emailSent,
        'errors' => $errors
    ]
]);

<?php
// Debug file to check PHP setup
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$debug = [
    'php_version' => phpversion(),
    'current_dir' => __DIR__,
    'file_exists' => [
        'config.php' => file_exists(__DIR__ . '/config.php'),
        'PHPMailer/src/PHPMailer.php' => file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php'),
        'PHPMailer/src/SMTP.php' => file_exists(__DIR__ . '/PHPMailer/src/SMTP.php'),
        'PHPMailer/src/Exception.php' => file_exists(__DIR__ . '/PHPMailer/src/Exception.php'),
    ],
    'permissions' => [
        'current_dir' => substr(sprintf('%o', fileperms(__DIR__)), -4),
    ]
];

// Try to load config
try {
    $config = require __DIR__ . '/config.php';
    $debug['config_loaded'] = true;
    $debug['config_keys'] = array_keys($config);
} catch (Exception $e) {
    $debug['config_loaded'] = false;
    $debug['config_error'] = $e->getMessage();
}

// Try to load PHPMailer
try {
    require __DIR__ . '/PHPMailer/src/Exception.php';
    require __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require __DIR__ . '/PHPMailer/src/SMTP.php';
    $debug['phpmailer_loaded'] = true;
} catch (Exception $e) {
    $debug['phpmailer_loaded'] = false;
    $debug['phpmailer_error'] = $e->getMessage();
}

echo json_encode($debug, JSON_PRETTY_PRINT);

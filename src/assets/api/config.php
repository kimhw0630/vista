<?php
/**
 * Server-side configuration
 * This file should NEVER be accessible from the client
 * Contains sensitive information like database credentials
 */

return [
    'contactForm' => [
        'saveToDatabase' => true,
        'sendEmail' => true,
        'emailRecipient' => 'kimhakwoo@gmail.com',
        'emailSubjectPrefix' => '[VISTA Law] New Contact Form Submission'
    ],
    
    'database' => [
        'host' => 'localhost',
        'username' => 'kimhw',
        'password' => '$Hw06300630',
        'database' => 'vista',
        'table' => 'contact_inquiries'
    ],
    
    'email' => [
        'fromEmail' => 'info@vistalaw.ca',
        'fromName' => 'VISTA Law Website'
    ],
    
    // Legacy settings (for backward compatibility if needed)
    'site_name' => 'VISTA Law',
    'domain' => 'vistalaw.ca',
    'owner_email' => 'info@vistalaw.ca'
];

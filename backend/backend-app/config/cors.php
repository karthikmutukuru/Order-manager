<?php

return [
    'supports_credentials' => true,
    'allowed_origins' => ['http://localhost:3000'],  // Your frontend URL
    'allowed_headers' => ['Content-Type', 'X-XSRF-TOKEN', 'Authorization', 'X-Requested-With'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'exposed_headers' => [],
    'max_age' => 0,
];

<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php'
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'api\controllers',
    'modules' => [],
    'components' => [
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'enableCsrfCookie' => false,
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
                $response->headers->set('Access-Control-Max-Age', '3600');
            },
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
            'enableSession' => false,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => false,
            'showScriptName' => false,
            'rules' => [
                // Handle all OPTIONS requests for CORS pre-flight
                ['pattern' => '<path:.*>', 'verb' => 'OPTIONS', 'route' => 'site/options'],

                // Auth routes
                'POST auth/login' => 'auth/login',
                'POST auth/register' => 'auth/register',
                'POST auth/logout' => 'auth/logout',
                'GET auth/me' => 'auth/me',
                'OPTIONS auth/<action>' => 'auth/options',
                
                // REST routes
                ['class' => 'yii\rest\UrlRule', 'controller' => 'vendor'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'staff'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'assignment'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'staff-application'],
                
                // Custom assignment routes
                'POST assignments/generate' => 'assignment/generate',
                'POST assignments/<id:\d+>/check-in' => 'assignment/check-in',
                'POST assignments/<id:\d+>/check-out' => 'assignment/check-out',
                
                // Staff application routes
                'POST staff-applications/<id:\d+>/approve' => 'staff-application/approve',
                'POST staff-applications/<id:\d+>/reject' => 'staff-application/reject',
                
                'OPTIONS assignments/<action>' => 'assignment/options',
                'OPTIONS staff-applications/<action>' => 'staff-application/options',
                'OPTIONS <controller>/<action>' => '<controller>/options',
            ],
        ],
    ],
    'params' => $params,
];

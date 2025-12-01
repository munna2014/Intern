<?php

namespace api\controllers;

use yii\rest\Controller;

class SiteController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        // Remove authentication for OPTIONS requests
        unset($behaviors['authenticator']);
        
        return $behaviors;
    }

    public function actionOptions()
    {
        \Yii::$app->response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        \Yii::$app->response->headers->set('Access-Control-Allow-Credentials', 'true');
        \Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        \Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        \Yii::$app->response->headers->set('Access-Control-Max-Age', '3600');
        
        return null;
    }
}


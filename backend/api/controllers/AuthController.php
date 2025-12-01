<?php

namespace api\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use common\models\User;

class AuthController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:3000'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => ['login', 'register', 'options'],
        ];

        return $behaviors;
    }

    public function actionLogin()
    {
        $username = Yii::$app->request->post('username');
        $password = Yii::$app->request->post('password');

        if (!$username || !$password) {
            Yii::$app->response->statusCode = 400;
            return [
                'success' => false,
                'error' => [
                    'code' => 400,
                    'message' => 'Username and password are required',
                ],
            ];
        }

        $user = User::findOne(['username' => $username]);
        
        if ($user && $user->validatePassword($password)) {
            $user->generateAccessToken();
            return [
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $user->access_token,
                ],
                'message' => 'Login successful',
            ];
        }

        Yii::$app->response->statusCode = 401;
        return [
            'success' => false,
            'error' => [
                'code' => 401,
                'message' => 'Invalid credentials',
            ],
        ];
    }

    public function actionRegister()
    {
        $user = new User();
        $user->username = Yii::$app->request->post('username');
        $user->email = Yii::$app->request->post('email');
        $password = Yii::$app->request->post('password');
        $role = Yii::$app->request->post('role', 'staff');
        
        if (!$password) {
            Yii::$app->response->statusCode = 400;
            return [
                'success' => false,
                'error' => [
                    'code' => 400,
                    'message' => 'Password is required',
                ],
            ];
        }
        
        $user->password_hash = Yii::$app->security->generatePasswordHash($password);
        $user->auth_key = Yii::$app->security->generateRandomString();
        // Generate access token immediately during registration
        $user->access_token = Yii::$app->security->generateRandomString() . '_' . time();
        // Only allow staff or manager roles during registration (not admin)
        $user->role = in_array($role, [User::ROLE_STAFF, User::ROLE_MANAGER]) ? $role : User::ROLE_STAFF;
        $user->status = User::STATUS_ACTIVE;

        if ($user->save()) {
            return [
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $user->access_token,
                ],
                'message' => 'Registration successful',
            ];
        }

        Yii::$app->response->statusCode = 400;
        return [
            'success' => false,
            'error' => [
                'code' => 400,
                'message' => 'Registration failed',
                'details' => $user->errors,
            ],
        ];
    }

    public function actionLogout()
    {
        $user = Yii::$app->user->identity;
        if ($user) {
            $user->removeAccessToken();
            return [
                'success' => true,
                'message' => 'Logout successful',
            ];
        }

        return [
            'success' => false,
            'error' => ['message' => 'User not authenticated'],
        ];
    }

    public function actionMe()
    {
        $user = Yii::$app->user->identity;
        
        if ($user) {
            return [
                'success' => true,
                'data' => $user,
            ];
        }

        Yii::$app->response->statusCode = 401;
        return [
            'success' => false,
            'error' => ['message' => 'User not authenticated'],
        ];
    }

    public function actionOptions()
    {
        return null;
    }
}

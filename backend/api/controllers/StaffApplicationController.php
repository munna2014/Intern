<?php

namespace api\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\data\ActiveDataProvider;
use common\models\StaffApplication;
use common\models\User;

class StaffApplicationController extends ActiveController
{
    public $modelClass = 'common\models\StaffApplication';

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
            'except' => ['options'],
        ];

        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        unset($actions['create']);
        return $actions;
    }

    public function prepareDataProvider()
    {
        $user = Yii::$app->user->identity;
        $query = StaffApplication::find()->with(['manager']);

        // Managers only see their own applications
        if ($user->role === User::ROLE_MANAGER) {
            $query->andWhere(['manager_id' => $user->id]);
        }

        // Filter by status
        if ($status = Yii::$app->request->get('status')) {
            $query->andWhere(['status' => $status]);
        }

        $query->orderBy(['created_at' => SORT_DESC]);

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => ['pageSize' => 50],
        ]);
    }

    // Manager creates application
    public function actionCreate()
    {
        $user = Yii::$app->user->identity;
        
        if ($user->role !== User::ROLE_MANAGER) {
            Yii::$app->response->statusCode = 403;
            return ['success' => false, 'message' => 'Only managers can apply for staff'];
        }

        $model = new StaffApplication();
        $model->manager_id = $user->id;
        // Auto-set vendor from manager's profile if not provided
        $model->vendor_id = Yii::$app->request->post('vendor_id', $user->vendor_id);
        $model->load(Yii::$app->request->post(), '');
        
        if ($model->save()) {
            Yii::$app->response->statusCode = 201;
            return $model;
        }
        
        Yii::$app->response->statusCode = 422;
        return ['success' => false, 'errors' => $model->errors];
    }

    // Admin approves application
    public function actionApprove($id)
    {
        $user = Yii::$app->user->identity;
        
        if ($user->role !== User::ROLE_ADMIN) {
            Yii::$app->response->statusCode = 403;
            return ['success' => false, 'message' => 'Only admins can approve applications'];
        }

        $model = StaffApplication::findOne($id);
        if (!$model) {
            Yii::$app->response->statusCode = 404;
            return ['success' => false, 'message' => 'Application not found'];
        }

        $model->status = StaffApplication::STATUS_APPROVED;
        $model->admin_notes = Yii::$app->request->post('admin_notes', '');
        
        if ($model->save()) {
            return ['success' => true, 'data' => $model, 'message' => 'Application approved'];
        }
        
        return ['success' => false, 'errors' => $model->errors];
    }

    // Admin rejects application
    public function actionReject($id)
    {
        $user = Yii::$app->user->identity;
        
        if ($user->role !== User::ROLE_ADMIN) {
            Yii::$app->response->statusCode = 403;
            return ['success' => false, 'message' => 'Only admins can reject applications'];
        }

        $model = StaffApplication::findOne($id);
        if (!$model) {
            Yii::$app->response->statusCode = 404;
            return ['success' => false, 'message' => 'Application not found'];
        }

        $model->status = StaffApplication::STATUS_REJECTED;
        $model->admin_notes = Yii::$app->request->post('admin_notes', '');
        
        if ($model->save()) {
            return ['success' => true, 'data' => $model, 'message' => 'Application rejected'];
        }
        
        return ['success' => false, 'errors' => $model->errors];
    }

    public function actionOptions()
    {
        return null;
    }
}

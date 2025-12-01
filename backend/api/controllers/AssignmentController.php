<?php

namespace api\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\data\ActiveDataProvider;
use yii\web\ServerErrorHttpException;
use common\models\Assignment;
use common\models\User;
use common\models\Vendor;

class AssignmentController extends ActiveController
{
    public $modelClass = 'common\models\Assignment';

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
        return $actions;
    }

    public function prepareDataProvider()
    {
        $query = Assignment::find()->with(['vendor', 'user']);

        // Filter by vendor
        if ($vendorId = Yii::$app->request->get('vendor_id')) {
            $query->andWhere(['vendor_id' => $vendorId]);
        }

        // Filter by staff/user
        if ($staffId = Yii::$app->request->get('staff_id')) {
            $query->andWhere(['user_id' => $staffId]);
        }
        if ($userId = Yii::$app->request->get('user_id')) {
            $query->andWhere(['user_id' => $userId]);
        }

        // Filter by status
        if ($status = Yii::$app->request->get('status')) {
            $query->andWhere(['status' => $status]);
        }

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 50,
            ],
        ]);
    }

    public function actionGenerate()
    {
        $transaction = Yii::$app->db->beginTransaction();
        
        try {
            $newAssignments = [];
            
            // Get all vendors
            $vendors = Vendor::find()->where(['status' => Vendor::STATUS_ACTIVE])->all();
            Yii::info("Found " . count($vendors) . " active vendors", __METHOD__);
            
            // Get all available staff with their skills and availability (only staff role)
            $staffMembers = User::find()
                ->with(['staffSkills', 'staffAvailability'])
                ->where([
                    'role' => User::ROLE_STAFF,
                    'staff_status' => User::STAFF_STATUS_AVAILABLE
                ])
                ->all();
            Yii::info("Found " . count($staffMembers) . " available staff", __METHOD__);

            if (empty($vendors)) {
                $transaction->rollBack();
                return [
                    'success' => false,
                    'message' => 'No active vendors found. Please add active vendors before generating schedules.',
                ];
            }

            if (empty($staffMembers)) {
                $transaction->rollBack();
                return [
                    'success' => false,
                    'message' => 'No available staff found. Please add staff with role "staff" or "manager" and status "available".',
                ];
            }

            // Simple assignment logic - assign one staff per vendor for tomorrow
            $tomorrow = date('Y-m-d', strtotime('+1 day'));
            
            foreach ($vendors as $vendor) {
                $assigned = false;
                foreach ($staffMembers as $staff) {
                    // Check if staff is available tomorrow
                    $isAvailable = false;
                    foreach ($staff->staffAvailability as $avail) {
                        if ($avail->available_date === $tomorrow) {
                            $isAvailable = true;
                            break;
                        }
                    }
                    
                    if (!$isAvailable) {
                        Yii::info("Staff {$staff->id} not available for {$tomorrow}", __METHOD__);
                        continue;
                    }
                    
                    // Check if already assigned
                    $exists = Assignment::find()
                        ->where(['user_id' => $staff->id, 'date' => $tomorrow])
                        ->exists();
                    
                    if ($exists) {
                        Yii::info("Staff {$staff->id} already assigned for {$tomorrow}", __METHOD__);
                        continue;
                    }
                    
                    // Get first skill
                    $role = 'Server';
                    if (!empty($staff->staffSkills)) {
                        $role = $staff->staffSkills[0]->skill_name ?? 'Server';
                    }
                    
                    // Create assignment
                    $assignment = new Assignment([
                        'vendor_id' => $vendor->id,
                        'user_id' => $staff->id,
                        'date' => $tomorrow,
                        'start_time' => '09:00:00',
                        'end_time' => '17:00:00',
                        'role' => $role,
                        'status' => Assignment::STATUS_SCHEDULED,
                    ]);

                    if ($assignment->save()) {
                        Yii::info("Created assignment {$assignment->id} for staff {$staff->id} at vendor {$vendor->id}", __METHOD__);
                        $newAssignments[] = $assignment;
                        $assigned = true;
                        break; // One staff per vendor
                    } else {
                        Yii::error("Failed to save assignment for staff {$staff->id}, vendor {$vendor->id}: " . print_r($assignment->errors, true), __METHOD__);
                    }
                }
                if (!$assigned) {
                    Yii::info("No available staff found for vendor {$vendor->id} on {$tomorrow}", __METHOD__);
                }
            }

            $transaction->commit();

            if (empty($newAssignments)) {
                return [
                    'success' => false,
                    'data' => [
                        'count' => 0,
                    ],
                    'message' => 'No assignments could be generated. Check staff availability for tomorrow.',
                ];
            }

            return [
                'success' => true,
                'data' => [
                    'assignments' => $newAssignments,
                    'count' => count($newAssignments),
                ],
                'message' => 'Schedule generated successfully',
            ];

        } catch (\Exception $e) {
            $transaction->rollBack();
            Yii::error("Generate schedule failed: " . $e->getMessage() . "\nTrace: " . $e->getTraceAsString(), __METHOD__);
            Yii::$app->response->statusCode = 500;
            return [
                'success' => false,
                'error' => 'Failed to generate schedule. Please check server logs for details.',
                'message' => 'Internal server error during schedule generation',
            ];
        }
    }

    public function actionCheckIn($id)
    {
        $assignment = Assignment::findOne($id);
        
        if (!$assignment) {
            Yii::$app->response->statusCode = 404;
            return [
                'success' => false,
                'error' => ['message' => 'Assignment not found'],
            ];
        }

        if ($assignment->status !== Assignment::STATUS_SCHEDULED) {
            Yii::$app->response->statusCode = 400;
            return [
                'success' => false,
                'error' => ['message' => 'Assignment cannot be checked in'],
            ];
        }

        $assignment->status = Assignment::STATUS_CHECKED_IN;
        $assignment->check_in_time = date('Y-m-d H:i:s');

        if ($assignment->save(false)) {
            return [
                'success' => true,
                'data' => $assignment,
                'message' => 'Checked in successfully',
            ];
        }

        return [
            'success' => false,
            'error' => ['message' => 'Check-in failed'],
        ];
    }

    public function actionCheckOut($id)
    {
        $assignment = Assignment::findOne($id);
        
        if (!$assignment) {
            Yii::$app->response->statusCode = 404;
            return [
                'success' => false,
                'error' => ['message' => 'Assignment not found'],
            ];
        }

        if ($assignment->status !== Assignment::STATUS_CHECKED_IN) {
            Yii::$app->response->statusCode = 400;
            return [
                'success' => false,
                'error' => ['message' => 'Assignment must be checked in first'],
            ];
        }

        $assignment->status = Assignment::STATUS_CHECKED_OUT;
        $assignment->check_out_time = date('Y-m-d H:i:s');

        // Calculate hours worked
        if ($assignment->check_in_time) {
            $checkIn = strtotime($assignment->check_in_time);
            $checkOut = strtotime($assignment->check_out_time);
            $assignment->hours_worked = round(($checkOut - $checkIn) / 3600, 2);
        }

        if ($assignment->save(false)) {
            return [
                'success' => true,
                'data' => $assignment,
                'message' => 'Checked out successfully',
            ];
        }

        return [
            'success' => false,
            'error' => ['message' => 'Check-out failed'],
        ];
    }

    public function actionCreate()
    {
        $model = new Assignment();
        $model->load(Yii::$app->request->post(), '');
        
        // Check if staff is already assigned for this date and overlapping time
        $existingAssignment = Assignment::find()
            ->where(['user_id' => $model->user_id, 'date' => $model->date])
            ->andWhere(['!=', 'status', Assignment::STATUS_CANCELLED])
            ->andWhere([
                'or',
                ['and', ['<=', 'start_time', $model->start_time], ['>', 'end_time', $model->start_time]],
                ['and', ['<', 'start_time', $model->end_time], ['>=', 'end_time', $model->end_time]],
                ['and', ['>=', 'start_time', $model->start_time], ['<=', 'end_time', $model->end_time]]
            ])
            ->one();
        
        if ($existingAssignment) {
            Yii::$app->response->statusCode = 409;
            return [
                'success' => false,
                'message' => 'Staff is already assigned for this date and time slot',
                'conflict' => [
                    'date' => $existingAssignment->date,
                    'start_time' => $existingAssignment->start_time,
                    'end_time' => $existingAssignment->end_time,
                    'vendor' => $existingAssignment->vendor ? $existingAssignment->vendor->name : null
                ]
            ];
        }
        
        if ($model->save()) {
            Yii::$app->response->statusCode = 201;
            return $model;
        }
        
        Yii::$app->response->statusCode = 422;
        return [
            'success' => false,
            'errors' => $model->errors,
            'message' => 'Validation failed'
        ];
    }

    public function actionOptions()
    {
        return null;
    }
}

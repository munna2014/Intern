<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\behaviors\TimestampBehavior;

class User extends ActiveRecord implements IdentityInterface
{
    const STATUS_ACTIVE = 10;
    const STATUS_INACTIVE = 0;
    const ROLE_ADMIN = 'admin';
    const ROLE_STAFF = 'staff';
    const ROLE_MANAGER = 'manager';
    
    const STAFF_STATUS_AVAILABLE = 'available';
    const STAFF_STATUS_UNAVAILABLE = 'unavailable';
    const STAFF_STATUS_ON_LEAVE = 'on_leave';

    public static function tableName()
    {
        return '{{%user}}';
    }

    public function behaviors()
    {
        return [TimestampBehavior::class];
    }

    public function rules()
    {
        return [
            [['username', 'email'], 'required'],
            [['username', 'email'], 'string', 'max' => 100],
            [['username', 'email'], 'unique'],
            ['email', 'email'],
            [['phone'], 'string', 'max' => 20],
            [['max_hours_per_week', 'vendor_id'], 'integer'],
            [['max_hours_per_week'], 'integer', 'min' => 1, 'max' => 168],
            [['current_hours'], 'number', 'min' => 0],
            ['role', 'in', 'range' => [self::ROLE_ADMIN, self::ROLE_STAFF, self::ROLE_MANAGER]],
            ['staff_status', 'in', 'range' => [self::STAFF_STATUS_AVAILABLE, self::STAFF_STATUS_UNAVAILABLE, self::STAFF_STATUS_ON_LEAVE]],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_INACTIVE]],
            ['max_hours_per_week', 'default', 'value' => 40],
            ['current_hours', 'default', 'value' => 0],
            ['staff_status', 'default', 'value' => self::STAFF_STATUS_AVAILABLE],
            ['role', 'default', 'value' => self::ROLE_STAFF],
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['password_hash'], $fields['auth_key'], $fields['access_token']);
        
        // Add computed fields for staff
        $fields['name'] = function($model) {
            return $model->username; // Use username as display name
        };
        $fields['vendorId'] = 'vendor_id';
        $fields['vendorName'] = function($model) {
            return $model->vendor ? $model->vendor->name : null;
        };
        $fields['skills'] = function ($model) {
            return array_map(function($skill) {
                return $skill->skill_name;
            }, $model->staffSkills);
        };
        $fields['availability'] = function ($model) {
            return array_map(function($avail) {
                return $avail->available_date;
            }, $model->staffAvailability);
        };
        
        // Add assigned dates - dates when staff is unavailable due to assignments
        $fields['assignedDates'] = function ($model) {
            $assignments = Assignment::find()
                ->where(['user_id' => $model->id])
                ->andWhere(['!=', 'status', Assignment::STATUS_CANCELLED])
                ->andWhere(['>=', 'date', date('Y-m-d')])
                ->all();
            return array_map(function($a) {
                return [
                    'date' => $a->date,
                    'startTime' => $a->start_time,
                    'endTime' => $a->end_time,
                    'vendorName' => $a->vendor ? $a->vendor->name : null,
                    'status' => $a->status
                ];
            }, $assignments);
        };
        
        // Check if staff is available today
        $fields['isAvailableToday'] = function ($model) {
            $today = date('Y-m-d');
            $hasAssignmentToday = Assignment::find()
                ->where(['user_id' => $model->id, 'date' => $today])
                ->andWhere(['!=', 'status', Assignment::STATUS_CANCELLED])
                ->exists();
            return !$hasAssignmentToday;
        };
        
        return $fields;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function generateAccessToken()
    {
        $this->access_token = Yii::$app->security->generateRandomString() . '_' . time();
        $this->save(false);
    }

    public function removeAccessToken()
    {
        $this->access_token = null;
        $this->save(false);
    }

    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    // IdentityInterface methods
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token, 'status' => self::STATUS_ACTIVE]);
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    // Staff-related relationships
    public function getStaffSkills()
    {
        return $this->hasMany(StaffSkill::class, ['user_id' => 'id']);
    }

    public function getStaffAvailability()
    {
        return $this->hasMany(StaffAvailability::class, ['user_id' => 'id']);
    }

    public function getAssignments()
    {
        return $this->hasMany(Assignment::class, ['user_id' => 'id']);
    }
    
    public function getVendor()
    {
        return $this->hasOne(Vendor::class, ['id' => 'vendor_id']);
    }
    
    public function isStaff()
    {
        return $this->role === self::ROLE_STAFF;
    }
    
    public function isManager()
    {
        return $this->role === self::ROLE_MANAGER;
    }
}

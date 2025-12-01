<?php

namespace common\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

class Assignment extends ActiveRecord
{
    const STATUS_SCHEDULED = 'scheduled';
    const STATUS_CHECKED_IN = 'checked-in';
    const STATUS_CHECKED_OUT = 'checked-out';
    const STATUS_CANCELLED = 'cancelled';

    public static function tableName()
    {
        return '{{%assignment}}';
    }

    public function behaviors()
    {
        return [TimestampBehavior::class];
    }

    public function rules()
    {
        return [
            [['vendor_id', 'user_id', 'date', 'start_time', 'end_time', 'role'], 'required'],
            [['vendor_id', 'user_id'], 'integer'],
            [['date'], 'date', 'format' => 'php:Y-m-d'],
            [['start_time', 'end_time'], 'time', 'format' => 'php:H:i:s'],
            [['role'], 'string', 'max' => 50],
            [['hours_worked'], 'number', 'min' => 0],
            ['status', 'in', 'range' => [
                self::STATUS_SCHEDULED, 
                self::STATUS_CHECKED_IN, 
                self::STATUS_CHECKED_OUT, 
                self::STATUS_CANCELLED
            ]],
            ['status', 'default', 'value' => self::STATUS_SCHEDULED],
        ];
    }

    public function fields()
    {
        return [
            'id',
            'vendorId' => 'vendor_id',
            'vendorName' => function($model) {
                return $model->getVendorName();
            },
            'staffId' => 'user_id',
            'staffName' => function($model) {
                return $model->getStaffName();
            },
            'staffPhone' => function($model) {
                return $model->getStaffPhone();
            },
            'date',
            'startTime' => 'start_time',
            'endTime' => 'end_time',
            'role',
            'status',
            'hoursWorked' => 'hours_worked',
            'checkInTime' => 'check_in_time',
            'checkOutTime' => 'check_out_time',
            'created_at',
            'updated_at',
        ];
    }

    public function getVendor()
    {
        return $this->hasOne(Vendor::class, ['id' => 'vendor_id']);
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
    
    // Backward compatibility
    public function getStaff()
    {
        return $this->getUser();
    }

    public function getVendorName()
    {
        return $this->vendor ? $this->vendor->name : null;
    }

    public function getStaffName()
    {
        return $this->user ? $this->user->username : null;
    }

    public function getStaffPhone()
    {
        return $this->user ? $this->user->phone : null;
    }
}

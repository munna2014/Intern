<?php

namespace common\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

class StaffApplication extends ActiveRecord
{
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    public static function tableName()
    {
        return '{{%staff_application}}';
    }

    public function behaviors()
    {
        return [TimestampBehavior::class];
    }

    public function rules()
    {
        return [
            [['manager_id', 'staff_count', 'description'], 'required'],
            [['manager_id', 'staff_count', 'vendor_id'], 'integer'],
            [['staff_count'], 'integer', 'min' => 1, 'max' => 50],
            [['description', 'admin_notes'], 'string'],
            [['event_date'], 'date', 'format' => 'php:Y-m-d'],
            ['status', 'in', 'range' => [self::STATUS_PENDING, self::STATUS_APPROVED, self::STATUS_REJECTED]],
            ['status', 'default', 'value' => self::STATUS_PENDING],
        ];
    }

    public function fields()
    {
        return [
            'id',
            'managerId' => 'manager_id',
            'managerName' => function($model) {
                return $model->manager ? $model->manager->username : null;
            },
            'managerEmail' => function($model) {
                return $model->manager ? $model->manager->email : null;
            },
            'vendorId' => 'vendor_id',
            'vendorName' => function($model) {
                if ($model->vendor) {
                    return $model->vendor->name;
                }
                // Fallback to manager's vendor
                return $model->manager && $model->manager->vendor ? $model->manager->vendor->name : null;
            },
            'staffCount' => 'staff_count',
            'description',
            'eventDate' => 'event_date',
            'status',
            'adminNotes' => 'admin_notes',
            'createdAt' => 'created_at',
            'updatedAt' => 'updated_at',
        ];
    }

    public function getManager()
    {
        return $this->hasOne(User::class, ['id' => 'manager_id']);
    }

    public function getVendor()
    {
        return $this->hasOne(Vendor::class, ['id' => 'vendor_id']);
    }

    public function getAssignedStaff()
    {
        return $this->hasMany(ApplicationStaffAssignment::class, ['application_id' => 'id']);
    }
}

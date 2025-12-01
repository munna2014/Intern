<?php

namespace common\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

class Vendor extends ActiveRecord
{
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';

    public static function tableName()
    {
        return '{{%vendor}}';
    }

    public function behaviors()
    {
        return [TimestampBehavior::class];
    }

    public function rules()
    {
        return [
            [['name', 'location', 'contact'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['location'], 'string', 'max' => 255],
            [['contact'], 'string', 'max' => 20],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_INACTIVE]],
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
        ];
    }

    public function getAssignments()
    {
        return $this->hasMany(Assignment::class, ['vendor_id' => 'id']);
    }
}

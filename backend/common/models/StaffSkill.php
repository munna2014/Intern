<?php

namespace common\models;

use yii\db\ActiveRecord;

class StaffSkill extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%staff_skill}}';
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
}

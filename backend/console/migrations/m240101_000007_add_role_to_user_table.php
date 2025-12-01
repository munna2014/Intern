<?php

use yii\db\Migration;

class m240101_000007_add_role_to_user_table extends Migration
{
    public function safeUp()
    {
        $this->addColumn('{{%user}}', 'role', $this->string(20)->notNull()->defaultValue('staff')->after('email'));
    }

    public function safeDown()
    {
        $this->dropColumn('{{%user}}', 'role');
    }
}

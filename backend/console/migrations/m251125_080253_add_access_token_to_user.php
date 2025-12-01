<?php

use yii\db\Migration;

class m251125_080253_add_access_token_to_user extends Migration
{
    public function safeUp()
    {
        $this->addColumn('{{%user}}', 'access_token', $this->string(255)->null()->after('auth_key'));
    }

    public function safeDown()
    {
        $this->dropColumn('{{%user}}', 'access_token');
    }
}

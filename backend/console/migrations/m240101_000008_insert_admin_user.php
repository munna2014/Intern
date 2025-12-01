<?php

use yii\db\Migration;

class m240101_000008_insert_admin_user extends Migration
{
    public function safeUp()
    {
        // Insert default admin user
        $this->insert('{{%user}}', [
            'username' => 'admin',
            'email' => 'admin@staffflow.com',
            'password_hash' => Yii::$app->security->generatePasswordHash('admin123'),
            'auth_key' => Yii::$app->security->generateRandomString(),
            'role' => 'admin',
            'status' => 10, // STATUS_ACTIVE in Yii2
            'created_at' => time(),
            'updated_at' => time(),
        ]);
    }

    public function safeDown()
    {
        $this->delete('{{%user}}', ['username' => 'admin']);
    }
}

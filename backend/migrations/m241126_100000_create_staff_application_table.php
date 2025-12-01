<?php

use yii\db\Migration;

class m241126_100000_create_staff_application_table extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%staff_application}}', [
            'id' => $this->primaryKey(),
            'manager_id' => $this->integer()->notNull(),
            'staff_count' => $this->integer()->notNull()->defaultValue(1),
            'description' => $this->text()->notNull(),
            'event_date' => $this->date(),
            'status' => $this->string(20)->notNull()->defaultValue('pending'),
            'admin_notes' => $this->text(),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->addForeignKey(
            'fk-staff_application-manager_id',
            '{{%staff_application}}',
            'manager_id',
            '{{%user}}',
            'id',
            'CASCADE'
        );

        $this->createIndex('idx-staff_application-status', '{{%staff_application}}', 'status');
        $this->createIndex('idx-staff_application-manager_id', '{{%staff_application}}', 'manager_id');
    }

    public function safeDown()
    {
        $this->dropTable('{{%staff_application}}');
    }
}

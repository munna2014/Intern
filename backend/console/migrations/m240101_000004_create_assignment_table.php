<?php

use yii\db\Migration;

class m240101_000004_create_assignment_table extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%assignment}}', [
            'id' => $this->primaryKey(),
            'vendor_id' => $this->integer()->notNull(),
            'staff_id' => $this->integer()->notNull(),
            'date' => $this->date()->notNull(),
            'start_time' => $this->time()->notNull(),
            'end_time' => $this->time()->notNull(),
            'role' => $this->string(50)->notNull(),
            'status' => $this->string(20)->notNull()->defaultValue('scheduled'),
            'hours_worked' => $this->decimal(5, 2)->null(),
            'check_in_time' => $this->datetime()->null(),
            'check_out_time' => $this->datetime()->null(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->createIndex('idx-assignment-vendor_id', '{{%assignment}}', 'vendor_id');
        $this->createIndex('idx-assignment-staff_id', '{{%assignment}}', 'staff_id');
        $this->createIndex('idx-assignment-date', '{{%assignment}}', 'date');
        $this->createIndex('idx-assignment-status', '{{%assignment}}', 'status');

        $this->addForeignKey('fk-assignment-vendor_id', '{{%assignment}}', 'vendor_id', '{{%vendor}}', 'id', 'CASCADE', 'CASCADE');
        $this->addForeignKey('fk-assignment-staff_id', '{{%assignment}}', 'staff_id', '{{%staff}}', 'id', 'CASCADE', 'CASCADE');
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk-assignment-staff_id', '{{%assignment}}');
        $this->dropForeignKey('fk-assignment-vendor_id', '{{%assignment}}');
        $this->dropTable('{{%assignment}}');
    }
}

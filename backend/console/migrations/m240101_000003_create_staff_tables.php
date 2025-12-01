<?php

use yii\db\Migration;

class m240101_000003_create_staff_tables extends Migration
{
    public function safeUp()
    {
        // Create staff table
        $this->createTable('{{%staff}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->null(),
            'name' => $this->string(100)->notNull(),
            'phone' => $this->string(20)->notNull(),
            'max_hours_per_week' => $this->integer()->notNull()->defaultValue(40),
            'current_hours' => $this->decimal(5, 2)->notNull()->defaultValue(0),
            'status' => $this->string(20)->notNull()->defaultValue('available'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Create staff_skills table
        $this->createTable('{{%staff_skill}}', [
            'id' => $this->primaryKey(),
            'staff_id' => $this->integer()->notNull(),
            'skill_name' => $this->string(50)->notNull(),
        ]);

        // Create staff_availability table
        $this->createTable('{{%staff_availability}}', [
            'id' => $this->primaryKey(),
            'staff_id' => $this->integer()->notNull(),
            'available_date' => $this->date()->notNull(),
        ]);

        // Create indexes
        $this->createIndex('idx-staff-user_id', '{{%staff}}', 'user_id');
        $this->createIndex('idx-staff-status', '{{%staff}}', 'status');
        $this->createIndex('idx-staff_skill-staff_id', '{{%staff_skill}}', 'staff_id');
        $this->createIndex('idx-staff_availability-staff_id', '{{%staff_availability}}', 'staff_id');

        // Add foreign keys
        $this->addForeignKey('fk-staff-user_id', '{{%staff}}', 'user_id', '{{%user}}', 'id', 'SET NULL', 'CASCADE');
        $this->addForeignKey('fk-staff_skill-staff_id', '{{%staff_skill}}', 'staff_id', '{{%staff}}', 'id', 'CASCADE', 'CASCADE');
        $this->addForeignKey('fk-staff_availability-staff_id', '{{%staff_availability}}', 'staff_id', '{{%staff}}', 'id', 'CASCADE', 'CASCADE');

        // Insert sample staff
        $this->batchInsert('{{%staff}}',
            ['name', 'phone', 'max_hours_per_week', 'current_hours', 'status', 'created_at', 'updated_at'],
            [
                ['John Smith', '+1-555-1001', 40, 0, 'available', time(), time()],
                ['Sarah Johnson', '+1-555-1002', 35, 0, 'available', time(), time()],
                ['Mike Davis', '+1-555-1003', 40, 0, 'available', time(), time()],
                ['Emily Brown', '+1-555-1004', 45, 0, 'available', time(), time()],
            ]
        );

        // Insert sample skills
        $this->batchInsert('{{%staff_skill}}', ['staff_id', 'skill_name'],
            [
                [1, 'Server'], [1, 'Event Staff'],
                [2, 'Sales Associate'], [2, 'Server'],
                [3, 'Event Staff'], [3, 'Sales Associate'],
                [4, 'Server'], [4, 'Event Staff'], [4, 'Sales Associate'],
            ]
        );

        // Insert sample availability
        $this->batchInsert('{{%staff_availability}}', ['staff_id', 'available_date'],
            [
                [1, '2025-11-20'], [1, '2025-11-21'], [1, '2025-11-22'],
                [2, '2025-11-20'], [2, '2025-11-23'], [2, '2025-11-24'],
                [3, '2025-11-21'], [3, '2025-11-22'], [3, '2025-11-23'],
                [4, '2025-11-20'], [4, '2025-11-21'], [4, '2025-11-22'], [4, '2025-11-23'], [4, '2025-11-24'],
            ]
        );
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk-staff_availability-staff_id', '{{%staff_availability}}');
        $this->dropForeignKey('fk-staff_skill-staff_id', '{{%staff_skill}}');
        $this->dropForeignKey('fk-staff-user_id', '{{%staff}}');
        $this->dropTable('{{%staff_availability}}');
        $this->dropTable('{{%staff_skill}}');
        $this->dropTable('{{%staff}}');
    }
}

<?php

use yii\db\Migration;

class m240101_000002_create_vendor_table extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%vendor}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(255)->notNull(),
            'location' => $this->string(255)->notNull(),
            'contact' => $this->string(50),
            'status' => "ENUM('active', 'inactive') DEFAULT 'active'",
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->createIndex('idx-vendor-status', '{{%vendor}}', 'status');

        // Insert sample vendors
        $this->batchInsert('{{%vendor}}', ['name', 'location', 'contact', 'status', 'created_at', 'updated_at'], [
            ['Sultan Dines Restaurant', 'Downtown', '+1-555-0101', 'active', time(), time()],
            ['Tech Conference 2025', 'Convention Center', '+1-555-0102', 'active', time(), time()],
            ['Retail Store XYZ', 'Mall District', '+1-555-0103', 'active', time(), time()],
        ]);
    }

    public function safeDown()
    {
        $this->dropTable('{{%vendor}}');
    }
}

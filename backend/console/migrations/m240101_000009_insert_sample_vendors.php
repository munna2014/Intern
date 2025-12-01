<?php

use yii\db\Migration;

class m240101_000009_insert_sample_vendors extends Migration
{
    public function safeUp()
    {
        // Insert sample vendors
        $this->batchInsert('{{%vendor}}', 
            ['name', 'location', 'contact', 'status', 'created_at', 'updated_at'],
            [
                ['Sultan Dines Restaurant', 'Downtown', '+1-555-0101', 'active', time(), time()],
                ['Tech Conference 2025', 'Convention Center', '+1-555-0102', 'active', time(), time()],
                ['Retail Store XYZ', 'Mall District', '+1-555-0103', 'active', time(), time()],
            ]
        );
    }

    public function safeDown()
    {
        $this->delete('{{%vendor}}', ['name' => 'Sultan Dines Restaurant']);
        $this->delete('{{%vendor}}', ['name' => 'Tech Conference 2025']);
        $this->delete('{{%vendor}}', ['name' => 'Retail Store XYZ']);
    }
}

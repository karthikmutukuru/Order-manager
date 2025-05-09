<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'customer_name' => 'John Doe',
                'product' => 'Laptop',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_name' => 'Jane Smith',
                'product' => 'Phone',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

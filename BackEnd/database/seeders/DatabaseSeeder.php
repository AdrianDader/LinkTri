<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Llamamos al seeder de usuarios
        $this->call(UserSeeder::class);

        // Llamamos al seeder de tags
        $this->call(FixedDataSeeder::class);

    }
}

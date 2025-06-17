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

        // DB MongoDB
        $this->call(TagSeeder::class);


        // Llamamos al seeder de repositorio
        $this->call(RepositorySeeder::class);


        // Llamamos al seeder de enlaces
        $this->call(EnlaceSeeder::class);



         // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


    }
}

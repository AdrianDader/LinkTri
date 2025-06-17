<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str; // 👈 Añadido aquí

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear un admin si no existe
        if (User::where('role', 'admin')->count() == 0) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('adminpassword'),
                'role' => 'admin',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10), 
            ]);
        }

        // Crear usuarios normales (por ejemplo, 10 usuarios)
        User::factory(10)->create();
    }
}

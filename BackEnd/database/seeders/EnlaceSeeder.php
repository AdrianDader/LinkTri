<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enlace;
use App\Models\Repository;
use Illuminate\Support\Str;

class EnlaceSeeder extends Seeder
{
    public function run(): void
    {
        $repository = Repository::first();

        if (!$repository) {
            dd("⚠️ No hay repositorios disponibles. Ejecuta primero RepositorySeeder.");
        }

        Enlace::create([
            'repository_id' => $repository->id,
            'url' => 'https://ejemplo.com',
            'name' => 'Guía de Laravel',
            'visibility' => 'public',
            'shared' => true,
            'public_link' => 'https://ejemplo.com/' . Str::random(10),
            'private_link' => 'https://ejemplo.com/private/' . Str::random(12),
        ]);

        Enlace::create([
            'repository_id' => $repository->id,
            'url' => 'https://recursos.com',
            'name' => 'Notas privadas',
            'visibility' => 'private',
            'shared' => false,
            'public_link' => 'https://recursos.com/' . Str::random(10),
            'private_link' => 'https://recursos.com/private/' . Str::random(12),
        ]);
    }
}

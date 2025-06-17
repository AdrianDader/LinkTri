<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Repository;
use App\Models\Tag;

class RepositorySeeder extends Seeder
{
    public function run(): void
    {
        // Recoger un tag (usando el campo 'nombre')
        $tag = Tag::first();

        if (!$tag) {
            dd("⚠️ No hay tags disponibles en Mongo. Ejecuta primero TagSeeder.");
        }

        Repository::create([
            'user_id' => 1,
            'name' => 'Repositorio único',
            'description' => 'Descripción del repositorio único',
            'visibility' => 'public',
            'shared' => true,
            'tags' => [$tag->name],
        ]);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Repository;
use App\Models\User;
use App\Models\Enlace;
use App\Models\Tag;

class RepositoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_repository()
    {
        $user = User::factory()->create();

        $repository = Repository::create([
            'user_id' => $user->id,
            'name' => 'Repositorio de prueba',
            'description' => 'Descripción',
            'visibility' => 'public',
            'shared' => true,
            'tags' => [],
        ]);

        $this->assertDatabaseHas('repositories', [
            'name' => 'Repositorio de prueba',
        ]);
    }

}

<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TagTest extends TestCase
{
    use RefreshDatabase; // Esto limpia la base de datos antes de cada test (si usas SQLite o MySQL)

    public function test_can_create_a_tag()
    {
        $tagData = ['name' => 'Laravel'];

        $tag = Tag::create($tagData);

        $this->assertDatabaseHas('tags', [
            'name' => 'Laravel',
        ]);
    }

    public function test_tag_has_correct_fields()
    {
        $tag = Tag::create(['name' => 'PHP']);

        $this->assertEquals('PHP', $tag->name);
        $this->assertNotNull($tag->created_at);
        $this->assertNotNull($tag->updated_at);
    }
}

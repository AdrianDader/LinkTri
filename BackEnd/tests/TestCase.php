<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
      use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();

        // Ejecutar el seeder que quieras (por ejemplo TagSeeder)
        $this->artisan('db:seed', ['--class' => 'TagSeeder']);
    }
}

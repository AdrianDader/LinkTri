<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsTable extends Migration
{
    public function up(): void
    {
        Schema::connection('mongodb')->create('tags', function (Blueprint $collection) {
            $collection->id();
            $collection->string('name');
            $collection->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection('mongodb')->dropIfExists('tags');
    }
}

<?php

namespace App\Models;

// use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $connection = 'mysql';
    protected $collection = 'tags';

    protected $fillable = ['name'];
    public $timestamps = true;
}

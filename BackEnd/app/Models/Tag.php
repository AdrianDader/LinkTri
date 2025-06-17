<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Tag extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'tags';

    protected $fillable = ['name'];
    public $timestamps = true;
}

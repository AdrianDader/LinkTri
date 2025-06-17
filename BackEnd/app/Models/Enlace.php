<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enlace extends Model
{
    use HasFactory;
    protected $connection = 'mysql';


    protected $fillable = [
        
        'url',
        'name',
        'visibility',
        'shared',
        'public_link',
        'private_link',
    ];

    protected $casts = [
        'shared' => 'boolean',
    ];

    // Relaciones

    public function repository()
    {
        return $this->belongsTo(Repository::class);
    }
}

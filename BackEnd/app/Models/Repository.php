<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Repository extends Model
{
    use HasFactory;
    
    protected $connection = 'mysql'; 

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'visibility',
        'shared',
        'tags',
    ];

    protected $casts = [
        'shared' => 'boolean',
        'tags' => 'array',
    ];

    protected $appends = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function links()
    {
        return $this->hasMany(Enlace::class);
    }

    public function getTagModelsAttribute()
    {
        $tagIds = $this->tags ?? [];

        if (empty($tagIds)) {
            return collect(); // Devuelve colección vacía si no hay tags
        }

        return Tag::whereIn('_id', $tagIds)->get();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'capital', 'language', 'banner', 'img',];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
},

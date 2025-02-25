<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{

  use HasFactory;

  protected $tabe = 'plans';

  protected $fill = [
    'plan_name',
    'price_id',
    'price',
    'level',
    'features',
  ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
use App\Models\User;

class Car extends Model
{

  use HasFactory;

  protected $tabe = 'cars';

  protected $fillable = [
    'company_id',
    'user_id',
    'model',
    'cost',
    'manufactured_year',
    'color',
    'fuel_type',
    'in_service',
    'cost',
    'image',
  ];

  public function company()
  {
    return $this->belongsTo(Company::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

}

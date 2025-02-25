<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConfirmLog extends Model
{
  use HasFactory;

  protected $fillabl = [
    'msg',
    'updated',
  ];
}

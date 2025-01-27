<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VanController extends Controller
{
  public function index()
    {
      $hiredVan = [
        [
          'id' => 1,
          'model' => 'I hired a van first',
          'description' => 'Excellent experience with this van.',
          'hired_on' => '2025-01-21',
        ],
        [
          'id' => 2,
          'model' => 'Hired Van by brightal',
          'description' => 'Great car for long-distance trips.',
          'hired_on' => '2025-01-18',
        ],
      ];

      return Inertia::render('Vans/HiredVan', [
          'hiredVan' => $hiredVan,
      ]);
    }
}

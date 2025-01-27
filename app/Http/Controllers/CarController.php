<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
  public function index()
    {
        // Hardcoded data to represent hired cars
        $hiredCars = [
          [
            'id' => 1,
            'model' => 'Toyota Corolla',
            'description' => 'A reliable car for city commutes.',
            'hired_on' => '2025-01-01',
          ],
          [
            'id' => 2,
            'model' => 'Honda Civic',
            'description' => 'Great car for long-distance trips.',
            'hired_on' => '2025-01-15',
          ],
        ];

        // Pass the hardcoded hired cars data to the frontend
        return Inertia::render('Cars/HiredCar', [
            'hiredCars' => $hiredCars,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CarRequest;
use App\Models\Company;
use App\Models\Car;
use Inertia\Inertia;

class CarsController extends Controller
{
    public function index()
    {
      $companies = Company::all();
      $cars = Car::all();
      return Inertia::render('Admin/Car/CarList', [
        'companies' => $companies,
        'cars' => $cars,
      ]);
    }

    public function store(CarRequest $request)
    {
      $validatedData = $request->validated();
      
      if ($request->hasFile('image')) {
        $validatedData['image'] = $request->file('image')->store('cars', 'public');
      }

      Car::create($validatedData);

      return redirect()->route('admin.car.index')->with('success', 'Car added successfully.');
    }

    public function edit($id)
    {
        $car = Car::with('company')->findOrFail($id);
        return response()->json($car);
    }

    public function update(CarRequest $request, $id)
    {
        $car = Car::findOrFail($id);
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('cars', 'public');
        }

        $car->update($validatedData);

        return redirect()->route('admin.car.index')->with('success', 'Car updated successfully.');
    }

    public function destroy($id)
    {
        Car::findOrFail($id)->delete();
        return response()->json(['message' => 'Car deleted successfully.']);
    }
}


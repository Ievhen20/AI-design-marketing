<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CarRequest;
use Illuminate\Support\Facades\Storage;
use Auth;
use App\Models\Company;
use App\Models\Car;
use Inertia\Inertia;

class CarsController extends Controller
{
    public function index()
    {
      $companies = Company::all();
      $cars = Car::with('company')->get();
      return Inertia::render('Admin/Car/CarList', [
        'companies' => $companies,
        'cars' => $cars,
      ]);
    }

    public function store(Request $request)
    {
      $auth_id = Auth::id();

      try {
          // Handle image upload
          $imagePath = null;
          if ($request->hasFile('image')) {
              $imagePath = $request->file('image')->store('cars', 'public');
          }

          // Create car if no ID is provided
          if ($request->id === null) {
            $car = Car::create([
              'user_id' => $auth_id,
              'model' => $request->model,
              'company_id' => $request->company_id,
              'manufactured_year' => $request->manufactured_year,
              'fuel_type' => $request->fuel_type,
              'cost' => $request->cost,
              'image' => $imagePath,
            ]); 
          }

          return redirect()->route('cars.index')->with('success', 'Car added successfully.');

      } catch (\Exception $e) {
          return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }

    public function edit($id)
    {
        $car = Car::with('company')->findOrFail($id);
        return response()->json($car);
    }

    public function update(Request $request, $id)
    {
      try {
        $car = Car::findOrFail($id);
        $auth_id = Auth::id();

        if ($request->hasFile('image')) {
            if ($car->image) {
              Storage::disk('public')->delete($car->image);
            }

          $imagePath = $request->file('image')->store('cars', 'public');
        } else {
          $imagePath = $car->image;
        }

        $car->update([
          'user_id' => $auth_id,
          'model' => $request->model,
          'company_id' => $request->company_id,
          'manufactured_year' => $request->manufactured_year,
          'fuel_type' => $request->fuel_type,
          'cost' => $request->cost,
          'image' => $imagePath,
        ]);

        return redirect()->route('admin.car.index')->with('success', 'Car updated successfully.');

      } catch (\Exception $e) {
          return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }

    public function delete($id)
    {
      try {
        $car = Car::findOrFail($id);
        
        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        $car->delete();

        return redirect()->route('admin.car.index')->with('success', 'Car deleted successfully.');
      } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }
}

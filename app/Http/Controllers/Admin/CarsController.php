<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CarRequest;
use App\Models\Car;
use Inertia\Inertia;

class CarsController extends Controller
{
  public function index () {
    return Inertia::render('Admin/Car/CarList');
  }

  public function create()
  {
    return Inertia::render('Admin/Car/Create');
  }

  public function store(CarRequest $request)
  {
    $validatedData = $request->validated();

    Company::create($validatedData);

    return redirect()->route('admin.car.index')
      ->with('message', 'Car created successfully!');
  }

  public function edit($id)
  {
    $company = Car::findOrFail($id);
    return Inertia::render('Admin/Car/Edit', [
      'company' => $company
    ]);
  }

  public function update(CompanyRequest $request, $id)
  {
    $car = Car::findOrFail($id);
    $validatedData = $request->validated();
    $car->update($validatedData);

    return redirect()->route('admin.car.index');
  }

  public function destroy($id)
  {
    $car = Car::findOrFail($id);
    $car->delete();

    return redirect()->route('admin.car.index')
      ->with('message', 'Car deleted successfully!');
  }

}

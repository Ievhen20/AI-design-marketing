<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plan;

class PlansController extends Controller
{
  public function index() {
    $plans = Plan::all();
    return Inertia::render('Admin/Plans', [
      'plans' => $plans,
    ]);
  }

  public function store(Request $request) {
    try {
      // Handle image upload
      $imagePath = null;
      if ($request->hasFile('image')) {
          $imagePath = $request->file('image')->store('vans', 'public');
      }

      // Create van if no ID is provided
      if ($request->id === null) {
        $plan = Plan::create([
          'plan_name' => $request->model,
          'price_id' => $request->price_id,
          'price' => $request->price,
          'level' => $request->level,
          'features' => $request->features,
        ]); 
      }

      return redirect()->route('admin.plans.index')->with('success', 'A new plan is added successfully.');

    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Something went wrong!']);
    }
  }
}

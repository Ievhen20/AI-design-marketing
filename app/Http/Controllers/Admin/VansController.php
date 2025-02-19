<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Auth;
use Inertia\Inertia;
use App\Models\Van;
use App\Models\Company;

class VansController extends Controller
{
  
  public function index () {
    $companies = Company::all();
    $vans = Van::with('company')->get();
    return Inertia::render('Admin/Van/VanList', [
      'companies' => $companies,
      'vans' => $vans,
    ]);
  }

  public function store(Request $request)
    {
      $auth_id = Auth::id();

      try {
          // Handle image upload
          $imagePath = null;
          if ($request->hasFile('image')) {
              $imagePath = $request->file('image')->store('vans', 'public');
          }

          // Create van if no ID is provided
          if ($request->id === null) {
            $van = Van::create([
              'user_id' => $auth_id,
              'model' => $request->model,
              'company_id' => $request->company_id,
              'manufactured_year' => $request->manufactured_year,
              'fuel_type' => $request->fuel_type,
              'cost' => $request->cost,
              'image' => $imagePath,
            ]); 
          }

          return redirect()->route('admin.vans.index')->with('success', 'Van added successfully.');

      } catch (\Exception $e) {
          return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }

    public function update(Request $request, $id)
    {
      try {
        $van = Van::findOrFail($id);
        $auth_id = Auth::id();

        if ($request->hasFile('image')) {
            if ($van->image) {
              Storage::disk('public')->delete($van->image);
            }

          $imagePath = $request->file('image')->store('vans', 'public');
        } else {
          $imagePath = $van->image;
        }

        $van->update([
          'user_id' => $auth_id,
          'model' => $request->model,
          'company_id' => $request->company_id,
          'manufactured_year' => $request->manufactured_year,
          'fuel_type' => $request->fuel_type,
          'cost' => $request->cost,
          'image' => $imagePath,
        ]);

        return redirect()->route('admin.vans.index')->with('success', 'Van updated successfully.');

      } catch (\Exception $e) {
          return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }

    public function delete($id)
    {
      try {
        $van = Van::findOrFail($id);
        
        if ($van->image) {
            Storage::disk('public')->delete($van->image);
        }

        $van->delete();

        return redirect()->route('admin.vans.index')->with('success', 'Van deleted successfully.');
      } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Something went wrong!']);
      }
    }

}

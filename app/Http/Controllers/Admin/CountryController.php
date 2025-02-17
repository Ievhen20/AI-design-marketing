<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Auth;
use App\Models\Country;
use Inertia\Inertia;

class CountryController extends Controller
{
  public function index()
  {
    $countries = Country::all();
    return Inertia::render('Admin/Company/CountryList', [
      'countries' => $countries,
    ]);
  }

  public function store(Request $request) {
    
    try{

      $bannerPath = null;
      $imgPath = null;
      if ($request->hasFile('banner')) {
        $bannerPath = $request->file('banner')->store('banner', 'public');
      }
      if ($request->hasFile('img')) {
        $imgPath = $request->file('img')->store('countries', 'public');
      }

      if ($request->id === null) {
        $country = Country::create([
          'name' => $request->name,
          'capital' => $request->capital,
          'language' => $request->language,
          'banner' => $bannerPath,
          'img' => $imgPath,
        ]);
      }

      return redirect()->route('country.index')->with('success', 'You have added a new country.');

    } catch (\Exception $e) {
      return back()->withErrors(['error' => 'Something went wrong!']);
    }

    return "Store Country";
  }

  public function update() {
    return "Update a country";
  }

}

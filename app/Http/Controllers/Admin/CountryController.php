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

  public function update(Request $request, $id) {
    try {
        $country = Country::findOrFail($id);

        if ($request->hasFile('banner')) {
            if ($country->banner) {
                $bannerFilePath = $country->banner;
                $bannerFileName = basename($bannerFilePath);
                Storage::disk('public')->delete('banner/' . $bannerFileName);
            }
            $bannerPath = $request->file('banner')->store('banner', 'public');
        } else {
            $bannerPath = $country->banner;
        }

        if ($request->hasFile('img')) {
            if ($country->img) {
                $imgFilePath = $country->img;
                $imgFileName = basename($imgFilePath);
                Storage::disk('public')->delete('countries/' . $imgFileName);
            }
            $imgPath = $request->file('img')->store('countries', 'public');
        } else {
            $imgPath = $country->img;
        }

        $country->update([
          'name' => $request->name,
          'capital' => $request->capital,
          'language' => $request->language,
          'banner' => $bannerPath,
          'img' => $imgPath,
        ]);

        return redirect()->route('admin.countries.index')->with('success', 'Country updated successfully!');
        
    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Something went wrong!']);
    }
  }

  public function delete ($id) {
    try {
      $country = Country::findOrFail($id);
      
      if ($country->banner) {
          Storage::disk('public')->delete($country->banner);
      }
      if ($country->img) {
        Storage::disk('public')->delete($country->img);
      }

      $country->delete();

      return redirect()->route('admin.countries.index')->with('success', 'Country deleted successfully.');
    } catch (\Exception $e) {
      return back()->withErrors(['error' => 'Something went wrong!']);
    }
  }

}

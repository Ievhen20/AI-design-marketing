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
      'companies' => $countries,
    ]);
  }

  public function store() {
    return "Store Country";
  }

  public function update() {
    return "Update a country";
  }

}

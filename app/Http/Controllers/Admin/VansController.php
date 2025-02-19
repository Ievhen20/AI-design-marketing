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

}

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
}

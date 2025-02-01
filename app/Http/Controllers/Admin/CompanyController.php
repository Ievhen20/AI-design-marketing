<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CompanyRequest;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{

  public function index()
  {
    $companies = Company::all();
    return Inertia::render('Admin/Company/CompanyList', [
      'companies' => $companies
    ]);
  }

  public function create()
  {
    return Inertia::render('Admin/Company/Create');
  }

  public function store(CompanyRequest $request)
  {
    $validatedData = $request->validated();
    
    Company::create($validatedData);

    return redirect()->route('admin.company.index')
      ->with('message', 'Company created successfully!');
  }

  public function edit($id)
  {
    $company = Company::findOrFail($id);
    return Inertia::render('Admin/Company/Edit', [
      'company' => $company
    ]);
  }

  public function update(CompanyRequest $request, $id)
  {
    $company = Company::findOrFail($id);
    $validatedData = $request->validated();
    $company->update($validatedData);

    return redirect()->route('admin.company.index');
  }

  public function destroy($id)
  {
    $company = Company::findOrFail($id);
    $company->delete();

    return redirect()->route('admin.company.index')
      ->with('message', 'Company deleted successfully!');
  }
}

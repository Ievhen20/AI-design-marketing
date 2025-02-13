<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CompanyRequest;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{

  public function index()
  {
    $perPage = 10;

    $companies = Company::orderBy('com_name', 'desc')->paginate($perPage);

    return Inertia::render('Admin/Company/CompanyList', [
      'companies' => $companies->items(),
      'totalCompanies' => $companies->total(),
      'perPage' => $perPage,
      'currentPage' => $companies->currentPage(),
    ]);
  }

  public function fetch_companies(Request $request)
  {
      $perPage = $request->get('perPage', 10);
      $page = $request->get('page', 1);

      $companies = Company::orderBy('created_at', 'desc')->paginate($perPage);

      return Inertia::render('Admin/Company/CompanyList', [
          'companies' => $companies->items(),
          'totalCompanies' => $companies->total(),
          'perPage' => $perPage,
          'currentPage' => $companies->currentPage(),
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

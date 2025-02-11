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
    // Default pagination values
    $perPage = 10;

    // Fetch companies with pagination (default to 10 companies per page)
    $companies = Company::orderBy('com_name', 'desc')->paginate($perPage);

    // Return the data to Inertia (including total count, companies per page, and the current page)
    return Inertia::render('Admin/Company/CompanyList', [
      'companies' => $companies->items(),
      'totalCompanies' => $companies->total(),
      'perPage' => $perPage,
      'currentPage' => $companies->currentPage(),
    ]);
  }

  // Fetch paginated companies for dynamic updates
  public function fetch_companies(Request $request)
  {
      $perPage = $request->get('perPage', 10);
      $page = $request->get('page', 1);

      // Use the paginate method to get data with proper pagination
      $companies = Company::orderBy('created_at', 'desc')->paginate($perPage);

      return Inertia::render('Admin/Company/CompanyList', [
          'companies' => $companies->items(),
          'totalCompanies' => $companies->total(),
          'perPage' => $perPage,
          'currentPage' => $companies->currentPage(),  // Ensure this is passed
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

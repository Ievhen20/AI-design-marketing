<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true; // Allow all users to make the request, modify for your own authorization logic
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'country_name' => 'required|string|max:255',
      'city' => 'required|string|max:255',
      'com_name' => 'required|string|max:255',
    ];

    // If this is an update request (PUT/PATCH), we exclude the current company's country_name from the uniqueness check
    if ($this->isMethod('put') || $this->isMethod('patch')) {
      $rules['country_name'] = 'required|string|max:255|unique:companies,country_name,' . $this->route('company');
    }

    return $rules;
  }

  /**
   * Get the custom error messages for the validation rules.
   *
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'country_name.required' => 'The country name is required.',
      'country_name.unique' => 'This country name already exists.',
      'city.required' => 'The city is required.',
      'com_name.required' => 'The company name is required.',
    ];
  }
}

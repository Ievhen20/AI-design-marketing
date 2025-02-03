<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'company_id' => 'required|exists:companies,id',
      'user_id' => 'required|exists:users,id',
      'model' => 'required|string|max:255',
      'horse_power' => 'nullable|numeric|min:0',
      'manufactured_year' => 'nullable|digits:4',
      'color' => 'nullable|string|max:50',
      'fuel_type' => 'nullable|string|max:50',
      'in_service' => 'nullable|string|max:50',
      'cost' => 'nullable|numeric|min:0',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ];
  }

  /**
   * Get the custom messages for validation errors.
   *
   * @return array
   */
  public function messages(): array
  {
    return [
      'company_id.required' => 'The company field is required.',
      'user_id.required' => 'The user field is required.',
      'model.required' => 'The model field is required.',
      'horse_power.numeric' => 'Horsepower must be a number.',
      'horse_power.min' => 'Horsepower must be at least 0.',
      'cost.numeric' => 'Cost must be a number.',
      'cost.min' => 'Cost must be at least 0.',
      'image.image' => 'The image must be a valid image file.',
      'image.mimes' => 'The image must be of type jpeg, png, jpg, gif, or svg.',
      'image.max' => 'The image size must not exceed 2MB.',
    ];
  }
}

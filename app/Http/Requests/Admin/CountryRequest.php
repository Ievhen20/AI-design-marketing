<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CountryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
          'name' => 'required|string|max:255|unique:countries,name',
          'capital' => 'required|string|max:255|unique:countries,capital',
          'language' => 'required|string|max:255',
          'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
          'img' => 'nullable|image|mimes:jpeg,png,jpg,gip|max:2028',
        ];
    }
}

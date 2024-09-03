<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuItemRequest extends FormRequest
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
        $orderRule = $this->isMethod('post') ? 'required|integer' : 'nullable|integer';
        $nameRule = $this->isMethod('post') ? 'required|string|max:255' : 'nullable|string|max:255';

        return [
            'name' => $nameRule,
            'parent_id' => 'nullable|exists:menu_items,id',
            'order' => $orderRule,
        ];
    }
}

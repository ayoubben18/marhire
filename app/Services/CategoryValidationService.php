<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryValidationService
{
    /**
     * Get validation rules based on category ID
     * 
     * @param int $categoryId
     * @param Request|null $request
     * @return array
     */
    public function getValidationRules(int $categoryId, Request $request = null): array
    {
        $baseRules = $this->getBaseValidationRules();
        $categoryRules = $this->getCategorySpecificRules($categoryId, $request);
        
        return array_merge($baseRules, $categoryRules);
    }

    /**
     * Get base validation rules that apply to all categories
     * 
     * @return array
     */
    private function getBaseValidationRules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'city_id' => 'required|integer|exists:cities,id',
            'category_id' => 'required|integer|in:2,3,4,5',
            'provider_id' => 'sometimes|nullable|integer|exists:agencies,id',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'special_notes' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:300',
            'schema_markup' => 'nullable|string',
            'slug' => 'nullable|string|max:255',
            'dealer_note' => 'nullable|string',
            'price_per_hour' => 'nullable|numeric|min:0',
            'price_per_half_day' => 'nullable|numeric|min:0',
            'price_per_day' => 'nullable|numeric|min:0',
            'price_per_week' => 'nullable|numeric|min:0',
            'price_per_month' => 'nullable|numeric|min:0'
        ];
    }

    /**
     * Get category-specific validation rules
     * 
     * @param int $categoryId
     * @param Request|null $request
     * @return array
     */
    private function getCategorySpecificRules(int $categoryId, Request $request = null): array
    {
        switch ($categoryId) {
            case 2: // Car Rental
                return $this->getCarRentalValidationRules($request);
            case 3: // Private Driver
                return $this->getPrivateDriverValidationRules($request);
            case 4: // Boat Rental
                return $this->getBoatRentalValidationRules($request);
            case 5: // Activities
                return $this->getActivitiesValidationRules($request);
            default:
                return [];
        }
    }

    /**
     * Car Rental (Category ID: 2) validation rules
     * 
     * @param Request|null $request
     * @return array
     */
    private function getCarRentalValidationRules(Request $request = null): array
    {
        $currentYear = date('Y');
        
        return [
            // Multi-select car types (JSON array)
            'car_types' => 'required|array|min:1',
            'car_types.*' => 'required|integer|exists:sub_category_options,id',
            
            // Single car model selection
            'car_model' => 'required|integer|exists:sub_category_options,id',
            
            // Car specifications
            'year' => "required|integer|min:1990|max:" . ($currentYear + 2),
            'transmission' => 'required|in:Manual,Automatic',
            'fuel_type' => 'required|in:Petrol,Diesel,Electric,Hybrid',
            'seats' => 'required|integer|min:1|max:20',
            'doors' => 'required|integer|min:2|max:8',
            'ac' => 'required|in:Yes,No',
            
            // Policies and requirements
            'mileage_policy' => 'required|string|max:255',
            'fuel_policy' => 'required|string|max:255',
            'driver_requirement' => 'required|string|max:255',
            
            // Deposit information
            'deposit_required' => 'required|in:yes,no',
            'deposit_amount' => 'nullable|numeric|min:0',
            'deposit_note' => 'nullable|string|max:500'
        ];
    }

    /**
     * Private Driver (Category ID: 3) validation rules
     * 
     * @param Request|null $request
     * @return array
     */
    private function getPrivateDriverValidationRules(Request $request = null): array
    {
        return [
            // Vehicle specifications
            'vehicule_type' => 'required|integer|exists:sub_category_options,id',
            'vehicule_model' => 'sometimes|nullable|integer|exists:sub_category_options,id',
            
            // Capacity information
            'max_passengers' => 'required|integer|min:1|max:15',
            'max_luggage' => 'required|integer|min:0',
            
            // Location and services
            'pickup_location' => 'sometimes|nullable|string|max:255',
            'languages_spoken' => 'sometimes|array',
            'languages_spoken.*' => 'string|max:50',
            
            // Service type (if applicable)
            'service_type' => 'sometimes|nullable|integer|exists:sub_category_options,id'
        ];
    }

    /**
     * Boat Rental (Category ID: 4) validation rules
     * 
     * @param Request|null $request
     * @return array
     */
    private function getBoatRentalValidationRules(Request $request = null): array
    {
        return [
            // Boat specifications
            'boat_type' => 'required|integer|exists:sub_category_options,id',
            'capacity' => 'required|integer|min:1|max:100',
            'with_captain' => 'required|in:yes,no',
            
            // Duration options (30-minute intervals)
            'duration_options' => 'sometimes|array',
            'duration_options.*' => 'numeric|min:0.5|max:24',
            
            // Location information
            'departure_location' => 'required|string|max:255',
            
            // Optional deposit fields (boat-specific)
            'boat_deposit_required' => 'sometimes|nullable|in:yes,no',
            'deposit_amount' => 'nullable|numeric|min:0',
            'deposit_currency' => 'required_if:boat_deposit_required,yes|nullable|string|max:3|in:EUR,USD,MAD',
            'deposit_note' => 'nullable|string|max:500',
            
            // Optional purpose tags
            'purpose_tags' => 'sometimes|array',
            'purpose_tags.*' => 'string|max:100'
        ];
    }

    /**
     * Activities (Category ID: 5) validation rules
     * 
     * @param Request|null $request
     * @return array
     */
    private function getActivitiesValidationRules(Request $request = null): array
    {
        $rules = [
            // Activity specifications
            'activity_type' => 'required|integer|exists:sub_category_options,id',
            'private_or_group' => 'required|in:Private,Group',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'pickup' => 'required|in:yes,no,Yes,No',
            'meeting_point' => 'required|string|max:255',
            
            // Duration options
            'duration_options' => 'sometimes|array',
            'duration_options.*' => 'numeric|min:0.5|max:48',
            
            // Languages
            'languages_spoken' => 'sometimes|array',
            'languages_spoken.*' => 'string|max:50'
        ];

        // Add group-specific validation if private_or_group is Group
        if ($request && $request->input('private_or_group') === 'Group') {
            $rules['group_size_min'] = 'required|integer|min:1';
            $rules['group_size_max'] = 'required|integer|min:1|max:200';
        }

        return $rules;
    }

    /**
     * Validate duration intervals for boat rentals
     * Ensures durations are in 30-minute intervals
     * 
     * @param array $durations
     * @return bool
     */
    public function validateDurationIntervals(array $durations): bool
    {
        foreach ($durations as $duration) {
            $duration = (float) $duration;
            
            // Check if duration is a multiple of 0.5 (30 minutes)
            if (fmod($duration, 0.5) !== 0.0) {
                return false;
            }
            
            // Check if duration is within acceptable range
            if ($duration < 0.5 || $duration > 24) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Get category defaults based on city selection
     * 
     * @param int $categoryId
     * @param int|null $cityId
     * @return array
     */
    public function getCategoryDefaults(int $categoryId, int $cityId = null): array
    {
        switch ($categoryId) {
            case 3: // Private Driver
                return $this->getPrivateDriverDefaults($cityId);
            case 4: // Boat Rental
                return $this->getBoatRentalDefaults($cityId);
            default:
                return [];
        }
    }

    /**
     * Get default values for private driver based on city
     * 
     * @param int|null $cityId
     * @return array
     */
    private function getPrivateDriverDefaults(int $cityId = null): array
    {
        // You can expand this based on specific city requirements
        $defaults = [
            'languages_spoken' => ['English', 'French'],
            'max_passengers' => 4,
            'max_luggage' => 4
        ];

        // City-specific defaults could be added here
        // Example:
        // if ($cityId === 1) { // Marrakech
        //     $defaults['pickup_location'] = 'Marrakech Airport';
        // }

        return $defaults;
    }

    /**
     * Get default values for boat rental based on city
     * 
     * @param int|null $cityId
     * @return array
     */
    private function getBoatRentalDefaults(int $cityId = null): array
    {
        $defaults = [
            'with_captain' => 'yes',
            'deposit_currency' => 'EUR',
            'capacity' => 8
        ];

        // City-specific marina defaults could be added here
        return $defaults;
    }

    /**
     * Get validation error messages
     * 
     * @return array
     */
    public function getValidationMessages(): array
    {
        return [
            'car_types.required' => 'At least one car type must be selected.',
            'car_types.*.exists' => 'One or more selected car types are invalid.',
            'duration_options.*.numeric' => 'Duration must be a valid number.',
            'group_size_max.min' => 'Maximum group size must be greater than or equal to minimum group size.',
            'deposit_amount.numeric' => 'Deposit amount must be a valid number.',
            'deposit_currency.required_if' => 'Deposit currency is required when deposit is set to yes.',
            'year.max' => 'Year cannot be more than 2 years in the future.',
            'capacity.max' => 'Boat capacity cannot exceed 100 passengers.',
            'max_passengers.max' => 'Maximum passengers cannot exceed 15.',
        ];
    }

    /**
     * Validate category-specific data after basic validation
     * 
     * @param Request $request
     * @param int $categoryId
     * @return array|null Array of errors or null if valid
     */
    public function validateCategoryData(Request $request, int $categoryId): ?array
    {
        $errors = [];

        switch ($categoryId) {
            case 2: // Car Rental
                $errors = array_merge($errors, $this->validateCarRentalData($request));
                break;
            case 4: // Boat Rental
                $errors = array_merge($errors, $this->validateBoatRentalData($request));
                break;
            case 5: // Activities
                $errors = array_merge($errors, $this->validateActivitiesData($request));
                break;
        }

        return empty($errors) ? null : $errors;
    }

    /**
     * Validate car rental specific data
     * 
     * @param Request $request
     * @return array
     */
    private function validateCarRentalData(Request $request): array
    {
        $errors = [];

        // Validate car types array if present
        if ($request->has('car_types') && is_array($request->car_types)) {
            if (empty(array_filter($request->car_types))) {
                $errors['car_types'] = 'At least one car type must be selected.';
            }
        }

        return $errors;
    }

    /**
     * Validate boat rental specific data
     * 
     * @param Request $request
     * @return array
     */
    private function validateBoatRentalData(Request $request): array
    {
        $errors = [];

        // Validate duration intervals
        if ($request->has('duration_options') && is_array($request->duration_options)) {
            if (!$this->validateDurationIntervals($request->duration_options)) {
                $errors['duration_options'] = 'Duration options must be in 30-minute intervals (0.5, 1.0, 1.5, etc.).';
            }
        }

        return $errors;
    }

    /**
     * Validate activities specific data
     * 
     * @param Request $request
     * @return array
     */
    private function validateActivitiesData(Request $request): array
    {
        $errors = [];

        // Validate group size logic
        if ($request->input('private_or_group') === 'Group') {
            $minSize = (int) $request->input('group_size_min', 0);
            $maxSize = (int) $request->input('group_size_max', 0);

            if ($maxSize > 0 && $minSize > $maxSize) {
                $errors['group_size_max'] = 'Maximum group size must be greater than or equal to minimum group size.';
            }
        }

        return $errors;
    }
}
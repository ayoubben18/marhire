/**
 * Field Mapping Utility for MarHire
 * Handles inconsistencies between frontend form fields and backend API expectations
 * 
 * IMPORTANT: Some fields have typos in the database that we must preserve
 * - droppoff_location (should be dropoff_location but has typo)
 * - prefered_date (should be preferred_date but has typo)
 */

export const fieldMappings = {
    // Common field mappings across categories
    common: {
        // Frontend -> Backend mapping
        numberOfPeople: 'number_of_people',
        numberOfPassengers: 'number_of_passengers', 
        dateOfBirth: 'date_of_birth',
        whatsAppNumber: 'whatsapp',
        countryOfResidence: 'country',
        additionalNotes: 'notes',
        
        // Handle typos (keep as-is to match database)
        dropoffLocation: 'droppoff_location', // typo in DB
        preferredDate: 'prefered_date', // typo in DB
    },
    
    // Category-specific mappings
    categories: {
        2: { // Car rental
            pickupDate: 'pickup_date',
            dropoffDate: 'dropoff_date', 
            pickupTime: 'pickup_time',
            dropoffTime: 'dropoff_time',
            pickupLocation: 'pickup_location',
            dropoffLocation: 'droppoff_location', // Note: typo in DB
        },
        
        3: { // Private driver
            serviceDate: 'prefered_date', // Note: typo in DB
            serviceTypes: 'service_type',
            roadTypes: 'road_type',
            pickupCity: 'city_a_id',
            dropoffCity: 'city_b_id',
            dropoffHotel: 'droppoff_location', // Note: typo in DB
            numberOfPassengers: 'number_of_passengers',
            numberOfLuggage: 'max_luggage',
            airportOrIntercity: 'airport_or_intercity',
            languagesSpoken: 'languages_spoken',
        },
        
        4: { // Boat rental
            rentalDate: 'prefered_date', // Note: typo in DB
            boatDuration: 'duration',
            numberOfPeople: 'number_of_people',
            purpose: 'propose',
            boatPickupTime: 'pickup_time',
        },
        
        5: { // Activities/Things to do
            activityDate: 'prefered_date', // Note: typo in DB
            selectedDurationOption: 'custom_booking_option_id',
            pricingOptionId: 'pricing_option_id', // Legacy support
            numberOfPeople: 'number_of_people',
            activityType: 'activity_type',
            timePreference: 'pickup_time',
        }
    }
};

/**
 * Maps frontend field names to backend API field names
 * @param {string} categoryId - The category ID (2, 3, 4, 5)
 * @param {string} frontendFieldName - The frontend field name
 * @returns {string} The backend field name
 */
export const mapFieldName = (categoryId, frontendFieldName) => {
    // Check category-specific mappings first
    const categoryMappings = fieldMappings.categories[categoryId];
    if (categoryMappings && categoryMappings[frontendFieldName]) {
        return categoryMappings[frontendFieldName];
    }
    
    // Check common mappings
    if (fieldMappings.common[frontendFieldName]) {
        return fieldMappings.common[frontendFieldName];
    }
    
    // Return as-is if no mapping found
    return frontendFieldName;
};

/**
 * Maps an entire form data object from frontend to backend field names
 * @param {number} categoryId - The category ID
 * @param {object} formData - The frontend form data
 * @returns {object} The mapped form data with backend field names
 */
export const mapFormData = (categoryId, formData) => {
    const mappedData = {};
    
    for (const [frontendField, value] of Object.entries(formData)) {
        const backendField = mapFieldName(categoryId, frontendField);
        mappedData[backendField] = value;
    }
    
    return mappedData;
};

/**
 * Validation field name mappings for error handling
 * Maps backend validation error field names to frontend field names
 */
export const validationFieldMappings = {
    // Common validations
    'number_of_people': 'numberOfPeople',
    'number_of_passengers': 'numberOfPassengers', 
    'date_of_birth': 'dateOfBirth',
    'whatsapp': 'whatsAppNumber',
    'country': 'countryOfResidence',
    'notes': 'additionalNotes',
    
    // Category-specific validations
    'pickup_date': 'pickupDate',
    'dropoff_date': 'dropoffDate', 
    'pickup_time': 'pickupTime',
    'dropoff_time': 'dropoffTime',
    'pickup_location': 'pickupLocation',
    'droppoff_location': 'dropoffLocation', // Map typo back to frontend
    'prefered_date': 'preferredDate', // Map typo back to frontend
    'service_type': 'serviceTypes',
    'road_type': 'roadTypes',
    'city_a_id': 'pickupCity',
    'city_b_id': 'dropoffCity',
    'max_luggage': 'numberOfLuggage',
    'airport_or_intercity': 'airportOrIntercity',
    'languages_spoken': 'languagesSpoken',
    'duration': 'boatDuration',
    'propose': 'purpose',
    'custom_booking_option_id': 'selectedDurationOption',
    'pricing_option_id': 'pricingOptionId',
    'activity_type': 'activityType',
    'time_preference': 'timePreference',
};

/**
 * Maps backend validation errors to frontend field names
 * @param {object} backendErrors - Validation errors from backend
 * @returns {object} Mapped errors with frontend field names
 */
export const mapValidationErrors = (backendErrors) => {
    const mappedErrors = {};
    
    for (const [backendField, errorMessages] of Object.entries(backendErrors)) {
        const frontendField = validationFieldMappings[backendField] || backendField;
        mappedErrors[frontendField] = errorMessages;
    }
    
    return mappedErrors;
};

export default fieldMappings;
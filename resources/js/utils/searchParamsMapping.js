/**
 * Field mapping utility to standardize parameter names
 * between search forms and booking form
 */

// Map search form field names to booking form field names
export const fieldMappings = {
    // Common fields
    persons: 'numberOfPeople',
    people: 'numberOfPeople',
    guests: 'numberOfPeople',
    
    // Date fields
    date: 'startDate',
    pickup_date: 'startDate',
    start_date: 'startDate',
    dropoff_date: 'endDate',
    end_date: 'endDate',
    
    // Location fields
    pickup: 'pickupLocation',
    pickup_location: 'pickupLocation',
    pickup_city: 'pickupCity',
    dropoff: 'dropoffLocation',
    dropoff_location: 'dropoffLocation',
    dropoff_city: 'dropoffCity',
    city: 'destination',
    city_a: 'pickupCity',
    city_b: 'dropoffCity',
    
    // Time fields
    time: 'boatPickupTime',
    pickup_time: 'pickupTime',
    dropoff_time: 'dropoffTime',
    
    // Service fields
    service_type: 'serviceTypes',
    activity_type: 'activityType',
    boat_type: 'boatType',
    
    // Other fields
    duration: 'boatDuration',
    time_preference: 'timePreference',
};

/**
 * Map search parameters to booking form fields
 * @param {Object} searchParams - Raw search parameters
 * @param {Number} categoryId - Category ID to determine specific mappings
 * @returns {Object} Mapped parameters for booking form
 */
export const mapSearchParams = (searchParams, categoryId) => {
    if (!searchParams || typeof searchParams !== 'object') {
        return {};
    }
    
    const mapped = {};
    
    // Apply common mappings
    Object.keys(searchParams).forEach(key => {
        const mappedKey = fieldMappings[key] || key;
        mapped[mappedKey] = searchParams[key];
    });
    
    // Apply category-specific logic
    switch (categoryId) {
        case 2: // Car rental
            // Ensure both dates are present
            if (mapped.startDate && !mapped.endDate) {
                // Auto-set dropoff to 3 days later if missing
                const pickup = new Date(mapped.startDate);
                pickup.setDate(pickup.getDate() + 3);
                mapped.endDate = formatDate(pickup);
            }
            break;
            
        case 3: // Private driver
            // Map service type to arrays
            if (mapped.serviceTypes && typeof mapped.serviceTypes === 'string') {
                const serviceType = mapped.serviceTypes;
                if (serviceType === 'airport_transfer') {
                    mapped.serviceTypes = ['airport_transfer'];
                    mapped.roadTypes = ['highway'];
                } else if (serviceType === 'hourly') {
                    mapped.serviceTypes = ['hourly'];
                    mapped.roadTypes = ['city'];
                } else {
                    mapped.serviceTypes = ['intercity'];
                    mapped.roadTypes = ['highway'];
                }
            }
            break;
            
        case 4: // Boat rental
            // Convert duration to boat duration format
            if (mapped.duration && !mapped.duration.includes('h')) {
                mapped.boatDuration = mapped.duration + 'h';
                delete mapped.duration;
            }
            break;
            
        case 5: // Activity
            // No special mapping needed
            break;
    }
    
    return mapped;
};

/**
 * Format date to YYYY-MM-DD
 */
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Validate if a date meets minimum advance booking requirements
 * @param {String} dateStr - Date string to validate
 * @param {Number} minDaysAdvance - Minimum days in advance required
 * @returns {Boolean} Whether date is valid
 */
export const isDateValid = (dateStr, minDaysAdvance) => {
    if (!dateStr) return false;
    
    const selectedDate = new Date(dateStr);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + minDaysAdvance);
    minDate.setHours(0, 0, 0, 0);
    
    return selectedDate >= minDate;
};

/**
 * Get minimum valid date based on category
 * @param {Number} categoryId - Category ID
 * @returns {String} Minimum valid date in YYYY-MM-DD format
 */
export const getMinValidDate = (categoryId) => {
    const minDate = new Date();
    
    switch (categoryId) {
        case 2: // Car rental - 24hr advance
        case 3: // Private driver - 24hr advance
            minDate.setDate(minDate.getDate() + 1);
            break;
        case 4: // Boat - 48hr advance
        case 5: // Activity - 48hr advance
            minDate.setDate(minDate.getDate() + 2);
            break;
        default:
            minDate.setDate(minDate.getDate() + 1);
    }
    
    minDate.setHours(0, 0, 0, 0);
    return formatDate(minDate);
};
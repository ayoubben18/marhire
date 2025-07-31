/**
 * Price Calculation API Integration
 * Connects frontend to backend advanced pricing engine
 */

import axios from 'axios';

/**
 * Get CSRF token from meta tag
 */
const getCSRFToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.getAttribute('content') : null;
};

/**
 * Configure axios defaults for CSRF protection
 */
axios.defaults.headers.common['X-CSRF-TOKEN'] = getCSRFToken();
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Calculate price using backend API
 * @param {object} params - Price calculation parameters
 * @returns {Promise<object>} Price calculation response
 */
export const calculatePriceFromAPI = async (params) => {
    try {
        const response = await axios.post('/api/bookings/calculate-price', params);
        
        if (response.data.success) {
            return {
                success: true,
                basePrice: response.data.data.base_price,
                totalAddons: response.data.data.total_addons,
                total: response.data.data.total,
                pricingDetails: response.data.data.pricing_details,
                notifications: response.data.data.notifications || [],
                addons: response.data.data.addons || []
            };
        }
        
        throw new Error(response.data.message || 'Price calculation failed');
    } catch (error) {
        console.error('Price calculation error:', error);
        
        // Return error with details for user feedback
        return {
            success: false,
            error: error.response?.data?.message || 'Unable to calculate price. Please try again.',
            validationErrors: error.response?.data?.errors || {}
        };
    }
};

/**
 * Prepare request data for car rental pricing
 * @param {object} formData - Form data from booking form
 * @param {number} listingId - Listing ID
 * @returns {object} API request data
 */
export const prepareCarRentalPricingData = (formData, listingId) => {
    return {
        listing_id: listingId,
        category_id: 2,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime || '10:00',
        dropoff_date: formData.dropoffDate,
        dropoff_time: formData.dropoffTime || '10:00',
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation,
        addon_ids: formData.selectedAddons || []
    };
};

/**
 * Prepare request data for boat rental pricing
 * @param {object} formData - Form data from booking form
 * @param {number} listingId - Listing ID
 * @returns {object} API request data
 */
export const prepareBoatRentalPricingData = (formData, listingId) => {
    // Convert duration format (e.g., "2h" -> 2, "30min" -> 0.5)
    let duration = 1;
    if (formData.boatDuration) {
        if (formData.boatDuration.includes('min')) {
            const minutes = parseFloat(formData.boatDuration.replace('min', ''));
            duration = minutes / 60;
        } else if (formData.boatDuration.includes('h')) {
            duration = parseFloat(formData.boatDuration.replace('h', ''));
        }
    }
    
    return {
        listing_id: listingId,
        category_id: 4,
        duration: duration,
        number_of_people: parseInt(formData.numberOfPeople) || 1,
        addon_ids: formData.selectedAddons || []
    };
};

/**
 * Prepare request data for things to do pricing
 * @param {object} formData - Form data from booking form
 * @param {number} listingId - Listing ID
 * @param {object} listing - Listing object
 * @returns {object} API request data
 */
export const prepareThingsToDooPricingData = (formData, listingId, listing) => {
    return {
        listing_id: listingId,
        category_id: 5,
        custom_booking_option_id: parseInt(formData.selectedDurationOption),
        number_of_people: parseInt(formData.numberOfPeople) || 1,
        activity_type: listing?.activity_type || formData.activityType || 'private',
        addon_ids: formData.selectedAddons || []
    };
};

/**
 * Prepare request data for private driver pricing
 * @param {object} formData - Form data from booking form
 * @param {number} listingId - Listing ID
 * @returns {object} API request data
 */
export const preparePrivateDriverPricingData = (formData, listingId) => {
    // Ensure arrays for service_type and road_type
    const serviceTypes = Array.isArray(formData.serviceTypes) 
        ? formData.serviceTypes 
        : [formData.serviceTypes || 'intercity'];
    
    const roadTypes = Array.isArray(formData.roadTypes)
        ? formData.roadTypes
        : [formData.roadTypes || 'one_way'];
    
    const data = {
        listing_id: listingId,
        category_id: 3,
        service_type: serviceTypes,
        road_type: roadTypes,
        city_a_id: parseInt(formData.pickupCity) || parseInt(formData.cityAId) || 1,
        addon_ids: formData.selectedAddons || []
    };
    
    // Only add city_b_id for intercity routes
    if (serviceTypes.includes('intercity')) {
        data.city_b_id = parseInt(formData.dropoffCity) || parseInt(formData.cityBId) || null;
    }
    
    return data;
};

/**
 * Unified price calculation function
 * @param {number} categoryId - Category ID
 * @param {object} formData - Form data
 * @param {number} listingId - Listing ID
 * @param {object} listing - Listing object
 * @returns {Promise<object>} Price calculation result
 */
export const calculatePrice = async (categoryId, formData, listingId, listing) => {
    let requestData = {};
    
    switch (categoryId) {
        case 2: // Car Rental
            requestData = prepareCarRentalPricingData(formData, listingId);
            break;
            
        case 3: // Private Driver
            requestData = preparePrivateDriverPricingData(formData, listingId);
            break;
            
        case 4: // Boat Rental
            requestData = prepareBoatRentalPricingData(formData, listingId);
            break;
            
        case 5: // Things to Do
            requestData = prepareThingsToDooPricingData(formData, listingId, listing);
            break;
            
        default:
            return {
                success: false,
                error: 'Invalid category'
            };
    }
    
    return await calculatePriceFromAPI(requestData);
};

/**
 * Validate price before submission
 * @param {number} calculatedPrice - Price calculated by frontend
 * @param {number} categoryId - Category ID
 * @param {object} formData - Form data
 * @param {number} listingId - Listing ID
 * @param {object} listing - Listing object
 * @returns {Promise<boolean>} True if price is valid
 */
export const validatePriceBeforeSubmission = async (calculatedPrice, categoryId, formData, listingId, listing) => {
    const apiResult = await calculatePrice(categoryId, formData, listingId, listing);
    
    if (!apiResult.success) {
        console.error('Price validation failed:', apiResult.error);
        return false;
    }
    
    // Allow small difference due to rounding
    const priceDifference = Math.abs(calculatedPrice - apiResult.total);
    const isValid = priceDifference < 0.01;
    
    if (!isValid) {
        console.error('Price mismatch:', {
            frontend: calculatedPrice,
            backend: apiResult.total,
            difference: priceDifference
        });
    }
    
    return isValid;
};
/**
 * Booking Helper Utilities
 * Shared functions for booking forms across all categories
 */

/**
 * Format date to YYYY-MM-DD format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

/**
 * Format time to HH:MM format
 * @param {string} time - Time string
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
    if (!time) return "10:00";
    // Ensure it's in HH:MM format
    const parts = time.split(":");
    if (parts.length === 2) {
        const hours = parts[0].padStart(2, "0");
        const minutes = parts[1].padStart(2, "0");
        return `${hours}:${minutes}`;
    }
    return time;
};

/**
 * Calculate base price based on category and duration with exact backend formulas
 * @param {number} categoryId - Category ID (2: Car Rental, 3: Private Driver, 4: Boat, 5: Activity)
 * @param {number} basePrice - Base price per unit (per day for cars, per hour for boats, per person for activities)
 * @param {object} params - Category-specific parameters
 * @param {string} params.startDate - Start date in YYYY-MM-DD format
 * @param {string} params.endDate - End date for car rentals
 * @param {Array} params.selectedAddons - Array of selected add-on IDs for car rentals
 * @param {object} params.listing - Listing object containing pricing information
 * @param {number} params.numberOfPeople - Number of people for boats and activities
 * @param {string} params.selectedDurationOption - Selected duration option ID for activities
 * @param {string} params.boatDuration - Duration string for boats (e.g., "30min", "2h")
 * @param {Array} params.serviceTypes - Service types for private driver (airport_transfer, intercity)
 * @param {Array} params.roadTypes - Road types for private driver (one_way, road_trip)
 * @param {string} params.pickupCity - Pickup city ID for private driver
 * @param {string} params.dropoffCity - Dropoff city ID for private driver
 * @param {string} params.pickupTime - Pickup time for car rental
 * @param {string} params.dropoffTime - Dropoff time for car rental
 * @returns {number} Calculated total price
 */
export const calculatePrice = (categoryId, basePrice, params = {}) => {
    const { startDate, endDate, selectedAddons, listing, numberOfPeople, selectedDurationOption, boatDuration, pickupTime, dropoffTime } = params;
    
    switch (categoryId) {
        case 2: // Car Rental - Advanced tiered pricing
            let totalPrice = 0;
            
            if (startDate && endDate && listing) {
                // Calculate exact hours between dates
                const start = new Date(`${startDate} ${pickupTime || '10:00'}`);
                const end = new Date(`${endDate} ${dropoffTime || '10:00'}`);
                const totalMinutes = (end - start) / (1000 * 60);
                
                // Every 24h (1440 minutes) = 1 day, any excess = +1 day
                const days = Math.ceil(totalMinutes / 1440);
                
                // Apply pricing tiers exactly as backend
                let pricePerDay;
                if (days < 7) {
                    // Daily rate for less than 7 days
                    pricePerDay = listing.price_per_day || basePrice;
                    totalPrice = pricePerDay * days;
                } else if (days < 30) {
                    // Weekly rate for 7-29 days
                    pricePerDay = (listing.price_per_week || listing.price_per_day * 7) / 7;
                    totalPrice = pricePerDay * days;
                } else {
                    // Monthly rate for 30+ days
                    pricePerDay = (listing.price_per_month || listing.price_per_day * 30) / 30;
                    totalPrice = pricePerDay * days;
                }
            }
            
            // Add selected add-ons to the total price
            if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
                const addonsPrice = selectedAddons.reduce((total, addonId) => {
                    const addon = listing.addons.find(item => item?.addon?.id === addonId);
                    return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
                }, 0);
                totalPrice += addonsPrice;
            }
            
            return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places

        case 3: // Private Driver - Route-based pricing from DriverPricing table
            const { serviceTypes, roadTypes, pickupCity, dropoffCity } = params;
            let driverPrice = basePrice;
            
            // For driver pricing, we need the driverPricings relationship
            if (listing?.driverPricings?.length > 0 && serviceTypes?.length > 0 && roadTypes?.length > 0) {
                // Find matching pricing based on service type, road type, and cities
                const pricing = listing.driverPricings.find(p => {
                    const serviceMatch = serviceTypes.includes(p.service_type);
                    const roadMatch = roadTypes.includes(p.road_type);
                    const cityAMatch = p.city_a_id == pickupCity;
                    
                    if (serviceTypes.includes('airport_transfer') && serviceTypes.length === 1) {
                        // Airport transfer only needs city_a
                        return serviceMatch && roadMatch && cityAMatch && !p.city_b_id;
                    } else if (serviceTypes.includes('intercity')) {
                        // Intercity needs both cities
                        const cityBMatch = p.city_b_id == dropoffCity;
                        return serviceMatch && roadMatch && cityAMatch && cityBMatch;
                    }
                    return false;
                });
                
                if (pricing) {
                    driverPrice = pricing.price;
                }
            } else if (listing?.pricings?.length > 0 && serviceTypes && serviceTypes.length > 0) {
                // Fallback to legacy pricing structure if new pricing not found
                const pricing = listing.pricings.find(p => {
                    if (serviceTypes.includes('intercity') && (pickupCity || dropoffCity)) {
                        return p?.city_id == (dropoffCity || pickupCity);
                    }
                    return false;
                });
                
                if (pricing) {
                    // - airport_round: Airport transfer round-trip
                    // - intercity_one: City-to-city one-way
                    // - intercity_round: City-to-city round-trip
                    if (serviceTypes.includes('airport_transfer')) {
                        if (roadTypes?.includes('road_trip')) {
                            driverPrice = parseFloat(pricing.airport_round) || basePrice;
                        } else {
                            driverPrice = parseFloat(pricing.airport_one) || basePrice;
                        }
                    } else if (serviceTypes.includes('intercity')) {
                        if (roadTypes?.includes('road_trip')) {
                            driverPrice = parseFloat(pricing.intercity_round) || basePrice;
                        } else {
                            driverPrice = parseFloat(pricing.intercity_one) || basePrice;
                        }
                    }
                }
            }
            
            // Start with the driver price
            let driverTotalPrice = driverPrice;
            
            // Add selected add-ons to the total price
            if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
                const addonsPrice = selectedAddons.reduce((total, addonId) => {
                    const addon = listing.addons.find(item => item?.addon?.id === addonId);
                    return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
                }, 0);
                driverTotalPrice += addonsPrice;
            }
            
            return Math.round(driverTotalPrice * 100) / 100;

        case 4: // Boat Rental - Hour range pricing
            if (!listing) return basePrice;
            
            // Parse duration to hours
            let hours = 1;
            if (boatDuration) {
                if (typeof boatDuration === 'string') {
                    if (boatDuration.includes('min')) {
                        const minutes = parseFloat(boatDuration.replace('min', ''));
                        hours = minutes / 60;
                    } else if (boatDuration.includes('h')) {
                        hours = parseFloat(boatDuration.replace('h', ''));
                    } else {
                        // Handle plain numbers like "3" or "5.5"
                        hours = parseFloat(boatDuration);
                    }
                } else if (typeof boatDuration === 'number') {
                    hours = boatDuration;
                }
            }
            
            // Apply exact hour range pricing as backend
            let price = 0;
            if (hours >= 0.5 && hours <= 1.5) {
                // 30min to 1.5 hours: price_per_hour * hours
                price = (listing.price_per_hour || basePrice) * hours;
            } else if (hours >= 2 && hours <= 4) {
                // 2 to 4 hours: use flat half-day rate
                price = listing.price_per_half_day || listing.price_per_hour * 4;
            } else if (hours >= 4.5 && hours <= 8) {
                // 4.5 to 8 hours: use flat full-day rate
                price = listing.price_per_day || listing.price_per_hour * 8;
            } else {
                // Invalid duration - use hourly rate as fallback
                price = (listing.price_per_hour || basePrice) * hours;
            }
            
            // Add selected add-ons to the total price
            if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
                const addonsPrice = selectedAddons.reduce((total, addonId) => {
                    const addon = listing.addons.find(item => item?.addon?.id === addonId);
                    return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
                }, 0);
                price += addonsPrice;
            }
            
            return Math.round(price * 100) / 100;

        case 5: // Activity - Custom booking options
            const people = parseInt(numberOfPeople) || 1;
            let activityPrice = 0;
            
            // Activities use customBookingOptions for pricing
            // Check both customBookingOptions and custom_booking_options (different API responses)
            const customOptions = listing?.customBookingOptions || listing?.custom_booking_options;
            
            if (selectedDurationOption && customOptions?.length > 0) {
                const selectedOption = customOptions.find(opt => opt?.id == selectedDurationOption);
                if (selectedOption?.price) {
                    const optionPrice = parseFloat(selectedOption.price);
                    // Check activity type (private vs group)
                    if (listing?.private_or_group?.toLowerCase() === 'group') {
                        // Group activities: Fixed price for the whole group
                        activityPrice = optionPrice;
                    } else {
                        // Private activities: Price per person
                        activityPrice = optionPrice * people;
                    }
                }
            } else if (selectedDurationOption && listing?.actPricings?.length > 0) {
                // Fallback to actPricings if customBookingOptions not available
                const selectedPricing = listing.actPricings.find(p => p?.id == selectedDurationOption);
                if (selectedPricing?.price) {
                    const pricingPrice = parseFloat(selectedPricing.price);
                    if (listing?.private_or_group?.toLowerCase() === 'group') {
                        activityPrice = pricingPrice;
                    } else {
                        activityPrice = pricingPrice * people;
                    }
                }
            } else if (!selectedDurationOption) {
                // If no option selected for activities, start with 0
                activityPrice = 0;
            } else {
                // Final fallback: base price × number of people
                activityPrice = people * basePrice;
            }
            
            // Add selected add-ons to the total price
            if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
                const addonsPrice = selectedAddons.reduce((total, addonId) => {
                    const addon = listing.addons.find(item => item?.addon?.id === addonId);
                    const addonBasePrice = addon?.addon?.price ? parseFloat(addon.addon.price) : 0;
                    // For private activities, multiply addon price by number of people
                    if (listing?.private_or_group?.toLowerCase() === 'private') {
                        return total + (addonBasePrice * people);
                    }
                    // For group activities, addon price is fixed
                    return total + addonBasePrice;
                }, 0);
                activityPrice += addonsPrice;
            }
            
            return Math.round(activityPrice * 100) / 100;

        default:
            return basePrice;
    }
};

/**
 * Calculate price with detailed information
 * @param {number} categoryId - Category ID
 * @param {number} basePrice - Base price for the listing
 * @param {object} params - Calculation parameters
 * @returns {object} Object with price and pricing details
 */
export const calculatePriceWithDetails = (categoryId, basePrice, params = {}) => {
    const baseCalculatedPrice = calculatePrice(categoryId, basePrice, params);
    
    // Calculate addons separately
    const { selectedAddons, listing, numberOfPeople } = params;
    const addonsTotal = calculateAddonsTotal(selectedAddons, listing, numberOfPeople || 1);
    
    const details = {
        price: baseCalculatedPrice,
        basePrice: Math.max(0, baseCalculatedPrice - addonsTotal), // Ensure basePrice never goes negative
        addonsTotal: addonsTotal,
        rateType: '',
        rateDescription: '',
        priceBreakdown: null
    };
    
    const { startDate, endDate, boatDuration } = params;
    
    switch (categoryId) {
        case 2: // Car Rental
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = Math.abs(end - start);
                const diffMinutes = Math.ceil(diffTime / (1000 * 60));
                const days = Math.ceil(diffMinutes / 1440);
                
                if (days < 7) {
                    details.rateType = 'daily';
                    details.rateDescription = `Daily rate: €${listing?.price_per_day || basePrice}/day`;
                } else if (days < 30) {
                    details.rateType = 'weekly';
                    const weeklyRate = listing?.price_per_week ? (listing.price_per_week / 7).toFixed(2) : basePrice;
                    details.rateDescription = `Weekly rate: €${weeklyRate}/day (from €${listing?.price_per_week || basePrice * 7}/week)`;
                } else {
                    details.rateType = 'monthly';
                    const monthlyRate = listing?.price_per_month ? (listing.price_per_month / 30).toFixed(2) : basePrice;
                    details.rateDescription = `Monthly rate: €${monthlyRate}/day (from €${listing?.price_per_month || basePrice * 30}/month)`;
                }
            }
            break;
            
        case 4: // Boat Rental
            if (boatDuration && listing) {
                let hours = 1;
                if (typeof boatDuration === 'string') {
                    if (boatDuration.includes('min')) {
                        const minutes = parseFloat(boatDuration.replace('min', ''));
                        hours = minutes / 60;
                    } else if (boatDuration.includes('h')) {
                        hours = parseFloat(boatDuration.replace('h', ''));
                    } else {
                        // Handle plain numbers like "3" or "5.5"
                        hours = parseFloat(boatDuration);
                    }
                } else if (typeof boatDuration === 'number') {
                    hours = boatDuration;
                }
                
                details.priceBreakdown = {
                    hourly: listing.price_per_hour || basePrice,
                    halfDay: listing.price_per_half_day || listing.price_per_hour * 4,
                    fullDay: listing.price_per_day || listing.price_per_hour * 8
                };
                
                if (hours >= 0.5 && hours <= 1.5) {
                    details.rateType = 'hourly';
                    details.rateDescription = `Hourly rate: €${listing.price_per_hour || basePrice}/hour`;
                } else if (hours >= 2 && hours <= 4) {
                    details.rateType = 'halfDay';
                    details.rateDescription = `Half-day rate: €${listing.price_per_half_day || listing.price_per_hour * 4} for 4 hours`;
                } else if (hours >= 4.5 && hours <= 8) {
                    details.rateType = 'fullDay';
                    details.rateDescription = `Full-day rate: €${listing.price_per_day || listing.price_per_hour * 8} for 8 hours`;
                }
            }
            break;
    }
    
    return details;
};

/**
 * Calculate total add-ons price
 * @param {Array} selectedAddons - Array of selected add-on IDs
 * @param {object} listing - Listing object containing addons array
 * @param {number} numberOfPeople - Number of people for activities (optional)
 * @returns {number} Total add-ons price
 */
export const calculateAddonsTotal = (selectedAddons, listing, numberOfPeople = 1) => {
    if (!Array.isArray(selectedAddons) || !listing?.addons?.length) return 0;
    
    return selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        const addonBasePrice = addon?.addon?.price ? parseFloat(addon.addon.price) : 0;
        
        // For private activities (category 5), multiply addon price by number of people
        if (listing?.category_id === 5 && listing?.private_or_group?.toLowerCase() === 'private') {
            return total + (addonBasePrice * numberOfPeople);
        }
        
        // For other categories or group activities, addon price is fixed
        return total + addonBasePrice;
    }, 0);
};

/**
 * Validate booking date is in the future
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {boolean} True if date is valid (tomorrow or later)
 */
export const isValidBookingDate = (date) => {
    if (!date) return false;
    const bookingDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= tomorrow;
};

/**
 * Get category name from ID
 * @param {number} categoryId - Category ID
 * @returns {string} Category name
 */
export const getCategoryName = (categoryId) => {
    const categories = {
        2: "Car Rental",
        3: "Private Driver",
        4: "Boat Rental",
        5: "Activity"
    };
    return categories[categoryId] || "Service";
};

/**
 * Get category icon component
 * @param {number} categoryId - Category ID
 * @returns {object} Icon configuration
 */
export const getCategoryIcon = (categoryId) => {
    const icons = {
        2: { name: "DirectionsCar", color: "primary" },
        3: { name: "Person", color: "secondary" },
        4: { name: "DirectionsBoat", color: "info" },
        5: { name: "LocalActivity", color: "success" }
    };
    return icons[categoryId] || { name: "Category", color: "default" };
};

/**
 * Format error messages for display
 * @param {object} errors - Laravel validation errors object
 * @param {string} field - Field name
 * @returns {string} Error message or empty string
 */
export const getFieldError = (errors, field) => {
    if (!errors || !errors[field]) return "";
    return Array.isArray(errors[field]) ? errors[field][0] : errors[field];
};

/**
 * Clear specific field error
 * @param {object} errors - Current errors object
 * @param {string} field - Field to clear
 * @returns {object} Updated errors object
 */
export const clearFieldError = (errors, field) => {
    const newErrors = { ...errors };
    delete newErrors[field];
    return newErrors;
};

/**
 * Prepare form data for submission based on category
 * @param {number} categoryId - Category ID
 * @param {object} formData - Raw form data
 * @param {object} listing - Listing object with pricing info
 * @returns {object} Formatted data for API submission
 */
export const prepareSubmissionData = (categoryId, formData, listing) => {
    const baseData = {
        category_id: categoryId,
        listing_id: listing.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        country: formData.country,
        booking_source: "Client Booking"
    };

    // Add category-specific fields
    switch (categoryId) {
        case 2: // Car Rental
            return {
                ...baseData,
                pickup_date: formatDate(formData.pickupDate),
                dropoff_date: formatDate(formData.dropoffDate),
                pickup_time: formatTime(formData.pickupTime),
                dropoff_time: formatTime(formData.dropoffTime),
                pickup_location: formData.pickupLocation,
                droppoff_location: formData.dropoffLocation, // Note: typo in DB
                age: parseInt(formData.age) || 25,
                flight_number: formData.flightNumber || null
            };

        case 3: // Private Driver
            return {
                ...baseData,
                car_type: formData.carType,
                airport_or_intercity: formData.airportOrIntercity,
                city_a_id: formData.cityAId,
                city_b_id: formData.cityBId,
                prefered_date: formatDate(formData.preferredDate), // Note: typo in DB
                number_of_people: parseInt(formData.numberOfPeople) || 1
            };

        case 4: // Boat Rental
            return {
                ...baseData,
                duration: String(formData.duration),
                propose: formData.purpose || null,
                prefered_date: formatDate(formData.preferredDate),
                number_of_people: parseInt(formData.numberOfPeople) || 1
            };

        case 5: // Activity
            return {
                ...baseData,
                prefered_date: formatDate(formData.preferredDate),
                pricing_option_id: formData.pricingOptionId || null,
                number_of_people: parseInt(formData.numberOfPeople) || 1,
                activity_type: formData.activityType || null
            };

        default:
            return baseData;
    }
};

/**
 * Get validation rules for category
 * @param {number} categoryId - Category ID
 * @returns {object} Validation rules for form fields
 */
export const getCategoryValidationRules = (categoryId) => {
    const baseRules = {
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        whatsapp: { required: true, minLength: 10 },
        country: { required: true }
    };

    switch (categoryId) {
        case 2: // Car Rental
            return {
                ...baseRules,
                pickupDate: { required: true, futureDate: true },
                dropoffDate: { required: true, futureDate: true, afterPickup: true },
                pickupLocation: { required: true },
                dropoffLocation: { required: true }
            };

        case 3: // Private Driver
            return {
                ...baseRules,
                carType: { required: true },
                preferredDate: { required: true, futureDate: true },
                numberOfPeople: { required: true, min: 1 }
            };

        case 4: // Boat Rental
            return {
                ...baseRules,
                duration: { required: true, min: 1 },
                preferredDate: { required: true, futureDate: true },
                numberOfPeople: { required: true, min: 1 }
            };

        case 5: // Activity
            return {
                ...baseRules,
                preferredDate: { required: true, futureDate: true },
                numberOfPeople: { required: true, min: 1 }
            };

        default:
            return baseRules;
    }
};
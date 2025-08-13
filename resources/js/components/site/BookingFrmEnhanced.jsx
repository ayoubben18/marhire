import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search, Users, Car, Anchor, Activity, AlertCircle } from "lucide-react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Alert, Stepper, Step, StepLabel, Box, FormControlLabel, Checkbox, Chip, Snackbar } from "@mui/material";
import BookingDetailsStep from "./BookingDetailsStep";
import ClientInfoStep from "./ClientInfoStep";
import { 
    formatDate, 
    formatTime, 
    isValidBookingDate, 
    getCategoryName as getCategoryNameUtil,
    getFieldError,
    clearFieldError
} from "../../utils/bookingHelpers";
import {
    calculatePrice as calculatePriceAPI,
    validatePriceBeforeSubmission
} from "../../utils/priceCalculationApi";

/**
 * Enhanced Booking Form with Backend API Integration
 * This component properly integrates with the advanced pricing backend
 */
const BookingFrmEnhanced = ({ loading, listingId, categoryId, listing }) => {
    // ... [Keep all existing state declarations]
    const [currentStep, setCurrentStep] = useState(0);
    const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    const [priceDetails, setPriceDetails] = useState(null);
    const [priceNotifications, setPriceNotifications] = useState([]);
    const [showPriceError, setShowPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");
    
    // Debounce timer for price calculation
    const [priceCalculationTimer, setPriceCalculationTimer] = useState(null);
    
    /**
     * Calculate price when form data changes
     */
    const calculatePriceWithAPI = async () => {
        // Clear any existing timer
        if (priceCalculationTimer) {
            clearTimeout(priceCalculationTimer);
        }
        
        // Don't calculate if minimum data not provided
        if (!isMinimumDataForPricing()) {
            return;
        }
        
        // Set a new timer to debounce API calls
        const timer = setTimeout(async () => {
            setIsCalculatingPrice(true);
            setShowPriceError(false);
            
            try {
                const formData = collectFormData();
                const result = await calculatePriceAPI(categoryId, formData, listingId, listing);
                
                if (result.success) {
                    setCalculatedPrice(result.total);
                    setPriceDetails(result.pricingDetails);
                    setPriceNotifications(result.notifications || []);
                } else {
                    setPriceErrorMessage(result.error);
                    setShowPriceError(true);
                    
                    // Show validation errors if any
                    if (result.validationErrors && Object.keys(result.validationErrors).length > 0) {
                        setErrors(result.validationErrors);
                    }
                }
            } catch (error) {
                console.error('Price calculation error:', error);
                setPriceErrorMessage('Unable to calculate price. Please check your inputs.');
                setShowPriceError(true);
            } finally {
                setIsCalculatingPrice(false);
            }
        }, 500); // 500ms debounce
        
        setPriceCalculationTimer(timer);
    };
    
    /**
     * Check if we have minimum data for pricing
     */
    const isMinimumDataForPricing = () => {
        switch(categoryId) {
            case 2: // Car rental
                return startDate && endDate && pickupTime && dropoffTime && pickupLocation && dropoffLocation;
            case 3: // Private driver
                return serviceTypes.length > 0 && roadTypes.length > 0 && 
                       ((serviceTypes.includes('airport_transfer') && pickupAirport) ||
                        (serviceTypes.includes('intercity') && pickupCity));
            case 4: // Boat rental
                return boatDuration && numberOfPeople > 0;
            case 5: // Activity
                return selectedDurationOption && numberOfPeople > 0;
            default:
                return false;
        }
    };
    
    /**
     * Collect form data for API
     */
    const collectFormData = () => {
        const baseData = {
            listingId,
            selectedAddons,
            // Common fields
            firstName: fullName.split(' ')[0] || '',
            lastName: fullName.split(' ').slice(1).join(' ') || '',
            email,
            whatsapp: whatsAppNumber,
            country: countryOfResidence,
            dateOfBirth,
            additionalNotes
        };
        
        // Category-specific data
        switch(categoryId) {
            case 2: // Car rental
                return {
                    ...baseData,
                    pickupDate: startDate,
                    dropoffDate: endDate,
                    pickupTime,
                    dropoffTime,
                    pickupLocation,
                    dropoffLocation,
                    age: calculateAgeFromDOB(dateOfBirth),
                    flightNumber
                };
                
            case 3: // Private driver
                return {
                    ...baseData,
                    serviceTypes,
                    roadTypes,
                    pickupCity,
                    dropoffCity,
                    cityAId: pickupCity,
                    cityBId: dropoffCity,
                    pickupAirport,
                    dropoffHotel,
                    numberOfPassengers,
                    numberOfLuggage,
                    addons: selectedAddons
                };
                
            case 4: // Boat rental
                return {
                    ...baseData,
                    boatDuration,
                    numberOfPeople,
                    purpose,
                    destination,
                    preferredDate: startDate,
                    pickupTime: boatPickupTime,
                    addons: selectedAddons
                };
                
            case 5: // Activity
                return {
                    ...baseData,
                    selectedDurationOption,
                    numberOfPeople,
                    activityType: listing?.activity_type || activityType,
                    preferredDate: startDate,
                    timePreference,
                    addons: selectedAddons
                };
                
            default:
                return baseData;
        }
    };
    
    /**
     * Calculate age from date of birth
     */
    const calculateAgeFromDOB = (dob) => {
        if (!dob) return 25;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    /**
     * Watch for changes and recalculate price
     */
    useEffect(() => {
        calculatePriceWithAPI();
    }, [
        // Car rental
        startDate, endDate, pickupTime, dropoffTime, pickupLocation, dropoffLocation, selectedAddons,
        // Private driver
        serviceTypes, roadTypes, pickupCity, dropoffCity,
        // Boat rental
        boatDuration, numberOfPeople,
        // Activity
        selectedDurationOption
    ]);
    
    /**
     * Enhanced form submission with price validation
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            setErrors({
                general: 'Please fill in all required fields'
            });
            return;
        }
        
        setIsSubmitting(true);
        setErrors({});
        
        try {
            // Validate price with backend before submission
            const formData = collectFormData();
            const isPriceValid = await validatePriceBeforeSubmission(
                calculatedPrice,
                categoryId,
                formData,
                listingId,
                listing
            );
            
            if (!isPriceValid) {
                setErrors({
                    general: 'Price validation failed. Please refresh and try again.'
                });
                setIsSubmitting(false);
                return;
            }
            
            // Prepare submission data
            const submissionData = prepareSubmissionData(formData);
            
            // Submit booking
            const response = await axios.post('/api/bookings/submit', submissionData);
            
            if (response.data.success && response.data.confirmation_number) {
                setConfirmationNumber(response.data.confirmation_number);
                setShowSuccess(true);
                resetForm();
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({
                    general: error.response?.data?.message || 'An error occurred. Please try again.'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    /**
     * Prepare data for submission with new field mappings
     */
    const prepareSubmissionData = (formData) => {
        const [firstName, ...lastNameParts] = fullName.split(' ');
        const lastName = lastNameParts.join(' ');
        
        const baseData = {
            listing_id: listingId,
            category_id: categoryId,
            fullName,
            email,
            whatsAppNumber,
            countryOfResidence,
            dateOfBirth,
            flightNumber: flightNumber || null,
            additionalNotes,
            // Legacy fields for backward compatibility
            first_name: firstName,
            last_name: lastName,
            whatsapp: whatsAppNumber,
            country: countryOfResidence,
            notes: additionalNotes,
            booking_source: 'Client Booking'
        };
        
        // Add category-specific fields
        switch(categoryId) {
            case 2: // Car rental
                return {
                    ...baseData,
                    pickup_date: startDate,
                    dropoff_date: endDate,
                    pickup_time: pickupTime,
                    dropoff_time: dropoffTime,
                    pickup_location: pickupLocation,
                    droppoff_location: dropoffLocation, // Note: typo in DB
                    addons: selectedAddons,
                    age: calculateAgeFromDOB(dateOfBirth)
                };
                
            case 3: // Private driver
                return {
                    ...baseData,
                    prefered_date: startDate,
                    service_type: serviceTypes,
                    road_type: roadTypes,
                    city_a_id: pickupCity,
                    city_b_id: dropoffCity,
                    number_of_people: numberOfPassengers,
                    car_type: listing?.vehicule_type || 'Standard',
                    airport_or_intercity: serviceTypes.join(','),
                    notes: `Service: ${serviceTypes.join(', ')}, Road: ${roadTypes.join(', ')}, Luggage: ${numberOfLuggage}`,
                    addons: selectedAddons
                };
                
            case 4: // Boat rental
                return {
                    ...baseData,
                    prefered_date: startDate,
                    pickup_time: boatPickupTime,
                    duration: boatDuration,
                    number_of_people: numberOfPeople,
                    propose: purpose,
                    addons: selectedAddons
                };
                
            case 5: // Activity
                return {
                    ...baseData,
                    prefered_date: startDate,
                    custom_booking_option_id: selectedDurationOption,
                    pricing_option_id: selectedDurationOption, // Legacy
                    number_of_people: numberOfPeople,
                    activity_type: listing?.activity_type || activityType,
                    pickup_time: timePreference,
                    addons: selectedAddons
                };
                
            default:
                return baseData;
        }
    };
    
    // ... [Rest of the component remains the same]
    
    return (
        !loading && (
            <form onSubmit={handleSubmit} className="singlelisting-booking" id="singlelistingBooking">
                {/* Price Display Section */}
                {calculatedPrice !== null && (
                    <Box className="price-summary-box mb-4 p-4 bg-gray-50 rounded-lg">
                        <Typography variant="h6" className="mb-2">
                            Price Summary
                        </Typography>
                        
                        {isCalculatingPrice ? (
                            <Box className="flex items-center justify-center py-4">
                                <CircularProgress size={24} />
                                <Typography className="ml-2">Calculating...</Typography>
                            </Box>
                        ) : (
                            <>
                                <Typography variant="h4" className="text-primary font-bold">
                                    {calculatedPrice.toFixed(2)} MAD
                                </Typography>
                                
                                {priceNotifications.length > 0 && (
                                    <Box className="mt-2">
                                        {priceNotifications.map((notification, index) => (
                                            <Alert 
                                                key={index} 
                                                severity="info" 
                                                icon={<AlertCircle className="w-4 h-4" />}
                                                className="mb-1"
                                            >
                                                {notification}
                                            </Alert>
                                        ))}
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                )}
                
                {/* Price Error Notification */}
                <Snackbar 
                    open={showPriceError} 
                    autoHideDuration={6000} 
                    onClose={() => setShowPriceError(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error" onClose={() => setShowPriceError(false)}>
                        {priceErrorMessage}
                    </Alert>
                </Snackbar>
                
                {/* ... Rest of the form remains the same ... */}
            </form>
        )
    );
};

export default BookingFrmEnhanced;
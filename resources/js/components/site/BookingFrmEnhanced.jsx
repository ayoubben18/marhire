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
import { mapValidationErrors } from "../../utils/fieldMappings";

/**
 * Enhanced Booking Form with Backend API Integration
 * This component properly integrates with the advanced pricing backend
 */
const BookingFrmEnhanced = ({ loading, listingId, categoryId, listing }) => {
    // Step management state
    const [currentStep, setCurrentStep] = useState(0);
    const [searchParamsLoaded, setSearchParamsLoaded] = useState(false);
    
    // Common states for all categories
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    
    // Form submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [errors, setErrors] = useState({});
    
    // Guest information - common for all categories
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsAppNumber, setWhatsAppNumber] = useState("");
    const [countryOfResidence, setCountryOfResidence] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    // Category-specific states
    // Car Rental (Category 2)
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [dropoffTime, setDropoffTime] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    
    // Private Driver (Category 3)
    const [carType, setCarType] = useState("standard");
    const [airportOrIntercity, setAirportOrIntercity] = useState("intercity");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [roadTypes, setRoadTypes] = useState([]);
    const [pickupAirport, setPickupAirport] = useState("");
    const [dropoffHotel, setDropoffHotel] = useState("");
    const [pickupCity, setPickupCity] = useState("");
    const [dropoffCity, setDropoffCity] = useState("");
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [numberOfLuggage, setNumberOfLuggage] = useState(0);
    
    // Boat Rental (Category 4)
    const [duration, setDuration] = useState("1");
    const [purpose, setPurpose] = useState("Leisure");
    const [destination, setDestination] = useState("");
    const [boatPickupTime, setBoatPickupTime] = useState("");
    const [boatDuration, setBoatDuration] = useState("");
    
    // Activity (Category 5)
    const [activityType, setActivityType] = useState("");
    const [timePreference, setTimePreference] = useState("");
    const [selectedDurationOption, setSelectedDurationOption] = useState("");
    
    // Calendar states
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    
    // Price calculation states
    const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    const [priceDetails, setPriceDetails] = useState(null);
    const [priceNotifications, setPriceNotifications] = useState([]);
    const [showPriceError, setShowPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");
    
    // Debounce timer for price calculation
    const [priceCalculationTimer, setPriceCalculationTimer] = useState(null);
    
    /**
     * Load search parameters from sessionStorage and URL
     */
    useEffect(() => {
        const loadSearchParams = () => {
            try {
                // Get search params from sessionStorage
                const storedParams = sessionStorage.getItem('searchParams');
                const urlParams = new URLSearchParams(window.location.search);
                
                let searchData = {};
                
                // Parse stored search params
                if (storedParams) {
                    try {
                        searchData = JSON.parse(storedParams);
                    } catch (e) {
                        console.warn('Invalid search params in sessionStorage:', e);
                    }
                }
                
                // Override with URL params if available
                const urlData = {};
                for (const [key, value] of urlParams.entries()) {
                    urlData[key] = value;
                }
                
                // Merge URL params over stored params
                searchData = { ...searchData, ...urlData };
                
                console.log('Loading search params:', searchData);
                
                // Apply search parameters based on category
                if (Object.keys(searchData).length > 0) {
                    switch (parseInt(categoryId)) {
                        case 2: // Car rental
                            if (searchData.pickup_location || searchData.pickup) {
                                setPickupLocation(searchData.pickup_location || searchData.pickup || '');
                            }
                            if (searchData.dropoff_location || searchData.dropoff) {
                                setDropoffLocation(searchData.dropoff_location || searchData.dropoff || '');
                            }
                            if (searchData.pickup_date) {
                                setStartDate(searchData.pickup_date);
                            }
                            if (searchData.dropoff_date) {
                                setEndDate(searchData.dropoff_date);
                            }
                            if (searchData.pickup_time) {
                                setPickupTime(searchData.pickup_time);
                            }
                            if (searchData.dropoff_time) {
                                setDropoffTime(searchData.dropoff_time);
                            }
                            break;
                            
                        case 3: // Private driver
                            if (searchData.city_a || searchData.pickup) {
                                setPickupCity(searchData.city_a || searchData.pickup || '');
                            }
                            if (searchData.city_b || searchData.dropoff) {
                                setDropoffCity(searchData.city_b || searchData.dropoff || '');
                            }
                            if (searchData.pickup_date || searchData.date) {
                                setStartDate(searchData.pickup_date || searchData.date);
                            }
                            if (searchData.pickup_time || searchData.time) {
                                setPickupTime(searchData.pickup_time || searchData.time);
                            }
                            if (searchData.persons) {
                                setNumberOfPassengers(parseInt(searchData.persons) || 1);
                            }
                            if (searchData.service_type) {
                                setServiceTypes([searchData.service_type]);
                            }
                            break;
                            
                        case 4: // Boat rental
                            if (searchData.destination) {
                                setDestination(searchData.destination);
                            }
                            if (searchData.start_date || searchData.date) {
                                setStartDate(searchData.start_date || searchData.date);
                            }
                            if (searchData.people) {
                                setNumberOfPeople(parseInt(searchData.people) || 1);
                            }
                            break;
                            
                        case 5: // Activities
                            if (searchData.destination) {
                                setDestination(searchData.destination);
                            }
                            if (searchData.start_date || searchData.date) {
                                setStartDate(searchData.start_date || searchData.date);
                            }
                            if (searchData.people) {
                                setNumberOfPeople(parseInt(searchData.people) || 1);
                            }
                            if (searchData.time_preference) {
                                setTimePreference(searchData.time_preference);
                            }
                            break;
                    }
                }
                
                setSearchParamsLoaded(true);
                
            } catch (error) {
                console.error('Error loading search params:', error);
                setSearchParamsLoaded(true);
            }
        };
        
        // Only load once when component mounts
        if (!searchParamsLoaded) {
            loadSearchParams();
        }
    }, [categoryId, searchParamsLoaded]);
    
    /**
     * Helper function to handle field changes with consistent naming
     */
    const handleFieldChange = (fieldName, value) => {
        console.log('Field change:', fieldName, value);
        
        // Clear any existing error for this field
        if (errors[fieldName]) {
            const newErrors = { ...errors };
            delete newErrors[fieldName];
            setErrors(newErrors);
        }
        
        switch (fieldName) {
            // Common fields
            case 'fullName':
                setFullName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'whatsAppNumber':
                setWhatsAppNumber(value);
                break;
            case 'countryOfResidence':
                setCountryOfResidence(value);
                break;
            case 'dateOfBirth':
                setDateOfBirth(value);
                break;
            case 'flightNumber':
                setFlightNumber(value);
                break;
            case 'additionalNotes':
                setAdditionalNotes(value);
                break;
                
            // Car rental fields
            case 'pickup_location':
                setPickupLocation(value);
                break;
            case 'dropoff_location':
                setDropoffLocation(value);
                break;
            case 'pickup_time':
                setPickupTime(value);
                break;
            case 'dropoff_time':
                setDropoffTime(value);
                break;
                
            // Private driver fields
            case 'pickup_city':
                setPickupCity(value);
                break;
            case 'dropoff_city':
                setDropoffCity(value);
                break;
            case 'number_of_passengers':
                setNumberOfPassengers(value);
                break;
            case 'number_of_luggage':
                setNumberOfLuggage(value);
                break;
            case 'dropoff_hotel':
                setDropoffHotel(value);
                break;
                
            // Boat rental fields
            case 'number_of_people':
                setNumberOfPeople(value);
                break;
            case 'boat_duration':
                setBoatDuration(value);
                break;
            case 'boat_pickup_time':
                setBoatPickupTime(value);
                break;
                
            // Activity fields
            case 'time_preference':
                setTimePreference(value);
                break;
            case 'selected_duration_option':
                setSelectedDurationOption(value);
                break;
                
            default:
                console.warn('Unknown field:', fieldName);
        }
    };
    
    /**
     * Form validation helper
     */
    const isFormValid = () => {
        const newErrors = {};
        
        // Common validations
        if (!fullName.trim()) {
            newErrors.fullName = ['Full name is required'];
        }
        if (!email.trim()) {
            newErrors.email = ['Email is required'];
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = ['Please enter a valid email address'];
        }
        if (!whatsAppNumber.trim()) {
            newErrors.whatsAppNumber = ['WhatsApp number is required'];
        }
        if (!countryOfResidence) {
            newErrors.countryOfResidence = ['Country of residence is required'];
        }
        if (!dateOfBirth) {
            newErrors.dateOfBirth = ['Date of birth is required'];
        }
        if (!termsAccepted) {
            newErrors.termsAccepted = ['You must accept the terms and conditions'];
        }
        
        // Category-specific validations
        switch (parseInt(categoryId)) {
            case 2: // Car rental
                if (!startDate) newErrors.pickup_date = ['Pickup date is required'];
                if (!endDate) newErrors.dropoff_date = ['Dropoff date is required'];
                if (!pickupTime) newErrors.pickup_time = ['Pickup time is required'];
                if (!dropoffTime) newErrors.dropoff_time = ['Dropoff time is required'];
                if (!pickupLocation) newErrors.pickup_location = ['Pickup location is required'];
                if (!dropoffLocation) newErrors.dropoff_location = ['Dropoff location is required'];
                break;
                
            case 3: // Private driver
                if (!startDate) newErrors.prefered_date = ['Service date is required'];
                if (!pickupTime) newErrors.pickup_time = ['Pickup time is required'];
                if (serviceTypes.length === 0) newErrors.service_type = ['Please select a service type'];
                if (roadTypes.length === 0) newErrors.road_type = ['Please select a road type'];
                if (!dropoffHotel.trim()) newErrors.dropoff_hotel = ['Dropoff address is required'];
                if (numberOfPassengers < 1) newErrors.number_of_passengers = ['At least 1 passenger is required'];
                break;
                
            case 4: // Boat rental
                if (!startDate) newErrors.prefered_date = ['Rental date is required'];
                if (!boatDuration) newErrors.duration = ['Duration is required'];
                if (!boatPickupTime) newErrors.pickup_time = ['Pickup time is required'];
                if (numberOfPeople < 1) newErrors.number_of_people = ['At least 1 person is required'];
                break;
                
            case 5: // Activity
                if (!startDate) newErrors.prefered_date = ['Activity date is required'];
                if (!selectedDurationOption) newErrors.duration_option = ['Please select an activity option'];
                if (!timePreference) newErrors.time_preference = ['Time preference is required'];
                if (numberOfPeople < 1) newErrors.number_of_people = ['At least 1 person is required'];
                break;
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        
        return true;
    };
    
    /**
     * Reset form to initial state
     */
    const resetForm = () => {
        setCurrentStep(0);
        setStartDate("");
        setEndDate("");
        setFullName("");
        setEmail("");
        setWhatsAppNumber("");
        setCountryOfResidence("");
        setDateOfBirth("");
        setFlightNumber("");
        setAdditionalNotes("");
        setTermsAccepted(false);
        setSelectedAddons([]);
        setErrors({});
        
        // Category-specific resets
        switch (parseInt(categoryId)) {
            case 2:
                setPickupLocation("");
                setDropoffLocation("");
                setPickupTime("");
                setDropoffTime("");
                break;
            case 3:
                setServiceTypes([]);
                setRoadTypes([]);
                setPickupCity("");
                setDropoffCity("");
                setDropoffHotel("");
                setNumberOfPassengers(1);
                setNumberOfLuggage(0);
                setPickupTime("");
                break;
            case 4:
                setBoatDuration("");
                setBoatPickupTime("");
                setNumberOfPeople(1);
                break;
            case 5:
                setSelectedDurationOption("");
                setTimePreference("");
                setNumberOfPeople(1);
                break;
        }
    };
    
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
            
            // Debug log submission data
            console.log('Form data collected:', formData);
            console.log('Selected addons state:', selectedAddons);
            console.log('Submission data for category', categoryId, ':', submissionData);
            console.log('Addons being sent:', submissionData.addons);
            
            // Submit booking
            const response = await axios.post('/api/bookings/submit', submissionData);
            
            if (response.data.success && response.data.confirmation_number) {
                setConfirmationNumber(response.data.confirmation_number);
                setShowSuccess(true);
                resetForm();
            }
        } catch (error) {
            if (error.response?.status === 422) {
                // Map backend validation errors to frontend field names
                const backendErrors = error.response.data.errors || {};
                const mappedErrors = mapValidationErrors(backendErrors);
                setErrors(mappedErrors);
                
                console.log('Validation errors:', {
                    backend: backendErrors,
                    mapped: mappedErrors
                });
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
                    prefered_date: startDate, // Keep typo as is
                    service_type: serviceTypes,
                    road_type: roadTypes,
                    city_a_id: pickupCity,
                    city_b_id: dropoffCity,
                    droppoff_location: dropoffHotel, // Add dropoff location with typo
                    number_of_people: numberOfPassengers,
                    number_of_passengers: numberOfPassengers, // Alternative mapping
                    max_luggage: numberOfLuggage, // Add luggage mapping
                    car_type: listing?.vehicule_type || 'Standard',
                    airport_or_intercity: serviceTypes.join(','),
                    languages_spoken: listing?.languages_spoken,
                    notes: `Service: ${serviceTypes.join(', ')}, Road: ${roadTypes.join(', ')}, Luggage: ${numberOfLuggage}, Dropoff: ${dropoffHotel}`,
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
                
                {/* Multi-Step Form */}
                <Stepper activeStep={currentStep} alternativeLabel className="mb-6">
                    <Step key="details">
                        <StepLabel>Booking Details</StepLabel>
                    </Step>
                    <Step key="personal">
                        <StepLabel>Your Information</StepLabel>
                    </Step>
                </Stepper>

                {/* Step 1: Booking Details */}
                {currentStep === 0 && (
                    <BookingDetailsStep
                        categoryId={parseInt(categoryId)}
                        listing={listing}
                        // Common states
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        showCalendar={showCalendar}
                        setShowCalendar={setShowCalendar}
                        isSelectingEndDate={isSelectingEndDate}
                        setIsSelectingEndDate={setIsSelectingEndDate}
                        errors={errors}
                        handleFieldChange={handleFieldChange}
                        // Car rental states
                        pickupLocation={pickupLocation}
                        dropoffLocation={dropoffLocation}
                        pickupTime={pickupTime}
                        setPickupTime={setPickupTime}
                        dropoffTime={dropoffTime}
                        setDropoffTime={setDropoffTime}
                        selectedAddons={selectedAddons}
                        setSelectedAddons={setSelectedAddons}
                        // Private driver states
                        carType={carType}
                        airportOrIntercity={airportOrIntercity}
                        setAirportOrIntercity={setAirportOrIntercity}
                        numberOfPeople={numberOfPeople}
                        serviceTypes={serviceTypes}
                        setServiceTypes={setServiceTypes}
                        roadTypes={roadTypes}
                        setRoadTypes={setRoadTypes}
                        pickupAirport={pickupAirport}
                        setPickupAirport={setPickupAirport}
                        dropoffHotel={dropoffHotel}
                        setDropoffHotel={setDropoffHotel}
                        pickupCity={pickupCity}
                        setPickupCity={setPickupCity}
                        dropoffCity={dropoffCity}
                        setDropoffCity={setDropoffCity}
                        numberOfPassengers={numberOfPassengers}
                        setNumberOfPassengers={setNumberOfPassengers}
                        numberOfLuggage={numberOfLuggage}
                        setNumberOfLuggage={setNumberOfLuggage}
                        // Boat rental states
                        duration={duration}
                        setDuration={setDuration}
                        purpose={purpose}
                        destination={destination}
                        setDestination={setDestination}
                        boatPickupTime={boatPickupTime}
                        setBoatPickupTime={setBoatPickupTime}
                        boatDuration={boatDuration}
                        setBoatDuration={setBoatDuration}
                        // Activity states
                        activityType={activityType}
                        timePreference={timePreference}
                        setTimePreference={setTimePreference}
                        selectedDurationOption={selectedDurationOption}
                        setSelectedDurationOption={setSelectedDurationOption}
                        // Calendar states
                        calendarMonth={calendarMonth}
                        setCalendarMonth={setCalendarMonth}
                        calendarYear={calendarYear}
                        setCalendarYear={setCalendarYear}
                    />
                )}

                {/* Step 2: Client Information */}
                {currentStep === 1 && (
                    <ClientInfoStep
                        fullName={fullName}
                        email={email}
                        whatsAppNumber={whatsAppNumber}
                        countryOfResidence={countryOfResidence}
                        dateOfBirth={dateOfBirth}
                        flightNumber={flightNumber}
                        additionalNotes={additionalNotes}
                        termsAccepted={termsAccepted}
                        setTermsAccepted={setTermsAccepted}
                        handleFieldChange={handleFieldChange}
                        errors={errors}
                        categoryId={parseInt(categoryId)}
                    />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    {currentStep > 0 && (
                        <Button
                            variant="outlined"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={isSubmitting}
                        >
                            Previous
                        </Button>
                    )}
                    
                    <div className="flex-grow"></div>
                    
                    {currentStep < 1 ? (
                        <Button
                            variant="contained"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={isSubmitting}
                            color="primary"
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            color="primary"
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                        </Button>
                    )}
                </div>

                {/* Error Display */}
                {errors.general && (
                    <Alert severity="error" className="mt-4">
                        {errors.general}
                    </Alert>
                )}

                {/* Success Dialog */}
                <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
                    <DialogTitle>Booking Confirmed!</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Your booking has been confirmed. Your confirmation number is: <strong>{confirmationNumber}</strong>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowSuccess(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        )
    );
};

export default BookingFrmEnhanced;
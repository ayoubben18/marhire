import React, { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search, Users, Info } from "lucide-react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Alert, Stepper, Step, StepLabel, Box, FormControlLabel, Checkbox, Chip, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaWhatsapp } from "react-icons/fa";
import getWtspUrl from "../utils/WhatsappMsg";
import BookingDetailsStep from "./BookingDetailsStep";
import ClientInfoStep from "./ClientInfoStep";
import { 
    formatDate, 
    formatTime, 
    calculatePrice,
    calculatePriceWithDetails,
    calculateAddonsTotal, 
    isValidBookingDate, 
    getCategoryName,
    getFieldError,
    clearFieldError,
    prepareSubmissionData
} from "../../utils/bookingHelpers";
import Skeleton from "react-loading-skeleton";
import { mapSearchParams, isDateValid, getMinValidDate } from "../../utils/searchParamsMapping";

const BookingFrm = ({ loading, listingId, categoryId, listing, searchParams, formId = 'singlelistingBooking' }) => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();
    // Convert categoryId to number to ensure proper comparison
    const numericCategoryId = parseInt(categoryId) || 0;
    
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
    const [invoiceNumber, setInvoiceNumber] = useState("");
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
    
    // Legacy fields for API compatibility
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [country, setCountry] = useState("");
    const [notes, setNotes] = useState("");
    
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
    const [cityAId, setCityAId] = useState("");
    const [cityBId, setCityBId] = useState("");
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
    const [pricingOptionId, setPricingOptionId] = useState("");
    const [timePreference, setTimePreference] = useState("");
    const [selectedDurationOption, setSelectedDurationOption] = useState("");
    
    // Calendar navigation state
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

    // Validate Step 1 (Booking Details)
    const isStep1Valid = () => {
        switch(numericCategoryId) {
            case 2: // Car rental
                if (!startDate || !endDate || !pickupLocation || 
                    !dropoffLocation || !pickupTime || !dropoffTime) {
                    return false;
                }
                // Check if dates are valid (tomorrow or later)
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                const pickupDate = new Date(startDate);
                pickupDate.setHours(0, 0, 0, 0);
                if (pickupDate < tomorrow) {
                    return false;
                }
                // Check if dropoff is after pickup
                const dropoffDate = new Date(endDate);
                if (dropoffDate <= pickupDate) {
                    return false;
                }
                // Check minimum 3-day duration for car rentals
                const diffTime = dropoffDate - pickupDate;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays < 3) {
                    return false;
                }
                break;
                
            case 3: // Private driver
                if (!startDate || serviceTypes.length === 0 || roadTypes.length === 0 ||
                    numberOfPassengers < 1 || numberOfPassengers > 50) {
                    return false;
                }
                // Check conditional fields
                if (serviceTypes.includes('airport_transfer') && (!dropoffHotel || dropoffHotel.trim() === '')) {
                    return false;
                }
                if (serviceTypes.includes('intercity') && (!pickupCity || !dropoffCity || !pickupAirport || pickupAirport.trim() === '' || !dropoffHotel || dropoffHotel.trim() === '')) {
                    return false;
                }
                break;
                
            case 4: // Boat rental
                if (!startDate || !boatPickupTime || !boatDuration || 
                    numberOfPeople < 1 || numberOfPeople > 100) {
                    return false;
                }
                // Check capacity limit if listing has one
                if (listing?.capacity && numberOfPeople > parseInt(listing.capacity)) {
                    return false;
                }
                break;
                
            case 5: // Activity
                if (!startDate || !timePreference || !selectedDurationOption || numberOfPeople < 1 || numberOfPeople > 100) {
                    return false;
                }
                // Check group size limits for group activities
                if (listing?.private_or_group?.toLowerCase() === 'group') {
                    const minSize = listing.group_size_min ? parseInt(listing.group_size_min) : 1;
                    const maxSize = listing.group_size_max ? parseInt(listing.group_size_max) : 100;
                    if (numberOfPeople < minSize || numberOfPeople > maxSize) {
                        return false;
                    }
                }
                break;
                
            default:
                return false;
        }
        return true;
    };
    
    // Validate Step 2 (Client Information)
    const isStep2Valid = () => {
        // Required fields validation
        if (!fullName.trim() || !email.trim() || 
            !whatsAppNumber.trim() || !countryOfResidence.trim() || 
            !dateOfBirth || !termsAccepted) {
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        
        return true;
    };

    // Form validation function
    const isFormValid = () => {
        return isStep1Valid() && isStep2Valid();
    };

    // Helper function to scroll to form top
    const scrollToFormTop = () => {
        setTimeout(() => {
            const formElement = document.getElementById(formId);
            const scrollContainer = document.querySelector('.listing-container__right');
            
            if (formElement) {
                // Check if we're on desktop and if the desktop container exists
                if (window.innerWidth >= 1025 && scrollContainer && formId === 'desktop-booking-form') {
                    // Desktop: Scroll within the right container
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const formRect = formElement.getBoundingClientRect();
                    const scrollTop = formRect.top - containerRect.top + scrollContainer.scrollTop;
                    
                    scrollContainer.scrollTo({
                        top: Math.max(0, scrollTop - 20), // Small offset for visual comfort
                        behavior: 'smooth'
                    });
                } else {
                    // Mobile or fallback: Scroll the entire page
                    const headerOffset = 80;
                    const elementPosition = formElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    };

    // Validate Step 1 and set errors
    const validateStep1 = () => {
        const newErrors = {};
        
        switch(numericCategoryId) {
            case 2: // Car Rental
                if (!startDate) newErrors.startDate = t('booking.errors.selectStartDate');
                if (!endDate) newErrors.endDate = t('booking.errors.selectEndDate');
                if (!pickupLocation) newErrors.pickupLocation = t('booking.errors.selectPickupLocation');
                if (!dropoffLocation) newErrors.dropoffLocation = t('booking.errors.selectDropoffLocation');
                break;
                
            case 3: // Private Driver
                if (!startDate) newErrors.startDate = t('booking.errors.selectDate');
                if (!pickupTime) newErrors.pickupTime = t('booking.errors.selectTime');
                if (!serviceTypes || serviceTypes.length === 0) newErrors.serviceTypes = t('booking.errors.selectServiceType');
                if (!roadTypes || roadTypes.length === 0) newErrors.roadTypes = t('booking.errors.selectRoadType');
                
                // For airport transfer, pickup city is automatic (listing city)
                // For intercity, we need both cities and pickup address
                if (serviceTypes && serviceTypes.includes('intercity')) {
                    if (!pickupCity) newErrors.pickupCity = t('booking.errors.selectPickupCity');
                    if (!dropoffCity) newErrors.dropoffCity = t('booking.errors.selectDestinationCity');
                    if (!pickupAirport || pickupAirport.trim() === '') newErrors.pickup_address = t('booking.errors.pickupAddressRequired', 'Pickup address is required');
                    if (!dropoffHotel || dropoffHotel.trim() === '') newErrors.dropoff_hotel = t('booking.errors.dropoffAddressRequired', 'Dropoff address is required');
                } else if (serviceTypes && serviceTypes.includes('airport_transfer')) {
                    // For airport transfer, dropoff address is required
                    if (!dropoffHotel || dropoffHotel.trim() === '') newErrors.dropoff_hotel = t('booking.errors.dropoffAddressRequired', 'Dropoff address is required');
                }
                
                if (!numberOfPassengers || numberOfPassengers < 1) newErrors.numberOfPassengers = t('booking.errors.numberOfPassengersRequired');
                if (numberOfLuggage === undefined || numberOfLuggage === null || numberOfLuggage < 0) newErrors.numberOfLuggage = t('booking.errors.numberOfLuggageRequired');
                break;
                
            case 4: // Boat Rental
                if (!startDate) newErrors.startDate = t('booking.errors.selectDate');
                if (!boatPickupTime) newErrors.boatPickupTime = t('booking.errors.selectTime');
                break;
                
            case 5: // Activity
                if (!startDate) newErrors.startDate = t('booking.errors.selectDate');
                if (!timePreference) newErrors.timePreference = t('booking.errors.selectTimePreference');
                break;
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(prev => ({ ...prev, ...newErrors }));
            return false;
        }
        
        // Clear step 1 errors if validation passes
        setErrors(prev => {
            const cleaned = { ...prev };
            ['startDate', 'endDate', 'pickupLocation', 'dropoffLocation', 'pickupTime', 
             'cityA', 'cityB', 'pickupCity', 'dropoffCity', 'serviceTypes', 'roadTypes',
             'numberOfPassengers', 'numberOfLuggage', 'boatPickupTime', 'timePreference',
             'pickup_address', 'pickup_airport', 'dropoff_hotel'].forEach(key => delete cleaned[key]);
            return cleaned;
        });
        
        return true;
    };

    // Validate Step 2 and set errors
    const validateStep2 = () => {
        const newErrors = {};
        
        if (!fullName.trim()) newErrors.fullName = t('booking.errors.fullNameRequired');
        if (!email.trim()) newErrors.email = t('booking.errors.emailRequired');
        if (!whatsAppNumber.trim()) newErrors.whatsAppNumber = t('booking.errors.whatsappRequired');
        if (!countryOfResidence.trim()) newErrors.countryOfResidence = t('booking.errors.countryRequired');
        if (!dateOfBirth) newErrors.dateOfBirth = t('booking.errors.dobRequired');
        if (!termsAccepted) newErrors.termsAccepted = t('booking.errors.termsRequired');
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            newErrors.email = t('booking.errors.invalidEmail');
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(prev => ({ ...prev, ...newErrors }));
            return false;
        }
        
        // Clear step 2 errors if validation passes
        setErrors(prev => {
            const cleaned = { ...prev };
            ['fullName', 'email', 'whatsAppNumber', 'countryOfResidence', 'dateOfBirth', 'termsAccepted'].forEach(key => delete cleaned[key]);
            return cleaned;
        });
        
        return true;
    };

    // Handle step navigation
    const handleNext = () => {
        if (currentStep === 0) {
            // Don't validate, just navigate to next step
            setCurrentStep(1);
            
            // Scroll to top of form
            scrollToFormTop();
        }
    };
    
    const handleBack = () => {
        setCurrentStep(0);
        
        // Scroll to top of form
        scrollToFormTop();
    };

    // Handle stepper click navigation
    const handleStepClick = (stepIndex) => {
        // Navigate to step 0 (Booking Details)
        if (stepIndex === 0) {
            setCurrentStep(0);
            scrollToFormTop();
        }
        // Navigate to step 1 (Your Information)
        else if (stepIndex === 1) {
            // Don't validate, just navigate
            setCurrentStep(1);
            scrollToFormTop();
        }
    };


    const getDateRangeText = () => {
        if (!startDate && !endDate) return t("booking.selectDates");
        if (startDate && !endDate)
            return `${formatDate(startDate)} - ${t("booking.selectEndDate")}`;
        if (startDate && endDate)
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        return t("booking.selectDates");
    };

    const handleDateClick = () => {
        if (!showCalendar) {
            // Reset to current month when opening calendar
            const today = new Date();
            setCalendarMonth(today.getMonth());
            setCalendarYear(today.getFullYear());
        }
        setShowCalendar(!showCalendar);
        setIsSelectingEndDate(false);
    };

    const handleDateSelect = (selectedDate) => {
        if (!startDate || isSelectingEndDate) {
            if (!startDate) {
                setStartDate(selectedDate);
                if (numericCategoryId === 2) { // Car rental needs end date
                    setIsSelectingEndDate(true);
                } else {
                    setShowCalendar(false);
                }
            } else {
                setEndDate(selectedDate);
                setShowCalendar(false);
                setIsSelectingEndDate(false);
            }
        } else {
            setStartDate(selectedDate);
            setEndDate("");
            if (numericCategoryId === 2) {
                setIsSelectingEndDate(true);
            }
        }
    };

    const resetForm = () => {
        // Reset step
        setCurrentStep(0);
        
        // Reset common fields
        setFullName("");
        setEmail("");
        setWhatsAppNumber("");
        setCountryOfResidence("");
        setDateOfBirth("");
        setFlightNumber("");
        setAdditionalNotes("");
        setTermsAccepted(false);
        setFirstName("");
        setLastName("");
        setWhatsapp("");
        setCountry("");
        setNotes("");
        setStartDate("");
        setEndDate("");
        setErrors({});
        
        // Reset category-specific fields
        setPickupLocation("");
        setDropoffLocation("");
        setPickupTime("");
        setDropoffTime("");
        setFlightNumber("");
        setSelectedAddons([]);
        setCarType("standard");
        setAirportOrIntercity("intercity");
        setCityAId("");
        setCityBId("");
        setNumberOfPeople(1);
        setServiceTypes([]);
        setRoadTypes([]);
        setPickupAirport("");
        setDropoffHotel("");
        setPickupCity("");
        setDropoffCity("");
        setNumberOfPassengers(1);
        setNumberOfLuggage(0);
        setDuration("1");
        setPurpose("Leisure");
        setDestination("");
        setBoatPickupTime("");
        setBoatDuration("1h");
        setActivityType("");
        setPricingOptionId("");
        setTimePreference("morning");
        setSelectedDurationOption("");
    };
    
    // Method to clear search params manually
    const clearSearchParams = () => {
        sessionStorage.removeItem('searchParams');
        setSearchParamsLoaded(false);
    };

    const handleFieldChange = (field, value) => {
        // Clear error for the field when user modifies it
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[field];
                return newErrors;
            });
        }
        
        // Update the field value
        switch(field) {
            case 'fullName':
                setFullName(value);
                // Split for API compatibility
                const names = value.trim().split(' ');
                setFirstName(names[0] || '');
                setLastName(names.slice(1).join(' ') || '');
                break;
            case 'first_name':
                setFirstName(value);
                break;
            case 'last_name':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'whatsAppNumber':
                setWhatsAppNumber(value);
                setWhatsapp(value); // For API compatibility
                break;
            case 'whatsapp':
                setWhatsapp(value);
                break;
            case 'countryOfResidence':
                setCountryOfResidence(value);
                setCountry(value); // For API compatibility
                break;
            case 'country':
                setCountry(value);
                break;
            case 'dateOfBirth':
                setDateOfBirth(value);
                break;
            case 'flightNumber':
                setFlightNumber(value);
                break;
            case 'additionalNotes':
                setAdditionalNotes(value);
                setNotes(value); // For API compatibility
                break;
            case 'number_of_people':
                setNumberOfPeople(value);
                break;
            case 'notes':
                setNotes(value);
                break;
            case 'birthdate':
                setBirthdate(value);
                break;
            case 'pickup_location':
                setPickupLocation(value);
                break;
            case 'dropoff_location':
                setDropoffLocation(value);
                break;
            case 'flight_number':
                setFlightNumber(value);
                break;
            case 'car_type':
                setCarType(value);
                break;
            case 'purpose':
                setPurpose(value);
                break;
            case 'activity_type':
                setActivityType(value);
                break;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!listingId) {
            setErrors({
                general: t('booking.errors.invalidListing')
            });
            return;
        }
        
        // Validate both steps and collect all errors
        const step1Valid = validateStep1();
        const step2Valid = validateStep2();
        
        // Debug log for private driver
        if (numericCategoryId === 3) {
            console.log('Private Driver Validation Debug:', {
                step1Valid,
                step2Valid,
                startDate,
                pickupTime,
                serviceTypes,
                roadTypes,
                pickupCity,
                dropoffCity,
                numberOfPassengers,
                numberOfLuggage,
                errors
            });
        }
        
        // If validation fails, scroll to the first error
        if (!step1Valid || !step2Valid) {
            // If step 1 has errors and we're on step 2, go back to step 1
            if (!step1Valid && currentStep === 1) {
                setCurrentStep(0);
                scrollToFormTop();
            } else {
                // Otherwise just scroll to top to show errors
                scrollToFormTop();
            }
            return;
        }
        
        setIsSubmitting(true);
        setErrors({});
        
        try {
            // Prepare form data based on category
            // Get current locale from LanguageContext
            const currentLocale = currentLanguage || 'en';
            console.log('Current language from LanguageContext:', currentLocale);
            
            const formData = {
                listing_id: listingId,
                category_id: numericCategoryId,
                fullName: fullName,
                email: email,
                whatsAppNumber: whatsAppNumber,
                countryOfResidence: countryOfResidence,
                dateOfBirth: dateOfBirth,
                additionalNotes: additionalNotes,
                termsAccepted: termsAccepted,
                booking_source: 'Client Booking',
                booking_language: currentLocale,
                locale: currentLocale
            };
            
            // Add category-specific fields
            switch(numericCategoryId) {
                case 2: // Car rental
                    formData.dateOfBirth = dateOfBirth;
                    // Calculate age from dateOfBirth
                    if (dateOfBirth) {
                        const birthDate = new Date(dateOfBirth);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                        }
                        formData.age = age;
                    }
                    formData.pickup_date = startDate;
                    formData.dropoff_date = endDate || startDate;
                    formData.pickup_time = pickupTime;
                    formData.dropoff_time = dropoffTime;
                    formData.pickup_location = pickupLocation;
                    formData.dropoff_location = dropoffLocation;
                    formData.flight_number = flightNumber;
                    formData.addons = selectedAddons; // Backend expects 'addons' field
                    formData.selected_addons = selectedAddons; // Keep for backward compatibility
                    // Include addon details with prices
                    if (selectedAddons.length > 0 && listing?.addons) {
                        formData.addons_details = selectedAddons.map(addonId => {
                            const addon = listing.addons.find(item => item.addon.id === addonId);
                            return addon ? {
                                id: addonId,
                                name: addon.addon.addon,
                                price: addon.addon.price
                            } : null;
                        }).filter(Boolean);
                    }
                    break;
                    
                case 3: // Private driver
                    formData.dateOfBirth = dateOfBirth;
                    formData.flight_number = flightNumber; // Add flight number for private driver
                    formData.prefered_date = startDate;
                    formData.preferredDate = startDate; // Add both formats
                    formData.pickup_time = pickupTime;
                    formData.pickupTime = pickupTime; // Add camelCase version
                    formData.service_type = serviceTypes;
                    formData.service_types = serviceTypes; // Add plural version
                    formData.serviceTypes = serviceTypes; // Add camelCase version
                    
                    // Fix road_types value - backend expects 'round_trip' not 'road_trip'
                    const mappedRoadTypes = roadTypes.map(type => 
                        type === 'road_trip' ? 'round_trip' : type
                    );
                    formData.road_type = mappedRoadTypes;
                    formData.road_types = mappedRoadTypes; // Add plural version with correct values
                    formData.roadTypes = roadTypes; // Keep original for frontend compatibility
                    
                    formData.number_of_passengers = numberOfPassengers;
                    formData.numberOfPassengers = numberOfPassengers; // Add camelCase version
                    formData.number_of_luggage = numberOfLuggage;
                    formData.numberOfLuggage = numberOfLuggage; // Add camelCase version
                    
                    // Add addons for private driver
                    formData.addons = selectedAddons; // Backend expects 'addons' field
                    formData.selected_addons = selectedAddons; // Keep for backward compatibility
                    
                    // Always set pickup_city (required by backend)
                    formData.pickup_city = pickupCity || listing?.city_id || 1;
                    formData.pickupCity = pickupCity || listing?.city_id || 1; // CamelCase version
                    
                    // Add conditional fields
                    if (serviceTypes && serviceTypes.includes('airport_transfer')) {
                        // Set pickup address as "{cityname} airport"
                        const cityName = listing?.city?.city_name || 'City';
                        formData.pickup_airport = `${cityName} airport`;
                        formData.pickup_address = `${cityName} airport`; // Explicitly set pickup_address
                        formData.dropoff_hotel = dropoffHotel || '';
                        formData.address = `${cityName} airport`; // Backend also uses 'address' for pickup_address
                        formData.dropoff_city = dropoffCity; // Add dropoff city for airport transfers too
                        formData.dropoffCity = dropoffCity; // CamelCase version
                    }
                    if (serviceTypes && serviceTypes.includes('intercity')) {
                        formData.pickup_city = pickupCity || listing?.city_id || 1;
                        formData.pickupCity = pickupCity || listing?.city_id || 1; // CamelCase version
                        formData.dropoff_city = dropoffCity;
                        formData.dropoffCity = dropoffCity; // CamelCase version
                        formData.pickup_airport = pickupAirport || ''; // Send pickup_airport for backend to save to pickup_address
                        formData.dropoff_hotel = dropoffHotel || ''; // Send dropoff_hotel for backend to save to dropoff_address
                        formData.address = pickupAirport || ''; // Keep address field for backward compatibility with pickup_address
                    }
                    // Legacy compatibility
                    formData.number_of_people = numberOfPassengers;
                    // Don't send car_type - it's not collected from the user
                    formData.airport_or_intercity = serviceTypes.includes('airport_transfer') ? 'airport' : 'intercity';
                    // Always use listing's city as the starting point
                    formData.city_a_id = listing?.city_id || 1;
                    
                    if (serviceTypes.includes('airport_transfer')) {
                        formData.city_b_id = null; // Airport transfers don't have city_b
                    } else if (serviceTypes.includes('intercity')) {
                        // Only set city_b_id if dropoffCity has a value
                        formData.city_b_id = dropoffCity ? parseInt(dropoffCity) : null;
                    }
                    break;
                    
                case 4: // Boat rental
                    formData.dateOfBirth = dateOfBirth;
                    formData.flight_number = flightNumber; // Add flight number for boat rental
                    formData.prefered_date = startDate;
                    formData.pickup_time = boatPickupTime;
                    // Convert duration format (e.g., "1.5h" -> 1.5)
                    const durationValue = parseFloat(boatDuration.replace('h', '').replace('min', ''));
                    formData.duration = boatDuration.includes('min') ? durationValue / 60 : durationValue;
                    formData.number_of_people = numberOfPeople;
                    // Add addons for boat rental
                    formData.addons = selectedAddons; // Backend expects 'addons' field
                    formData.selected_addons = selectedAddons; // Keep for backward compatibility
                    // Don't send hardcoded values - only what user provides
                    break;
                    
                case 5: // Activity
                    formData.dateOfBirth = dateOfBirth;
                    formData.flight_number = flightNumber; // Add flight number for activities
                    formData.prefered_date = startDate;
                    formData.time_preference = timePreference;
                    formData.duration_option_id = selectedDurationOption;
                    formData.custom_booking_option_id = selectedDurationOption; // Backend expects this field
                    formData.number_of_people = numberOfPeople;
                    // Add addons for activities
                    formData.addons = selectedAddons; // Backend expects 'addons' field
                    formData.selected_addons = selectedAddons; // Keep for backward compatibility
                    // Don't send hardcoded values - only what user provides
                    if (selectedDurationOption) {
                        formData.pricing_option_id = selectedDurationOption;
                    }
                    break;
                    
                default:
                    formData.flight_number = flightNumber; // Add flight number for any other category
                    formData.prefered_date = startDate;
                    formData.number_of_people = numberOfPeople;
                    // Add addons for any other category
                    formData.addons = selectedAddons; // Backend expects 'addons' field
                    formData.selected_addons = selectedAddons; // Keep for backward compatibility
            }
            
            // Calculate price locally with advanced pricing logic
            // Use appropriate base price based on category
            let basePrice = 100;
            if (numericCategoryId === 4) { // Boat Rental
                basePrice = listing?.price_per_hour || 100;
            } else if (numericCategoryId === 2) { // Car Rental
                basePrice = listing?.price_per_day || listing?.price || 100;
            } else if (numericCategoryId === 5) { // Activity - only show price when option selected
                basePrice = 0; // No default price for activities
            } else {
                basePrice = listing?.price || listing?.price_per_day || listing?.price_per_person || 100;
            }
            
            const calculatedPrice = calculatePrice(numericCategoryId, basePrice, { 
                startDate, 
                endDate, 
                duration, 
                numberOfPeople,
                selectedAddons,
                boatDuration,
                selectedDurationOption,
                listing,
                serviceTypes,
                roadTypes,
                pickupCity,
                dropoffCity,
                pickupTime,
                dropoffTime
            });
            
            // Calculate addons separately for all categories
            let addonsTotal = 0;
            if (selectedAddons && selectedAddons.length > 0 && listing?.addons) {
                addonsTotal = calculateAddonsTotal(selectedAddons, listing);
            }
            
            // Set pricing data
            formData.booking_price = calculatedPrice - addonsTotal;
            formData.total_addons = addonsTotal;
            formData.total_price = calculatedPrice;
            
            // Debug log
            console.log('Submitting booking data:', formData);
            
            const response = await axios.post('/api/bookings/submit', formData);
            
            if (response.data.success && response.data.confirmation_number) {
                setConfirmationNumber(response.data.confirmation_number);
                setInvoiceNumber(response.data.invoice_number || '');
                setShowSuccess(true);
                // Clear search params after successful booking
                sessionStorage.removeItem('searchParams');
                resetForm();
            }
        } catch (error) {
            console.error('Booking submission error:', error.response?.data);
            if (error.response?.status === 422) {
                // Handle validation errors
                console.log('Validation errors:', error.response.data.errors);
                setErrors(error.response.data.errors || {});
                // Scroll to top to show API validation errors
                scrollToFormTop();
            } else {
                // Handle other errors
                setErrors({
                    general: error.response?.data?.message || t('booking.errors.processingError')
                });
                // Scroll to top to show error
                scrollToFormTop();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateCalendarDays = () => {
        const firstDay = new Date(calendarYear, calendarMonth, 1);
        const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(
                2,
                "0"
            )}-${String(day).padStart(2, "0")}`;
            days.push({ day, dateStr });
        }

        return days;
    };
    
    const navigateMonth = (direction) => {
        if (direction === 'prev') {
            if (calendarMonth === 0) {
                setCalendarMonth(11);
                setCalendarYear(calendarYear - 1);
            } else {
                setCalendarMonth(calendarMonth - 1);
            }
        } else {
            if (calendarMonth === 11) {
                setCalendarMonth(0);
                setCalendarYear(calendarYear + 1);
            } else {
                setCalendarMonth(calendarMonth + 1);
            }
        }
    };
    
    const getMonthYearDisplay = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[calendarMonth]} ${calendarYear}`;
    };

    const isDateSelected = (dateStr) => {
        return dateStr === startDate || dateStr === endDate;
    };

    const isDateInRange = (dateStr) => {
        if (!startDate || !endDate) return false;
        const date = new Date(dateStr);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return date >= start && date <= end;
    };


    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    // Handle search parameters from URL or session storage
    // Set minimum number of people for group activities
    React.useEffect(() => {
        if (numericCategoryId === 5 && listing) {
            // Check if it's a group activity
            if (listing.private_or_group?.toLowerCase() === 'group' && listing.group_size_min) {
                const minSize = parseInt(listing.group_size_min);
                if (minSize > 0) {
                    setNumberOfPeople(minSize);
                }
            }
        }
    }, [listing, numericCategoryId]);

    React.useEffect(() => {
        if (!searchParams) return;
        
        let paramsFound = false;
        
        try {
            // Map search params to booking form fields
            const mappedParams = mapSearchParams(searchParams, numericCategoryId);
            
            if (!mappedParams || Object.keys(mappedParams).length === 0) {
                return;
            }
        
        // Car rental parameters
        if (numericCategoryId === 2) {
            // Don't set pickup location from search params - it should always be listing city
            // if (mappedParams.pickupLocation) {
            //     setPickupLocation(mappedParams.pickupLocation);
            //     paramsFound = true;
            // }
            if (mappedParams.dropoffLocation) {
                setDropoffLocation(mappedParams.dropoffLocation);
                paramsFound = true;
            }
            if (mappedParams.startDate) {
                // Validate pickup date is at least 24hrs in advance
                if (isDateValid(mappedParams.startDate, 1)) {
                    setStartDate(mappedParams.startDate);
                } else {
                    // Auto-adjust to valid date
                    setStartDate(getMinValidDate(numericCategoryId));
                }
                paramsFound = true;
            }
            if (mappedParams.endDate) {
                // Validate dropoff date is at least 3 days after pickup
                const pickupDate = new Date(mappedParams.startDate || startDate || getMinValidDate(numericCategoryId));
                const dropoffDate = new Date(mappedParams.endDate);
                const minDropoff = new Date(pickupDate);
                minDropoff.setDate(minDropoff.getDate() + 3);
                
                if (dropoffDate >= minDropoff) {
                    setEndDate(mappedParams.endDate);
                } else {
                    // Auto-adjust to minimum 3 days
                    const year = minDropoff.getFullYear();
                    const month = String(minDropoff.getMonth() + 1).padStart(2, "0");
                    const day = String(minDropoff.getDate()).padStart(2, "0");
                    setEndDate(`${year}-${month}-${day}`);
                }
                paramsFound = true;
            }
            if (mappedParams.pickupTime) {
                setPickupTime(mappedParams.pickupTime);
                paramsFound = true;
            }
            if (mappedParams.dropoffTime) {
                setDropoffTime(mappedParams.dropoffTime);
                paramsFound = true;
            }
            // Set dropoff city from search parameters
            if (mappedParams.dropoffCity) {
                setDropoffLocation(mappedParams.dropoffCity);
                paramsFound = true;
            }
            // Also try dropoffLocation as fallback
            if (mappedParams.dropoffLocation && !mappedParams.dropoffCity) {
                setDropoffLocation(mappedParams.dropoffLocation);
                paramsFound = true;
            }
            // Pickup city should always be listing city, so don't override it
        }
        
        // Private driver parameters
        if (numericCategoryId === 3) {
            if (mappedParams.startDate) {
                // Validate date is at least 24hrs in advance
                if (isDateValid(mappedParams.startDate, 1)) {
                    setStartDate(mappedParams.startDate);
                } else {
                    setStartDate(getMinValidDate(numericCategoryId));
                }
                paramsFound = true;
            }
            if (mappedParams.numberOfPeople) {
                setNumberOfPeople(parseInt(mappedParams.numberOfPeople) || 1);
                setNumberOfPassengers(parseInt(mappedParams.numberOfPeople) || 1);
                paramsFound = true;
            }
            if (mappedParams.serviceTypes && Array.isArray(mappedParams.serviceTypes)) {
                setServiceTypes(mappedParams.serviceTypes);
                paramsFound = true;
            }
            if (mappedParams.roadTypes && Array.isArray(mappedParams.roadTypes)) {
                setRoadTypes(mappedParams.roadTypes);
                paramsFound = true;
            }
            if (mappedParams.pickupCity) {
                setPickupCity(mappedParams.pickupCity);
                paramsFound = true;
            }
            if (mappedParams.dropoffCity) {
                setDropoffCity(mappedParams.dropoffCity);
                paramsFound = true;
            }
        }
        
        // Boat rental parameters
        if (numericCategoryId === 4) {
            if (mappedParams.startDate) {
                // Validate date is at least 48hrs in advance
                if (isDateValid(mappedParams.startDate, 2)) {
                    setStartDate(mappedParams.startDate);
                } else {
                    setStartDate(getMinValidDate(numericCategoryId));
                }
                paramsFound = true;
            }
            if (mappedParams.boatPickupTime) {
                setBoatPickupTime(mappedParams.boatPickupTime);
                paramsFound = true;
            }
            if (mappedParams.destination) {
                setDestination(mappedParams.destination);
                paramsFound = true;
            }
            if (mappedParams.numberOfPeople) {
                setNumberOfPeople(parseInt(mappedParams.numberOfPeople) || 1);
                paramsFound = true;
            }
            if (mappedParams.boatDuration) {
                setBoatDuration(mappedParams.boatDuration);
                paramsFound = true;
            }
        }
        
        // Activity parameters
        if (numericCategoryId === 5) {
            if (mappedParams.startDate) {
                // Validate date is at least 48hrs in advance
                if (isDateValid(mappedParams.startDate, 2)) {
                    setStartDate(mappedParams.startDate);
                } else {
                    setStartDate(getMinValidDate(numericCategoryId));
                }
                paramsFound = true;
            }
            if (mappedParams.numberOfPeople) {
                setNumberOfPeople(parseInt(mappedParams.numberOfPeople) || 1);
                paramsFound = true;
            }
            if (mappedParams.timePreference) {
                setTimePreference(mappedParams.timePreference);
                paramsFound = true;
            }
            if (mappedParams.activityType) {
                setActivityType(mappedParams.activityType);
                paramsFound = true;
            }
        }
        
        setSearchParamsLoaded(paramsFound);
        
        } catch (error) {
            console.error('Error processing search params:', error);
            setErrors({ general: t('booking.errors.loadingError') });
        }
    }, [numericCategoryId, searchParams]);


    // Get category name
    const getCategoryName = () => {
        switch(numericCategoryId) {
            case 2: return t("categories.carRental");
            case 3: return t("categories.privateDriver");
            case 4: return t("categories.boatRental");
            case 5: return t("categories.activity");
            default: return "Booking";
        }
    };

    const getMinimumPrice = (categoryId, listing) => {
        if (!listing) return null;
        
        switch(categoryId) {
            case 2: // Car rental - use direct price fields
                return listing.price_per_day || listing.price || null;
                
            case 4: // Boat rental - use direct price fields  
                return listing.price_per_hour || null;
                
            case 3: // Private driver - get minimum from pricings array
                if (listing.pricings && listing.pricings.length > 0) {
                    // Get all available prices from the first pricing entry (following existing pattern)
                    const pricing = listing.pricings[0];
                    const availablePrices = [
                        pricing.airport_one,
                        pricing.airport_round, 
                        pricing.intercity_one,
                        pricing.intercity_round
                    ].filter(price => price && parseFloat(price) > 0).map(price => parseFloat(price));
                    
                    return availablePrices.length > 0 ? Math.min(...availablePrices) : null;
                }
                return listing.price_per_day || listing.price_per_hour || null;
                
            case 5: // Activity - get price from act_pricings first item
                let activityPrice = null;
                
                // Use act_pricings first item price (correct field name with underscore)
                if (listing.act_pricings && listing.act_pricings.length > 0) {
                    activityPrice = parseFloat(listing.act_pricings[0].price);
                }
                
                // Fallback to customBookingOptions
                if (!activityPrice && listing.customBookingOptions && listing.customBookingOptions.length > 0) {
                    const customPrices = listing.customBookingOptions.map(o => parseFloat(o.price)).filter(p => p > 0);
                    if (customPrices.length > 0) {
                        activityPrice = Math.min(...customPrices);
                    }
                }
                
                // Finally fallback to direct price fields
                if (!activityPrice) {
                    if (listing.private_or_group?.toLowerCase() === 'group') {
                        activityPrice = listing.price_per_group;
                    } else {
                        activityPrice = listing.price_per_person;
                    }
                }
                
                return activityPrice;
        }
        
        return null;
    };

    const getPricingTitle = () => {
        if (!listing) return getCategoryName();
        
        let price = getMinimumPrice(numericCategoryId, listing);
        let unit = "";
        
        switch(numericCategoryId) {
            case 2: // Car rental
                unit = t("booking.pricing.perDay", "per Day");
                break;
            case 4: // Boat rental  
                unit = t("booking.pricing.perHour", "per Hour");
                break;
            case 3: // Private driver
                unit = t("booking.pricing.perTrip", "per Trip");
                break;
            case 5: // Activity
                if (listing.private_or_group?.toLowerCase() === 'group') {
                    unit = t("booking.pricing.perGroup", "per Group");
                } else {
                    unit = t("booking.pricing.perPerson", "per Person");
                }
                break;
            default:
                return getCategoryName();
        }
        
        if (price && price > 0) {
            return t("booking.pricing.fromPrice", "From €{{price}} {{unit}}", { 
                price: price.toFixed(0), 
                unit: unit 
            });
        }
        
        return getCategoryName();
    };

    // Memoize price calculations to prevent infinite loops
    const priceDetails = useMemo(() => {
        // Use appropriate base price based on category
        let basePrice = 100;
        if (numericCategoryId === 4) { // Boat Rental
            basePrice = listing?.price_per_hour || 100;
        } else if (numericCategoryId === 2) { // Car Rental
            basePrice = listing?.price_per_day || listing?.price || 100;
        } else if (numericCategoryId === 5) { // Activity - only show price when option selected
            basePrice = 0; // No default price for activities
        } else {
            basePrice = listing?.price || listing?.price_per_day || listing?.price_per_person || 100;
        }
        
        return calculatePriceWithDetails(numericCategoryId, basePrice, { 
            startDate, 
            endDate, 
            duration, 
            numberOfPeople,
            selectedAddons,
            boatDuration,
            selectedDurationOption,
            listing,
            serviceTypes,
            roadTypes,
            pickupCity,
            dropoffCity,
            pickupTime,
            dropoffTime
        });
    }, [numericCategoryId, listing, startDate, endDate, duration, numberOfPeople, selectedAddons, boatDuration, selectedDurationOption, serviceTypes, roadTypes, pickupCity, dropoffCity, pickupTime, dropoffTime]);

    if (loading) {
        return (
            <div className="singlelisting-booking">
                {/* Header Skeleton */}
                <div className="mb-4 flex items-center gap-3">
                    <Skeleton width={24} height={24} />
                    <Skeleton height={24} width={180} />
                </div>
                
                {/* Stepper Skeleton */}
                <div className="mb-4">
                    <Skeleton height={40} />
                </div>
                
                {/* Form Fields Skeleton */}
                <div className="space-y-4">
                    <div>
                        <Skeleton height={14} width={100} className="mb-2" />
                        <Skeleton height={48} />
                    </div>
                    <div>
                        <Skeleton height={14} width={120} className="mb-2" />
                        <Skeleton height={48} />
                    </div>
                    <div>
                        <Skeleton height={14} width={80} className="mb-2" />
                        <Skeleton height={48} />
                    </div>
                </div>
                
                {/* Price Skeleton */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <Skeleton height={20} width={100} className="mb-2" />
                    <Skeleton height={32} width={120} />
                </div>
                
                {/* Button Skeleton */}
                <div className="mt-6">
                    <Skeleton height={48} />
                </div>
            </div>
        );
    }

    return (
            <form onSubmit={handleSubmit} className="singlelisting-booking" id={formId}>
                {/* Category Header */}
                <div className="mb-4">
                    <div className="booking-price-header" style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
                        <span className="price-prefix" style={{ color: '#666' }}>{t('common.from')}&nbsp;</span>
                        <span className="price-value" style={{ fontWeight: '700', color: '#000' }}>€{getMinimumPrice(numericCategoryId, listing) || 0}</span>
                        <span className="price-suffix" style={{ color: '#666' }}>&nbsp;{(() => {
                            switch(numericCategoryId) {
                                case 2: return `/ ${t('units.day', 'day')}`;
                                case 3: return `/ ${t('units.day', 'day')}`;
                                case 4: return `/ ${t('units.hour', 'hour')}`;
                                case 5: return `/ ${t('units.person', 'person')}`;
                                default: return `/ ${t('units.day', 'day')}`;
                            }
                        })()}</span>
                    </div>
                </div>
                
                {/* Stepper */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Stepper 
                        activeStep={currentStep} 
                        alternativeLabel
                        sx={{
                            '& .MuiStepIcon-root': {
                                color: '#e0e0e0',
                                '&.Mui-active': {
                                    color: '#048667',
                                },
                                '&.Mui-completed': {
                                    color: '#048667',
                                },
                            },
                            '& .MuiStepConnector-line': {
                                borderColor: '#e0e0e0',
                            },
                            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                                borderColor: '#048667',
                            },
                            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                                borderColor: '#048667',
                            },
                        }}
                    >
                        <Step 
                            onClick={() => handleStepClick(0)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <StepLabel>{t("booking.bookingDetails")}</StepLabel>
                        </Step>
                        <Step 
                            onClick={() => handleStepClick(1)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <StepLabel>{t("booking.yourInformation")}</StepLabel>
                        </Step>
                    </Stepper>
                </Box>
                
                {/* General error display */}
                {errors.general && (
                    <Alert severity="error" className="mb-4">
                        {errors.general}
                    </Alert>
                )}
                
                {/* API Validation Errors Display */}
                {Object.keys(errors).length > 0 && !errors.general && (
                    <Alert severity="error" className="mb-4">
                        <div>
                            <strong>{t('booking.errors.validationTitle', 'Please fix the following errors:')}</strong>
                            <ul className="mt-2 list-disc list-inside">
                                {Object.entries(errors).map(([field, messages]) => {
                                    if (field === 'general') return null;
                                    const fieldMessages = Array.isArray(messages) ? messages : [messages];
                                    return fieldMessages.map((message, index) => (
                                        <li key={`${field}-${index}`}>{message}</li>
                                    ));
                                })}
                            </ul>
                        </div>
                    </Alert>
                )}
                
                {/* Step Content */}
                {currentStep === 0 && (
                    <BookingDetailsStep
                        categoryId={numericCategoryId}
                        listing={listing}
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
                        pickupLocation={pickupLocation}
                        dropoffLocation={dropoffLocation}
                        pickupTime={pickupTime}
                        setPickupTime={setPickupTime}
                        dropoffTime={dropoffTime}
                        setDropoffTime={setDropoffTime}
                        selectedAddons={selectedAddons}
                        setSelectedAddons={setSelectedAddons}
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
                        duration={duration}
                        setDuration={setDuration}
                        purpose={purpose}
                        destination={destination}
                        setDestination={setDestination}
                        boatPickupTime={boatPickupTime}
                        setBoatPickupTime={setBoatPickupTime}
                        boatDuration={boatDuration}
                        setBoatDuration={setBoatDuration}
                        activityType={activityType}
                        timePreference={timePreference}
                        setTimePreference={setTimePreference}
                        selectedDurationOption={selectedDurationOption}
                        setSelectedDurationOption={setSelectedDurationOption}
                        calendarMonth={calendarMonth}
                        setCalendarMonth={setCalendarMonth}
                        calendarYear={calendarYear}
                        setCalendarYear={setCalendarYear}
                    />
                )}
                
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
                        categoryId={numericCategoryId}
                    />
                )}
                
                {/* Price Display (visible on both steps) */}
                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="space-y-3">
                        {/* Base Price */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">{t('listing.pricing.basePrice')}:</span>
                            <span className="font-semibold">€{priceDetails.basePrice || (priceDetails.price - priceDetails.addonsTotal) || priceDetails.price}</span>
                        </div>
                        
                        {/* Activity Type and Pricing Method for Things to Do */}
                        {categoryId === 5 && listing && (
                            <div className="border-t pt-2 space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{t('booking.activityType', 'Activity Type')}:</span>
                                    <span className="font-medium">
                                        {listing.private_or_group?.toLowerCase() === 'group' ? 
                                            t('booking.groupActivity', 'Group Activity') : 
                                            t('booking.privateActivity', 'Private Activity')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{t('booking.pricingMethod', 'Pricing')}:</span>
                                    <span className="font-medium">
                                        {listing.private_or_group?.toLowerCase() === 'group' ? 
                                            t('booking.perGroup', 'Per Group') : 
                                            t('booking.perPerson', 'Per Person')}
                                    </span>
                                </div>
                                {numberOfPeople > 0 && listing.private_or_group !== 'group' && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">{t('booking.numberOfPeople', 'Number of People')}:</span>
                                        <span className="font-medium">{numberOfPeople}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Addons breakdown */}
                        {selectedAddons && selectedAddons.length > 0 && listing?.addons && (
                            <>
                                <div className="border-t pt-2">
                                    <div className="text-sm font-medium text-gray-700 mb-2">{t('booking.addons')}</div>
                                    {selectedAddons.map(addonId => {
                                        const addon = listing.addons.find(item => item.addon.id === addonId);
                                        if (!addon) return null;
                                        return (
                                            <div key={addonId} className="flex justify-between items-center text-sm pl-3">
                                                <span className="text-gray-600">• {addon.addon.addon}</span>
                                                <span>€{addon.addon.price}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                        
                        {/* Discount if available */}
                        {listing?.special_price && listing?.price && listing.special_price < listing.price && (
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{t('listing.pricing.discount', 'Discount')}:</span>
                                    <span className="font-semibold text-green-600">
                                        -€{(listing.price - listing.special_price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        {/* Total */}
                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">
                                        {categoryId === 3 ? t('listing.pricing.estimatedPrice', 'Estimated Price') : t('listing.pricing.total')}:
                                    </span>
                                    {priceDetails.priceBreakdown && (
                                        <Tooltip 
                                            title={
                                                <div className="p-2">
                                                    <p className="font-semibold mb-2">{t('booking.availableRates')}</p>
                                                    <div className="space-y-1">
                                                        <p>• Hourly (0.5-1.5h): €{priceDetails.priceBreakdown.hourly}/hour</p>
                                                        <p>• Half-day (2-4h): €{priceDetails.priceBreakdown.halfDay} flat</p>
                                                        <p>• Full-day (4.5-8h): €{priceDetails.priceBreakdown.fullDay} flat</p>
                                                    </div>
                                                </div>
                                            }
                                            arrow
                                            placement="top"
                                        >
                                            <Info className="w-5 h-5 text-gray-500 cursor-help" />
                                        </Tooltip>
                                    )}
                                </div>
                                <span className="text-2xl font-bold" style={{ color: '#048667' }}>
                                    €{priceDetails.price}
                                </span>
                            </div>
                            {priceDetails.rateDescription && (
                                <div className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                                    <span className={`px-2 py-1 rounded-md ${
                                        priceDetails.rateType === 'hourly' ? 'bg-[#048667]/15 text-[#048667]' :
                                        priceDetails.rateType === 'halfDay' ? 'bg-green-100 text-green-700' :
                                        priceDetails.rateType === 'fullDay' ? 'bg-purple-100 text-purple-700' :
                                        priceDetails.rateType === 'daily' ? 'bg-orange-100 text-orange-700' :
                                        priceDetails.rateType === 'weekly' ? 'bg-yellow-100 text-yellow-700' :
                                        priceDetails.rateType === 'monthly' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        Using {priceDetails.rateType} rate
                                    </span>
                                    <span>{priceDetails.rateDescription}</span>
                                </div>
                            )}
                            {categoryId === 3 && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {t('listing.pricing.estimatedPriceNote', 
                                       'This is an estimated price. The exact cost will be set in your confirmation after we receive all the details of your trip.')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex flex-col gap-4">
                    {currentStep === 0 ? (
                        <>
                            <Button
                                type="button"
                                onClick={handleNext}
                                variant="outlined"
                                size="large"
                                className="w-full px-6"
                                sx={{
                                    borderColor: '#048667',
                                    color: '#048667',
                                    '&:hover': {
                                        borderColor: '#037056',
                                        backgroundColor: 'rgba(4, 134, 103, 0.04)',
                                    },
                                }}
                            >
                                {t('common.next')}
                            </Button>
                            <a
                                href={getWtspUrl(listing)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg w-full"
                                style={{ backgroundColor: '#048667' }}
                                title="WhatsApp"
                            >
                                <FaWhatsapp size={20} />
                                <span className="font-medium">{t('booking.whatsapp')}</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <Button
                                type="button"
                                onClick={handleBack}
                                variant="outlined"
                                size="large"
                                className="w-full px-6"
                                sx={{
                                    borderColor: '#048667',
                                    color: '#048667',
                                    '&:hover': {
                                        borderColor: '#037056',
                                        backgroundColor: 'rgba(4, 134, 103, 0.04)',
                                    },
                                }}
                            >
                                {t('common.back', 'Back')}
                            </Button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                style={{ backgroundColor: '#048667' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <CircularProgress size={20} color="inherit" />
                                        <span>{t("common.loading")}</span>
                                    </>
                                ) : (
                                    t("common.bookNow")
                                )}
                            </button>
                        </>
                    )}
                </div>

                {/* Success Modal */}
                <Dialog open={showSuccess} onClose={() => setShowSuccess(false)} maxWidth="sm" fullWidth>
                    <DialogTitle className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            {categoryId === 3 && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {t('listing.pricing.estimatedPriceNote', 
                                       'This is an estimated price. The exact cost will be set in your confirmation after we receive all the details of your trip.')}
                                </p>
                            )}
                        </div>
                        <Typography variant="h5" className="font-bold text-gray-800">
                            {t("booking.thankYou")}
                        </Typography>
                    </DialogTitle>
                    <DialogContent className="text-center">
                        <Typography variant="h6" className="text-gray-700 mb-3">
                            {t("booking.successMessage")}
                        </Typography>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <Typography variant="body2" className="text-gray-600 mb-2">
                                {t("booking.confirmationNumber")}:
                            </Typography>
                            <Typography variant="h5" className="font-bold" style={{ color: '#048667' }}>
                                {invoiceNumber}
                            </Typography>
                        </div>
                        <Typography variant="body1" className="text-gray-600 mb-2">
                            {t("booking.receivedMessage")}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            {t("booking.confirmationSoon")}
                        </Typography>
                    </DialogContent>
                    <DialogActions className="justify-center pb-4">
                        <Button 
                            onClick={() => {
                                setShowSuccess(false);
                                window.location.href = '/';
                            }}
                            variant="contained"
                            color="primary"
                            size="large"
                            className="px-8"
                        >
                            {t("common.close")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
};

export default BookingFrm;
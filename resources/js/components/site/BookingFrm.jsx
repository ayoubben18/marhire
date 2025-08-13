import React, { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search, Users, Car, Anchor, Activity, Info } from "lucide-react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Alert, Stepper, Step, StepLabel, Box, FormControlLabel, Checkbox, Chip, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
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
import { mapSearchParams, isDateValid, getMinValidDate } from "../../utils/searchParamsMapping";

const BookingFrm = ({ loading, listingId, categoryId, listing, searchParams }) => {
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
    const [timePreference, setTimePreference] = useState("morning");
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
                if (serviceTypes.includes('airport_transfer') && (!pickupAirport || !dropoffHotel)) {
                    return false;
                }
                if (serviceTypes.includes('intercity') && (!pickupCity || !dropoffCity)) {
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
                if (listing?.private_or_group === 'group') {
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
            const formElement = document.getElementById('singlelistingBooking');
            if (formElement) {
                // Add offset for sticky header if needed (adjust value as necessary)
                const headerOffset = 80;
                const elementPosition = formElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
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
                if (!cityAId) newErrors.cityA = t('booking.errors.selectPickupCity');
                if (!cityBId) newErrors.cityB = t('booking.errors.selectDestinationCity');
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
             'cityA', 'cityB', 'boatPickupTime', 'timePreference'].forEach(key => delete cleaned[key]);
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
            // Validate step 1 but navigate anyway
            validateStep1();
            setCurrentStep(1);
            
            // Scroll to top of form on mobile devices
            if (window.innerWidth < 768) {
                scrollToFormTop();
            }
        }
    };
    
    const handleBack = () => {
        setCurrentStep(0);
        
        // Scroll to top of form on mobile devices
        if (window.innerWidth < 768) {
            scrollToFormTop();
        }
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
            if (currentStep === 0) {
                // Validate step 1 but navigate anyway
                validateStep1();
            }
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
                    formData.prefered_date = startDate;
                    formData.pickup_time = pickupTime;
                    formData.service_type = serviceTypes; // Fixed: service_types -> service_type
                    formData.road_type = roadTypes; // Fixed: road_types -> road_type
                    formData.number_of_passengers = numberOfPassengers;
                    formData.number_of_luggage = numberOfLuggage;
                    // Add conditional fields
                    if (serviceTypes.includes('airport_transfer')) {
                        formData.pickup_airport = pickupAirport;
                        formData.dropoff_hotel = dropoffHotel;
                    }
                    if (serviceTypes.includes('intercity')) {
                        formData.pickup_city = pickupCity;
                        formData.dropoff_city = dropoffCity;
                    }
                    // Legacy compatibility
                    formData.number_of_people = numberOfPassengers;
                    formData.car_type = 1; // Standard car type ID
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
                    formData.prefered_date = startDate;
                    formData.pickup_time = boatPickupTime;
                    // Convert duration format (e.g., "1.5h" -> 1.5)
                    const durationValue = parseFloat(boatDuration.replace('h', '').replace('min', ''));
                    formData.duration = boatDuration.includes('min') ? durationValue / 60 : durationValue;
                    formData.number_of_people = numberOfPeople;
                    // Legacy compatibility
                    formData.propose = purpose || 'Leisure';
                    break;
                    
                case 5: // Activity
                    formData.dateOfBirth = dateOfBirth;
                    formData.prefered_date = startDate;
                    formData.time_preference = timePreference;
                    formData.duration_option_id = selectedDurationOption;
                    formData.custom_booking_option_id = selectedDurationOption; // Backend expects this field
                    formData.number_of_people = numberOfPeople;
                    // Legacy compatibility
                    formData.activity_type = 1; // Default activity type ID
                    if (selectedDurationOption) {
                        formData.pricing_option_id = selectedDurationOption;
                    }
                    break;
                    
                default:
                    formData.prefered_date = startDate;
                    formData.number_of_people = numberOfPeople;
            }
            
            // Calculate price locally with advanced pricing logic
            // Use appropriate base price based on category
            let basePrice = 100;
            if (numericCategoryId === 4) { // Boat Rental
                basePrice = listing?.price_per_hour || 100;
            } else if (numericCategoryId === 2) { // Car Rental
                basePrice = listing?.price_per_day || listing?.price || 100;
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
            } else {
                // Handle other errors
                setErrors({
                    general: error.response?.data?.message || t('booking.errors.processingError')
                });
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
            if (mappedParams.pickupLocation) {
                setPickupLocation(mappedParams.pickupLocation);
                paramsFound = true;
            }
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

    // Get category icon
    const getCategoryIcon = () => {
        switch(numericCategoryId) {
            case 2: return <Car className="w-5 h-5 mr-2" />;
            case 3: return <Car className="w-5 h-5 mr-2" />;
            case 4: return <Anchor className="w-5 h-5 mr-2" />;
            case 5: return <Activity className="w-5 h-5 mr-2" />;
            default: return null;
        }
    };

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

    // Memoize price calculations to prevent infinite loops
    const priceDetails = useMemo(() => {
        // Use appropriate base price based on category
        let basePrice = 100;
        if (numericCategoryId === 4) { // Boat Rental
            basePrice = listing?.price_per_hour || 100;
        } else if (numericCategoryId === 2) { // Car Rental
            basePrice = listing?.price_per_day || listing?.price || 100;
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

    return (
        !loading && (
            <form onSubmit={handleSubmit} className="singlelisting-booking" id="singlelistingBooking">
                {/* Category Header */}
                <div className="mb-4 flex items-center">
                    {getCategoryIcon()}
                    <h2 className="text-xl font-semibold">{getCategoryName()}</h2>
                </div>
                
                {/* Stepper */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Stepper activeStep={currentStep} alternativeLabel>
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
                
                {/* Validation errors display */}
                {Object.keys(errors).length > 0 && !errors.general && (
                    <Alert severity="error" className="mb-4">
                        <div className="font-semibold mb-2">{t('booking.errors.fixErrors')}:</div>
                        <ul className="list-disc list-inside space-y-1">
                            {errors.age && errors.age.map((error, idx) => (
                                <li key={`age-${idx}`}>Age: {error}</li>
                            ))}
                            {errors.date_of_birth && errors.date_of_birth.map((error, idx) => (
                                <li key={`dob-${idx}`}>Date of Birth: {error}</li>
                            ))}
                            {errors.dateOfBirth && errors.dateOfBirth.map((error, idx) => (
                                <li key={`dateOfBirth-${idx}`}>Date of Birth: {error}</li>
                            ))}
                            {errors.terms_accepted && errors.terms_accepted.map((error, idx) => (
                                <li key={`terms-${idx}`}>Terms: {error}</li>
                            ))}
                            {errors.termsAccepted && errors.termsAccepted.map((error, idx) => (
                                <li key={`termsAccepted-${idx}`}>Terms: {error}</li>
                            ))}
                            {errors.fullName && errors.fullName.map((error, idx) => (
                                <li key={`name-${idx}`}>Full Name: {error}</li>
                            ))}
                            {errors.email && errors.email.map((error, idx) => (
                                <li key={`email-${idx}`}>Email: {error}</li>
                            ))}
                            {errors.whatsAppNumber && errors.whatsAppNumber.map((error, idx) => (
                                <li key={`whatsapp-${idx}`}>WhatsApp: {error}</li>
                            ))}
                            {errors.whatsapp && errors.whatsapp.map((error, idx) => (
                                <li key={`whatsapp2-${idx}`}>WhatsApp: {error}</li>
                            ))}
                            {errors.pickup_date && errors.pickup_date.map((error, idx) => (
                                <li key={`pickup-${idx}`}>Pickup Date: {error}</li>
                            ))}
                            {errors.pickup_time && errors.pickup_time.map((error, idx) => (
                                <li key={`pickuptime-${idx}`}>Pickup Time: {error}</li>
                            ))}
                            {errors.dropoff_date && errors.dropoff_date.map((error, idx) => (
                                <li key={`dropoff-${idx}`}>Dropoff Date: {error}</li>
                            ))}
                            {errors.prefered_date && errors.prefered_date.map((error, idx) => (
                                <li key={`prefdate-${idx}`}>Preferred Date: {error}</li>
                            ))}
                            {/* Add any other fields that might have errors */}
                            {Object.keys(errors).filter(key => 
                                !['general', 'age', 'date_of_birth', 'dateOfBirth', 'terms_accepted', 
                                 'termsAccepted', 'fullName', 'email', 'whatsAppNumber', 'whatsapp',
                                 'pickup_date', 'pickup_time', 'dropoff_date', 'prefered_date'].includes(key)
                            ).map(key => (
                                errors[key] && Array.isArray(errors[key]) && errors[key].map((error, idx) => (
                                    <li key={`${key}-${idx}`}>{key.replace(/_/g, ' ')}: {error}</li>
                                ))
                            ))}
                        </ul>
                    </Alert>
                )}
                
                {/* Pre-filled from search indicator */}
                {searchParamsLoaded && (
                    <Alert 
                        severity="info" 
                        className="mb-4"
                        icon={<Search className="w-5 h-5" />}
                    >
                        <div className="flex items-center justify-between">
                            <span>Some fields have been pre-filled from your search. You can edit them as needed.</span>
                            <Chip 
                                label="Pre-filled from search" 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                            />
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
                        
                        {/* Addons breakdown */}
                        {selectedAddons && selectedAddons.length > 0 && listing?.addons && (
                            <>
                                <div className="border-t pt-2">
                                    <div className="text-sm font-medium text-gray-700 mb-2">Add-ons:</div>
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
                                                    <p className="font-semibold mb-2">Available Rates:</p>
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
                                <span className="text-2xl font-bold text-blue-600">
                                    €{priceDetails.price}
                                </span>
                            </div>
                            {priceDetails.rateDescription && (
                                <div className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                                    <span className={`px-2 py-1 rounded-md ${
                                        priceDetails.rateType === 'hourly' ? 'bg-blue-100 text-blue-700' :
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
                <div className="flex justify-between gap-4">
                    {currentStep > 0 && (
                        <Button
                            type="button"
                            onClick={handleBack}
                            variant="outlined"
                            color="primary"
                            size="large"
                            className="px-6"
                        >
                            Back
                        </Button>
                    )}
                    {currentStep === 0 ? (
                        <Button
                            type="button"
                            onClick={handleNext}
                            variant="contained"
                            color="primary"
                            size="large"
                            className="ml-auto px-6"
                        >
                            {t('common.next')}
                        </Button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-auto btn-search-v2 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                            <Typography variant="h5" className="font-bold text-blue-600">
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
                            onClick={() => setShowSuccess(false)}
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
        )
    );
};

export default BookingFrm;
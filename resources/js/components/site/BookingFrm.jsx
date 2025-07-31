import React, { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search, Users, Car, Anchor, Activity, Info } from "lucide-react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Alert, Stepper, Step, StepLabel, Box, FormControlLabel, Checkbox, Chip, Tooltip } from "@mui/material";
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

const BookingFrm = ({ loading, listingId, categoryId, listing }) => {
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
    const [carType, setCarType] = useState("Standard");
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
    const [boatDuration, setBoatDuration] = useState("1h");
    
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
        switch(categoryId) {
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

    // Handle step navigation
    const handleNext = () => {
        if (currentStep === 0 && isStep1Valid()) {
            setCurrentStep(1);
        }
    };
    
    const handleBack = () => {
        setCurrentStep(0);
    };


    const getDateRangeText = () => {
        if (!startDate && !endDate) return "Select dates";
        if (startDate && !endDate)
            return `${formatDate(startDate)} - Select end date`;
        if (startDate && endDate)
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        return "Select dates";
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
                if (categoryId === 2) { // Car rental needs end date
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
            if (categoryId === 2) {
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
        setCarType("Standard");
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
                general: 'Invalid listing. Please refresh the page and try again.'
            });
            return;
        }
        
        if (!isFormValid()) {
            setErrors({
                general: 'Please fill in all required fields'
            });
            return;
        }
        
        setIsSubmitting(true);
        setErrors({});
        
        try {
            // Prepare form data based on category
            const formData = {
                listing_id: listingId,
                category_id: categoryId,
                fullName: fullName,
                email: email,
                whatsAppNumber: whatsAppNumber,
                countryOfResidence: countryOfResidence,
                dateOfBirth: dateOfBirth,
                additionalNotes: additionalNotes,
                termsAccepted: termsAccepted,
                booking_source: 'Client Booking'
            };
            
            // Add category-specific fields
            switch(categoryId) {
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
            const calculatedPrice = calculatePrice(categoryId, listing?.price || listing?.price_per_day || listing?.price_per_person || 100, { 
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
                setShowSuccess(true);
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
                    general: error.response?.data?.message || 'An error occurred while processing your booking. Please try again.'
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
        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        let paramsFound = false;
        
        // Car rental parameters
        if (categoryId === 2) {
            const pickupLoc = urlParams.get('pickup') || sessionStorage.getItem('search_pickup');
            const dropoffLoc = urlParams.get('dropoff') || sessionStorage.getItem('search_dropoff');
            const pickupDate = urlParams.get('pickup_date') || sessionStorage.getItem('search_pickup_date');
            const dropoffDate = urlParams.get('dropoff_date') || sessionStorage.getItem('search_dropoff_date');
            const pickupTimeParam = urlParams.get('pickup_time') || sessionStorage.getItem('search_pickup_time');
            const dropoffTimeParam = urlParams.get('dropoff_time') || sessionStorage.getItem('search_dropoff_time');
            
            if (pickupLoc) {
                setPickupLocation(pickupLoc);
                paramsFound = true;
            }
            if (dropoffLoc) {
                setDropoffLocation(dropoffLoc);
                paramsFound = true;
            }
            if (pickupDate) {
                setStartDate(pickupDate);
                paramsFound = true;
            }
            if (dropoffDate) {
                setEndDate(dropoffDate);
                paramsFound = true;
            }
            if (pickupTimeParam) {
                setPickupTime(pickupTimeParam);
                paramsFound = true;
            }
            if (dropoffTimeParam) {
                setDropoffTime(dropoffTimeParam);
                paramsFound = true;
            }
        }
        
        // Private driver parameters
        if (categoryId === 3) {
            const date = urlParams.get('date') || sessionStorage.getItem('search_date');
            const persons = urlParams.get('persons') || sessionStorage.getItem('search_persons');
            const serviceType = urlParams.get('service_type') || sessionStorage.getItem('search_service_type');
            
            if (date) {
                setStartDate(date);
                paramsFound = true;
            }
            if (persons) {
                setNumberOfPeople(parseInt(persons) || 1);
                paramsFound = true;
            }
            if (serviceType) {
                setAirportOrIntercity(serviceType);
                paramsFound = true;
            }
        }
        
        // Boat rental parameters
        if (categoryId === 4) {
            const date = urlParams.get('date') || sessionStorage.getItem('search_date');
            const dest = urlParams.get('destination') || sessionStorage.getItem('search_destination');
            const persons = urlParams.get('persons') || sessionStorage.getItem('search_persons');
            
            if (date) {
                setStartDate(date);
                paramsFound = true;
            }
            if (dest) {
                setDestination(dest);
                paramsFound = true;
            }
            if (persons) {
                setNumberOfPeople(parseInt(persons) || 1);
                paramsFound = true;
            }
        }
        
        // Activity parameters
        if (categoryId === 5) {
            const date = urlParams.get('date') || sessionStorage.getItem('search_date');
            const actType = urlParams.get('activity_type') || sessionStorage.getItem('search_activity_type');
            const persons = urlParams.get('persons') || sessionStorage.getItem('search_persons');
            
            if (date) {
                setStartDate(date);
                paramsFound = true;
            }
            if (actType) {
                setActivityType(actType);
                paramsFound = true;
            }
            if (persons) {
                setNumberOfPeople(parseInt(persons) || 1);
                paramsFound = true;
            }
        }
        
        setSearchParamsLoaded(paramsFound);
        
        // Clear session storage after loading
        sessionStorage.removeItem('search_pickup');
        sessionStorage.removeItem('search_dropoff');
        sessionStorage.removeItem('search_pickup_date');
        sessionStorage.removeItem('search_dropoff_date');
        sessionStorage.removeItem('search_pickup_time');
        sessionStorage.removeItem('search_dropoff_time');
        sessionStorage.removeItem('search_date');
        sessionStorage.removeItem('search_destination');
        sessionStorage.removeItem('search_persons');
        sessionStorage.removeItem('search_service_type');
        sessionStorage.removeItem('search_activity_type');
    }, [categoryId]);

    // Get category icon
    const getCategoryIcon = () => {
        switch(categoryId) {
            case 2: return <Car className="w-5 h-5 mr-2" />;
            case 3: return <Car className="w-5 h-5 mr-2" />;
            case 4: return <Anchor className="w-5 h-5 mr-2" />;
            case 5: return <Activity className="w-5 h-5 mr-2" />;
            default: return null;
        }
    };

    // Get category name
    const getCategoryName = () => {
        switch(categoryId) {
            case 2: return "Car Rental";
            case 3: return "Private Driver";
            case 4: return "Boat Rental";
            case 5: return "Activity";
            default: return "Booking";
        }
    };

    // Memoize price calculations to prevent infinite loops
    const priceDetails = useMemo(() => {
        return calculatePriceWithDetails(categoryId, listing?.price || listing?.price_per_day || listing?.price_per_person || 100, { 
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
    }, [categoryId, listing, startDate, endDate, duration, numberOfPeople, selectedAddons, boatDuration, selectedDurationOption, serviceTypes, roadTypes, pickupCity, dropoffCity, pickupTime, dropoffTime]);

    return (
        !loading && (
            <form onSubmit={handleSubmit} className="singlelisting-booking" id="singlelistingBooking">
                {/* Category Header */}
                <div className="mb-4 flex items-center">
                    {getCategoryIcon()}
                    <h2 className="text-xl font-semibold">{getCategoryName()} Booking</h2>
                </div>
                
                {/* Stepper */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Stepper activeStep={currentStep} alternativeLabel>
                        <Step>
                            <StepLabel>Booking Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Your Information</StepLabel>
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
                        <div className="font-semibold mb-2">Please fix the following errors:</div>
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
                        categoryId={categoryId}
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
                        categoryId={categoryId}
                    />
                )}
                
                {/* Price Display (visible on both steps) */}
                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold">Total Price:</span>
                                        {priceDetails.priceBreakdown && (
                                            <Tooltip 
                                                title={
                                                    <div className="p-2">
                                                        <p className="font-semibold mb-2">Available Rates:</p>
                                                        <div className="space-y-1">
                                                            <p>• Hourly (0.5-1.5h): ${priceDetails.priceBreakdown.hourly}/hour</p>
                                                            <p>• Half-day (2-4h): ${priceDetails.priceBreakdown.halfDay} flat</p>
                                                            <p>• Full-day (4.5-8h): ${priceDetails.priceBreakdown.fullDay} flat</p>
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
                                        ${priceDetails.price}
                                    </span>
                                </div>
                                {priceDetails.rateDescription && (
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
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
                            </>
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
                            disabled={!isStep1Valid()}
                            className="ml-auto px-6"
                        >
                            Next
                        </Button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid()}
                            className="ml-auto btn-search-v2 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                'Book Now'
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
                        </div>
                        <Typography variant="h5" className="font-bold text-gray-800">
                            Thank you!
                        </Typography>
                    </DialogTitle>
                    <DialogContent className="text-center">
                        <Typography variant="h6" className="text-gray-700 mb-3">
                            Your booking has been successfully submitted.
                        </Typography>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <Typography variant="body2" className="text-gray-600 mb-2">
                                Confirmation Number:
                            </Typography>
                            <Typography variant="h5" className="font-bold text-blue-600">
                                {confirmationNumber}
                            </Typography>
                        </div>
                        <Typography variant="body1" className="text-gray-600 mb-2">
                            We've received your request and our team is reviewing the details.
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            You'll receive a confirmation shortly by email or WhatsApp.
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
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        )
    );
};

export default BookingFrm;
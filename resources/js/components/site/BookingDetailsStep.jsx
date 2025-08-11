import React, { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Users, Car, Anchor, Activity } from "lucide-react";
import { Alert, FormControlLabel, Checkbox, FormGroup, FormLabel, Radio, RadioGroup, Select, MenuItem, TextField, Typography, Chip } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BookingDetailsStep = ({
    categoryId,
    listing,
    // Common states
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showCalendar,
    setShowCalendar,
    isSelectingEndDate,
    setIsSelectingEndDate,
    errors,
    handleFieldChange,
    // Car rental states
    pickupLocation,
    dropoffLocation,
    pickupTime,
    setPickupTime,
    dropoffTime,
    setDropoffTime,
    selectedAddons,
    setSelectedAddons,
    // Private driver states
    carType,
    airportOrIntercity,
    setAirportOrIntercity,
    numberOfPeople,
    serviceTypes,
    setServiceTypes,
    roadTypes,
    setRoadTypes,
    pickupAirport,
    setPickupAirport,
    dropoffHotel,
    setDropoffHotel,
    pickupCity,
    setPickupCity,
    dropoffCity,
    setDropoffCity,
    numberOfPassengers,
    setNumberOfPassengers,
    numberOfLuggage,
    setNumberOfLuggage,
    // Boat rental states
    duration,
    setDuration,
    purpose,
    destination,
    setDestination,
    boatPickupTime,
    setBoatPickupTime,
    boatDuration,
    setBoatDuration,
    // Activity states
    activityType,
    timePreference,
    setTimePreference,
    selectedDurationOption,
    setSelectedDurationOption,
    // Calendar states
    calendarMonth,
    setCalendarMonth,
    calendarYear,
    setCalendarYear
}) => {
    const { t } = useTranslation();
    // Local states for category-specific fields
    const [cities, setCities] = useState([]);
    const [addons, setAddons] = useState([]);
    const [durationOptions, setDurationOptions] = useState([]);
    
    // Helper function to format duration display
    const formatDuration = (duration) => {
        if (duration === '30min' || duration === '0.5h') return '30 min';
        if (duration.includes('h')) {
            const hours = parseFloat(duration.replace('h', ''));
            if (hours === 1) return '1 hour';
            if (hours % 1 === 0.5) {
                const wholeHours = Math.floor(hours);
                return `${wholeHours}h 30min`;
            }
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        }
        return duration;
    };
    
    // Load cities on component mount
    useEffect(() => {
        // Fetch cities from API to ensure correct IDs
        const fetchCities = async () => {
            try {
                const response = await axios.get('/api/get_cities');
                const citiesData = response.data.cities.map(city => ({
                    id: city.id,
                    name: city.city_name
                }));
                setCities(citiesData);
            } catch (error) {
                console.error('Error fetching cities:', error);
                // Fallback to hardcoded cities if API fails
                setCities([
                    { id: 1, name: 'Agadir' },
                    { id: 2, name: 'Marrakech' },
                    { id: 3, name: 'Fes' },
                    { id: 4, name: 'Casablanca' },
                    { id: 5, name: 'Rabat' },
                    { id: 6, name: 'Essaouira' },
                    { id: 7, name: 'Tangier' }
                ]);
            }
        };
        
        fetchCities();
    }, []); // Only run once on mount

    // Auto-select next available pickup time when date is selected
    useEffect(() => {
        if (startDate && !pickupTime) {
            const minBookingDateTime = getMinBookingDateTime();
            
            if (categoryId === 2) {
                // Car rental - Find the first available hour
                for (let hour = 0; hour < 24; hour++) {
                    const selectedDateTime = new Date(`${startDate} ${hour.toString().padStart(2, '0')}:00`);
                    if (selectedDateTime >= minBookingDateTime) {
                        setPickupTime(`${hour.toString().padStart(2, '0')}:00`);
                        // Also set dropoff time to same time
                        setDropoffTime(`${hour.toString().padStart(2, '0')}:00`);
                        break;
                    }
                }
            } else if (categoryId === 3) {
                // Private driver - Find the first available hour (48h advance)
                for (let hour = 0; hour < 24; hour++) {
                    const selectedDateTime = new Date(`${startDate} ${hour.toString().padStart(2, '0')}:00`);
                    if (selectedDateTime >= minBookingDateTime) {
                        setPickupTime(`${hour.toString().padStart(2, '0')}:00`);
                        break;
                    }
                }
            }
        }
        
        // For boat rental, auto-select first available time from 8am-8pm
        if (categoryId === 4 && startDate && !boatPickupTime) {
            const minBookingDateTime = getMinBookingDateTime();
            
            // Check hours from 8am to 8pm only
            for (let hour = 8; hour <= 20; hour++) {
                const selectedDateTime = new Date(`${startDate} ${hour.toString().padStart(2, '0')}:00`);
                if (selectedDateTime >= minBookingDateTime) {
                    setBoatPickupTime(`${hour.toString().padStart(2, '0')}:00`);
                    break;
                }
            }
        }
    }, [startDate, categoryId]);

    // Load addons and set initial values for car rental
    useEffect(() => {
        if (categoryId === 2 && listing?.addons?.length > 0) {
            const carAddons = listing.addons.map(addonItem => ({
                id: addonItem?.addon?.id,
                name: addonItem?.addon?.addon || t('booking.unknownAddon'),
                price: addonItem?.addon?.price || 0
            })).filter(addon => addon.id); // Filter out any invalid addons
            setAddons(carAddons);
        }
        
        // For car rentals, set pickup location to listing's city only if not already set
        // Ensure cities are loaded first to avoid race condition
        if (categoryId === 2 && listing?.city_id && !pickupLocation && cities.length > 0) {
            const cityExists = cities.some(city => city.id === listing.city_id);
            if (cityExists) {
                handleFieldChange('pickup_location', listing.city_id);
            }
        }
    }, [categoryId, listing?.id, cities.length, pickupLocation]); // Added proper dependencies
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? t('time.pm') : t('time.am');
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes}`;
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
            const today = new Date();
            setCalendarMonth(today.getMonth());
            setCalendarYear(today.getFullYear());
        }
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (selectedDate) => {
        if (categoryId === 2) {
            // Car rental - handle separate date pickers
            if (showCalendar === 'start') {
                setStartDate(selectedDate);
                // Automatically set end date to 3 days later
                const start = new Date(selectedDate);
                const autoEndDate = new Date(start);
                autoEndDate.setDate(autoEndDate.getDate() + 3);
                const endDateStr = `${autoEndDate.getFullYear()}-${String(autoEndDate.getMonth() + 1).padStart(2, '0')}-${String(autoEndDate.getDate()).padStart(2, '0')}`;
                setEndDate(endDateStr);
                setShowCalendar(false);
            } else if (showCalendar === 'end') {
                // Ensure end date is after start date
                if (startDate) {
                    const start = new Date(startDate);
                    const end = new Date(selectedDate);
                    if (end >= start) {
                        setEndDate(selectedDate);
                        setShowCalendar(false);
                    }
                }
            }
        } else {
            // Other categories - single date
            setStartDate(selectedDate);
            setShowCalendar(false);
        }
    };

    // Helper function to get current Morocco time
    const getMoroccoTime = () => {
        // Use proper timezone handling for Morocco/Casablanca
        // This correctly handles any DST changes automatically
        const moroccoTimeString = new Date().toLocaleString("en-US", {
            timeZone: "Africa/Casablanca",
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        // Parse the formatted string back to a Date object
        return new Date(moroccoTimeString);
    };

    // Helper function to get minimum allowed booking datetime
    const getMinBookingDateTime = () => {
        const moroccoNow = getMoroccoTime();
        const minDateTime = new Date(moroccoNow);
        
        // Different categories have different advance booking requirements
        switch(categoryId) {
            case 2: // Car rental - 24 hours
                minDateTime.setHours(minDateTime.getHours() + 24);
                break;
            case 3: // Private driver - 48 hours
            case 4: // Boat rental - 48 hours
            case 5: // Things to do - 48 hours
                minDateTime.setHours(minDateTime.getHours() + 48);
                break;
            default:
                minDateTime.setHours(minDateTime.getHours() + 24);
        }
        
        return minDateTime;
    };

    const generateCalendarDays = useMemo(() => {
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
    }, [calendarMonth, calendarYear]);

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

    // Close calendar when clicking outside
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

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">{t('booking.bookingDetails')}</h3>
            
            {/* Advance Booking Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                    <p className="text-blue-900 font-medium">
                        {[3, 4, 5].includes(categoryId) ? t('booking.advanceBooking48Hour') : t('booking.advanceBooking24Hour')}
                    </p>
                    <p className="text-blue-700 mt-1">
                        {categoryId === 2 && t('booking.advanceBookingCarRental')}
                        {categoryId === 3 && t('booking.advanceBookingPrivateDriver')}
                        {categoryId === 4 && t('booking.advanceBookingBoatRental')}
                        {categoryId === 5 && t('booking.advanceBookingActivities')}
                        {![2, 3, 4, 5].includes(categoryId) && t('booking.advanceBookingGeneral')}
                        <span className="block text-xs mt-1 text-blue-600">
                            {t('booking.currentMoroccoTime')}: {getMoroccoTime().toLocaleString('en-US', { 
                                timeZone: 'Africa/Casablanca',
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric',
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </span>
                    </p>
                </div>
            </div>
            
            {/* Date Selection */}
            <div className="relative">
                {categoryId === 2 ? (
                    // Car Rental - Two separate date pickers
                    <div className="date-fields-container grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        {/* Start Date */}
                        <div className="relative dropdown-container">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('booking.pickupDate')} *</label>
                            <div
                                onClick={() => {
                                    setShowCalendar('start');
                                }}
                                className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                            >
                                <span className={`${!startDate ? "text-gray-500" : "text-gray-900"}`}>
                                    {startDate ? formatDate(startDate) : t('booking.selectPickupDate')}
                                </span>
                                <Calendar className="text-gray-400 w-5 h-5" />
                            </div>
                            {errors.pickup_date && (
                                <p className="text-red-500 text-sm mt-1">{errors.pickup_date[0]}</p>
                            )}
                        </div>
                        
                        {/* End Date */}
                        <div className="relative dropdown-container">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('booking.dropoffDate')} *</label>
                            <div
                                onClick={() => {
                                    if (!startDate) {
                                        alert(t('booking.selectPickupDateFirst'));
                                        return;
                                    }
                                    setShowCalendar('end');
                                }}
                                className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                            >
                                <span className={`${!endDate ? "text-gray-500" : "text-gray-900"}`}>
                                    {endDate ? formatDate(endDate) : t('booking.selectDropoffDate')}
                                </span>
                                <Calendar className="text-gray-400 w-5 h-5" />
                            </div>
                            {errors.dropoff_date && (
                                <p className="text-red-500 text-sm mt-1">{errors.dropoff_date[0]}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    // Other categories - Single date picker
                    <div className="flex-1 relative dropdown-container mb-3">
                        <div
                            onClick={handleDateClick}
                            className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                        >
                            <span
                                className={`${
                                    !startDate
                                        ? "text-gray-500"
                                        : "text-gray-900"
                                }`}
                            >
                                {startDate ? formatDate(startDate) : t('booking.selectDate')}
                            </span>
                            <Calendar className="text-gray-400 w-5 h-5" />
                        </div>

                    </div>
                )}
                
                {/* Calendar Dropdown */}
                {showCalendar && (
                    <div className={`dropdown-container absolute top-full ${showCalendar === 'end' ? 'right-0' : 'left-0'} mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 w-80`}>
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {categoryId === 2
                                    ? showCalendar === 'start'
                                        ? t('booking.selectPickupDate')
                                        : t('booking.selectDropoffDate')
                                    : t('booking.selectDate')}
                            </h3>
                            <div className="text-xs text-gray-500 mt-1">
                                * Bookings must be at least {[3, 4, 5].includes(categoryId) ? '48 hours (2 days)' : '24 hours'} in advance
                                {categoryId === 2 && <div className="mt-1">* Minimum rental duration: 3 days</div>}
                                <div className="mt-1 text-xs">
                                    Current Morocco time: {getMoroccoTime().toLocaleString('en-US', { 
                                        timeZone: 'Africa/Casablanca',
                                        month: 'short', 
                                        day: 'numeric', 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </div>
                                {categoryId === 2 && showCalendar === 'end' && (
                                    <div className="mt-1">
                                        * Dropoff must be on or after pickup date
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={() => navigateMonth('prev')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronDown className="w-5 h-5 transform rotate-90" />
                            </button>
                            <div className="text-lg font-semibold text-gray-900">
                                {getMonthYearDisplay()}
                            </div>
                            <button
                                type="button"
                                onClick={() => navigateMonth('next')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronDown className="w-5 h-5 transform -rotate-90" />
                            </button>
                        </div>

                        {/* Calendar Header */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-medium text-gray-500 py-2"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {generateCalendarDays.map((dayObj, index) => {
                                if (!dayObj) {
                                    return (
                                        <div
                                            key={index}
                                            className="py-2"
                                        ></div>
                                    );
                                }

                                const { day, dateStr } = dayObj;
                                const isSelected = isDateSelected(dateStr);
                                const isInRange = isDateInRange(dateStr);
                                
                                // Use Morocco timezone for validation
                                const minBookingDateTime = getMinBookingDateTime();
                                const currentDate = new Date(dateStr);
                                currentDate.setHours(23, 59, 59, 999); // End of selected day
                                
                                // Date is in the past if it's before 24 hours from now in Morocco time
                                let isPast = currentDate < minBookingDateTime;
                                
                                // For dropoff date, check if it's before pickup date + 3 days
                                if (categoryId === 2 && showCalendar === 'end' && startDate) {
                                    const pickupDate = new Date(startDate);
                                    const minDropoffDate = new Date(pickupDate);
                                    minDropoffDate.setDate(minDropoffDate.getDate() + 3);
                                    minDropoffDate.setHours(0, 0, 0, 0);
                                    if (currentDate < minDropoffDate) {
                                        isPast = true;
                                    }
                                }

                                return (
                                    <button
                                        type="button"
                                        key={dateStr}
                                        onClick={() =>
                                            !isPast &&
                                            handleDateSelect(dateStr)
                                        }
                                        disabled={isPast}
                                        className={`
                                        py-2 px-1 text-sm rounded-lg transition-all duration-200 relative
                                        ${
                                            isPast
                                                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                                : "hover:bg-blue-50 cursor-pointer"
                                        }
                                        ${
                                            isSelected
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : ""
                                        }
                                        ${
                                            isInRange && !isSelected
                                                ? "bg-blue-100 text-blue-800"
                                                : ""
                                        }
                                      `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Calendar Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    if (categoryId === 2) {
                                        if (showCalendar === 'start') {
                                            setStartDate("");
                                        } else if (showCalendar === 'end') {
                                            setEndDate("");
                                        }
                                    } else {
                                        setStartDate("");
                                    }
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                {t('booking.clear')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCalendar(false)}
                                className="text-sm bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                            >
                                {t('booking.done')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Car Rental specific fields */}
            {categoryId === 2 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <Select
                                value={pickupLocation}
                                onChange={(e) => handleFieldChange('pickup_location', e.target.value)}
                                displayEmpty
                                className={`w-full ${errors.pickup_location ? 'error' : ''}`}
                                error={!!errors.pickup_location}
                                disabled={listing?.city_id ? true : false}
                            >
                                <MenuItem value="" disabled>{t('booking.selectPickupCity')} *</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))}
                            </Select>
                            {listing?.city_id && (
                                <Typography variant="caption" color="textSecondary">
                                    {t('booking.pickupMustBeIn', { city: cities.find(c => c.id === listing.city_id)?.name || 'listing city' })}
                                </Typography>
                            )}
                            {errors.pickup_location && (
                                <p className="text-red-500 text-sm mt-1">{errors.pickup_location[0]}</p>
                            )}
                        </div>
                        <div>
                            <Select
                                value={dropoffLocation}
                                onChange={(e) => handleFieldChange('dropoff_location', e.target.value)}
                                displayEmpty
                                className={`w-full ${errors.dropoff_location ? 'error' : ''}`}
                                error={!!errors.dropoff_location}
                            >
                                <MenuItem value="" disabled>{t('booking.selectDropoffCity')} *</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.dropoff_location && (
                                <p className="text-red-500 text-sm mt-1">{errors.dropoff_location[0]}</p>
                            )}
                        </div>
                        <div>
                            <select
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                                className={`w-full px-3 py-3 text-lg border ${errors.pickup_time ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            >
                                <option value="">{t('booking.pickupTime')} *</option>
                                {Array.from({ length: 24 }, (_, i) => {
                                    // Check if this time is valid (24+ hours from now)
                                    let isDisabled = false;
                                    if (startDate) {
                                        const selectedDateTime = new Date(`${startDate} ${i.toString().padStart(2, '0')}:00`);
                                        const minBookingDateTime = getMinBookingDateTime();
                                        isDisabled = selectedDateTime < minBookingDateTime;
                                    }
                                    
                                    return (
                                        <option 
                                            key={i} 
                                            value={`${i.toString().padStart(2, '0')}:00`}
                                            disabled={isDisabled}
                                        >
                                            {i.toString().padStart(2, '0')}:00
                                            {isDisabled ? ' (Not available - less than 24h)' : ''}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.pickup_time && (
                                <p className="text-red-500 text-sm mt-1">{errors.pickup_time[0]}</p>
                            )}
                        </div>
                        <div>
                            <select
                                value={dropoffTime}
                                onChange={(e) => setDropoffTime(e.target.value)}
                                className={`w-full px-3 py-3 text-lg border ${errors.dropoff_time ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            >
                                <option value="">{t('booking.dropoffTime')} *</option>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {i.toString().padStart(2, '0')}:00
                                    </option>
                                ))}
                            </select>
                            {errors.dropoff_time && (
                                <p className="text-red-500 text-sm mt-1">{errors.dropoff_time[0]}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Add-ons */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">Add-ons</FormLabel>
                        {addons.length > 0 ? (
                            <FormGroup>
                                {addons.map(addon => (
                                    <FormControlLabel
                                        key={addon.id}
                                        control={
                                            <Checkbox
                                                checked={selectedAddons.includes(addon.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAddons([...selectedAddons, addon.id]);
                                                    } else {
                                                        setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                                                    }
                                                }}
                                            />
                                        }
                                        label={`${addon.name} - $${addon.price}`}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <Typography variant="body2" color="textSecondary" className="italic">
                                {t('booking.noAddonsAvailable')}
                            </Typography>
                        )}
                    </div>
                    
                    {/* Drop-off fee message */}
                    {pickupLocation && dropoffLocation && pickupLocation !== dropoffLocation && (
                        <Alert severity="info" className="mb-3">
                            {t('booking.dropoffFeeNotice')}
                        </Alert>
                    )}
                </>
            )}
            
            {/* Private Driver specific fields */}
            {categoryId === 3 && (
                <>
                    {/* Service Type Selection - RADIO BUTTONS */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">Service Type *</FormLabel>
                        <RadioGroup
                            value={serviceTypes.length > 0 ? serviceTypes[0] : ''}
                            onChange={(e) => setServiceTypes([e.target.value])}
                        >
                            <FormControlLabel
                                value="airport_transfer"
                                control={<Radio />}
                                label="Airport Transfer"
                            />
                            <FormControlLabel
                                value="intercity"
                                control={<Radio />}
                                label="Intercity"
                            />
                        </RadioGroup>
                        {errors.service_type && (
                            <p className="text-red-500 text-sm mt-1">{errors.service_type[0]}</p>
                        )}
                    </div>
                    
                    {/* Road Type Selection - RADIO BUTTONS */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">Road Type *</FormLabel>
                        <RadioGroup
                            value={roadTypes.length > 0 ? roadTypes[0] : ''}
                            onChange={(e) => setRoadTypes([e.target.value])}
                        >
                            <FormControlLabel
                                value="one_way"
                                control={<Radio />}
                                label="One Way"
                            />
                            <FormControlLabel
                                value="road_trip"
                                control={<Radio />}
                                label="Round Trip"
                            />
                        </RadioGroup>
                        {errors.road_type && (
                            <p className="text-red-500 text-sm mt-1">{errors.road_type[0]}</p>
                        )}
                    </div>
                    
                    {/* Dynamic fields based on service type */}
                    {serviceTypes.includes('airport_transfer') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <TextField
                                value={pickupAirport}
                                onChange={(e) => setPickupAirport(e.target.value)}
                                label="Pick-up Airport *"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pickup_airport}
                                helperText={errors.pickup_airport?.[0]}
                            />
                            <TextField
                                value={dropoffHotel}
                                onChange={(e) => setDropoffHotel(e.target.value)}
                                label="Drop-off Hotel *"
                                variant="outlined"
                                fullWidth
                                error={!!errors.dropoff_hotel}
                                helperText={errors.dropoff_hotel?.[0]}
                            />
                        </div>
                    )}
                    
                    {serviceTypes.includes('intercity') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <Select
                                value={listing?.city_id || ''}
                                disabled
                                displayEmpty
                                fullWidth
                                error={!!errors.pickup_city}
                            >
                                <MenuItem value="" disabled>Select Pick-up City *</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))}
                            </Select>
                            {listing?.city_id && (
                                <Typography variant="caption" color="textSecondary" className="block -mt-2">
                                    Pickup must be in {cities.find(c => c.id === listing.city_id)?.name || 'the driver\'s city'}
                                </Typography>
                            )}
                            <Select
                                value={dropoffCity}
                                onChange={(e) => setDropoffCity(e.target.value)}
                                displayEmpty
                                fullWidth
                                error={!!errors.dropoff_city}
                            >
                                <MenuItem value="" disabled>Select Drop-off City *</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    )}
                    
                    {/* Pick-up Date & Time */}
                    <div className="mb-3">
                        <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className={`w-full px-3 py-3 text-lg border ${errors.pickup_time ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        >
                            <option value="">Select Pick-up Time *</option>
                            {Array.from({ length: 24 }, (_, i) => {
                                // Check if this time is valid (48+ hours from now for private driver)
                                let isDisabled = false;
                                if (startDate) {
                                    const selectedDateTime = new Date(`${startDate} ${i.toString().padStart(2, '0')}:00`);
                                    const minBookingDateTime = getMinBookingDateTime();
                                    isDisabled = selectedDateTime < minBookingDateTime;
                                }
                                
                                return (
                                    <option 
                                        key={i} 
                                        value={`${i.toString().padStart(2, '0')}:00`}
                                        disabled={isDisabled}
                                    >
                                        {i.toString().padStart(2, '0')}:00
                                        {isDisabled ? ' (Not available - less than 48h)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.pickup_time && (
                            <p className="text-red-500 text-sm mt-1">{errors.pickup_time[0]}</p>
                        )}
                    </div>
                    
                    {/* Number of Passengers and Luggage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <TextField
                            type="number"
                            value={numberOfPassengers}
                            onChange={(e) => setNumberOfPassengers(parseInt(e.target.value) || 1)}
                            label="Number of Passengers *"
                            variant="outlined"
                            fullWidth
                            inputProps={{ min: 1, max: 50 }}
                            error={!!errors.number_of_passengers}
                            helperText={errors.number_of_passengers?.[0]}
                        />
                        <TextField
                            type="number"
                            value={numberOfLuggage}
                            onChange={(e) => setNumberOfLuggage(parseInt(e.target.value) || 0)}
                            label="Number of Luggage"
                            variant="outlined"
                            fullWidth
                            inputProps={{ min: 0, max: 20 }}
                            error={!!errors.number_of_luggage}
                            helperText={errors.number_of_luggage?.[0]}
                        />
                    </div>
                </>
            )}
            
            {/* Boat Rental specific fields */}
            {categoryId === 4 && (
                <>
                    {/* Pick-up Time with 8am-8pm restriction */}
                    <div className="mb-4">
                        <Select
                            value={boatPickupTime}
                            onChange={(e) => setBoatPickupTime(e.target.value)}
                            displayEmpty
                            fullWidth
                            error={!!errors.pickup_time}
                        >
                            <MenuItem value="" disabled>Select Pick-up Time *</MenuItem>
                            {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => {
                                // Check if this time is valid (48+ hours from now for boat rental)
                                let isDisabled = false;
                                if (startDate) {
                                    const selectedDateTime = new Date(`${startDate} ${hour.toString().padStart(2, '0')}:00`);
                                    const minBookingDateTime = getMinBookingDateTime();
                                    isDisabled = selectedDateTime < minBookingDateTime;
                                }
                                
                                return (
                                    <MenuItem 
                                        key={hour} 
                                        value={`${hour.toString().padStart(2, '0')}:00`}
                                        disabled={isDisabled}
                                    >
                                        {hour.toString().padStart(2, '0')}:00
                                        {isDisabled ? ' (Not available - less than 48h)' : ''}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {errors.pickup_time && (
                            <p className="text-red-500 text-sm mt-1">{errors.pickup_time[0]}</p>
                        )}
                    </div>
                    
                    {/* Duration Selection using Radio buttons in grid */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">Duration *</FormLabel>
                        <div className="grid grid-cols-4 gap-2">
                            {/* Use dynamic duration options from listing or fallback to defaults */}
                            {(listing?.duration_options 
                                ? listing.duration_options.split(',').map(d => d.trim())
                                : ['30min', '1h', '1.5h', '2h', '2.5h', '3h', '3.5h', '4h', '4.5h', '5h', '5.5h', '6h', '6.5h', '7h', '7.5h', '8h']
                            ).map(duration => (
                                <label
                                    key={duration}
                                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                                        boatDuration === duration 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <Radio
                                        size="small"
                                        checked={boatDuration === duration}
                                        onChange={(e) => setBoatDuration(duration)}
                                        value={duration}
                                    />
                                    <span className="text-sm">{formatDuration(duration)}</span>
                                </label>
                            ))}
                        </div>
                        {errors.duration && (
                            <p className="text-red-500 text-sm mt-1">{errors.duration[0]}</p>
                        )}
                    </div>
                    
                    {/* Number of People */}
                    <div className="mb-3">
                        <TextField
                            type="number"
                            value={numberOfPeople}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                const maxCapacity = listing?.capacity ? parseInt(listing.capacity) : 100;
                                if (value <= maxCapacity) {
                                    handleFieldChange('number_of_people', value);
                                }
                            }}
                            label={t('booking.numberOfPeople') + ' *'}
                            variant="outlined"
                            fullWidth
                            inputProps={{ 
                                min: 1, 
                                max: listing?.capacity ? parseInt(listing.capacity) : 100 
                            }}
                            error={!!errors.number_of_people}
                            helperText={errors.number_of_people?.[0] || (listing?.capacity ? `Max capacity: ${listing.capacity}` : '')}
                        />
                    </div>
                </>
            )}
            
            {/* Activity specific fields */}
            {categoryId === 5 && (
                <>
                    {/* Time Preference */}
                    <div className="mb-4">
                        <Select
                            value={timePreference}
                            onChange={(e) => setTimePreference(e.target.value)}
                            displayEmpty
                            fullWidth
                            error={!!errors.time_preference}
                        >
                            <MenuItem value="" disabled>Select Time Preference *</MenuItem>
                            <MenuItem value="morning">Morning</MenuItem>
                            <MenuItem value="afternoon">Afternoon</MenuItem>
                            <MenuItem value="evening">Evening</MenuItem>
                            <MenuItem value="night">Night</MenuItem>
                        </Select>
                        {errors.time_preference && (
                            <p className="text-red-500 text-sm mt-1">{errors.time_preference[0]}</p>
                        )}
                    </div>
                    
                    {/* Duration Options with Prices (loaded from backend) */}
                    <div className="mb-4">
                        {(listing?.customBookingOptions || listing?.custom_booking_options) && (listing.customBookingOptions || listing.custom_booking_options).length > 0 ? (
                            <>
                                <Select
                                    value={selectedDurationOption}
                                    onChange={(e) => setSelectedDurationOption(e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    error={!!errors.duration_option}
                                >
                                    <MenuItem value="" disabled>Select Duration *</MenuItem>
                                    {(listing.customBookingOptions || listing.custom_booking_options).map(option => {
                                        // Format duration display (e.g., "1h" -> "1 Hour", "30min" -> "30 Minutes")
                                        let formattedDuration = option.name;
                                        if (option.name.includes('h') && !option.name.toLowerCase().includes('half')) {
                                            const hours = parseFloat(option.name.replace('h', ''));
                                            formattedDuration = hours === 1 ? t('booking.oneHour') : `${hours} ${t('booking.hours')}`;
                                        } else if (option.name.includes('min')) {
                                            const minutes = option.name.replace('min', '');
                                            formattedDuration = `${minutes} ${t('booking.minutes')}`;
                                        } else if (option.name.toLowerCase() === 'half day') {
                                            formattedDuration = 'Half Day (4 Hours)';
                                        } else if (option.name.toLowerCase() === 'full day') {
                                            formattedDuration = 'Full Day (8 Hours)';
                                        }
                                        
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {formattedDuration} - ${option.price}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {errors.duration_option && (
                                    <p className="text-red-500 text-sm mt-1">{errors.duration_option[0]}</p>
                                )}
                            </>
                        ) : listing?.actPricings && listing.actPricings.length > 0 ? (
                            // Fallback to actPricings if customBookingOptions not available
                            <>
                                <Select
                                    value={selectedDurationOption}
                                    onChange={(e) => setSelectedDurationOption(e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    error={!!errors.duration_option}
                                >
                                    <MenuItem value="" disabled>Select Duration *</MenuItem>
                                    {listing.actPricings.map(pricing => {
                                        // Format duration display (e.g., "1h" -> "1 Hour", "30min" -> "30 Minutes")
                                        let formattedDuration = pricing.element;
                                        if (pricing.element.includes('h')) {
                                            const hours = parseFloat(pricing.element.replace('h', ''));
                                            formattedDuration = hours === 1 ? t('booking.oneHour') : `${hours} ${t('booking.hours')}`;
                                        } else if (pricing.element.includes('min')) {
                                            const minutes = pricing.element.replace('min', '');
                                            formattedDuration = `${minutes} ${t('booking.minutes')}`;
                                        } else if (pricing.element.toLowerCase() === 'half day') {
                                            formattedDuration = 'Half Day (4 Hours)';
                                        } else if (pricing.element.toLowerCase() === 'full day') {
                                            formattedDuration = 'Full Day (8 Hours)';
                                        }
                                        
                                        return (
                                            <MenuItem key={pricing.id} value={pricing.id}>
                                                {formattedDuration} - ${pricing.price}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {errors.duration_option && (
                                    <p className="text-red-500 text-sm mt-1">{errors.duration_option[0]}</p>
                                )}
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary">Duration options not available</Typography>
                        )}
                    </div>
                    
                    {/* Number of People */}
                    <div className="mb-3">
                        <TextField
                            type="number"
                            value={numberOfPeople}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                // Handle group size limits for group activities
                                if (listing?.private_or_group === 'group') {
                                    const minSize = listing.group_size_min ? parseInt(listing.group_size_min) : 1;
                                    const maxSize = listing.group_size_max ? parseInt(listing.group_size_max) : 100;
                                    if (value >= minSize && value <= maxSize) {
                                        handleFieldChange('number_of_people', value);
                                    }
                                } else {
                                    // For private activities, no limit
                                    handleFieldChange('number_of_people', value);
                                }
                            }}
                            label={t('booking.numberOfPeople') + ' *'}
                            variant="outlined"
                            fullWidth
                            inputProps={{ 
                                min: listing?.private_or_group === 'group' && listing.group_size_min 
                                    ? parseInt(listing.group_size_min) : 1,
                                max: listing?.private_or_group === 'group' && listing.group_size_max 
                                    ? parseInt(listing.group_size_max) : 100
                            }}
                            error={!!errors.number_of_people}
                            helperText={
                                errors.number_of_people?.[0] || 
                                (listing?.private_or_group === 'group' && listing.group_size_min && listing.group_size_max
                                    ? `Group size: ${listing.group_size_min} - ${listing.group_size_max} people`
                                    : '')
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingDetailsStep;
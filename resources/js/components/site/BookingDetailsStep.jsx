import React, { useState, useEffect, useMemo } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    ChevronDown,
    Users,
    Car,
    Anchor,
    Activity,
} from "lucide-react";
import {
    Alert,
    FormControlLabel,
    Checkbox,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    TextField,
    Typography,
    Chip,
} from "@mui/material";
import TimeSelect from "./TimeSelect";
import axios from "axios";
import { useTranslation } from "react-i18next";
import RequiredAsterisk from "./RequiredAsterisk";
import NumberInput from "../common/NumberInput";

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
    setCalendarYear,
}) => {
    const { t } = useTranslation();
    // Local states for category-specific fields
    const [cities, setCities] = useState([]);
    const [addons, setAddons] = useState([]);
    const [durationOptions, setDurationOptions] = useState([]);

    // Helper function to format duration display
    const formatDuration = (duration) => {
        // Convert to string and handle numeric values
        const durationStr = String(duration).trim();

        // Handle numeric values (e.g., 0.5, 1, 1.5, 2, etc.)
        const numericValue = parseFloat(durationStr);
        if (!isNaN(numericValue)) {
            // Handle 30 minutes
            if (numericValue === 0.5) return "30 min";

            // Handle whole hours
            if (numericValue % 1 === 0) {
                if (numericValue === 1) return "1 hour";
                return `${numericValue} hours`;
            }

            // Handle half hours (e.g., 1.5, 2.5, etc.)
            if (numericValue % 1 === 0.5) {
                const wholeHours = Math.floor(numericValue);
                if (wholeHours === 1) return "1.5 hours";
                return `${wholeHours}.5 hours`;
            }

            // Fallback for other decimal hours
            return `${numericValue} hours`;
        }

        // Handle "30min" or "0.5h" format (legacy support)
        if (durationStr === "30min" || durationStr === "0.5h") return "30 min";

        // Handle hour-based formats (e.g., "1h", "2.5h")
        if (durationStr.includes("h")) {
            const hours = parseFloat(durationStr.replace("h", ""));

            // Handle whole hours
            if (hours % 1 === 0) {
                if (hours === 1) return "1 hour";
                return `${hours} hours`;
            }

            // Handle half hours
            if (hours % 1 === 0.5) {
                const wholeHours = Math.floor(hours);
                if (wholeHours === 0) return "30 min";
                if (wholeHours === 1) return "1.5 hours";
                return `${wholeHours}.5 hours`;
            }

            return `${hours} hours`;
        }

        // Fallback - return as is
        return durationStr;
    };

    // Auto-switch service type if intercity is not available
    useEffect(() => {
        if (categoryId === 3 && listing?.pricings) {
            const hasIntercityPricings = listing.pricings.some(
                (pricing) => pricing.intercity_one > 0 || pricing.intercity_round > 0
            );

            // If intercity is selected but not available, switch to airport_transfer
            if (serviceTypes.includes("intercity") && !hasIntercityPricings) {
                setServiceTypes(["airport_transfer"]);
            }
        }
    }, [listing?.pricings, categoryId]);
    
    // Set pickup city for airport transfer
    useEffect(() => {
        if (categoryId === 3 && serviceTypes.includes("airport_transfer") && listing?.city_id) {
            setPickupCity(listing.city_id);
        }
    }, [categoryId, serviceTypes, listing?.city_id]);

    // Load cities on component mount
    useEffect(() => {

        // Fetch cities from API to ensure correct IDs
        const fetchCities = async () => {
            try {
                const response = await axios.get("/api/get_cities");
                const citiesData = response.data.cities.map((city) => ({
                    id: city.id,
                    name: city.city_name,
                }));
                setCities(citiesData);
            } catch (error) {
                console.error("Error fetching cities:", error);
                // Fallback to hardcoded cities if API fails
                setCities([
                    { id: 1, name: "Agadir" },
                    { id: 2, name: "Marrakech" },
                    { id: 3, name: "Fes" },
                    { id: 4, name: "Casablanca" },
                    { id: 5, name: "Rabat" },
                    { id: 6, name: "Essaouira" },
                    { id: 7, name: "Tangier" },
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
                    const selectedDateTime = new Date(
                        `${startDate} ${hour.toString().padStart(2, "0")}:00`
                    );
                    if (selectedDateTime >= minBookingDateTime) {
                        setPickupTime(`${hour.toString().padStart(2, "0")}:00`);
                        // Also set dropoff time to same time
                        setDropoffTime(
                            `${hour.toString().padStart(2, "0")}:00`
                        );
                        break;
                    }
                }
            } else if (categoryId === 3) {
                // Private driver - Find the first available hour (48h advance)
                for (let hour = 0; hour < 24; hour++) {
                    const selectedDateTime = new Date(
                        `${startDate} ${hour.toString().padStart(2, "0")}:00`
                    );
                    if (selectedDateTime >= minBookingDateTime) {
                        setPickupTime(`${hour.toString().padStart(2, "0")}:00`);
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
                const selectedDateTime = new Date(
                    `${startDate} ${hour.toString().padStart(2, "0")}:00`
                );
                if (selectedDateTime >= minBookingDateTime) {
                    setBoatPickupTime(`${hour.toString().padStart(2, "0")}:00`);
                    break;
                }
            }
        }
    }, [startDate, categoryId]);

    // Load addons for all categories
    useEffect(() => {
        if (listing?.addons?.length > 0) {
            const listingAddons = listing.addons
                .map((addonItem) => ({
                    id: addonItem?.addon?.id,
                    name: addonItem?.addon?.addon || t("booking.unknownAddon"),
                    price: addonItem?.addon?.price || 0,
                }))
                .filter((addon) => addon.id); // Filter out any invalid addons
            setAddons(listingAddons);
        }

        // For car rentals, set pickup location to listing's city only if not already set
        // Ensure cities are loaded first to avoid race condition
        if (
            categoryId === 2 &&
            listing?.city_id &&
            !pickupLocation &&
            cities.length > 0
        ) {
            const cityExists = cities.some(
                (city) => city.id === listing.city_id
            );
            if (cityExists) {
                handleFieldChange("pickup_location", listing.city_id);
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
        const ampm = hour >= 12 ? t("time.pm") : t("time.am");
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
            if (showCalendar === "start") {
                setStartDate(selectedDate);
                // Automatically set end date to 3 days later
                const start = new Date(selectedDate);
                const autoEndDate = new Date(start);
                autoEndDate.setDate(autoEndDate.getDate() + 3);
                const endDateStr = `${autoEndDate.getFullYear()}-${String(
                    autoEndDate.getMonth() + 1
                ).padStart(2, "0")}-${String(autoEndDate.getDate()).padStart(
                    2,
                    "0"
                )}`;
                setEndDate(endDateStr);
                setShowCalendar(false);
            } else if (showCalendar === "end") {
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
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        // Parse the formatted string back to a Date object
        return new Date(moroccoTimeString);
    };

    // Helper function to get minimum allowed booking datetime
    const getMinBookingDateTime = () => {
        const moroccoNow = getMoroccoTime();
        const minDateTime = new Date(moroccoNow);

        // Different categories have different advance booking requirements
        switch (categoryId) {
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
            const dateStr = `${calendarYear}-${String(
                calendarMonth + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            days.push({ day, dateStr });
        }

        return days;
    }, [calendarMonth, calendarYear]);

    const navigateMonth = (direction) => {
        if (direction === "prev") {
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
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
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
            <h3 className="text-lg font-semibold mb-3">
                {t("booking.bookingDetails")}
            </h3>

            {/* Advance Booking Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                    <p className="text-blue-900 font-medium">
                        {[3, 4, 5].includes(categoryId)
                            ? t("booking.advanceBooking48Hour")
                            : t("booking.advanceBooking24Hour")}
                    </p>
                    <p className="text-blue-700 mt-1">
                        {categoryId === 2 &&
                            t("booking.advanceBookingCarRental")}
                        {categoryId === 3 &&
                            t("booking.advanceBookingPrivateDriver")}
                        {categoryId === 4 &&
                            t("booking.advanceBookingBoatRental")}
                        {categoryId === 5 &&
                            t("booking.advanceBookingActivities")}
                        {![2, 3, 4, 5].includes(categoryId) &&
                            t("booking.advanceBookingGeneral")}
                        <span className="block text-xs mt-1 text-blue-600">
                            {t("booking.currentMoroccoTime")}:{" "}
                            {getMoroccoTime().toLocaleString("en-US", {
                                timeZone: "Africa/Casablanca",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.pickupDate")}
                                <RequiredAsterisk />
                            </label>
                            <div
                                onClick={() => {
                                    setShowCalendar("start");
                                }}
                                className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                            >
                                <span
                                    className={`${
                                        !startDate
                                            ? "text-gray-500"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {startDate
                                        ? formatDate(startDate)
                                        : t("booking.selectPickupDate")}
                                </span>
                                <Calendar className="text-gray-400 w-5 h-5" />
                            </div>
                            {errors.pickup_date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pickup_date[0]}
                                </p>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="relative dropdown-container">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.dropoffDate")}
                                <RequiredAsterisk />
                            </label>
                            <div
                                onClick={() => {
                                    if (!startDate) {
                                        alert(
                                            t("booking.selectPickupDateFirst")
                                        );
                                        return;
                                    }
                                    setShowCalendar("end");
                                }}
                                className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                            >
                                <span
                                    className={`${
                                        !endDate
                                            ? "text-gray-500"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {endDate
                                        ? formatDate(endDate)
                                        : t("booking.selectDropoffDate")}
                                </span>
                                <Calendar className="text-gray-400 w-5 h-5" />
                            </div>
                            {errors.dropoff_date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.dropoff_date[0]}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    // Other categories - Single date picker
                    <div className="flex-1 relative dropdown-container mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {categoryId === 4
                                ? t("booking.rentalDate", "Rental Date")
                                : categoryId === 5
                                ? t("booking.activityDate", "Activity Date")
                                : categoryId === 3
                                ? t("booking.serviceDate", "Service Date")
                                : t("booking.selectDate", "Select Date")}
                            <RequiredAsterisk />
                        </label>
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
                                {startDate
                                    ? formatDate(startDate)
                                    : t("booking.selectDate")}
                            </span>
                            <Calendar className="text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                )}

                {/* Calendar Dropdown */}
                {showCalendar && (
                    <div
                        className={`dropdown-container absolute top-full ${
                            showCalendar === "end" ? "right-0" : "left-0"
                        } mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 w-80`}
                    >
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {categoryId === 2
                                    ? showCalendar === "start"
                                        ? t("booking.selectPickupDate")
                                        : t("booking.selectDropoffDate")
                                    : t("booking.selectDate")}
                            </h3>
                            <div className="text-xs text-gray-500 mt-1">
                                {categoryId === 2 && (
                                    <div className="mt-1">
                                        * Minimum rental duration: 3 days
                                    </div>
                                )}
                                <div className="mt-1 text-xs">
                                    Current Morocco time:{" "}
                                    {getMoroccoTime().toLocaleString("en-US", {
                                        timeZone: "Africa/Casablanca",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                {categoryId === 2 && showCalendar === "end" && (
                                    <div className="mt-1">
                                        * Dropoff must be on or after pickup
                                        date
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={() => navigateMonth("prev")}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronDown className="w-5 h-5 transform rotate-90" />
                            </button>
                            <div className="text-lg font-semibold text-gray-900">
                                {getMonthYearDisplay()}
                            </div>
                            <button
                                type="button"
                                onClick={() => navigateMonth("next")}
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
                                        <div key={index} className="py-2"></div>
                                    );
                                }

                                const { day, dateStr } = dayObj;
                                const isSelected = isDateSelected(dateStr);
                                const isInRange = isDateInRange(dateStr);

                                // Use Morocco timezone for validation
                                const minBookingDateTime =
                                    getMinBookingDateTime();
                                const currentDate = new Date(dateStr);
                                currentDate.setHours(23, 59, 59, 999); // End of selected day

                                // Date is in the past if it's before 24 hours from now in Morocco time
                                let isPast = currentDate < minBookingDateTime;

                                // For dropoff date, check if it's before pickup date + 3 days
                                if (
                                    categoryId === 2 &&
                                    showCalendar === "end" &&
                                    startDate
                                ) {
                                    const pickupDate = new Date(startDate);
                                    const minDropoffDate = new Date(pickupDate);
                                    minDropoffDate.setDate(
                                        minDropoffDate.getDate() + 3
                                    );
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
                                            !isPast && handleDateSelect(dateStr)
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
                                        if (showCalendar === "start") {
                                            setStartDate("");
                                        } else if (showCalendar === "end") {
                                            setEndDate("");
                                        }
                                    } else {
                                        setStartDate("");
                                    }
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                {t("booking.clear")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCalendar(false)}
                                className="text-sm bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                            >
                                {t("booking.done")}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.pickupCity", "Pickup City")}
                                <RequiredAsterisk />
                            </label>
                            <Select
                                value={pickupLocation}
                                onChange={(e) =>
                                    handleFieldChange(
                                        "pickup_location",
                                        e.target.value
                                    )
                                }
                                displayEmpty
                                className={`w-full ${
                                    errors.pickup_location ? "error" : ""
                                }`}
                                error={!!errors.pickup_location}
                                disabled={listing?.city_id ? true : false}
                            >
                                <MenuItem value="" disabled>
                                    {t(
                                        "booking.selectPickupCity",
                                        "Select City"
                                    )}
                                </MenuItem>
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {listing?.city_id && (
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                >
                                    {t("booking.pickupMustBeIn", {
                                        city:
                                            cities.find(
                                                (c) => c.id === listing.city_id
                                            )?.name || "listing city",
                                    })}
                                </Typography>
                            )}
                            {errors.pickup_location && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pickup_location[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.dropoffCity", "Dropoff City")}
                                <RequiredAsterisk />
                            </label>
                            <Select
                                value={dropoffLocation}
                                onChange={(e) =>
                                    handleFieldChange(
                                        "dropoff_location",
                                        e.target.value
                                    )
                                }
                                displayEmpty
                                className={`w-full ${
                                    errors.dropoff_location ? "error" : ""
                                }`}
                                error={!!errors.dropoff_location}
                            >
                                <MenuItem value="" disabled>
                                    {t(
                                        "booking.selectDropoffCity",
                                        "Select City"
                                    )}
                                </MenuItem>
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.dropoff_location && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.dropoff_location[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.pickupTime", "Pickup Time")}
                                <RequiredAsterisk />
                            </label>
                            <TimeSelect
                                value={pickupTime}
                                onChange={setPickupTime}
                                placeholder={t(
                                    "booking.selectTime",
                                    "Select Time"
                                )}
                                fromHour={0}
                                toHour={23}
                                stepMinutes={60}
                                selectedDate={startDate}
                                minHoursAdvance={24}
                                hasError={!!errors.pickup_time}
                                errorMessage={errors.pickup_time?.[0]}
                            />
                            {errors.pickup_time && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pickup_time[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("booking.dropoffTime", "Dropoff Time")}
                                <RequiredAsterisk />
                            </label>
                            <TimeSelect
                                value={dropoffTime}
                                onChange={setDropoffTime}
                                placeholder={t(
                                    "booking.selectTime",
                                    "Select Time"
                                )}
                                fromHour={0}
                                toHour={23}
                                stepMinutes={60}
                                selectedDate={endDate || startDate}
                                minHoursAdvance={0}
                                hasError={!!errors.dropoff_time}
                                errorMessage={errors.dropoff_time?.[0]}
                            />
                            {errors.dropoff_time && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.dropoff_time[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Add-ons
                        </FormLabel>
                        {addons.length > 0 ? (
                            <FormGroup>
                                {addons.map((addon) => (
                                    <FormControlLabel
                                        key={addon.id}
                                        control={
                                            <Checkbox
                                                checked={selectedAddons.includes(
                                                    addon.id
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAddons([
                                                            ...selectedAddons,
                                                            addon.id,
                                                        ]);
                                                    } else {
                                                        setSelectedAddons(
                                                            selectedAddons.filter(
                                                                (id) =>
                                                                    id !==
                                                                    addon.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={`${addon.name} - $${addon.price}`}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                className="italic"
                            >
                                {t("booking.noAddonsAvailable")}
                            </Typography>
                        )}
                    </div>

                    {/* Drop-off fee message */}
                    {pickupLocation &&
                        dropoffLocation &&
                        pickupLocation !== dropoffLocation && (
                            <Alert severity="info" className="mb-3">
                                {t("booking.dropoffFeeNotice")}
                            </Alert>
                        )}
                </>
            )}

            {/* Private Driver specific fields */}
            {categoryId === 3 && (
                <>
                    {/* Service Type Selection - RADIO BUTTONS */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Service Type <RequiredAsterisk />
                        </FormLabel>
                        <RadioGroup
                            value={
                                serviceTypes.length > 0 ? serviceTypes[0] : ""
                            }
                            onChange={(e) => setServiceTypes([e.target.value])}
                        >
                            <FormControlLabel
                                value="airport_transfer"
                                control={<Radio />}
                                label="Airport Transfer"
                            />
                            {(() => {
                                const hasIntercityPricings =
                                    listing?.pricings?.some(
                                        (pricing) =>
                                            pricing.intercity_one > 0 || pricing.intercity_round > 0
                                    );

                                return (
                                    <div>
                                        <FormControlLabel
                                            value="intercity"
                                            control={<Radio />}
                                            label="Intercity"
                                            disabled={!hasIntercityPricings}
                                        />
                                        {!hasIntercityPricings && (
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                                className="block ml-8 -mt-1"
                                            >
                                                {t(
                                                    "booking.intercityNotAvailable",
                                                    "This driver does not support intercity services"
                                                )}
                                            </Typography>
                                        )}
                                    </div>
                                );
                            })()}
                        </RadioGroup>
                        {errors.service_type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.service_type[0]}
                            </p>
                        )}
                    </div>

                    {/* Road Type Selection - RADIO BUTTONS */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Road Type <RequiredAsterisk />
                        </FormLabel>
                        <RadioGroup
                            value={roadTypes.length > 0 ? roadTypes[0] : ""}
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.road_type[0]}
                            </p>
                        )}
                    </div>

                    {/* Dynamic fields based on service type */}
                    {serviceTypes.includes("airport_transfer") && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t(
                                            "booking.pickupAirportCity",
                                            "Pickup Airport City"
                                        )}
                                        <RequiredAsterisk />
                                    </label>
                                    <TextField
                                        value={`${
                                            cities.find(
                                                (c) => c.id === listing?.city_id
                                            )?.name || ""
                                        } - Airport`}
                                        disabled
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            style: {
                                                backgroundColor: "#f5f5f5",
                                            },
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        className="block mt-1"
                                    >
                                        {t(
                                            "booking.pickupAirportNote",
                                            "Pickup location is fixed based on driver's city"
                                        )}
                                    </Typography>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t(
                                            "booking.dropoffCity",
                                            "Dropoff City"
                                        )}
                                        <RequiredAsterisk />
                                    </label>
                                    <Select
                                        value={dropoffCity}
                                        onChange={(e) =>
                                            setDropoffCity(e.target.value)
                                        }
                                        displayEmpty
                                        fullWidth
                                        error={!!errors.dropoff_city}
                                        variant="outlined"
                                    >
                                        <MenuItem value="" disabled>
                                            {t(
                                                "booking.selectDropoffCity",
                                                "Select Dropoff City"
                                            )}
                                        </MenuItem>
                                        {(() => {
                                            // Always include the driver's main city first
                                            const cityOptions = [];
                                            const mainCity = cities.find(
                                                (c) => c.id === listing?.city_id
                                            );
                                            if (mainCity) {
                                                cityOptions.push(
                                                    <MenuItem
                                                        key={mainCity.id}
                                                        value={mainCity.id}
                                                    >
                                                        {mainCity.name}
                                                    </MenuItem>
                                                );
                                            }

                                            // For airport transfers, show cities with airport prices
                                            // The price can be in airport columns OR intercity columns (for airport transfers to other cities)
                                            const selectedRoadType =
                                                roadTypes.length > 0
                                                    ? roadTypes[0]
                                                    : "one_way";
                                            const availableCities =
                                                listing?.pricings?.filter(
                                                    (pricing) => {
                                                        const isRoundTrip = selectedRoadType === "road_trip";
                                                        // Show cities that have either airport prices or intercity prices
                                                        // (intercity prices can be used for airport transfers to other cities)
                                                        if (isRoundTrip) {
                                                            return pricing.airport_round > 0 || pricing.intercity_round > 0;
                                                        } else {
                                                            return pricing.airport_one > 0 || pricing.intercity_one > 0;
                                                        }
                                                    }
                                                ) || [];

                                            availableCities.forEach((pricing) => {
                                                // Don't add the main city again
                                                if (pricing.city_id !== listing?.city_id) {
                                                    const city = cities.find(c => c.id === pricing.city_id);
                                                    const isRoundTrip = selectedRoadType === "road_trip";
                                                    // For airport transfer dropdown, prefer airport price if available, otherwise use intercity price
                                                    const price = isRoundTrip ? 
                                                        (pricing.airport_round || pricing.intercity_round) : 
                                                        (pricing.airport_one || pricing.intercity_one);
                                                    
                                                    cityOptions.push(
                                                        <MenuItem
                                                            key={pricing.city_id}
                                                            value={pricing.city_id}
                                                        >
                                                            {city?.city_name || city?.name || `City ${pricing.city_id}`}
                                                            {price > 0 && ` (+€${price})`}
                                                        </MenuItem>
                                                    );
                                                }
                                            });

                                            return cityOptions;
                                        })()}
                                    </Select>
                                    {errors.dropoff_city && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dropoff_city[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Address input field - always visible */}
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t(
                                        "booking.dropoffAddress",
                                        "Dropoff Address"
                                    )}
                                    <RequiredAsterisk />
                                </label>
                                <TextField
                                    value={dropoffHotel}
                                    onChange={(e) =>
                                        setDropoffHotel(e.target.value)
                                    }
                                    placeholder={t(
                                        "booking.enterAddress",
                                        "Enter hotel or address"
                                    )}
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.dropoff_hotel}
                                    helperText={errors.dropoff_hotel?.[0]}
                                />
                            </div>
                        </>
                    )}

                    {serviceTypes.includes("intercity") && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("booking.pickupCity", "Pickup City")}
                                        <RequiredAsterisk />
                                    </label>
                                    <TextField
                                        value={
                                            cities.find(
                                                (c) => c.id === listing?.city_id
                                            )?.name || ""
                                        }
                                        disabled
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            style: {
                                                backgroundColor: "#f5f5f5",
                                            },
                                        }}
                                    />
                                    {listing?.city_id && (
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            className="block mt-1"
                                        >
                                            {t(
                                                "booking.pickupMustBeIn",
                                                "Pickup must be in {{city}}",
                                                {
                                                    city:
                                                        cities.find(
                                                            (c) =>
                                                                c.id ===
                                                                listing.city_id
                                                        )?.name ||
                                                        "the driver's city",
                                                }
                                            )}
                                        </Typography>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t(
                                            "booking.dropoffCity",
                                            "Dropoff City"
                                        )}
                                        <RequiredAsterisk />
                                    </label>
                                    <Select
                                        value={dropoffCity}
                                        onChange={(e) =>
                                            setDropoffCity(e.target.value)
                                        }
                                        displayEmpty
                                        fullWidth
                                        error={!!errors.dropoff_city}
                                        variant="outlined"
                                    >
                                        <MenuItem value="" disabled>
                                            {t(
                                                "booking.selectDropoffCity",
                                                "Select Drop-off City"
                                            )}
                                        </MenuItem>
                                        {listing?.pricings && listing.pricings.length > 0
                                            ? listing.pricings
                                                .filter((pricing) => {
                                                    // Filter cities that have intercity prices
                                                    const isRoundTrip = roadTypes.includes("road_trip");
                                                    if (isRoundTrip) {
                                                        return pricing.intercity_round > 0;
                                                    } else {
                                                        return pricing.intercity_one > 0;
                                                    }
                                                })
                                                .map((pricing) => {
                                                    const city = cities.find(c => c.id === pricing.city_id);
                                                    const isRoundTrip = roadTypes.includes("road_trip");
                                                    const price = isRoundTrip ? pricing.intercity_round : pricing.intercity_one;
                                                    
                                                    return (
                                                        <MenuItem
                                                            key={pricing.city_id}
                                                            value={pricing.city_id}
                                                        >
                                                            {city?.city_name || city?.name || `City ${pricing.city_id}`}
                                                            {price > 0 && ` (+€${price})`}
                                                        </MenuItem>
                                                    );
                                                })
                                            : cities.map((city) => (
                                                  <MenuItem
                                                      key={city.id}
                                                      value={city.id}
                                                  >
                                                      {city.name || city.city_name}
                                                  </MenuItem>
                                              ))}
                                    </Select>
                                    {errors.dropoff_city && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dropoff_city[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Pick-up Date & Time */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.pickupTime", "Pick-up Time")}
                            <RequiredAsterisk />
                        </label>
                        <TimeSelect
                            value={pickupTime}
                            onChange={setPickupTime}
                            placeholder={t("booking.selectTime", "Select Time")}
                            fromHour={0}
                            toHour={23}
                            stepMinutes={60}
                            selectedDate={startDate}
                            minHoursAdvance={48}
                            hasError={!!errors.pickup_time}
                            errorMessage={errors.pickup_time?.[0]}
                        />
                    </div>

                    {/* Number of Passengers and Luggage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <NumberInput
                            value={numberOfPassengers}
                            onChange={(value) => setNumberOfPassengers(value)}
                            label={t(
                                "booking.numberOfPassengers",
                                "Number of Passengers"
                            )}
                            required={true}
                            min={1}
                            max={50}
                            error={errors.number_of_passengers?.[0]}
                            helperText="Max allowed: 50"
                        />
                        <NumberInput
                            value={numberOfLuggage}
                            onChange={(value) => setNumberOfLuggage(value)}
                            label={t(
                                "booking.numberOfLuggage",
                                "Number of Luggage"
                            )}
                            required={false}
                            min={0}
                            max={20}
                            error={errors.number_of_luggage?.[0]}
                            helperText="Max allowed: 20"
                        />
                    </div>

                    {/* Add-ons for Private Driver */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Add-ons
                        </FormLabel>
                        {addons.length > 0 ? (
                            <FormGroup>
                                {addons.map((addon) => (
                                    <FormControlLabel
                                        key={addon.id}
                                        control={
                                            <Checkbox
                                                checked={selectedAddons.includes(
                                                    addon.id
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAddons([
                                                            ...selectedAddons,
                                                            addon.id,
                                                        ]);
                                                    } else {
                                                        setSelectedAddons(
                                                            selectedAddons.filter(
                                                                (id) =>
                                                                    id !==
                                                                    addon.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={`${addon.name} - $${addon.price}`}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                className="italic"
                            >
                                {t(
                                    "booking.noAddonsAvailable",
                                    "No add-ons available"
                                )}
                            </Typography>
                        )}
                    </div>
                </>
            )}

            {/* Boat Rental specific fields */}
            {categoryId === 4 && (
                <>
                    {/* Pick-up Time with 8am-8pm restriction */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.pickupTime", "Pick-up Time")}
                            <RequiredAsterisk />
                            <span className="text-xs text-gray-500 font-normal ml-1">
                                (8am - 8pm)
                            </span>
                        </label>
                        <TimeSelect
                            value={boatPickupTime}
                            onChange={setBoatPickupTime}
                            placeholder={t("booking.selectTime", "Select Time")}
                            fromHour={8}
                            toHour={20}
                            stepMinutes={60}
                            selectedDate={startDate}
                            minHoursAdvance={48}
                            hasError={!!errors.pickup_time}
                            errorMessage={errors.pickup_time?.[0]}
                        />
                        {errors.pickup_time && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pickup_time[0]}
                            </p>
                        )}
                    </div>

                    {/* Duration Selection using Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.duration", "Duration")} *
                        </label>
                        <Select
                            value={boatDuration || ""}
                            onChange={(e) => setBoatDuration(e.target.value)}
                            displayEmpty
                            fullWidth
                            error={!!errors.duration}
                            variant="outlined"
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <span style={{ color: "#9CA3AF" }}>
                                            {t(
                                                "booking.selectDuration",
                                                "Select Duration"
                                            )}
                                        </span>
                                    );
                                }
                                return formatDuration(selected);
                            }}
                        >
                            <MenuItem value="" disabled>
                                {t("booking.selectDuration", "Select Duration")}
                            </MenuItem>
                            {(listing?.duration_options
                                ? listing.duration_options
                                      .split(",")
                                      .map((d) => d.trim())
                                : [
                                      "30min",
                                      "1h",
                                      "1.5h",
                                      "2h",
                                      "2.5h",
                                      "3h",
                                      "3.5h",
                                      "4h",
                                      "4.5h",
                                      "5h",
                                      "5.5h",
                                      "6h",
                                      "6.5h",
                                      "7h",
                                      "7.5h",
                                      "8h",
                                  ]
                            ).map((duration) => (
                                <MenuItem key={duration} value={duration}>
                                    {formatDuration(duration)}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.duration && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.duration[0]}
                            </p>
                        )}
                    </div>

                    {/* Number of People */}
                    <NumberInput
                        value={numberOfPeople}
                        onChange={(value) =>
                            handleFieldChange("number_of_people", value)
                        }
                        label={t("booking.numberOfPeople", "Number of People")}
                        required={true}
                        min={1}
                        max={
                            listing?.capacity ? parseInt(listing.capacity) : 100
                        }
                        error={errors.number_of_people?.[0]}
                        helperText={
                            listing?.capacity
                                ? `Max capacity: ${listing.capacity}`
                                : null
                        }
                    />

                    {/* Add-ons for Boat Rental */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Add-ons
                        </FormLabel>
                        {addons.length > 0 ? (
                            <FormGroup>
                                {addons.map((addon) => (
                                    <FormControlLabel
                                        key={addon.id}
                                        control={
                                            <Checkbox
                                                checked={selectedAddons.includes(
                                                    addon.id
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAddons([
                                                            ...selectedAddons,
                                                            addon.id,
                                                        ]);
                                                    } else {
                                                        setSelectedAddons(
                                                            selectedAddons.filter(
                                                                (id) =>
                                                                    id !==
                                                                    addon.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={`${addon.name} - $${addon.price}`}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                className="italic"
                            >
                                {t(
                                    "booking.noAddonsAvailable",
                                    "No add-ons available"
                                )}
                            </Typography>
                        )}
                    </div>
                </>
            )}

            {/* Activity specific fields */}
            {categoryId === 5 && (
                <>
                    {/* Time Preference */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.timePreference", "Time Preference")}
                            <RequiredAsterisk />
                        </label>
                        <Select
                            value={timePreference}
                            onChange={(e) => setTimePreference(e.target.value)}
                            displayEmpty
                            fullWidth
                            error={!!errors.time_preference}
                        >
                            <MenuItem value="" disabled>
                                {t("booking.selectTimePreference", "Select Time Preference")}
                            </MenuItem>
                            <MenuItem value="morning">{t("booking.timeSlots.morning", "Morning")}</MenuItem>
                            <MenuItem value="afternoon">{t("booking.timeSlots.afternoon", "Afternoon")}</MenuItem>
                            <MenuItem value="evening">{t("booking.timeSlots.evening", "Evening")}</MenuItem>
                            <MenuItem value="night">{t("booking.timeSlots.night", "Night")}</MenuItem>
                        </Select>
                        {errors.time_preference && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.time_preference[0]}
                            </p>
                        )}
                    </div>

                    {/* Activity Options with Prices (loaded from backend) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.activityOptions", "Activity Options")}
                            <RequiredAsterisk />
                        </label>
                        {(listing?.customBookingOptions ||
                            listing?.custom_booking_options) &&
                        (
                            listing.customBookingOptions ||
                            listing.custom_booking_options
                        ).length > 0 ? (
                            <>
                                <Select
                                    value={selectedDurationOption}
                                    onChange={(e) =>
                                        setSelectedDurationOption(
                                            e.target.value
                                        )
                                    }
                                    displayEmpty
                                    fullWidth
                                    error={!!errors.duration_option}
                                >
                                    <MenuItem value="" disabled>
                                        {t("booking.selectActivityOption", "Select Option")}
                                    </MenuItem>
                                    {(
                                        listing.customBookingOptions ||
                                        listing.custom_booking_options
                                    ).map((option) => {
                                        // Display option name exactly as stored
                                        return (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name} - ${option.price}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {errors.duration_option && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.duration_option[0]}
                                    </p>
                                )}
                            </>
                        ) : listing?.actPricings &&
                          listing.actPricings.length > 0 ? (
                            // Fallback to actPricings if customBookingOptions not available
                            <>
                                <Select
                                    value={selectedDurationOption}
                                    onChange={(e) =>
                                        setSelectedDurationOption(
                                            e.target.value
                                        )
                                    }
                                    displayEmpty
                                    fullWidth
                                    error={!!errors.duration_option}
                                >
                                    <MenuItem value="" disabled>
                                        {t("booking.selectActivityOption", "Select Option")}
                                    </MenuItem>
                                    {listing.actPricings.map((pricing) => {
                                        // Display pricing element exactly as stored
                                        return (
                                            <MenuItem
                                                key={pricing.id}
                                                value={pricing.id}
                                            >
                                                {pricing.element} - ${pricing.price}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {errors.duration_option && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.duration_option[0]}
                                    </p>
                                )}
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                Duration options not available
                            </Typography>
                        )}
                    </div>

                    {/* Number of People */}
                    <NumberInput
                        value={numberOfPeople}
                        onChange={(value) =>
                            handleFieldChange("number_of_people", value)
                        }
                        label={t("booking.numberOfPeople", "Number of People")}
                        required={true}
                        min={
                            listing?.private_or_group?.toLowerCase() === "group" &&
                            listing.group_size_min
                                ? parseInt(listing.group_size_min)
                                : 1
                        }
                        max={
                            listing?.private_or_group?.toLowerCase() === "group" &&
                            listing.group_size_max
                                ? parseInt(listing.group_size_max)
                                : 100
                        }
                        error={errors.number_of_people?.[0]}
                        helperText={
                            listing?.private_or_group?.toLowerCase() === "group"
                                ? listing.group_size_min && listing.group_size_max
                                    ? `${t("booking.groupSize", "Group size")}: ${listing.group_size_min} - ${listing.group_size_max} ${t("booking.peopleRequired", "people required")}`
                                    : t("booking.groupActivityText", "This is a group activity")
                                : listing?.private_or_group?.toLowerCase() === "private"
                                    ? t("booking.privateActivityHelper", "Price is per person")
                                    : null
                        }
                    />

                    {/* Add-ons for Things to Do */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Add-ons
                        </FormLabel>
                        {addons.length > 0 ? (
                            <FormGroup>
                                {addons.map((addon) => (
                                    <FormControlLabel
                                        key={addon.id}
                                        control={
                                            <Checkbox
                                                checked={selectedAddons.includes(
                                                    addon.id
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAddons([
                                                            ...selectedAddons,
                                                            addon.id,
                                                        ]);
                                                    } else {
                                                        setSelectedAddons(
                                                            selectedAddons.filter(
                                                                (id) =>
                                                                    id !==
                                                                    addon.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={`${addon.name} - $${addon.price}`}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                className="italic"
                            >
                                {t(
                                    "booking.noAddonsAvailable",
                                    "No add-ons available"
                                )}
                            </Typography>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingDetailsStep;

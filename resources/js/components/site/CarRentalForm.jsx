import React, { useEffect, useState } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    ChevronDown,
    Search,
    Info,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import LocationModal from "./LocationModal";
import TimeModal from "./TimeModal";
import { useTranslation } from "react-i18next";
export default function CarRentalForm() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupLocationId, setPickupLocationId] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("Same as pickup");
    const [dropoffLocationId, setDropoffLocationId] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const [dropoffTime, setDropoffTime] = useState("");
    const [showPickupModal, setShowPickupModal] = useState(false);
    const [showDropOffModal, setShowDropOffModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(null);
    const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
    const [showDropOffTimeModal, setShowDropOffTimeModal] = useState(false);
    const [dateError, setDateError] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 900 });
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return t("homeSearch.selectDate", "Select date");
        const date = new Date(dateString);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${days[date.getDay()]}, ${
            months[date.getMonth()]
        } ${date.getDate()}`;
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes}`;
    };

    const generateCalendarDays = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const getParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const calendarDays = generateCalendarDays(
        currentDate.getFullYear(),
        currentDate.getMonth()
    );

    const CalendarPicker = ({ selectedDate, onDateSelect, type }) => (
        <div className="">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                    {currentDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </h3>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    const isCurrentMonth =
                        day.getMonth() === currentDate.getMonth();
                    const isSelected =
                        day.toISOString().split("T")[0] === selectedDate;
                    const isToday =
                        day.toDateString() === new Date().toDateString();

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                onDateSelect(day.toISOString().split("T")[0]);
                                setShowCalendar(null);
                            }}
                            className={`
                p-2 text-sm rounded-md hover:bg-blue-50 transition-colors
                ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                ${isSelected ? "bg-blue-500 text-white hvr-bg-green" : ""}
                ${isToday && !isSelected ? "bg-blue-100 text-green-600" : ""}
              `}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    function formatYMD(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = {
            category: 2, // Car rental category
            pickup_location: pickupLocation, // City name for display
            dropoff_location: dropoffLocation, // City name for display
            pickup_city: pickupLocationId, // City ID for backend
            dropoff_city: dropoffLocationId, // City ID for backend
            pickup_date: pickupDate,
            dropoff_date: dropoffDate,
            pickup_time: pickupTime,
            dropoff_time: dropoffTime,
        };

        // Store in session storage
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));

        const params = new URLSearchParams({
            pickup: pickupLocation,
            dropoff: dropoffLocation,
            pickup_date: pickupDate,
            dropoff_date: dropoffDate,
            pickup_time: pickupTime,
            dropoff_time: dropoffTime,
        });

        window.location.href = `/car-search?${params.toString()}`;
    };

    useEffect(() => {
        setPickupLocation(getParam("pickup") || "");
        setDropoffLocation(getParam("dropoff") || "Same as pickup");
        setPickupDate(getParam("pickup_date") || "");
        setDropoffDate(getParam("dropoff_date") || "");
        setPickupTime(getParam("pickup_time") || "");
        setDropoffTime(getParam("dropoff_time") || "");
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative">
                    <div
                        className={`flex ${isMobile ? "flex-col" : "flex-row"}`}
                    >
                        {/* Pick-up Location */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t(
                                    "homeSearch.pickupLocation",
                                    "Pick-up Location"
                                )}
                            </label>
                            <input
                                type="text"
                                value={pickupLocation}
                                onFocus={() => setShowPickupModal(true)}
                                onChange={(e) =>
                                    setPickupLocation(e.target.value)
                                }
                                placeholder={t(
                                    "booking.pickupCity",
                                    "Airport, city, station, region, district..."
                                )}
                                className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                            />
                            <LocationModal
                                open={showPickupModal}
                                returnBoth={true}
                                onSelect={(cityId, cityName) => {
                                    setPickupLocationId(cityId);
                                    setPickupLocation(cityName);
                                }}
                                onClose={() => setShowPickupModal(false)}
                            />
                        </div>

                        {/* Dropoff Location */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t(
                                    "homeSearch.dropoffLocation",
                                    "Dropoff Location"
                                )}
                            </label>
                            <button
                                onClick={() => setShowDropOffModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                            >
                                {dropoffLocation}
                            </button>
                            <LocationModal
                                open={showDropOffModal}
                                returnBoth={true}
                                onSelect={(cityId, cityName) => {
                                    setDropoffLocationId(cityId);
                                    setDropoffLocation(cityName);
                                }}
                                onClose={() => setShowDropOffModal(false)}
                            />
                        </div>

                        {/* Pick-up Date */}
                        <div className="flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    {t("booking.pickupDate")}
                                </label>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() =>
                                            setShowCalendar(
                                                showCalendar === "pickup"
                                                    ? null
                                                    : "pickup"
                                            )
                                        }
                                        className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                                    >
                                        {formatDate(pickupDate)}
                                    </button>
                                    <div className="relative">
                                        <button
                                            className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                                            onClick={() =>
                                                setShowPickupTimeModal(true)
                                            }
                                        >
                                            {pickupTime}
                                        </button>
                                        {/* <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                </div>
                            </div>
                            {showCalendar === "pickup" && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[100] w-80">
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateMonth(-1);
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <h3 className="font-semibold text-gray-900">
                                            {currentDate.toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </h3>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateMonth(1);
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {[
                                            "Su",
                                            "Mo",
                                            "Tu",
                                            "We",
                                            "Th",
                                            "Fr",
                                            "Sa",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-xs font-medium text-gray-500 py-2"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((day, index) => {
                                            const isCurrentMonth =
                                                day.getMonth() ===
                                                currentDate.getMonth();
                                            const isSelected =
                                                formatYMD(day) === pickupDate;
                                            const isToday =
                                                day.toDateString() ===
                                                new Date().toDateString();

                                            // Check if date is at least 24 hours in advance
                                            const now = new Date();
                                            const tomorrow = new Date();
                                            tomorrow.setDate(
                                                tomorrow.getDate() + 1
                                            );
                                            tomorrow.setHours(0, 0, 0, 0);

                                            const dayStart = new Date(day);
                                            dayStart.setHours(0, 0, 0, 0);

                                            // Disable all dates before tomorrow (24hr advance requirement)
                                            const isDisabled =
                                                dayStart < tomorrow;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!isDisabled) {
                                                            const selectedDate =
                                                                formatYMD(day);
                                                            setPickupDate(
                                                                selectedDate
                                                            );

                                                            // Auto-set dropoff date to 3 days later
                                                            const dropoff =
                                                                new Date(day);
                                                            dropoff.setDate(
                                                                dropoff.getDate() +
                                                                    3
                                                            );
                                                            setDropoffDate(
                                                                formatYMD(
                                                                    dropoff
                                                                )
                                                            );

                                                            // Auto-set pickup time to first available hour (24hr advance)
                                                            const now =
                                                                new Date();
                                                            const minBookingDateTime =
                                                                new Date(now);
                                                            minBookingDateTime.setHours(
                                                                minBookingDateTime.getHours() +
                                                                    24
                                                            );

                                                            // Find first available hour
                                                            for (
                                                                let hour = 0;
                                                                hour < 24;
                                                                hour++
                                                            ) {
                                                                const selectedDateTime =
                                                                    new Date(
                                                                        `${selectedDate} ${hour
                                                                            .toString()
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )}:00`
                                                                    );
                                                                if (
                                                                    selectedDateTime >=
                                                                    minBookingDateTime
                                                                ) {
                                                                    const timeStr = `${hour
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}:00`;
                                                                    setPickupTime(
                                                                        timeStr
                                                                    );
                                                                    setDropoffTime(
                                                                        timeStr
                                                                    );
                                                                    break;
                                                                }
                                                            }

                                                            setDateError("");
                                                            setShowCalendar(
                                                                null
                                                            );
                                                        }
                                                    }}
                                                    disabled={isDisabled}
                                                    className={`
                            p-2 text-sm rounded-md hover:bg-blue-50 transition-colors
                            ${
                                !isCurrentMonth
                                    ? "text-gray-300"
                                    : "text-gray-900"
                            }
                            ${
                                isDisabled
                                    ? "cursor-not-allowed opacity-50 bg-gray-100"
                                    : "hover:bg-blue-50 cursor-pointer"
                            }
                            ${
                                isSelected && !isDisabled
                                    ? "bg-blue-500 text-white hvr-bg-green"
                                    : ""
                            }
                            ${
                                isToday && !isSelected && !isDisabled
                                    ? "bg-blue-100 text-green-600"
                                    : ""
                            }
                          `}
                                                >
                                                    {day.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Constraint info */}
                                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-xs text-blue-700">
                                                <p className="font-medium">
                                                    {t(
                                                        "homeSearch.bookingRequirements"
                                                    )}
                                                </p>
                                                <p>
                                                    •{" "}
                                                    {t(
                                                        "booking.advanceBooking24Hour"
                                                    )}
                                                </p>
                                                <p>
                                                    •{" "}
                                                    {t(
                                                        "homeSearch.flexibleMultiDayRentals",
                                                        "Minimum 3-day rental period"
                                                    )}
                                                </p>
                                                <p>
                                                    •{" "}
                                                    {t(
                                                        "booking.dropoffFeeNotice",
                                                        "Drop-off date auto-set to 3 days after pickup"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <TimeModal
                                open={showPickupTimeModal}
                                onSelect={(time) => setPickupTime(time)}
                                onClose={() => setShowPickupTimeModal(false)}
                                selectedDate={pickupDate}
                                minHoursAdvance={24}
                            />
                        </div>

                        {/* Drop-off Date */}
                        <div className="flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    {t("booking.dropoffDate")}
                                </label>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() =>
                                            setShowCalendar(
                                                showCalendar === "dropoff"
                                                    ? null
                                                    : "dropoff"
                                            )
                                        }
                                        className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                                    >
                                        {formatDate(dropoffDate)}
                                    </button>
                                    <div className="relative">
                                        <button
                                            className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                                            onClick={() =>
                                                setShowDropOffTimeModal(true)
                                            }
                                        >
                                            {dropoffTime}
                                        </button>
                                        {/* <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                </div>
                            </div>
                            {showCalendar === "dropoff" && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[100] w-80">
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateMonth(-1);
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <h3 className="font-semibold text-gray-900">
                                            {currentDate.toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </h3>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateMonth(1);
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {[
                                            "Su",
                                            "Mo",
                                            "Tu",
                                            "We",
                                            "Th",
                                            "Fr",
                                            "Sa",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-xs font-medium text-gray-500 py-2"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((day, index) => {
                                            const isCurrentMonth =
                                                day.getMonth() ===
                                                currentDate.getMonth();
                                            const isSelected =
                                                formatYMD(day) === dropoffDate;
                                            const isToday =
                                                day.toDateString() ===
                                                new Date().toDateString();

                                            // Check minimum 3-day rental
                                            let isDisabled = false;
                                            if (pickupDate) {
                                                const pickup = new Date(
                                                    pickupDate
                                                );
                                                const minDropoff = new Date(
                                                    pickup
                                                );
                                                minDropoff.setDate(
                                                    minDropoff.getDate() + 3
                                                );
                                                minDropoff.setHours(0, 0, 0, 0);
                                                const dayStart = new Date(day);
                                                dayStart.setHours(0, 0, 0, 0);
                                                isDisabled =
                                                    dayStart < minDropoff;
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!isDisabled) {
                                                            setDropoffDate(
                                                                formatYMD(day)
                                                            );
                                                            setDateError("");
                                                            setShowCalendar(
                                                                null
                                                            );
                                                        }
                                                    }}
                                                    disabled={isDisabled}
                                                    className={`
                            p-2 text-sm rounded-md hover:bg-blue-50 transition-colors
                            ${
                                !isCurrentMonth
                                    ? "text-gray-300"
                                    : "text-gray-900"
                            }
                            ${
                                isDisabled
                                    ? "cursor-not-allowed opacity-50 bg-gray-100"
                                    : "hover:bg-blue-50 cursor-pointer"
                            }
                            ${
                                isSelected && !isDisabled
                                    ? "bg-blue-500 text-white hvr-bg-green"
                                    : ""
                            }
                            ${
                                isToday && !isSelected && !isDisabled
                                    ? "bg-blue-100 text-green-600"
                                    : ""
                            }
                          `}
                                                >
                                                    {day.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Minimum rental info */}
                                    {pickupDate && (
                                        <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <div className="text-xs text-blue-700">
                                                    <p>
                                                        Minimum 3-day rental
                                                        period required
                                                    </p>
                                                    <p>
                                                        Earliest drop-off:{" "}
                                                        {(() => {
                                                            const pickup =
                                                                new Date(
                                                                    pickupDate
                                                                );
                                                            const minDropoff =
                                                                new Date(
                                                                    pickup
                                                                );
                                                            minDropoff.setDate(
                                                                minDropoff.getDate() +
                                                                    3
                                                            );
                                                            return formatDate(
                                                                formatYMD(
                                                                    minDropoff
                                                                )
                                                            );
                                                        })()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <TimeModal
                                open={showDropOffTimeModal}
                                onSelect={(time) => setDropoffTime(time)}
                                onClose={() => setShowDropOffTimeModal(false)}
                                selectedDate={dropoffDate}
                                minHoursAdvance={24}
                            />
                        </div>

                        {/* Search Button */}
                        {!isMobile ? (
                            <div className="flex-shrink-0">
                                <button
                                    className="h-full px-8 btn-search text-white transition-colors flex items-center justify-center"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    <Search className="w-6 h-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="lg:w-auto w-full">
                                <button
                                    className="w-full lg:w-auto btn-search-v2 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    <Search className="w-5 h-5" />
                                    {t("common.search", "Search")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close calendar */}
            {(showCalendar ||
                showPickupModal ||
                showDropOffModal ||
                showPickupTimeModal ||
                showDropOffTimeModal) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCalendar(null);
                        setShowPickupModal(false);
                        setShowDropOffModal(false);
                        setShowPickupTimeModal(false);
                        setShowDropOffTimeModal(false);
                    }}
                />
            )}
        </div>
    );
}

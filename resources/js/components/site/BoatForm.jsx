import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Search, ChevronDown, Anchor, Clock, Users, Info, ChevronLeft, ChevronRight } from "lucide-react";
import LocationModal from "./LocationModal";
import TimeModal from "./TimeModal";

const BoatForm = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedBoatType, setSelectedBoatType] = useState("Any type");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showBoatTypes, setShowBoatTypes] = useState(false);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [time, setTime] = useState("");
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [peopleCount, setPeopleCount] = useState(1);
    const [showPeopleModal, setShowPeopleModal] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const boatTypes = [
        { id: "any", name: "Any type" },
        { id: "yacht", name: "Yacht" },
        { id: "speedboat", name: "Speedboat" },
        { id: "sailboat", name: "Sailboat" },
        { id: "custom", name: "Custom" },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const getDateRangeText = () => {
        if (!startDate) return "Select date";
        return formatDate(startDate);
    };

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
        setShowBoatTypes(false);
        setIsSelectingEndDate(false);
    };

    const handleBoatTypeClick = () => {
        setShowBoatTypes(!showBoatTypes);
        setShowCalendar(false);
    };

    const handleBoatTypeSelect = (boatType) => {
        setSelectedBoatType(boatType.name);
        setShowBoatTypes(false);
    };

    const handleDateSelect = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate(selectedDate); // For boat rentals, single day booking
        
        // Auto-set time to first available hour (48hr advance for boats)
        const now = new Date();
        const minBookingDateTime = new Date(now);
        minBookingDateTime.setHours(minBookingDateTime.getHours() + 48);
        
        // Find first available hour between 8am-8pm for boats
        for (let hour = 8; hour <= 20; hour++) {
            const selectedDateTime = new Date(`${selectedDate} ${hour.toString().padStart(2, '0')}:00`);
            if (selectedDateTime >= minBookingDateTime) {
                setTime(`${hour.toString().padStart(2, '0')}:00`);
                break;
            }
        }
        
        setShowCalendar(false);
        setIsSelectingEndDate(false);
    };

    const generateCalendarDays = () => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
                2,
                "0"
            )}-${String(day).padStart(2, "0")}`;
            days.push({ day, dateStr });
        }

        return days;
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

    const handleSearch = (e) => {
        e.preventDefault();
        
        const searchParams = {
            category: 4, // Boat rental category
            boat_type: selectedBoatType,
            city: destination,
            date: startDate,
            time: time,
            people: peopleCount,
            start_date: startDate,
            end_date: endDate,
        };
        
        // Store in session storage
        sessionStorage.setItem('searchParams', JSON.stringify(searchParams));
        
        const params = new URLSearchParams({
            destination: destination,
            boat_type: selectedBoatType,
            start_date: startDate,
            end_date: endDate,
            time: time,
            people: peopleCount,
        });

        window.location.href = `/boat-search?${params.toString()}`;
    };

    useEffect(() => {
        console.log("Destination: ", getParam("destination") || "");
        setSelectedBoatType(getParam("boat_type") || "Any type");
        setDestination(getParam("destination") || "");
        setStartDate(getParam("start_date") || "");
        setEndDate(getParam("end_date") || "");
        setTime(getParam("time") || "");
        setPeopleCount(parseInt(getParam("people") || "1"));
    }, []);

    return (
        <div className="w-full mx-auto">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-end">
                {/* Boat Type Field */}
                <div className="w-full lg:flex-1 relative dropdown-container">
                    <div
                        onClick={handleBoatTypeClick}
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gray-900">
                                {selectedBoatType}
                            </span>
                        </div>
                        <ChevronDown
                            className={`text-gray-400 w-5 h-5 transition-transform duration-200 ${
                                showBoatTypes ? "rotate-180" : ""
                            }`}
                        />
                    </div>

                    {/* Boat Types Dropdown */}
                    {showBoatTypes && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-full max-h-80 overflow-y-auto">
                            <div className="p-2">
                                {boatTypes.map((boatType) => (
                                    <div
                                        key={boatType.id}
                                        onClick={() =>
                                            handleBoatTypeSelect(boatType)
                                        }
                                        className={`
                          flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200
                          ${
                              selectedBoatType === boatType.name
                                  ? "drop-item--active"
                                  : "hover:bg-gray-50 text-gray-700"
                          }
                        `}
                                    >
                                        <span className="text-lg">
                                            {boatType.name}
                                        </span>
                                        <div className="ml-auto">
                                            <div
                                                className={`
                            w-5 h-5 rounded border-2 transition-colors duration-200
                            ${
                                selectedBoatType === boatType.name
                                    ? "bg-green-500"
                                    : "border-gray-300"
                            }
                          `}
                                            >
                                                {selectedBoatType ===
                                                    boatType.name && (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full lg:flex-1 relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onFocus={() => setShowDestinationModal(true)}
                            placeholder="Where are you going?"
                            className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                        />
                        <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <LocationModal
                        open={showDestinationModal}
                        onSelect={(city) => setDestination(city)}
                        onClose={() => setShowDestinationModal(false)}
                    />
                </div>

                {/* Dates Field */}
                <div className="w-full lg:flex-1 relative dropdown-container">
                    <div
                        onClick={handleDateClick}
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                    >
                        <span
                            className={`${
                                !startDate && !endDate
                                    ? "text-gray-500"
                                    : "text-gray-900"
                            }`}
                        >
                            {getDateRangeText()}
                        </span>
                        <Calendar className="text-gray-400 w-5 h-5" />
                    </div>

                    {/* Calendar Dropdown */}
                    {showCalendar && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 w-80">
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Select rental date
                                </h3>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigateMonth(-1);
                                        }}
                                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div className="text-sm text-gray-600">
                                        {(() => {
                                            const monthNames = [
                                                "January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December"
                                            ];
                                            return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
                                        })()}
                                    </div>
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
                                {generateCalendarDays().map((dayObj, index) => {
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
                                    
                                    // Check if date is at least 48 hours in advance for boats
                                    const twoDaysAhead = new Date();
                                    twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
                                    twoDaysAhead.setHours(0, 0, 0, 0);
                                    const dayStart = new Date(dateStr);
                                    dayStart.setHours(0, 0, 0, 0);
                                    const isPast = dayStart < twoDaysAhead;

                                    return (
                                        <button
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
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-blue-50 cursor-pointer"
                            }
                            ${
                                isSelected
                                    ? "bg-green-600 text-white hover:bg-blue-700"
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
                                    onClick={() => {
                                        setStartDate("");
                                        setEndDate("");
                                        setIsSelectingEndDate(false);
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="text-sm bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                                >
                                    Done
                                </button>
                            </div>
                            
                            {/* Constraint info */}
                            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-xs text-blue-700">
                                        <p className="font-medium">Booking Requirements:</p>
                                        <p>• Minimum 48 hours advance booking</p>
                                        <p>• Flexible multi-day rentals available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Time Field */}
                <div className="w-full lg:w-32 relative">
                    <div
                        onClick={() => setShowTimeModal(true)}
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="text-gray-400 w-5 h-5" />
                            <span className="text-gray-900">{time}</span>
                        </div>
                    </div>
                    <TimeModal
                        open={showTimeModal}
                        onSelect={(selectedTime) => setTime(selectedTime)}
                        onClose={() => setShowTimeModal(false)}
                        selectedDate={startDate}
                        minHoursAdvance={48}
                    />
                </div>

                {/* People Count Field */}
                <div className="w-full lg:w-40 relative">
                    <div
                        onClick={() => setShowPeopleModal(true)}
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="text-gray-400 w-5 h-5" />
                            <span className="text-gray-900">{peopleCount} {peopleCount === 1 ? 'person' : 'people'}</span>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="lg:w-auto w-full">
                    <button
                        onClick={(e) => handleSearch(e)}
                        className="w-full lg:w-auto btn-search-v2 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Search
                    </button>
                </div>
            </div>

            {/* People Count Modal */}
            {showPeopleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" onClick={() => setShowPeopleModal(false)}>
                    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs relative" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4 text-center">Number of People</h3>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() => setPeopleCount((prev) => Math.max(1, prev - 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                                disabled={peopleCount <= 1}
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold">{peopleCount}</span>
                            <button
                                type="button"
                                onClick={() => setPeopleCount((prev) => Math.min(50, prev + 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                                disabled={peopleCount >= 50}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="mt-6 w-full py-2 rounded-lg bg-green-600 text-white font-semibold transition"
                            onClick={() => setShowPeopleModal(false)}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            {(showCalendar || showDestinationModal || showTimeModal) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCalendar(false);
                        setShowDestinationModal(false);
                        setShowTimeModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default BoatForm;

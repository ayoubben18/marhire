import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Search, Users, Clock, Info, ChevronLeft, ChevronRight } from "lucide-react";
import LocationModal from "./LocationModal";

const ThingsToDoForm = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [peopleCount, setPeopleCount] = useState(1);
    const [showPeopleModal, setShowPeopleModal] = useState(false);
    const [timePreference, setTimePreference] = useState("morning");
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getDateRangeText = () => {
        if (!startDate) return "Select date";
        return formatDate(startDate);
    };
    
    const getMonthYearDisplay = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    };

    useEffect(() => {
        setDestination(getParam('destination') || '');
        setStartDate(getParam('start_date') || '');
        setEndDate(getParam('end_date') || '');
        setPeopleCount(parseInt(getParam('people') || '1'));
        setTimePreference(getParam('time_preference') || 'morning');
    }, []);

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
        setIsSelectingEndDate(false);
    };

    const getParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const handleDateSelect = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate(selectedDate); // For activities, end date is same as start date
        
        // Note: Time preference is handled differently for Things to Do
        // It uses morning/afternoon/evening preference instead of specific times
        // The timePreference state is already set separately
        
        setShowCalendar(false);
        setIsSelectingEndDate(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        const searchParams = {
            category: 5, // Things to do category
            date: startDate,
            people: peopleCount,
            time_preference: timePreference,
            destination: destination,
            start_date: startDate,
            end_date: endDate,
        };
        
        // Store in session storage
        sessionStorage.setItem('searchParams', JSON.stringify(searchParams));
        
        const params = new URLSearchParams({
            destination: destination,
            start_date: startDate,
            end_date: endDate,
            people: peopleCount,
            time_preference: timePreference,
        });

        window.location.href = `/thingstodo-search?${params.toString()}`;
    };

    // Generate calendar days for current month
    const generateCalendarDays = () => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
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

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Going to Field */}
            <div className="w-full lg:flex-1 relative">
                <div className="relative">
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => {
                            setDestination(e.target.value);
                        }}
                        onFocus={() => setShowDestinationModal(true)}
                        placeholder="Enter destination"
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
            <div className="w-full lg:flex-1 relative">
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
                                Select activity date
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
                                    {getMonthYearDisplay()}
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
                                        <div key={index} className="py-2"></div>
                                    );
                                }

                                const { day, dateStr } = dayObj;
                                const isSelected = isDateSelected(dateStr);
                                const isInRange = isDateInRange(dateStr);
                                
                                // Check if date is at least 48 hours in advance for activities
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
                                            !isPast && handleDateSelect(dateStr)
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
                                    <p>• Flexible date selection for activities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

            {/* Time Preference Field */}
            <div className="w-full lg:w-40 relative">
                <div
                    onClick={() => setShowTimeModal(true)}
                    className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Clock className="text-gray-400 w-5 h-5" />
                        <span className="text-gray-900 capitalize">{timePreference}</span>
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <div className="lg:w-auto w-full">
                <button
                    onClick={handleSearch}
                    className="w-full lg:w-auto btn-search-v2 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                    <Search className="w-5 h-5" />
                    Search
                </button>
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

            {/* Time Preference Modal */}
            {showTimeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" onClick={() => setShowTimeModal(false)}>
                    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs relative" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4 text-center">Preferred Time</h3>
                        <div className="space-y-2">
                            {['morning', 'afternoon', 'evening', 'night'].map(time => (
                                <button
                                    key={time}
                                    onClick={() => {
                                        setTimePreference(time);
                                        setShowTimeModal(false);
                                    }}
                                    className={`w-full py-3 px-4 rounded-lg transition ${
                                        timePreference === time 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                    }`}
                                >
                                    <span className="capitalize">{time}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {(showCalendar || showDestinationModal) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCalendar(false);
                        setShowDestinationModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default ThingsToDoForm;

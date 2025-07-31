import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Search } from "lucide-react";
import LocationModal from "./LocationModal";

const ThingsToDoForm = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getDateRangeText = () => {
        if (!startDate && !endDate) return "Jul 15 - Jul 16";
        if (startDate && !endDate)
            return `${formatDate(startDate)} - Select end date`;
        if (startDate && endDate)
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        return "Select dates";
    };

    useEffect(() => {
        setDestination(getParam('destination') || '');
        setStartDate(getParam('start_date') || '');
        setEndDate(getParam('end_date') || '');
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
        if (!startDate || isSelectingEndDate) {
            if (!startDate) {
                setStartDate(selectedDate);
                setIsSelectingEndDate(true);
            } else {
                setEndDate(selectedDate);
                setShowCalendar(false);
                setIsSelectingEndDate(false);
            }
        } else {
            setStartDate(selectedDate);
            setEndDate("");
            setIsSelectingEndDate(true);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams({
            destination: destination,
            start_date: startDate,
            end_date: endDate,
        });

        window.location.href = `/thingstodo-search?${params.toString()}`;
    };

    // Generate calendar days for current month
    const generateCalendarDays = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
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
                                {!startDate
                                    ? "Select start date"
                                    : isSelectingEndDate
                                    ? "Select end date"
                                    : "Select dates"}
                            </h3>
                            <div className="text-sm text-gray-600">
                                July 2025
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
                                const isPast =
                                    new Date(dateStr) <
                                    new Date().setHours(0, 0, 0, 0);

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
                    </div>
                )}
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

            {(showCalendar || showDestinationModal) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCalendar(null);
                        setShowDestinationModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default ThingsToDoForm;

import React, { useState } from "react";
import { MapPin, Calendar, Search, ChevronDown, Anchor, Users, Clock } from "lucide-react";

const SearchBoatForm = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedBoatType, setSelectedBoatType] = useState("Any type");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showBoatTypes, setShowBoatTypes] = useState(false);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [peopleCount, setPeopleCount] = useState(1);
    const [showPeopleModal, setShowPeopleModal] = useState(false);

    const boatTypes = [
        { id: "any", name: "Any type" },
        { id: "yakht", name: "Yakht" },
        { id: "speedboat", name: "SpeedBoat" }
    ];

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

    const handleSearch = () => {
        console.log("Search clicked:", {
            destination,
            startDate,
            endDate,
            selectedBoatType,
        });

        alert(
            `Searching for ${selectedBoatType} to: ${
                destination || "Any destination"
            }\nDates: ${startDate} to ${endDate}`
        );
    };

    const generateCalendarDays = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
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

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setShowCalendar(false);
                setShowBoatTypes(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="mx-auto">
            {/* Main Search Bar */}
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                    {/* Boat Type Field */}
                    <div className="flex-1 relative dropdown-container">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            Boat Type
                        </label>
                        <div
                            onClick={handleBoatTypeClick}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
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

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            Destination
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where are you going?"
                                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                            />
                            <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Dates Field */}
                    <div className="flex-1 relative dropdown-container">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            Select Dates
                        </label>
                        <div
                            onClick={handleDateClick}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
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
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 w-80">
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
                                    {generateCalendarDays().map(
                                        (dayObj, index) => {
                                            if (!dayObj) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="py-2"
                                                    ></div>
                                                );
                                            }

                                            const { day, dateStr } = dayObj;
                                            const isSelected =
                                                isDateSelected(dateStr);
                                            const isInRange =
                                                isDateInRange(dateStr);
                                            const isPast =
                                                new Date(dateStr) <
                                                new Date().setHours(0, 0, 0, 0);

                                            return (
                                                <button
                                                    key={dateStr}
                                                    onClick={() =>
                                                        !isPast &&
                                                        handleDateSelect(
                                                            dateStr
                                                        )
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
                                        }
                                    )}
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
                                        className="text-sm bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* People Count Field */}
                    <div className="flex-1 relative">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            Number of People
                        </label>
                        <div
                            onClick={() => setShowPeopleModal(true)}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white flex items-center justify-between"
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
                            onClick={handleSearch}
                            className="w-full lg:w-auto btn-search-v2 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
        </div>
    );
};

export default SearchBoatForm;

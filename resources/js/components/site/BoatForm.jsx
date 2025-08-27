import React, { useEffect, useState } from "react";
import { Calendar, Search, ChevronDown, Clock, Users, Info } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import LocationModal from "./LocationModal";
import TimeModal from "./TimeModal";
import { useTranslation } from "react-i18next";
import CalendarPopover from "./CalendarPopover";

const BoatForm = ({ defaultCity, defaultCityId }) => {
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
    const isMobile = useMediaQuery({ maxWidth: 900 });
    const { t } = useTranslation();

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
        if (!startDate)
            return typeof t === "function"
                ? t("homeSearch.selectDate")
                : "Select date";
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
            const selectedDateTime = new Date(
                `${selectedDate} ${hour.toString().padStart(2, "0")}:00`
            );
            if (selectedDateTime >= minBookingDateTime) {
                setTime(`${hour.toString().padStart(2, "0")}:00`);
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
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));

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
        console.log("Destination: ", getParam("destination") || defaultCity || "");
        setSelectedBoatType(getParam("boat_type") || "Any type");
        setDestination(getParam("destination") || defaultCity || "");
        setStartDate(getParam("start_date") || "");
        setEndDate(getParam("end_date") || "");
        setTime(getParam("time") || "");
        setPeopleCount(parseInt(getParam("people") || "1"));
    }, [defaultCity, defaultCityId]);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative mh-search">
                    <div
                        className={`flex ${isMobile ? "flex-col" : "flex-row"}`}
                    >
                        {/* Boat Type */}
                        <div className="flex-1 relative p-6 border-r border-gray-200 dropdown-container">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.boatType")}
                            </label>
                            <button
                                onClick={handleBoatTypeClick}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors w-full text-left mh-input"
                            >
                                {selectedBoatType}
                            </button>
                            {showBoatTypes && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-full max-h-80 overflow-y-auto">
                                    <div className="p-2">
                                        {boatTypes.map((boatType) => (
                                            <div
                                                key={boatType.id}
                                                onClick={() =>
                                                    handleBoatTypeSelect(
                                                        boatType
                                                    )
                                                }
                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                                                    selectedBoatType ===
                                                    boatType.name
                                                        ? "drop-item--active"
                                                        : "hover:bg-gray-50 text-gray-700"
                                                }`}
                                            >
                                                <span className="text-lg">
                                                    {t(
                                                        `homeSearch.boatType_${boatType.id}`,
                                                        boatType.name
                                                    )}
                                                </span>
                                                <div className="ml-auto">
                                                    <div
                                                        className={`${
                                                            selectedBoatType ===
                                                            boatType.name
                                                                ? "bg-green-500"
                                                                : "border-gray-300"
                                                        } w-5 h-5 rounded border-2 transition-colors duration-200`}
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

                        {/* Destination */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.destination")}
                            </label>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onFocus={() => setShowDestinationModal(true)}
                                placeholder={t("homeSearch.whereAreYouGoing")}
                                className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent pr-8 mh-input"
                            />
                            <LocationModal
                                open={showDestinationModal}
                                onSelect={(city) => setDestination(city)}
                                onClose={() => setShowDestinationModal(false)}
                            />
                        </div>

                        {/* Date */}
                        <div className="flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    {t("homeSearch.selectRentalDate")}
                                </label>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handleDateClick}
                                        className="text-lg font-bold text-gray-900 hvr-text-green transition-colors mh-input"
                                    >
                                        {getDateRangeText()}
                                    </button>
                                </div>
                            </div>
                            {showCalendar && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[100] w-80">
                                    <CalendarPopover
                                        selectedDate={startDate}
                                        minDate={(() => { const t=new Date(); t.setDate(t.getDate()+2); t.setHours(0,0,0,0); return t; })()}
                                        onSelect={(d) => handleDateSelect(d)}
                                        onClose={() => setShowCalendar(false)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Time */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.time")}
                            </label>
                            <button
                                onClick={() => setShowTimeModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors w-full text-left mh-input"
                            >
                                {time || t("homeSearch.selectTime", "Select time")}
                            </button>
                            <TimeModal
                                open={showTimeModal}
                                onSelect={(selectedTime) =>
                                    setTime(selectedTime)
                                }
                                onClose={() => setShowTimeModal(false)}
                                selectedDate={startDate}
                                minHoursAdvance={48}
                                categoryId={4}
                            />
                        </div>

                        {/* People */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.numberOfPeople")}
                            </label>
                            <button
                                onClick={() => setShowPeopleModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors w-full text-left mh-input"
                            >
                                {peopleCount} {peopleCount === 1 ? "person" : "people"}
                            </button>
                        </div>

                        {/* Search Button */}
                        {!isMobile ? (
                            <div className="flex-shrink-0 flex items-center px-4">
                                <button
                                    onClick={(e) => handleSearch(e)}
                                    className="btn-search text-white transition-colors flex items-center justify-center"
                                >
                                    <Search className="w-6 h-6" />
                                    <span className="ml-2 hidden md:inline">{t("common.search","Search")}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="lg:w-auto w-full p-4">
                                <button
                                    onClick={(e) => handleSearch(e)}
                                    className="w-full lg:w-auto btn-search-v2 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    {t("common.search", "Search")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* People Count Modal */}
            {showPeopleModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                    onClick={() => setShowPeopleModal(false)}
                >
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            {t("homeSearch.numberOfPeople")}
                        </h3>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setPeopleCount((prev) =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                                disabled={peopleCount <= 1}
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold">
                                {peopleCount}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    setPeopleCount((prev) =>
                                        Math.min(50, prev + 1)
                                    )
                                }
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
                            {t("booking.done", "Done")}
                        </button>
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

export default BoatForm;

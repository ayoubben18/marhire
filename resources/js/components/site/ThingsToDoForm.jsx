import React, { useEffect, useState } from "react";
import { Calendar, Search, Users, Clock, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import LocationModal from "./LocationModal";
import { useTranslation } from "react-i18next";
import CalendarPopover from "./CalendarPopover";

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
    const isMobile = useMediaQuery({ maxWidth: 900 });
    const { t } = useTranslation();

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
        if (!startDate)
            return typeof t === "function"
                ? t("homeSearch.selectDate")
                : "Select date";
        return formatDate(startDate);
    };

    useEffect(() => {
        setDestination(getParam("destination") || "");
        setStartDate(getParam("start_date") || "");
        setEndDate(getParam("end_date") || "");
        setPeopleCount(parseInt(getParam("people") || "1"));
        setTimePreference(getParam("time_preference") || "morning");
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

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative">
                    <div
                        className={`flex ${isMobile ? "flex-col" : "flex-row"}`}
                    >
                        {/* Destination */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.destination")}
                            </label>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value);
                                }}
                                onFocus={() => setShowDestinationModal(true)}
                                placeholder={t("homeSearch.enterDestination")}
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
                                    {t("homeSearch.selectActivityDate")}
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

                        {/* Preferred Time */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.preferredTime")}
                            </label>
                            <button
                                onClick={() => setShowTimeModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors w-full text-left mh-input"
                            >
                                <span className="capitalize">
                                    {timePreference}
                                </span>
                            </button>
                        </div>

                        {/* Search Button */}
                        {!isMobile ? (
                            <div className="flex-shrink-0 flex items-center px-4">
                                <button
                                    onClick={handleSearch}
                                    className="btn-search text-white transition-colors flex items-center justify-center"
                                >
                                    <Search className="w-6 h-6" />
                                    <span className="ml-2 hidden md:inline">{t("common.search","Search")}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="lg:w-auto w-full p-4">
                                <button
                                    onClick={handleSearch}
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
                            Number of People
                        </h3>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() => setPeopleCount((g) => Math.max(1, g - 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                                disabled={peopleCount <= 1}
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold">{peopleCount}</span>
                            <button
                                type="button"
                                onClick={() => setPeopleCount((g) => Math.min(50, g + 1))}
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
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                    onClick={() => setShowTimeModal(false)}
                >
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            {t("homeSearch.preferredTime")}
                        </h3>
                        <div className="space-y-2">
                            {["morning", "afternoon", "evening", "night"].map(
                                (time) => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setTimePreference(time);
                                            setShowTimeModal(false);
                                        }}
                                        className={`w-full py-3 px-4 rounded-lg transition ${
                                            timePreference === time
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                        }`}
                                    >
                                        <span className="capitalize">
                                            {t(
                                                `booking.timeSlots.${time}`,
                                                time
                                            )}
                                        </span>
                                    </button>
                                )
                            )}
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

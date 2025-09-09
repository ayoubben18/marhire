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
import LocationModal from "./LocationModal";
import TimeModal from "./TimeModal";
import CalendarPopover from "./CalendarPopover";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

// Minimal Modal component
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs relative"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default function PrivateDriverForm({ defaultCity, defaultCityId }) {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState(t('privateDriver.sameAsPickup'));
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [showGuestsModal, setShowGuestsModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(null);
    const [showPickupModal, setShowPickupModal] = useState(false);
    const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
    const [showDropOffModal, setShowDropOffModal] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 900 });
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return t('privateDriver.placeholders.selectDate');
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

    const getParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Determine service type based on locations
        const serviceType =
            dropoffLocation === t('privateDriver.sameAsPickup') ? "hourly" : "point-to-point";

        const searchParams = {
            category: 3, // Private driver category
            service_type: serviceType,
            city_a: pickupLocation,
            city_b:
                dropoffLocation === t('privateDriver.sameAsPickup')
                    ? pickupLocation
                    : dropoffLocation,
            date: pickupDate,
            time: pickupTime,
            pickup_date: pickupDate,
            pickup_time: pickupTime,
            persons: guests,
        };

        // Store in session storage
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));

        const params = new URLSearchParams({
            pickup: pickupLocation,
            dropoff: dropoffLocation,
            pickup_date: pickupDate,
            pickup_time: pickupTime,
            persons: guests,
        });

        window.location.href = `/private-search?${params.toString()}`;
    };

    function formatYMD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        setPickupLocation(getParam("pickup") || defaultCity || "");
        setDropoffLocation(getParam("dropoff") || t('privateDriver.sameAsPickup'));
        setPickupDate(getParam("pickup_date") || "");
        setPickupTime(getParam("pickup_time") || "");
        setGuests(getParam("persons") || 1);
    }, [defaultCity, defaultCityId]);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative mh-search">
                    <div className="flex flex-col lg:flex-row">
                        {/* Pick-up Location */}
                        <div className="w-full lg:flex-1 relative p-6 border-r border-gray-200">
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
                                placeholder={t('privateDriver.placeholders.location')}
                                className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent mh-input"
                            />
                            <LocationModal
                                open={showPickupModal}
                                onSelect={(city) => setPickupLocation(city)}
                                onClose={() => setShowPickupModal(false)}
                            />
                        </div>

                        {/* Dropoff Location */}
                        <div className="w-full lg:flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t(
                                    "homeSearch.dropoffLocation",
                                    "Dropoff Location"
                                )}
                            </label>
                            <button
                                onClick={() => setShowDropOffModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors mh-input"
                            >
                                {dropoffLocation}
                            </button>
                            <LocationModal
                                open={showDropOffModal}
                                onSelect={(city) => setDropoffLocation(city)}
                                onClose={() => setShowDropOffModal(false)}
                            />
                        </div>

                        {/* Number of Persons (modal trigger) */}
                        <div className="p-6 border-r border-gray-200 w-full lg:flex-1 flex flex-col justify-center">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                {t("homeSearch.numberOfPeople")}
                            </label>
                            <button
                                type="button"
                                className="text-lg font-semibold text-gray-900 hvr-text-green transition w-fit mh-input"
                                onClick={() => setShowGuestsModal(true)}
                            >
                                {guests} {guests === 1 ? "person" : "persons"}
                            </button>
                        </div>

                        {/* Pick-up Date */}
                        <div className="w-full lg:flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    {t("homeSearch.date")}
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
                                        className="text-lg font-bold text-gray-900 hvr-text-green transition-colors mh-input"
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
                                    </div>
                                </div>
                            </div>
                            {showCalendar === "pickup" && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[100] w-80">
                                    <CalendarPopover
                                        selectedDate={pickupDate}
                                        minDate={(() => { const now=new Date(); now.setDate(now.getDate()+2); now.setHours(0,0,0,0); return now; })()}
                                        onSelect={(d) => {
                                            setPickupDate(d);
                                            const now = new Date();
                                            const minDt = new Date(now);
                                            minDt.setHours(minDt.getHours()+48);
                                            for (let hour=0; hour<24; hour++) {
                                                const candidate = new Date(`${d} ${String(hour).padStart(2,'0')}:00`);
                                                if (candidate >= minDt) { setPickupTime(`${String(hour).padStart(2,'0')}:00`); break; }
                                            }
                                            setShowCalendar(null);
                                        }}
                                        onClose={() => setShowCalendar(null)}
                                    />
                                </div>
                            )}
                            <TimeModal
                                open={showPickupTimeModal}
                                onSelect={(time) => setPickupTime(time)}
                                onClose={() => setShowPickupTimeModal(false)}
                                selectedDate={pickupDate}
                                minHoursAdvance={48}
                            />
                        </div>

                        {/* Search Button */}
                        {!isMobile ? (
                            <div className="flex-shrink-0 flex items-center px-4">
                                <button
                                    className="btn-search text-white transition-colors flex items-center justify-center"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    <Search className="w-6 h-6" />
                                    <span className="ml-2 hidden md:inline">{t("common.search","Search")}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="lg:w-auto w-full">
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

            {/* Modal for updating persons */}
            <Modal
                open={showGuestsModal}
                onClose={() => setShowGuestsModal(false)}
            >
                <h3 className="text-lg font-semibold mb-4 text-center">
                    Number of Persons
                </h3>
                <div className="flex items-center justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                        disabled={guests <= 1}
                    >
                        -
                    </button>
                    <span className="text-2xl font-bold">{guests}</span>
                    <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(9, g + 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl"
                        disabled={guests >= 9}
                    >
                        +
                    </button>
                </div>
                <button
                    className="mt-6 w-full py-2 rounded-lg bg-green-600 text-white font-semibold transition"
                    onClick={() => setShowGuestsModal(false)}
                >
                    Done
                </button>
            </Modal>

            {/* Click outside to close calendar */}
            {(showCalendar ||
                showPickupModal ||
                showDropOffModal ||
                showPickupTimeModal) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCalendar(null);
                        setShowPickupModal(false);
                        setShowDropOffModal(false);
                        setShowPickupTimeModal(false);
                    }}
                />
            )}
        </div>
    );
}

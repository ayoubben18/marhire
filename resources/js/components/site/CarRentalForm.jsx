import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import LocationModal from "./LocationModal";
import TimeModal from "./TimeModal";
export default function CarRentalForm() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("Same as pickup");
    const [pickupDate, setPickupDate] = useState("2025-06-25");
    const [pickupTime, setPickupTime] = useState("10:00");
    const [dropoffDate, setDropoffDate] = useState("2025-06-28");
    const [dropoffTime, setDropoffTime] = useState("10:00");
    const [showPickupModal, setShowPickupModal] = useState(false);
    const [showDropOffModal, setShowDropOffModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(null);
    const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
    const [showDropOffTimeModal, setShowDropOffTimeModal] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 900 });

    const formatDate = (dateString) => {
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

    const currentDate = new Date();
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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleSearch = (e) => {
        e.preventDefault();
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
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const dropoff = new Date(tomorrow);
        dropoff.setDate(tomorrow.getDate() + 3);

        setPickupLocation(getParam("pickup") || "");
        setDropoffLocation(getParam("dropoff") || "Same as pickup");
        setPickupDate(getParam("pickup_date") || formatYMD(tomorrow));
        setDropoffDate(getParam("dropoff_date") || formatYMD(dropoff));
        setPickupTime(getParam("pickup_time") || "10:00");
        setDropoffTime(getParam("dropoff_time") || "10:00");
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
                                Pick-up Location
                            </label>
                            <input
                                type="text"
                                value={pickupLocation}
                                onFocus={() => setShowPickupModal(true)}
                                onChange={(e) =>
                                    setPickupLocation(e.target.value)
                                }
                                placeholder="Airport, city, station, region, district..."
                                className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                            />
                            <LocationModal
                                open={showPickupModal}
                                onSelect={(city) => setPickupLocation(city)}
                                onClose={() => setShowPickupModal(false)}
                            />
                        </div>

                        {/* Dropoff Location */}
                        <div className="flex-1 relative p-6 border-r border-gray-200">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                Dropoff Location
                            </label>
                            <button
                                onClick={() => setShowDropOffModal(true)}
                                className="text-lg font-bold text-gray-900 hvr-text-green transition-colors"
                            >
                                {dropoffLocation}
                            </button>
                            <LocationModal
                                open={showDropOffModal}
                                onSelect={(city) => setDropoffLocation(city)}
                                onClose={() => setShowDropOffModal(false)}
                            />
                        </div>

                        {/* Pick-up Date */}
                        <div className="flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Pick-up Date
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
                                            onClick={() => setShowPickupTimeModal(true)}
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
                                        <h3 className="font-semibold text-gray-900">
                                            {currentDate.toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </h3>
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
                                                day
                                                    .toISOString()
                                                    .split("T")[0] ===
                                                pickupDate;
                                            const isToday =
                                                day.toDateString() ===
                                                new Date().toDateString();

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPickupDate(
                                                            day
                                                                .toISOString()
                                                                .split("T")[0]
                                                        );
                                                        setShowCalendar(null);
                                                    }}
                                                    className={`
                            p-2 text-sm rounded-md hover:bg-blue-50 transition-colors
                            ${
                                !isCurrentMonth
                                    ? "text-gray-300"
                                    : "text-gray-900"
                            }
                            ${
                                isSelected
                                    ? "bg-blue-500 text-white hvr-bg-green"
                                    : ""
                            }
                            ${
                                isToday && !isSelected
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
                                </div>
                            )}
                            <TimeModal
                                open={showPickupTimeModal}
                                onSelect={(time) => setPickupTime(time)}
                                onClose={() => setShowPickupTimeModal(false)}
                            />
                        </div>

                        {/* Drop-off Date */}
                        <div className="flex-1 border-r border-gray-200 relative overflow-visible">
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Drop-off Date
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
                                            onClick={() => setShowDropOffTimeModal(true)}
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
                                        <h3 className="font-semibold text-gray-900">
                                            {currentDate.toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </h3>
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
                                                day
                                                    .toISOString()
                                                    .split("T")[0] ===
                                                dropoffDate;
                                            const isToday =
                                                day.toDateString() ===
                                                new Date().toDateString();

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDropoffDate(
                                                            day
                                                                .toISOString()
                                                                .split("T")[0]
                                                        );
                                                        setShowCalendar(null);
                                                    }}
                                                    className={`
                            p-2 text-sm rounded-md hover:bg-blue-50 transition-colors
                            ${
                                !isCurrentMonth
                                    ? "text-gray-300"
                                    : "text-gray-900"
                            }
                            ${
                                isSelected
                                    ? "bg-blue-500 text-white hvr-bg-green"
                                    : ""
                            }
                            ${
                                isToday && !isSelected
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
                                </div>
                            )}
                            <TimeModal
                                open={showDropOffTimeModal}
                                onSelect={(time) => setDropoffTime(time)}
                                onClose={() => setShowDropOffTimeModal(false)}
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
                                    Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close calendar */}
            {(showCalendar || showPickupModal || showDropOffModal || showPickupTimeModal || showDropOffTimeModal) && (
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

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

function toStartOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatYMD(date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export default function CalendarPopover({ selectedDate, minDate, onSelect, onClose, className = "" }) {
    const baseDate = useMemo(() => {
        if (selectedDate) return new Date(selectedDate);
        if (minDate) return new Date(minDate);
        return new Date();
    }, [selectedDate, minDate]);

    const [viewYear, setViewYear] = useState(baseDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(baseDate.getMonth());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            const d = new Date(selectedDate);
            setViewYear(d.getFullYear());
            setViewMonth(d.getMonth());
        }
    }, [selectedDate]);

    const monthLabel = useMemo(() => {
        const names = [
            "January","February","March","April","May","June","July","August","September","October","November","December",
        ];
        return `${names[viewMonth]} ${viewYear}`;
    }, [viewMonth, viewYear]);

    const monthNames = [
        "January","February","March","April","May","June","July","August","September","October","November","December",
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    const days = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1);
        const start = new Date(firstDay);
        start.setDate(start.getDate() - firstDay.getDay());
        const list = [];
        const cur = new Date(start);
        for (let i = 0; i < 42; i++) { list.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }
        return list;
    }, [viewYear, viewMonth]);

    const minDay = useMemo(() => (minDate ? toStartOfDay(minDate) : null), [minDate]);
    const selected = selectedDate ? formatYMD(selectedDate) : null;

    const goPrev = () => { const m = viewMonth - 1; if (m < 0) { setViewYear(viewYear - 1); setViewMonth(11); } else { setViewMonth(m); } };
    const goNext = () => { const m = viewMonth + 1; if (m > 11) { setViewYear(viewYear + 1); setViewMonth(0); } else { setViewMonth(m); } };

    const handleMonthSelect = (monthIndex) => {
        setViewMonth(monthIndex);
        setShowMonthPicker(false);
    };

    const handleYearSelect = (year) => {
        setViewYear(year);
        setShowYearPicker(false);
    };

    return (
        <div className={`mh-calendar ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <button onClick={goPrev} className="p-1 hover:bg-gray-100 rounded-lg" aria-label="Previous month">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex items-center gap-2">
                    {/* Month Selector */}
                    <div className="relative">
                        <button 
                            onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
                            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
                        >
                            {monthNames[viewMonth]}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {showMonthPicker && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px] max-h-48 overflow-y-auto">
                                {monthNames.map((month, index) => (
                                    <button
                                        key={month}
                                        onClick={() => handleMonthSelect(index)}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${index === viewMonth ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Year Selector */}
                    <div className="relative">
                        <button 
                            onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
                            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
                        >
                            {viewYear}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {showYearPicker && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[80px] max-h-48 overflow-y-auto">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => handleYearSelect(year)}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${year === viewYear ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={goNext} className="p-1 hover:bg-gray-100 rounded-lg" aria-label="Next month">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="mh-cal-grid mb-2">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
                ))}
            </div>

            <div className="mh-cal-grid">
                {days.map((d, i) => {
                    const isCurrentMonth = d.getMonth() === viewMonth;
                    const ymd = formatYMD(d);
                    const isSelected = selected === ymd;
                    const disabled = minDay ? toStartOfDay(d) < minDay : false;
                    return (
                        <button
                            key={i}
                            onClick={() => { if (disabled) return; onSelect(ymd); if (onClose) onClose(); }}
                            disabled={disabled}
                            className={`day-btn w-9 h-9 inline-flex items-center justify-center text-sm rounded-md transition-colors ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"} ${disabled ? "cursor-not-allowed opacity-50 bg-gray-100" : "hover:bg-blue-50 cursor-pointer"} ${isSelected ? "bg-green-600 text-white" : ""}`}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}



import React, { useEffect, useMemo, useRef, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";

const pad2 = (n) => String(n).padStart(2, "0");

function buildTimes(fromHour, toHour, stepMinutes) {
    const items = [];
    for (let h = fromHour; h <= toHour; h += 1) {
        for (let m = 0; m < 60; m += stepMinutes) {
            items.push(`${pad2(h)}:${pad2(m)}`);
        }
    }
    return items;
}

export default function TimeSelect({
    value,
    onChange,
    placeholder = "Select time",
    fromHour = 0,
    toHour = 23,
    stepMinutes = 60,
    selectedDate = null,
    minHoursAdvance = 0,
    disabled = false,
    hasError = false,
    errorMessage,
    alignRight = false,
}) {
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);

    const options = useMemo(
        () => buildTimes(fromHour, toHour, stepMinutes),
        [fromHour, toHour, stepMinutes]
    );

    const isOptionDisabled = (time) => {
        if (!selectedDate || minHoursAdvance <= 0) return false;
        const [hh, mm] = time.split(":").map((v) => parseInt(v, 10));
        const now = new Date();
        const selected = new Date(selectedDate);
        selected.setHours(hh, mm, 0, 0);
        const hoursDiff = (selected - now) / (1000 * 60 * 60);
        return hoursDiff < minHoursAdvance;
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (!open) return;
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        const handleKey = (e) => {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    const borderClass = hasError ? "border-red-500" : "border-gray-300";

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                disabled={disabled}
                className={`w-full text-left px-3 py-3 text-lg border ${borderClass} rounded-xl bg-white flex items-center justify-between ${
                    disabled ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={() => !disabled && setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span
                    className={`${!value ? "text-gray-500" : "text-gray-900"}`}
                >
                    {value || placeholder}
                </span>
                <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-5 h-5" />
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </div>
            </button>

            {open && (
                <div
                    className={`absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl w-full max-h-64 overflow-auto ${
                        alignRight ? "right-0" : "left-0"
                    }`}
                    role="listbox"
                >
                    {options.map((time) => {
                        const disabledOption = isOptionDisabled(time);
                        const isSelected = value === time;
                        return (
                            <button
                                key={time}
                                type="button"
                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition ${
                                    disabledOption
                                        ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                        : "hover:bg-gray-50 cursor-pointer"
                                } ${
                                    isSelected ? "bg-green-600 text-white" : ""
                                }`}
                                onClick={() => {
                                    if (disabledOption) return;
                                    onChange(time);
                                    setOpen(false);
                                }}
                                aria-selected={isSelected}
                                disabled={disabledOption}
                            >
                                <span>{time}</span>
                                {disabledOption && (
                                    <span className="text-xs">
                                        Not available
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {hasError && errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
}

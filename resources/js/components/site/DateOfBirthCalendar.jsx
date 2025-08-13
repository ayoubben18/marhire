import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RequiredAsterisk from "./RequiredAsterisk";

function formatYYYYMMDD(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function parseYYYYMMDD(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [y, m, d] = value.split("-").map((v) => parseInt(v, 10));
    // month is 1-based in string, 0-based in Date
    const dt = new Date(y, m - 1, d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt;
}

function clampDate(date, minDate, maxDate) {
    if (date < minDate) return new Date(minDate);
    if (date > maxDate) return new Date(maxDate);
    return date;
}

const WEEK_START = 1; // 0=Sunday, 1=Monday

function getWeekdayHeaders(locale) {
    // Generate weekdays starting on Monday
    const base = new Date(2023, 0, 1); // Jan 1, 2023 is a Sunday
    const headers = [];
    for (let i = 0; i < 7; i++) {
        const dayIndex = (WEEK_START + i) % 7; // Monday-first
        const d = new Date(base);
        d.setDate(base.getDate() + dayIndex);
        headers.push(
            d.toLocaleDateString(locale || "en", { weekday: "short" })
        );
    }
    return headers;
}

function getDaysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
}

function startOfMonth(year, monthIndex) {
    const d = new Date(year, monthIndex, 1, 0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d;
}

function isSameDay(a, b) {
    return (
        a &&
        b &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Reusable calendar date picker tailored for Date of Birth.
 * - Localized month and weekdays
 * - Enforces age range via minAgeYears / maxAgeYears
 * - Emits YYYY-MM-DD string
 */
const DateOfBirthCalendar = ({
    value,
    onChange,
    required = true,
    hasError = false,
    errorMessage,
    minAgeYears = 18,
    maxAgeYears = 100,
    label,
    showHelperText = true,
}) => {
    const { t, i18n } = useTranslation();
    const containerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const today = new Date();
    const maxSelectableDate = useMemo(() => {
        const d = new Date(today);
        d.setFullYear(d.getFullYear() - minAgeYears);
        return d;
    }, [today, minAgeYears]);

    const minSelectableDate = useMemo(() => {
        const d = new Date(today);
        d.setFullYear(d.getFullYear() - maxAgeYears);
        return d;
    }, [today, maxAgeYears]);

    const selectedDate = useMemo(() => parseYYYYMMDD(value), [value]);

    // Initial visible month/year: selected date or maxSelectableDate
    const initial = clampDate(
        selectedDate || maxSelectableDate,
        minSelectableDate,
        maxSelectableDate
    );
    const [visibleYear, setVisibleYear] = useState(initial.getFullYear());
    const [visibleMonth, setVisibleMonth] = useState(initial.getMonth()); // 0-11

    useEffect(() => {
        // If value changes externally, adjust visible month
        const d = parseYYYYMMDD(value);
        if (d) {
            setVisibleYear(d.getFullYear());
            setVisibleMonth(d.getMonth());
        }
    }, [value]);

    // Using MUI Dialog manages focus, escape, and backdrop for us

    const weekdayHeaders = useMemo(
        () => getWeekdayHeaders(i18n.language),
        [i18n.language]
    );

    // Month and year options for quick navigation
    const monthOptions = useMemo(() => {
        return Array.from({ length: 12 }, (_, idx) => {
            const label = new Date(2000, idx, 1).toLocaleString(
                i18n.language || "en",
                { month: "long" }
            );
            return { value: idx, label };
        });
    }, [i18n.language]);

    const yearOptions = useMemo(() => {
        const years = [];
        const minY = minSelectableDate.getFullYear();
        const maxY = maxSelectableDate.getFullYear();
        for (let y = maxY; y >= minY; y -= 1) years.push(y);
        return years;
    }, [minSelectableDate, maxSelectableDate]);

    function setVisibleClamped(nextYear, nextMonth) {
        const start = startOfMonth(nextYear, nextMonth);
        const minStart = startOfMonth(
            minSelectableDate.getFullYear(),
            minSelectableDate.getMonth()
        );
        const maxStart = startOfMonth(
            maxSelectableDate.getFullYear(),
            maxSelectableDate.getMonth()
        );
        let target = start;
        if (start < minStart) target = minStart;
        if (start > maxStart) target = maxStart;
        setVisibleYear(target.getFullYear());
        setVisibleMonth(target.getMonth());
    }

    function canGoPrevMonth() {
        const prevMonthDate = new Date(visibleYear, visibleMonth - 1, 1);
        return (
            prevMonthDate >=
            startOfMonth(
                minSelectableDate.getFullYear(),
                minSelectableDate.getMonth()
            )
        );
    }

    function canGoNextMonth() {
        const nextMonthDate = new Date(visibleYear, visibleMonth + 1, 1);
        return (
            nextMonthDate <=
            startOfMonth(
                maxSelectableDate.getFullYear(),
                maxSelectableDate.getMonth()
            )
        );
    }

    function goPrevMonth() {
        if (!canGoPrevMonth()) return;
        const d = new Date(visibleYear, visibleMonth - 1, 1);
        setVisibleYear(d.getFullYear());
        setVisibleMonth(d.getMonth());
    }

    function goNextMonth() {
        if (!canGoNextMonth()) return;
        const d = new Date(visibleYear, visibleMonth + 1, 1);
        setVisibleYear(d.getFullYear());
        setVisibleMonth(d.getMonth());
    }

    const monthName = useMemo(
        () =>
            new Date(visibleYear, visibleMonth, 1).toLocaleString(
                i18n.language || "en",
                { month: "long", year: "numeric" }
            ),
        [i18n.language, visibleYear, visibleMonth]
    );

    // Build calendar grid
    const daysInMonth = getDaysInMonth(visibleYear, visibleMonth);
    const firstDay = new Date(visibleYear, visibleMonth, 1);
    let startOffset = firstDay.getDay(); // 0 Sun .. 6 Sat
    // Adjust for Monday-first
    startOffset = (startOffset - WEEK_START + 7) % 7;
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(new Date(visibleYear, visibleMonth, day));
    }

    function isDisabledDate(date) {
        return date < minSelectableDate || date > maxSelectableDate;
    }

    function handleSelect(date) {
        if (isDisabledDate(date)) return;
        onChange(formatYYYYMMDD(date));
        setIsOpen(false);
    }

    const borderClass = hasError ? "border-red-500" : "border-gray-300";

    return (
        <div ref={containerRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label || t("booking.dateOfBirth", "Date of Birth")}{" "}
                {required && <RequiredAsterisk />}
            </label>

            {/* Trigger button styled like an input */}
            <button
                type="button"
                className={`w-full text-left px-3 py-3 text-lg border ${borderClass} rounded-xl bg-white mb-2 flex items-center justify-between`}
                onClick={() => setIsOpen((o) => !o)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <span>
                    {selectedDate
                        ? selectedDate.toLocaleDateString(
                              i18n.language || "en",
                              { year: "numeric", month: "long", day: "2-digit" }
                          )
                        : t("booking.selectDate", "Select your birth date")}
                </span>
                <span className="text-gray-500">▾</span>
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>
                        {t("booking.selectBirthDate", "Select your birth date")}
                    </DialogTitle>
                    <DialogContent>
                        <div className="flex items-center justify-between px-1 py-2 gap-2 flex-wrap">
                            <button
                                type="button"
                                onClick={goPrevMonth}
                                className={`px-3 py-1 rounded-md transition ${
                                    canGoPrevMonth()
                                        ? "text-gray-700 hover:bg-gray-200"
                                        : "text-gray-300 cursor-not-allowed"
                                }`}
                                aria-label="Previous month"
                                disabled={!canGoPrevMonth()}
                            >
                                ‹
                            </button>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                                <select
                                    className="px-2 py-1 border border-gray-300 rounded-md bg-white text-sm w-full sm:w-auto"
                                    aria-label={t(
                                        "booking.birthMonth",
                                        "Month"
                                    )}
                                    value={visibleMonth}
                                    onChange={(e) =>
                                        setVisibleClamped(
                                            visibleYear,
                                            parseInt(e.target.value, 10)
                                        )
                                    }
                                    style={{ minWidth: "8rem" }}
                                >
                                    {monthOptions.map((m) => (
                                        <option key={m.value} value={m.value}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="px-2 py-1 border border-gray-300 rounded-md bg-white text-sm w-full sm:w-auto"
                                    aria-label={t("booking.birthYear", "Year")}
                                    value={visibleYear}
                                    onChange={(e) =>
                                        setVisibleClamped(
                                            parseInt(e.target.value, 10),
                                            visibleMonth
                                        )
                                    }
                                    style={{ minWidth: "6rem" }}
                                >
                                    {yearOptions.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={goNextMonth}
                                className={`px-3 py-1 rounded-md transition ${
                                    canGoNextMonth()
                                        ? "text-gray-700 hover:bg-gray-200"
                                        : "text-gray-300 cursor-not-allowed"
                                }`}
                                aria-label="Next month"
                                disabled={!canGoNextMonth()}
                            >
                                ›
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-px bg-gray-200">
                            {weekdayHeaders.map((w, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white text-center text-xs font-medium text-gray-500 py-2"
                                >
                                    {w}
                                </div>
                            ))}
                            {cells.map((date, idx) => {
                                if (date === null) {
                                    return (
                                        <div
                                            key={`empty-${idx}`}
                                            className="bg-white h-10"
                                        />
                                    );
                                }
                                const disabled = isDisabledDate(date);
                                const selected =
                                    selectedDate &&
                                    isSameDay(date, selectedDate);
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelect(date)}
                                        disabled={disabled}
                                        className={`h-10 text-sm flex items-center justify-center transition
                        ${!selected ? "bg-white" : ""}
                        ${
                            disabled
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700"
                        }
                        ${selected ? "text-white" : "hover:bg-blue-50"}
                      `}
                                        style={
                                            selected
                                                ? { backgroundColor: "#347758" }
                                                : undefined
                                        }
                                        aria-pressed={selected}
                                        aria-selected={selected}
                                    >
                                        {date.getDate()}
                                    </button>
                                );
                            })}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsOpen(false)}>
                            {t("common.close", "Close")}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {showHelperText && (
                <p className="text-xs text-gray-500 mt-1">
                    {t("booking.mustBe18", "Must be 18 years or older")}
                </p>
            )}
            {hasError && errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default DateOfBirthCalendar;

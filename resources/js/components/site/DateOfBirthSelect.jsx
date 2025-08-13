import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import RequiredAsterisk from "./RequiredAsterisk";

/**
 * Reusable Date of Birth selector with Day/Month/Year dropdowns.
 * Emits a value in YYYY-MM-DD format when all three parts are selected; otherwise emits empty string.
 */
const DateOfBirthSelect = ({
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

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Initialize/selectors from incoming value
    useEffect(() => {
        if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            const [y, m, d] = value.split("-");
            setYear(y);
            setMonth(m);
            setDay(d);
        } else {
            setYear("");
            setMonth("");
            setDay("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function getDaysInMonth(yearStr, monthStr) {
        const parsedYear = parseInt(yearStr, 10);
        const parsedMonth = parseInt(monthStr, 10);
        if (!parsedYear || !parsedMonth) return 31;
        return new Date(parsedYear, parsedMonth, 0).getDate();
    }

    function emitIfComplete(nextYear, nextMonth, nextDay) {
        if (nextYear && nextMonth && nextDay) {
            onChange(`${nextYear}-${nextMonth}-${nextDay}`);
        } else {
            onChange("");
        }
    }

    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - minAgeYears; // Must be at least minAge
    const minYear = currentYear - maxAgeYears; // No older than maxAgeYears by default

    const years = useMemo(() => {
        const arr = [];
        for (let y = maxYear; y >= minYear; y -= 1) arr.push(String(y));
        return arr;
    }, [maxYear, minYear]);

    const months = useMemo(() => {
        return Array.from({ length: 12 }, (_, idx) => {
            const monthIndex = idx + 1; // 1-12
            const name = new Date(2000, idx, 1).toLocaleString(
                i18n.language || "en",
                {
                    month: "long",
                }
            );
            return { value: String(monthIndex).padStart(2, "0"), label: name };
        });
    }, [i18n.language]);

    const daysInSelectedMonth = getDaysInMonth(year, month);
    const days = useMemo(() => {
        return Array.from({ length: daysInSelectedMonth }, (_, idx) =>
            String(idx + 1).padStart(2, "0")
        );
    }, [daysInSelectedMonth]);

    function handleYearChange(e) {
        const y = e.target.value;
        const maxDay = getDaysInMonth(y, month);
        const adjustedDay =
            day && parseInt(day, 10) > maxDay
                ? String(maxDay).padStart(2, "0")
                : day;
        setYear(y);
        setDay(adjustedDay);
        emitIfComplete(y, month, adjustedDay);
    }

    function handleMonthChange(e) {
        const m = e.target.value;
        const maxDay = getDaysInMonth(year, m);
        const adjustedDay =
            day && parseInt(day, 10) > maxDay
                ? String(maxDay).padStart(2, "0")
                : day;
        setMonth(m);
        setDay(adjustedDay);
        emitIfComplete(year, m, adjustedDay);
    }

    function handleDayChange(e) {
        const d = e.target.value;
        setDay(d);
        emitIfComplete(year, month, d);
    }

    const borderClass = hasError ? "border-red-500" : "border-gray-300";

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label || t("booking.dateOfBirth", "Date of Birth")}{" "}
                {required && <RequiredAsterisk />}
            </label>
            <div className="grid grid-cols-3 gap-2">
                <select
                    value={day}
                    onChange={handleDayChange}
                    className={`w-full px-3 py-3 text-lg border ${borderClass} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white`}
                    aria-label={t("booking.birthDay", "Day")}
                    required={required}
                >
                    <option value="">{t("booking.birthDay", "Day")}</option>
                    {days.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className={`w-full px-3 py-3 text-lg border ${borderClass} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white`}
                    aria-label={t("booking.birthMonth", "Month")}
                    required={required}
                >
                    <option value="">{t("booking.birthMonth", "Month")}</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className={`w-full px-3 py-3 text-lg border ${borderClass} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white`}
                    aria-label={t("booking.birthYear", "Year")}
                    required={required}
                >
                    <option value="">{t("booking.birthYear", "Year")}</option>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
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

export default DateOfBirthSelect;

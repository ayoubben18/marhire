import React, { useMemo, useEffect, useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import RequiredAsterisk from "./RequiredAsterisk";
import { getCountryOptions } from "../../utils/countries";
import DateOfBirthCalendar from "./DateOfBirthCalendar";

const ClientInfoStep = ({
    fullName,
    email,
    whatsAppNumber,
    countryOfResidence,
    dateOfBirth,
    flightNumber,
    additionalNotes,
    termsAccepted,
    setTermsAccepted,
    handleFieldChange,
    errors,
    categoryId,
}) => {
    const { t, i18n } = useTranslation();
    const countryOptions = useMemo(
        () => getCountryOptions(i18n.language),
        [i18n.language]
    );

    // Local DOB selectors state for better UX
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    // Sync local selectors from parent value (e.g., when form resets)
    useEffect(() => {
        if (dateOfBirth && /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
            const [y, m, d] = dateOfBirth.split("-");
            setDobYear(y);
            setDobMonth(m);
            setDobDay(d);
        } else {
            setDobYear("");
            setDobMonth("");
            setDobDay("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateOfBirth]);

    function getDaysInMonth(yearStr, monthStr) {
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        if (!year || !month) return 31;
        return new Date(year, month, 0).getDate();
    }

    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 18; // Must be 18+
    const minYear = currentYear - 100; // Up to 100 years back

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
                { month: "long" }
            );
            return { value: String(monthIndex).padStart(2, "0"), label: name };
        });
    }, [i18n.language]);

    const daysInSelectedMonth = getDaysInMonth(dobYear, dobMonth);
    const days = useMemo(() => {
        return Array.from({ length: daysInSelectedMonth }, (_, idx) =>
            String(idx + 1).padStart(2, "0")
        );
    }, [daysInSelectedMonth]);

    function tryEmitDob(nextYear, nextMonth, nextDay) {
        if (nextYear && nextMonth && nextDay) {
            const composed = `${nextYear}-${nextMonth}-${nextDay}`;
            handleFieldChange("dateOfBirth", composed);
        } else {
            // Clear parent value until all parts selected
            handleFieldChange("dateOfBirth", "");
        }
    }

    function onYearChange(e) {
        const y = e.target.value;
        const maxDay = getDaysInMonth(y, dobMonth);
        const adjustedDay =
            dobDay && parseInt(dobDay, 10) > maxDay
                ? String(maxDay).padStart(2, "0")
                : dobDay;
        setDobYear(y);
        setDobDay(adjustedDay);
        tryEmitDob(y, dobMonth, adjustedDay);
    }

    function onMonthChange(e) {
        const m = e.target.value;
        const maxDay = getDaysInMonth(dobYear, m);
        const adjustedDay =
            dobDay && parseInt(dobDay, 10) > maxDay
                ? String(maxDay).padStart(2, "0")
                : dobDay;
        setDobMonth(m);
        setDobDay(adjustedDay);
        tryEmitDob(dobYear, m, adjustedDay);
    }

    function onDayChange(e) {
        const d = e.target.value;
        setDobDay(d);
        tryEmitDob(dobYear, dobMonth, d);
    }

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">
                {t("booking.yourInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.fullName", "Full Name")}
                        <RequiredAsterisk />
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                            handleFieldChange("fullName", e.target.value)
                        }
                        placeholder={t(
                            "booking.fullNamePlaceholder",
                            "John Doe"
                        )}
                        className={`w-full px-3 py-3 text-lg border ${
                            errors.fullName
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName[0]}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.email", "Email")}
                        <RequiredAsterisk />
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            handleFieldChange("email", e.target.value)
                        }
                        onBlur={(e) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (
                                e.target.value &&
                                !emailRegex.test(e.target.value)
                            ) {
                                // Email validation will be handled by parent component
                            }
                        }}
                        placeholder={t(
                            "booking.emailPlaceholder",
                            "john@example.com"
                        )}
                        className={`w-full px-3 py-3 text-lg border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email[0]}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.whatsappNumber", "WhatsApp Number")}
                        <RequiredAsterisk />
                    </label>
                    <input
                        type="tel"
                        value={whatsAppNumber}
                        onChange={(e) =>
                            handleFieldChange("whatsAppNumber", e.target.value)
                        }
                        placeholder={t(
                            "booking.whatsappPlaceholder",
                            "+1 234 567 8900"
                        )}
                        className={`w-full px-3 py-3 text-lg border ${
                            errors.whatsAppNumber
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.whatsAppNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.whatsAppNumber[0]}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.country", "Country of Residence")}
                        <RequiredAsterisk />
                    </label>
                    <select
                        value={countryOfResidence}
                        onChange={(e) =>
                            handleFieldChange(
                                "countryOfResidence",
                                e.target.value
                            )
                        }
                        className={`w-full px-3 py-3 text-lg border ${
                            errors.countryOfResidence
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white`}
                        required
                    >
                        <option value="">
                            {t(
                                "booking.countryPlaceholder",
                                "Select your country"
                            )}
                        </option>
                        {countryOptions.map(({ code, name }) => (
                            <option key={code} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.countryOfResidence && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.countryOfResidence[0]}
                        </p>
                    )}
                </div>
                <DateOfBirthCalendar
                    value={dateOfBirth}
                    onChange={(val) => handleFieldChange("dateOfBirth", val)}
                    required
                    hasError={Boolean(errors.dateOfBirth)}
                    errorMessage={errors.dateOfBirth?.[0]}
                    minAgeYears={18}
                    maxAgeYears={100}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.flightNumber", "Flight Number")}
                        <span className="text-xs text-gray-500 font-normal ml-1">
                            (Optional)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) =>
                            handleFieldChange("flightNumber", e.target.value)
                        }
                        placeholder={t(
                            "booking.flightNumberPlaceholder",
                            "AA1234"
                        )}
                        className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("booking.additionalNotes", "Additional Notes")}
                        <span className="text-xs text-gray-500 font-normal ml-1">
                            (Optional)
                        </span>
                    </label>
                    <textarea
                        value={additionalNotes}
                        onChange={(e) =>
                            handleFieldChange("additionalNotes", e.target.value)
                        }
                        placeholder={t(
                            "booking.additionalNotesPlaceholder",
                            "Any special requests or information..."
                        )}
                        rows="3"
                        className={`w-full px-3 py-3 text-lg border ${
                            errors.additionalNotes
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.additionalNotes && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.additionalNotes[0]}
                        </p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={termsAccepted}
                                onChange={(e) =>
                                    setTermsAccepted(e.target.checked)
                                }
                                required
                                sx={{
                                    color: errors.termsAccepted
                                        ? "#ef4444"
                                        : undefined,
                                    "&.Mui-checked": {
                                        color: "#3b82f6",
                                    },
                                }}
                            />
                        }
                        label={
                            <span
                                className={
                                    errors.termsAccepted ? "text-red-500" : ""
                                }
                            >
                                {t("booking.agreeToTerms")}{" "}
                                <a
                                    href="/terms-conditions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t("footer.termsConditions")}
                                </a>
                                ,{" "}
                                <a
                                    href="/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t("footer.privacyPolicy")}
                                </a>
                                , {t("common.and")}{" "}
                                <a
                                    href="/cancellation-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t("footer.cancellationPolicy")}
                                </a>
                                <RequiredAsterisk />
                            </span>
                        }
                    />
                    {errors.termsAccepted && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.termsAccepted[0]}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientInfoStep;

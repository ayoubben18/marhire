import React from 'react';
import { useTranslation } from 'react-i18next';
import RequiredAsterisk from '../site/RequiredAsterisk';

/**
 * Reusable Number Input Component with minus/plus buttons
 * @param {number} value - Current value
 * @param {function} onChange - Callback when value changes
 * @param {number} min - Minimum value (default: 1)
 * @param {number} max - Maximum value (default: 100)
 * @param {string} label - Label for the input
 * @param {boolean} required - Whether field is required
 * @param {string} error - Error message to display
 * @param {string} helperText - Helper text to display below
 * @param {string} className - Additional CSS classes
 */
const NumberInput = ({ 
    value = 1, 
    onChange, 
    min = 1, 
    max = 100, 
    label, 
    required = false,
    error = null,
    helperText = null,
    className = ''
}) => {
    const { t } = useTranslation();

    const handleDecrease = () => {
        const newValue = Math.max(min, value - 1);
        onChange(newValue);
    };

    const handleIncrease = () => {
        const newValue = Math.min(max, value + 1);
        onChange(newValue);
    };

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <RequiredAsterisk />}
                </label>
            )}
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-fit">
                <button
                    type="button"
                    onClick={handleDecrease}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={value <= min}
                >
                    <span className="text-lg font-bold text-gray-600">−</span>
                </button>
                <div className="px-4 py-2 bg-white min-w-[50px] text-center">
                    <span className="text-base font-semibold text-gray-900">
                        {value}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleIncrease}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={value >= max}
                >
                    <span className="text-lg font-bold text-gray-600">+</span>
                </button>
            </div>
            {helperText && !error && (
                <div className="mt-1">
                    <span className="text-xs text-gray-500">
                        {helperText}
                    </span>
                </div>
            )}
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default NumberInput;
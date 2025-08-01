import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../../../css/phone-input-custom.css';

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
    categoryId
}) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder="Full Name *"
                        className={`w-full px-3 py-3 text-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={(e) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (e.target.value && !emailRegex.test(e.target.value)) {
                                // Email validation will be handled by parent component
                            }
                        }}
                        placeholder="Email *"
                        className={`w-full px-3 py-3 text-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                    )}
                </div>
                <div>
                    <div className={`phone-input-wrapper ${errors.whatsAppNumber ? 'error' : ''}`}>
                        <PhoneInput
                            country={'us'}
                            value={whatsAppNumber}
                            onChange={(phone) => handleFieldChange('whatsAppNumber', phone.startsWith('+') ? phone : '+' + phone)}
                            placeholder="Enter WhatsApp number"
                            enableSearch={true}
                            searchPlaceholder="Search country..."
                            containerStyle={{
                                width: '100%'
                            }}
                            inputStyle={{
                                width: '100%',
                                height: '52px',
                                fontSize: '1.125rem',
                                paddingLeft: '48px',
                                paddingRight: '12px',
                                borderRadius: '0.75rem',
                                border: errors.whatsAppNumber ? '1px solid #ef4444' : '1px solid #d1d5db',
                                backgroundColor: '#ffffff'
                            }}
                            buttonStyle={{
                                borderRadius: '0.75rem 0 0 0.75rem',
                                border: errors.whatsAppNumber ? '1px solid #ef4444' : '1px solid #d1d5db',
                                borderRight: 'none',
                                backgroundColor: '#f9fafb',
                                padding: '0 8px'
                            }}
                            dropdownStyle={{
                                borderRadius: '0.5rem'
                            }}
                            searchStyle={{
                                borderRadius: '0.5rem',
                                padding: '8px 12px',
                                margin: '8px'
                            }}
                        />
                    </div>
                    {errors.whatsAppNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.whatsAppNumber[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        value={countryOfResidence}
                        onChange={(e) => handleFieldChange('countryOfResidence', e.target.value)}
                        placeholder="Country of Residence *"
                        className={`w-full px-3 py-3 text-lg border ${errors.countryOfResidence ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                    />
                    {errors.countryOfResidence && (
                        <p className="text-red-500 text-sm mt-1">{errors.countryOfResidence[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                        placeholder="Date of Birth *"
                        className={`w-full px-3 py-3 text-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth[0]}</p>
                    )}
                    <label className="text-xs text-gray-500 mt-1">Date of Birth * (Must be 18 years or older)</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => handleFieldChange('flightNumber', e.target.value)}
                        placeholder="Flight Number (optional)"
                        className="w-full px-3 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div className="md:col-span-2">
                    <textarea
                        value={additionalNotes}
                        onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
                        placeholder="Additional Notes (optional)"
                        rows="3"
                        className={`w-full px-3 py-3 text-lg border ${errors.additionalNotes ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.additionalNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.additionalNotes[0]}</p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                required
                                sx={{
                                    color: errors.termsAccepted ? '#ef4444' : undefined,
                                    '&.Mui-checked': {
                                        color: '#3b82f6'
                                    }
                                }}
                            />
                        }
                        label={
                            <span className={errors.termsAccepted ? 'text-red-500' : ''}>
                                I agree to the{" "}
                                <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Terms & Conditions
                                </a>
                                ,{" "}
                                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </a>
                                , and{" "}
                                <a href="/cancellation-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Cancellation Policy
                                </a>
                                {" *"}
                            </span>
                        }
                    />
                    {errors.termsAccepted && (
                        <p className="text-red-500 text-sm mt-1">{errors.termsAccepted[0]}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientInfoStep;
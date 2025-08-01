import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search, Info } from "lucide-react";

export default function TimeModal({ open, onSelect, onClose, selectedDate = null, minHoursAdvance = 0 }) {
    if (!open) return null;
    
    const isTimeDisabled = (hour) => {
        if (!selectedDate || minHoursAdvance === 0) return false;
        
        const now = new Date();
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hour, 0, 0, 0);
        
        const hoursUntilSelected = (selectedDateTime - now) / (1000 * 60 * 60);
        return hoursUntilSelected < minHoursAdvance;
    };
    
    const showConstraintInfo = minHoursAdvance > 0 && selectedDate;
    
    return (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] w-40">
            {showConstraintInfo && (
                <div className="p-2 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-start gap-1">
                        <Info className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-blue-700">
                            <p className="font-medium">Min {minHoursAdvance}hr advance</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="trendings-locations">
                {Array.from({ length: 24 }, (_, i) => {
                    const isDisabled = isTimeDisabled(i);
                    return (
                        <div
                            className={`trending-location ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:bg-gray-50'}`}
                            key={i}
                            onClick={() => {
                                if (!isDisabled) {
                                    onSelect(
                                        `${i.toString().padStart(2, "0")}:00`
                                    );
                                    onClose();
                                }
                            }}
                        >
                            <span className={isDisabled ? 'text-gray-400' : ''}>
                                <Clock size={22} />
                            </span>
                            <div>
                                <div className={`trending-location__city ${isDisabled ? 'text-gray-400' : ''}`}>
                                    {`${i.toString().padStart(2, "0")}:00`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

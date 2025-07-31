import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ChevronDown, Search } from "lucide-react";

export default function TimeModal({ open, onSelect, onClose }) {
    if (!open) return null;
    return (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] w-40">
            <div className="trendings-locations">
                {Array.from({ length: 24 }, (_, i) => (
                    <div
                        className="trending-location"
                        key={i}
                        onClick={() => {
                            onSelect(
                                `${i.toString().padStart(2, "0")}:00`
                            );
                            onClose();
                        }}
                    >
                        <span>
                            <Clock size={22} />
                        </span>
                        <div>
                            <div className="trending-location__city">
                                {`${i.toString().padStart(2, "0")}:00`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

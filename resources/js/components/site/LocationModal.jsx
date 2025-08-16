// LocationModal.js
import axios from "axios";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function LocationModal({ open, onSelect, onClose, returnBoth = false }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("/api/get_cities");
                setCities(response.data.cities);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCities();
    }, []);

    if (!open) return null;
    return (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] w-80">
            <div className="trendings-locations">
                {cities.map((city) => (
                    <div
                        className="trending-location cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg"
                        key={city.id}
                        onClick={() => {
                            if (returnBoth) {
                                onSelect(city.id, city.city_name);
                            } else {
                                onSelect(city.city_name);
                            }
                            onClose();
                        }}
                    >
                        <IoLocationOutline size={22} />
                        <div>
                            <div className="trending-location__city font-semibold">
                                {city.city_name}
                            </div>
                            <div className="trending-location__country text-xs text-gray-500">
                                {city.city_name}, Morocco
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import PriceRangeSlider from "./PriceRangeSlider";
import NumberSlider from "./NumberSlider";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchFilter = ({ category, filters, onChange }) => {
    const [dynamicOptions, setDynamicOptions] = useState([]);
    const FILTERS_SCHEMA = {
        car: [
            {
                key: "carType",
                label: "Car Type",
                type: "checkbox",
                options: [],
            },
            {
                key: "carBrand",
                label: "Car Brand",
                type: "checkbox",
                options: [],
            },
            {
                key: "transmission",
                label: "Transmission",
                type: "radio",
                options: ["Manual", "Automatic"],
            },
            {
                key: "fuelType",
                label: "Fuel Type",
                type: "checkbox",
                options: ["Petrol", "Diesel"],
            },
            {
                key: "priceRange",
                label: "Price Range",
                type: "priceRange",
                min: 10,
                max: 500,
            },
            {
                key: "deposit",
                label: "Deposit Required",
                type: "radio",
                options: ["Yes", "No"],
            },
            {
                key: "mileagePolicy",
                label: "Mileage Policy",
                type: "checkbox",
                options: [
                    "100 km/day",
                    "150 km/day",
                    "200 km/day",
                    "250 km/day",
                    "Unlimited Km",
                ],
            },
        ],
        private: [
            {
                key: "serviceType",
                label: "Service Type",
                type: "checkbox",
                options: ["Airport Transfer", "Intercity"],
            },
            {
                key: "carType",
                label: "Car Type",
                type: "checkbox",
            },
            {
                key: "multilingualDriver",
                label: "Multilingual Driver",
                type: "radio",
                options: ["Yes", "No"],
            },
            {
                key: "maxPassengers",
                label: "Max Passengers",
                type: "range",
                min: 1,
                max: 30,
            },
            {
                key: "pricePer",
                label: "Price per Hour/Day",
                type: "priceRange",
                min: 5,
                max: 2000,
            },
            {
                key: "maxLuggage",
                label: "Max Luggage Capacity",
                type: "range",
                min: 1,
                max: 10,
            },
        ],
        boat: [
            {
                key: "boatType",
                label: "Boat Type",
                type: "checkbox",
            },
            {
                key: "withCaptain",
                label: "With Captain",
                type: "radio",
                options: ["Yes", "No"],
            },
            {
                key: "purpose",
                label: "Purpose",
                type: "checkbox",
                options: [
                    "Private Cruise",
                    "Romantic Experience",
                    "Family Outing",
                    "Fishing Trip",
                    "Sunset Cruise",
                    "Birthday Celebration",
                    "Corporate Event",
                    "Luxury Experience",
                    "Water Sports & Adventure",
                    "Photography Tour",
                    "Snorkeling Tour",
                    "Island Hopping",
                    "Jet Ski Add-On Available",
                    "Party on Boat",
                    "Half-Day Rental",
                    "Full-Day Rental",
                    "Weekend Getaway",
                    "Swimming & Relaxation",
                ],
            },
            {
                key: "capacity",
                label: "Capacity",
                type: "range",
                min: 2,
                max: 40,
            },
            {
                key: "priceRange",
                label: "Price Range",
                type: "priceRange",
                min: 20,
                max: 2000,
            },
        ],
        activity: [
            {
                key: "activityType",
                label: "Activity Type",
                type: "checkbox",
            },
            {
                key: "privateGroup",
                label: "Private / Group",
                type: "checkbox",
                options: ["Private", "Group"],
            },
            {
                key: "pickupIncluded",
                label: "Pickup Included",
                type: "radio",
                options: ["Yes", "No"],
            },
            {
                key: "difficultyLevel",
                label: "Difficulty Level",
                type: "radio",
                options: ["Easy", "Medium", "Hard"],
            },
            {
                key: "pricePerPerson",
                label: "Price per Person/Group",
                type: "priceRange",
                min: 10,
                max: 500,
            },
        ],
    };

    useEffect(() => {
        const fetchDynamicOptions = async () => {
            const response = await axios.get(
                "/api/get_dynamic_filter_options",
                { params: { category: category } }
            );

            setDynamicOptions(response.data);
        };

        fetchDynamicOptions();
    }, [category]);

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <aside className="search__filters">
            <h2>Filter by</h2>
            {FILTERS_SCHEMA[category].map((field) => (
                <div key={field.key} className="search__filters__item">
                    <label className="search__filters__item__lbl">
                        {field.label}
                    </label>
                    {field.type === "select" && (
                        <select
                            value={filters[field.key] || ""}
                            onChange={(e) =>
                                onChange(field.key, e.target.value)
                            }
                        >
                            <option value="">All</option>
                            {field.options.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    )}
                    {field.type === "checkbox" &&
                        (dynamicOptions[field.key] || field.options || []).map(
                            (opt, idx) => (
                                <div key={idx}>
                                    <div className="filter__opt">
                                        <Checkbox
                                            checked={
                                                Array.isArray(
                                                    filters[field.key]
                                                )
                                                    ? filters[
                                                          field.key
                                                      ].includes(opt.id ?? opt)
                                                    : false
                                            }
                                            onChange={(e) => {
                                                const prev = Array.isArray(
                                                    filters[field.key]
                                                )
                                                    ? filters[field.key]
                                                    : [];
                                                const value = opt.id ?? opt;
                                                if (e.target.checked) {
                                                    onChange(field.key, [
                                                        ...prev,
                                                        value,
                                                    ]);
                                                } else {
                                                    onChange(
                                                        field.key,
                                                        prev.filter(
                                                            (v) => v !== value
                                                        )
                                                    );
                                                }
                                            }}
                                            color="success"
                                        />
                                        <span>{typeof opt === 'object' ? opt.option || opt.label || opt.value || '' : opt}</span>
                                    </div>
                                </div>
                            )
                        )}
                    {field.type === "radio" && (
                        <RadioGroup
                            value={filters[field.key] || ""}
                            onChange={(e) =>
                                onChange(field.key, e.target.value)
                            }
                            row
                        >
                            {field.options.map((opt) => (
                                <FormControlLabel
                                    key={opt}
                                    value={opt}
                                    control={<Radio color="success" />}
                                    label={opt}
                                />
                            ))}
                        </RadioGroup>
                    )}
                    {field.type === "boolean" && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!filters[field.key]}
                                    onChange={(e) =>
                                        onChange(field.key, e.target.checked)
                                    }
                                    color="success"
                                />
                            }
                            label={field.label}
                        />
                    )}
                    {field.type === "number" && (
                        <input
                            type="number"
                            value={filters[field.key] || ""}
                            min={field.min}
                            max={field.max}
                            onChange={(e) =>
                                onChange(field.key, e.target.value)
                            }
                        />
                    )}
                    {field.type === "priceRange" && (
                        <PriceRangeSlider
                            value={[
                                filters.priceMin ?? 0,
                                filters.priceMax ?? 1000,
                            ]}
                            min={0}
                            max={1000}
                            onChange={([min, max]) => {
                                setFilters((f) => ({
                                    ...f,
                                    priceMin: min,
                                    priceMax: max,
                                }));
                            }}
                        />
                    )}

                    {field.type === "range" && (
                        <>
                            <NumberSlider
                                value={filters[field.key] || field.max}
                                min={field.min}
                                max={field.max}
                                onChange={(v) => onChange(field.key, v)}
                                label={field.label}
                                unit=""
                            />
                        </>
                    )}
                </div>
            ))}
        </aside>
    );
};

export default SearchFilter;

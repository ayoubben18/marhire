import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Icons for specifications
import { 
    FaCar, FaGasPump, FaCogs, FaCalendarAlt, FaUsers, FaDoorOpen,
    FaSnowflake, FaRoad, FaIdCard, FaMoneyBillWave, FaShip,
    FaUserTie, FaAnchor, FaMapMarkerAlt, FaSuitcase, FaLanguage,
    FaHiking, FaBus, FaUserFriends, FaMountain, FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';
import { MdDirectionsCar, MdLocalActivity } from 'react-icons/md';
import { GiCarSeat, GiSteeringWheel } from 'react-icons/gi';

const ListingSpecifications = ({ loading, listing }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return (
            <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                <Skeleton height={30} width={200} className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton circle width={40} height={40} />
                            <div className="flex-1">
                                <Skeleton height={14} width={80} />
                                <Skeleton height={20} width={100} className="mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!listing) return null;

    // Category-specific specifications
    const renderSpecifications = () => {
        const categoryId = listing.category_id;
        
        switch (categoryId) {
            case 2: // Car Rental (ID 2 in database)
                return <CarRentalSpecs listing={listing} t={t} />;
            case 3: // Private Driver (ID 3 in database)
                return <PrivateDriverSpecs listing={listing} t={t} />;
            case 4: // Boat Rental (ID 4 in database)
                return <BoatRentalSpecs listing={listing} t={t} />;
            case 5: // Things to Do / Activities (ID 5 in database)
                return <ThingsToDoSpecs listing={listing} t={t} />;
            default:
                console.warn('Unknown category ID:', categoryId);
                return null;
        }
    };

    return (
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                {t('listing.specs.title', 'Specifications')}
            </h2>
            {renderSpecifications()}
        </div>
    );
};

// Specification Item Component
const SpecItem = ({ icon: Icon, label, value, iconColor = "text-primary-600" }) => {
    if (!value && value !== 0) return null;
    
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`${iconColor} mt-1 flex-shrink-0`}>
                <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
};

// Car Rental Specifications
const CarRentalSpecs = ({ listing, t }) => {
    // Get car type names - handle multiple car types
    let carTypeName;
    if (listing.car_type_objs && listing.car_type_objs.length > 0) {
        // Multiple car types available
        carTypeName = listing.car_type_objs.map(type => type.option).join(', ');
    } else if (listing.car_type_obj?.option) {
        // Single car type (backward compatibility)
        carTypeName = listing.car_type_obj.option;
    } else {
        // Fallback to ID
        carTypeName = listing.car_type;
    }
    
    // Get car model name from related object if available
    const carModelName = listing.car_model_obj?.option || listing.car_model;
    
    const specs = [
        {
            icon: MdDirectionsCar,
            label: t('listing.specs.car_type', 'Car Type'),
            value: carTypeName
        },
        {
            icon: FaCar,
            label: t('listing.specs.model', 'Model'),
            value: carModelName
        },
        {
            icon: FaCalendarAlt,
            label: t('listing.specs.year', 'Year'),
            value: listing.year
        },
        {
            icon: FaGasPump,
            label: t('listing.specs.fuel_type', 'Fuel Type'),
            value: listing.fuel_type
        },
        {
            icon: FaCogs,
            label: t('listing.specs.transmission', 'Transmission'),
            value: listing.transmission === 'Manual' ? t('listing.specs.manual', 'Manual') : t('listing.specs.automatic', 'Automatic')
        },
        {
            icon: GiCarSeat,
            label: t('listing.specs.seats', 'Seats'),
            value: listing.seats
        },
        {
            icon: FaDoorOpen,
            label: t('listing.specs.doors', 'Doors'),
            value: listing.doors
        },
        {
            icon: FaSnowflake,
            label: t('listing.specs.air_conditioning', 'A/C'),
            value: listing.ac === 1 || listing.ac === '1' || listing.ac === true || listing.ac === 'Yes'
                ? t('listing.specs.ac', 'A/C') 
                : t('listing.specs.noAc', 'No A/C'),
            iconColor: listing.ac === 1 || listing.ac === '1' || listing.ac === true || listing.ac === 'Yes'
                ? "text-blue-600" 
                : "text-gray-400"
        },
        {
            icon: FaRoad,
            label: t('listing.specs.mileage_policy', 'Mileage Policy'),
            value: listing.mileage_policy === 'Unlimited' ? t('listing.specs.unlimited', 'Unlimited') : listing.mileage_policy
        },
        {
            icon: FaGasPump,
            label: t('listing.specs.fuel_policy', 'Fuel Policy'),
            value: listing.fuel_policy
        },
        {
            icon: FaIdCard,
            label: t('listing.specs.driver_age', 'Driver Age Requirement'),
            value: listing.driver_requirement
        },
        {
            icon: FaMoneyBillWave,
            label: t('listing.specs.deposit', 'Deposit'),
            value: listing.deposit_required === 1 || listing.deposit_required === '1' || listing.deposit_required === true
                ? `${t('listing.specs.deposit_required', 'Deposit Required')}${listing.deposit_amount ? ` (${listing.deposit_amount} ${t('common.currency', 'MAD')})` : ''}`
                : t('listing.specs.no_deposit', 'No Deposit'),
            iconColor: listing.deposit_required === 1 || listing.deposit_required === '1' || listing.deposit_required === true
                ? "text-orange-600" 
                : "text-green-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {specs.map((spec, index) => (
                <SpecItem
                    key={index}
                    icon={spec.icon}
                    label={spec.label}
                    value={spec.value}
                    iconColor={spec.iconColor}
                />
            ))}
        </div>
    );
};

// Private Driver Specifications
const PrivateDriverSpecs = ({ listing, t }) => {
    // Get vehicle type and model names from related objects if available
    const vehicleTypeName = listing.vehicle_type_obj?.option || listing.vehicule_type_obj?.option || listing.vehicule_type;
    const vehicleModelName = listing.vehicle_model_obj?.option || listing.vehicule_model_obj?.option || listing.vehicule_model;
    
    const specs = [
        {
            icon: FaCar,
            label: t('listing.specs.vehicle_type', 'Vehicle Type'),
            value: vehicleTypeName
        },
        {
            icon: MdDirectionsCar,
            label: t('listing.specs.vehicle_model', 'Vehicle Model'),
            value: vehicleModelName
        },
        {
            icon: FaUsers,
            label: t('listing.specs.max_passengers', 'Max Passengers'),
            value: listing.max_passengers
        },
        {
            icon: FaSuitcase,
            label: t('listing.specs.max_luggage', 'Max Luggage'),
            value: listing.max_luggage ? `${listing.max_luggage} ${t('listing.specs.bags', 'bags')}` : null
        },
        {
            icon: FaLanguage,
            label: t('listing.specs.languages', 'Languages'),
            value: listing.languages_spoken
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {specs.map((spec, index) => (
                <SpecItem
                    key={index}
                    icon={spec.icon}
                    label={spec.label}
                    value={spec.value}
                />
            ))}
        </div>
    );
};

// Boat Rental Specifications
const BoatRentalSpecs = ({ listing, t }) => {
    // Get boat type name from related object if available
    const boatTypeName = listing.boat_type_obj?.option || listing.boat_type;
    
    const specs = [
        {
            icon: FaShip,
            label: t('listing.specs.boat_type', 'Boat Type'),
            value: boatTypeName
        },
        {
            icon: FaUserTie,
            label: t('listing.specs.captain', 'Captain'),
            value: listing.with_captain === 1 || listing.with_captain === '1' || listing.with_captain === true
                ? t('listing.specs.captain_included', 'Captain Included')
                : t('listing.specs.captain_not_included', 'No Captain'),
            iconColor: listing.with_captain === 1 || listing.with_captain === '1' || listing.with_captain === true
                ? "text-blue-600" 
                : "text-gray-500"
        },
        {
            icon: FaUsers,
            label: t('listing.specs.capacity', 'Capacity'),
            value: listing.capacity ? `${listing.capacity} ${t('listing.specs.people', 'people')}` : null
        },
        {
            icon: FaMapMarkerAlt,
            label: t('listing.specs.departure_location', 'Departure Location'),
            value: listing.departure_location || listing.city?.city_name
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {specs.map((spec, index) => (
                <SpecItem
                    key={index}
                    icon={spec.icon}
                    label={spec.label}
                    value={spec.value}
                    iconColor={spec.iconColor}
                />
            ))}
        </div>
    );
};

// Things to Do Specifications
const ThingsToDoSpecs = ({ listing, t }) => {
    // Get activity type name from related object if available
    const activityTypeName = listing.activity_type_obj?.option || listing.activity_type;
    
    // Format group size
    const groupSize = listing.group_size_min && listing.group_size_max
        ? `${listing.group_size_min} - ${listing.group_size_max} ${t('listing.specs.people', 'people')}`
        : listing.group_size_min
        ? `Min ${listing.group_size_min} ${t('listing.specs.people', 'people')}`
        : listing.group_size_max
        ? `Max ${listing.group_size_max} ${t('listing.specs.people', 'people')}`
        : null;
    
    const specs = [
        {
            icon: MdLocalActivity,
            label: t('listing.specs.activity_type', 'Activity Type'),
            value: activityTypeName
        },
        {
            icon: FaBus,
            label: t('listing.specs.pickup_included', 'Pickup'),
            value: listing.pickup === 1 || listing.pickup === '1' || listing.pickup === true
                ? t('listing.specs.pickup_yes', 'Pickup Included')
                : t('listing.specs.pickup_no', 'No Pickup'),
            iconColor: listing.pickup === 1 || listing.pickup === '1' || listing.pickup === true
                ? "text-green-600" 
                : "text-gray-500"
        },
        {
            icon: FaUserFriends,
            label: t('listing.specs.tour_type', 'Tour Type'),
            value: listing.private_or_group
        },
        {
            icon: FaUsers,
            label: t('listing.specs.group_size', 'Group Size'),
            value: groupSize
        },
        {
            icon: FaMountain,
            label: t('listing.specs.difficulty', 'Difficulty Level'),
            value: listing.difficulty,
            iconColor: getDifficultyColor(listing.difficulty)
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {specs.map((spec, index) => (
                <SpecItem
                    key={index}
                    icon={spec.icon}
                    label={spec.label}
                    value={spec.value}
                    iconColor={spec.iconColor}
                />
            ))}
        </div>
    );
};

// Helper function for difficulty color
const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "text-gray-500";
    const lower = difficulty.toLowerCase();
    if (lower.includes('easy')) return "text-green-600";
    if (lower.includes('moderate') || lower.includes('medium')) return "text-orange-600";
    if (lower.includes('hard') || lower.includes('difficult')) return "text-red-600";
    return "text-gray-600";
};

export default ListingSpecifications;

// Add custom styles to app.css if needed
const customStyles = `
.text-primary-600 {
    color: #368d7c;
}

.bg-primary-50 {
    background-color: #368d7c10;
}

.border-primary-600 {
    border-color: #368d7c;
}
`;